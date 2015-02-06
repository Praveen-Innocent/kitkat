<?php

class ConfigOverride {
	
 	public static function __override() {
		
		Config :: $Host = 'localhost';
   		Config :: $User = 'root';
   		Config :: $Password = '123';
		Config :: $Database = 'schoolneuron';
		
		//URLs
		Config :: $URL = 'http://localhost/kitkat/code/';
		Config :: $js_url = 'http://localhost/kitkat/code/static/js/';
		Config :: $css_url = 'http://localhost/kitkat/css/';
		Config :: $images_url = 'http://localhost/kitkat/css/';
	}
	
	
}

?>
