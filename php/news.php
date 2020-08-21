<?php

include("./apiKeys.php");

if (isset($opencage_response["city"])) {
    $city = $opencage_response["city"];

    $ch = curl_init("https://newsapi.org/v2/everything?q=$city&language=en&sortBy=relevancy&pageSize=10&apiKey=$newsApiKey");

    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    $ret = curl_exec($ch);

    curl_close($ch);

    $news_response = json_decode($ret, true);

} else {

    $ch = curl_init("http://newsapi.org/v2/top-headlines?country=$country_code&category=general&pageSize=10&apiKey=$newsApiKey");

    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    $ret = curl_exec($ch);

    curl_close($ch);

    $news_response = json_decode($ret, true);
}