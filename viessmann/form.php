<?php
if ((!isset($_POST['phone']) || strlen($_POST['phone']) < 11)) {
	echo 'Укажите правильный номер телефона!';
} elseif (!isset($_POST['name'])) {
	echo 'Введите имя!';
	
} else {
	$to = 'magnuspg07@gmail.com';
	$subject = 'Сообщение с сайта';

	$name = '<p>Имя: ' . $_POST['name'] . '</p>';
	$phone = '<p>Телефон: ' . $_POST['phone'] . '</p>';

	if ((isset($_POST['page']) && $_POST['page'] != "")) {
		$page = '<p>Страница: ' . $_POST['page'] . '</p>';
	}
	if ((isset($_POST['problem']) && $_POST['problem'] != "")) {
		$problem = '<p>Проблема: ' . $_POST['problem'] . '</p>';
	}
	if ((isset($_POST['manufacturer']) && $_POST['manufacturer'] != "")) {
		$manufacturer = '<p>Производитель: ' . $_POST['manufacturer'] . '</p>';
	}
	if ((isset($_POST['district']) && $_POST['district'] != "")) {
		$district = '<p>Район: ' . $_POST['district'] . '</p>';
	}
	

	$body = '
<html>
	<head>
		<title>' . $subject . '</title>
	</head>
	<body>
	'
		. $name
		. $phone
		. $page
		. $problem
		. $manufacturer
		. $district
		.
	'            
	</body>
</html>';

	$headers = //"From: info@site.pro" . "\r\n" .
		"Content-type: text/html; charset=utf-8 \r\n";
	mail($to, $subject, $body, $headers);
}
