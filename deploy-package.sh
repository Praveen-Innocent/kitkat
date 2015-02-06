#!/bin/bash
set +e

##############################################################################
## Initialize
##############################################################################
rm -f /tmp/lego-failed-servers


##############################################################################
## Includes
##############################################################################
DIR=`dirname $0`
source $DIR/common-functions.sh


##############################################################################
## Username
##############################################################################
username=$(whoami)
while getopts ":u:" option; do
    case "$option" in
        u)
            username="$OPTARG";;
        :)
            usageError "Missing -$OPTARG value";;
    esac
done
shift $((OPTIND-1))


##############################################################################
## Password
##############################################################################
prompt "LDAP password for $username (won't be stored anywhere): "
read -s password;
echo
if [ "z$password" == "z" ]; then
    inform "Password cannot be null. Aborting..."
    exit 0;
fi


##############################################################################
## Config Version
##############################################################################
#prompt "What config version to use with this deployment? ";
#read configVersion;
#echo
#if [ "z$configVersion" == "z" ]; then
#    inform "Config Version cannot be null. Aborting..."
#    exit 0;
#else
#    git pull
#    tempFile=`mktemp /tmp/config-service.properties.nm.XXXXXXXXXX`
#    sed -e "s/__CONFIG_VERSION__/$configVersion/g" lego-svc/src/main/resources/config-service.properties.nm > $tempFile
#    mv $tempFile lego-svc/src/main/resources/config-service.properties.nm
#
#    git add lego-svc/src/main/resources/config-service.properties.nm
#    git commit -m "Updating Config Version"
#    git push
#fi


##############################################################################
## Git Tag and Version
##############################################################################
currentTag=release/fk-w3-lego/nm-`date +%s`-nopush
inform "Git Tag ::" $currentTag

git tag -m "Promoting Lego to NM" $currentTag

#version=$(git log --pretty="format:%ct" $currentTag --max-count=1)
#version="1.$version-01nm"
#inform "Version ::" $version


##############################################################################
## All Good?
##############################################################################
choice "Continue... "
if [ "$choice" != "Y" -a "$choice" != "y" ]; then
    git tag -d $currentTag > /dev/null
    exit 0;
fi


##############################################################################
## Git Push Tag
##############################################################################
git push --tags


##############################################################################
## Deploy on first host
##############################################################################
prompt "What version to deploy? ";
read version;
echo
if [ "z$version" == "z" ]; then
    inform "Version cannot be null. Aborting..."
    exit 0;
fi

host=${hosts[0]}
deploy 1 $username $password $version $host $domain ${packages[@]}


##############################################################################
## Deploy parallely on other hosts
##############################################################################
hosts=("${hosts[@]:1}")
hostsCount=${#hosts[@]}
for i in `seq 0 10 $hostsCount`; do
    subHosts=("${hosts[@]:$i:10}")
    ./deploy-on-server.sh $username $password $version ${subHosts[@]} &
done
wait


##############################################################################
## Deploy parallely on other hosts
##############################################################################
inform "List of Failed Servers - "
cat /tmp/lego-failed-servers
inform "Done..."
