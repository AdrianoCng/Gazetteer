<?php

include("database.php");

require '../includes/geonames/vendor/autoload.php';
use GeoNames\Client as GeoNamesClient;
$g = new GeoNamesClient('leddy');

// CHECK IF DATA IS AVAILABLE IN THE DATABASE
$sql_select = "SELECT * FROM countryinfo WHERE countryCode = '$country_code';";
$result = mysqli_query($conn, $sql_select);
$resultCheck = mysqli_num_rows($result);

if ($resultCheck > 0) {
    $row = mysqli_fetch_assoc($result);

    foreach ($row as $key => $value) {
        $geonames_response["countryInfo"][$key] = $value;
    }

    $currency_code = $geonames_response["countryInfo"]["currencyCode"];

} else {
    // IF NO DATA IN DATABASE
    // SEND REQUEST TO GEONAMES API

    // COUNTRY INFO ENDPOINT
    $country_info = $g->countryInfo(["country"=>$country_code, "lang"=>"en"]);

    foreach ($country_info[0] as $key => $value) {
        if ($key == "isoAlpha3" || $key == "countryCode" || $key == "continentName" || $key == "countryName" || $key == "continent") {
            continue;
        }
        $geonames_response["countryInfo"][$key] = $value;
    }
    $currency_code = $geonames_response["countryInfo"]["currencyCode"];

    // STORE RESPONSE TO THE DATABASE
    $countryName = $country_info[0]->countryName;
    $areaInSqKm = $country_info[0]->areaInSqKm;
    $capital = $country_info[0]->capital;
    $currencyCode = $country_info[0]->currencyCode;
    $languages = $country_info[0]->languages;
    $population = $country_info[0]->population;


    $sql_insert_country_info = "INSERT INTO `countryinfo`(`countryCode`, `countryName`, `areaInSqKm`, `capital`, `currencyCode`, `currencyName`, `languages`, `population`) VALUES ('$country_code','$countryName','$areaInSqKm','$capital','$currencyCode','$currency_name','$languages','$population');";
    mysqli_query($conn, $sql_insert_country_info);
}

// TIMEZONE AND NEIGHBOURS ARE NEVER STORED
$neighbours = $g->neighbours(["country"=>$country_code]);
foreach ($neighbours as $key => $value) {
    $geonames_response["neighbours"][$key] = $value;
}

$timezone = $g->timezone(["lat"=>$lat, "lng"=>$lng]);
foreach ($timezone as $key => $value) {
    if ($key == "lat" || $key == "lng" || $key == "countryCode" || $key == "countryName") {
        continue;
    }
    $geonames_response_timezone[$key] = $value;
}