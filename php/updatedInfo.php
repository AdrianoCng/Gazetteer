<?php

include("openCage.php");
include("geonames.php");
include("openweathermap.php");
include("news.php");
include($_SERVER['DOCUMENT_ROOT']."/Portfolio/includes/openexchange/openexchangelibrary.php");

$main = $openweather_response;

$main["currency_rate"] = $single_rate;
$main["news"] = $news_response;
$main["timezone"] = $geonames_response_timezone;

echo json_encode($main);