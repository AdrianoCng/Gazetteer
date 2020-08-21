<?php

include('../includes/openCage/AbstractGeocoder.php');
include('../includes/openCage/Geocoder.php');
include('./apiKeys.php');

$parameters = ["limit"=>"1", "language"=>"en"];

$geocoder = new \OpenCage\Geocoder\Geocoder($API_key);

$result = $geocoder->geocode($_POST["q"], $parameters);

$lat = $result["results"][0]["geometry"]["lat"];
$lng = $result["results"][0]["geometry"]["lng"];
$formatted = $result["results"][0]["formatted"];
$country_code = $result["results"][0]["components"]["ISO_3166-1_alpha-2"];
$currency_code_opencage = $result["results"][0]["annotations"]["currency"]["iso_code"];


// avoid errors
if(isset($result["results"][0]["annotations"]["currency"])){
    $currency_name = $result["results"][0]["annotations"]["currency"]["name"];
}

foreach ($result["results"][0]["components"] as $key => $value) {
    if ($key == "ISO_3166-1_alpha-3") {
        $opencage_response["iso3"] = $value;
        continue;
    }
    $opencage_response[$key] = $value;
} 