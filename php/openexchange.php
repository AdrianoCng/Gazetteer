<?php

include("./apiKeys.php");

if (isset($currency_code_opencage)) {
    $ch = curl_init("https://openexchangerates.org/api/latest.json?symbols=$currency_code_opencage&prettyprint=true&app_id=$openexchange_api");

    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    $openexchange_ret = curl_exec($ch);
    
    curl_close($ch);

    $exchangeRates_response = json_decode($openexchange_ret, true);

    $rate = $exchangeRates_response["rates"][$currency_code_opencage];

} else {
    $ch = curl_init("https://openexchangerates.org/api/latest.json?symbols=$$currency_code&prettyprint=true&app_id=$openexchange_api");

    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    $openexchange_ret = curl_exec($ch);
    
    curl_close($ch);

    $exchangeRates_response = json_decode($openexchange_ret, true);

    $rate = $exchangeRates_response["rates"][$currency_code_opencage];
}


