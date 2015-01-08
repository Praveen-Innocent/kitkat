<?php

class Config {
	
 	public static $Host = 'localhost';
    public static $User = 'ideasr_demoroot';
    public static $Password = 'demoroot123';
	public static $Database = "ideasr_schgoogle";
	
	//URLs
	public static $URL = "http://new.local/kitkat/";
	public static $base_url = "http://new.local/kitkat/";
	public static $js_url = "http://new.local/kitkat/";
	public static $css_url = "http://new.local/kitkat/";
	public static $images_url = "http://new.local/kitkat/";

	//Defaults
	public static $defaultController = "main";
	public static $errorController = "error";
	
	
	public static $js_files = array("jquery.min.js","bootstrap.js","app.js");
	public static $utilities = array("common","debug","ui");
	public static $classes = array("db","generic","user");
	
	public static $enableLocalOverride = true;
	public static $useTemplates = false;	
	
	public static $isBlocked = false;
	public static $key = "neTc4JCUoerg5pyl4snmu8rgoNLd3KTTzd7Kk9Xi1p7Xo+TN4sTG3rS5uJ2c1dyexs3istTU53I";	
	
	//emails
	public static  $noreply_email="no-reply@schoolneuron.com";	
	public static  $Contact_email ="arunprakashraman@gmail.com,pravin.innocent@gmail.com";
	public static  $send_alerts_to ="arunprakashraman@gmail.com,pravin.innocent@gmail.com";
	public static  $alerts_from ="alerts@schoolneuron.com";	
	
		
}

	date_default_timezone_set('Asia/Calcutta');

	$settings['title'] = ":: Schoogle | The School Community";
	$settings['meta_description'] = "site description";
	$settings['meta_keywords'] = "site keywords";

	$settings['name'] = "Schoogle";
	
?>
