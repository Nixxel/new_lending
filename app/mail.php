<?php
if ($_POST) {            
    $name = ($_POST["name"]);
    $email = ($_POST["email"]);
    $phone = trim($_POST["phone"]);


    $json = array(); // подготовим массив ответа

    $form_name = $_POST['form_name'];
    $id_form = $_POST['form_type'];
    $json['form_type'] = $id_form;



    $to = 'nixxel@yandex.ru'; //обратите внимание на запятую


    /* тема/subject */
    $subject = "Заявка с сайта landing.melfori.com";

    /* сообщение */
    $message .= '<div>Имя: '.$name.'</div>';
    $message .= '<div>Email: '.$email.'</div>';
    $message .= '<div>Телефон: '.$phone.'</div>';
    $message .= '<div>Форма: '.$form_name.'</div>';
    /* Для отправки HTML-почты вы можете установить шапку Content-type. */
    $headers= "MIME-Version: 1.0\r\n";
    $headers .= "Content-type: text/html; charset=utf-8\r\n";
    $headers .= 'From: Landing' . "\r\n"; /* отправляет ОТ КОГО */
    /* и теперь отправим из */
    mail($to, $subject, $message, $headers);
    $json['error'] = 0; // ошибок не было

    echo json_encode($json); // выводим массив ответа
}
?>