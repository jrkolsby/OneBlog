<?php
$ds = DIRECTORY_SEPARATOR;
$storeFolder = 'temp';
if (!empty($_FILES)) { //File added
	$tempFile = $_FILES['file']['tmp_name'];
	$targetPath = dirname( __FILE__ ) . $ds. $storeFolder . $ds;
	$targetFile =  $targetPath. $_FILES['file']['name'];
	move_uploaded_file($tempFile,$targetFile);
	
}
?>