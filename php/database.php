<?php

// $dbServername = "localhost";
// $dbUsername = "root";
// $dbPassword = "";
// $dbName = "geonames";

// $conn = mysqli_connect($dbServername, $dbUsername, $dbPassword, $dbName);

$url = parse_url(getenv("CLEARDB_DATABASE_URL"));

$server = $url["host"];
$username = $url["user"];
$password = $url["pass"];
$db = substr($url["path"], 1);

$conn = new mysqli($server, $username, $password, $db);