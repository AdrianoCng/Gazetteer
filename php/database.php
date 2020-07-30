<?php

// $dbServername = "localhost";
// $dbUsername = "root";
// $dbPassword = "";
// $dbName = "geonames";

$dbServername = "eu-cdbr-west-03.cleardb.net";
$dbUsername = "bf818bc3326135";
$dbPassword = "e16fd17d ";
$dbName = "heroku_7f07fc2c6e7a68c";

$conn = mysqli_connect($dbServername, $dbUsername, $dbPassword, $dbName);

// mysql://bf818bc3326135:e16fd17d@eu-cdbr-west-03.cleardb.net/heroku_7f07fc2c6e7a68c?reconnect=true