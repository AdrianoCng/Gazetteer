<?php

require 'vendor/autoload.php';

use Dzasa\OpenExchangeRates\OpenExchangeRates;
use Dzasa\OpenExchangeRates\Cache;

$config = array(
    'api_key' => 'acde5671816043c59d4a16b7231b2a71', // required
    'protocol' => 'https', // optional [http|https]
    'client' => 'curl',  // optional [curl|file_get_contents]
    'base' => 'USD' // optional
);

$cache = new Cache("file", array('cache_dir'=>$_SERVER['DOCUMENT_ROOT']."/Portfolio/includes/openexchange/cache"));

$exchangeRates = new OpenExchangeRates($config, $cache);
if (isset($currency_code_opencage)) {
    $single_rate = $exchangeRates->getRate($currency_code_opencage);
} else {
    $single_rate = $exchangeRates->getRate($currency_code);
}