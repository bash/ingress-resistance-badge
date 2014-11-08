<?php
	$agent = $_GET['agent'];
	$level = floatval($_GET['level']);
	$level = ($level > 16 ? 16 : $level);
	$faction = $_GET['faction'];
	$country = ($_GET['country'] ?: "International");

	// Force-Download if ?dl is set
	if (isset($_GET['dl'])) {
		header('Content-Description: File Transfer');
		header('Content-Type: application/octet-image');
		header("Content-disposition: attachment; filename={$agent}.png");
	} else {
		header('Content-type: image/jpeg');
	}

	// Create Image From Existing File
	$im = imagecreatefrompng('ruby.png');

	$width = imagesx($im);
	$height = imagesy($im);

	// Colors
	$white = imagecolorallocate($im, 255, 255, 255);
	$black = imagecolorallocate($im, 0, 0, 0);

	// Fonts
	$font_path = __DIR__ . '/fonts/coda.ttf';
	$regular = __DIR__ . '/fonts/coda_regular.ttf';

	// Get the dimensions of the template image
	$dimensions = imagettfbbox(15, 0, $regular, $country);
	$countryWidth = abs($dimensions[4] - $dimensions[0]);
	$leftCountryPos = $width - $countryWidth - 10;

	// Country
	imagettftext($im, 15, 0, $leftCountryPos, 490, $black, $regular, $country);

	// Agent Name
	imagettftext($im, 17, 0, 28, 537, $black, $regular, $agent);

	// Level
	if ($level > 9) {
		imagettftext($im, 40, 0, 393, 707, $black, $font_path, $level);
	} else {
		imagettftext($im, 50, 0, 402, 715, $black, $font_path, $level);
	}

	// Write the faction name
	imagettftext($im, 42.6, 0, 142, 451, $black, $regular, "RESISTANCE");


	// Send Image to Browser
	imagepng($im);

	// Clear Memory
	imagedestroy($im);
?>
