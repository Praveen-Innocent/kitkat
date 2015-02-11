<?php


class JsonHelper {

	public static function readJsonFromDir($dir,$join=false) {
		if (!is_dir($dir)) return null;
		$files = scandir($dir);
		$final = array();
		foreach ($files as $file) {
			if (substr($file,0,1) == ".") continue;
			$json = self::readJsonFromFile($dir."/".$file);
			if ($join) {
				foreach ($json as $k=>$v) {
					if (!isset($final[$k])) {
						$final[$k] = $v;
					}
				}
			} else {
				$final[] = $json;
			}
		}
		return $final;
	}

	public static function readJsonFromFile($file) {
		return json_decode(file_get_contents($file),true);
	}

}
