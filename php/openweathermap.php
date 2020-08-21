<?php

include("./apiKeys.php");

$ch = curl_init("https://api.openweathermap.org/data/2.5/onecall?lat=$lat&lon=$lng&exclude=hourly,minutely&units=metric&appid=$api_key");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$ret = curl_exec($ch);

$response = json_decode($ret);

curl_close($ch);

$current_weather = $response->current;
$daily_weather = $response->daily;

$openweather_response = [];

foreach ($current_weather as $key => $value) {
    $openweather_response["weather"]["current"][$key] = $value;
}

foreach ($daily_weather as $key => $value) {
    $openweather_response["weather"]["daily"][$key] = $value;
}