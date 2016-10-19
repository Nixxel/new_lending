<?php
if ($_POST) {            
            $name = ($_POST["name"]);
            $email = ($_POST["email"]);
            $services = ($_POST["services"]);

         
		$json = array(); // подготовим массив ответа
            if(isset($_POST['id_form'])) {
                  $id_form = $_POST['id_form'];
                  $json['form'] = $id_form;
            }
            if(isset($_POST["services"])) 
                  $services = $_POST["services"];
            else 
                  $services = "Отсутствует";
        
            $to = 'djam2594@gmail.com'; //обратите внимание на запятую
        
        
        

        
            /* тема/subject */
            $subject = "Заявка с сайта Vil_Stati";
            
            /* сообщение */
            $message .= '<div>Имя: '.$name.'</div>';
            $message .= '<div>Email: '.$email.'</div>';
            $message .= '<div>Услуга: '.$services.'</div>';
            /* Для отправки HTML-почты вы можете установить шапку Content-type. */
            $headers= "MIME-Version: 1.0\r\n";
            $headers .= "Content-type: text/html; charset=utf-8\r\n";
            $headers .= 'From: Vil_Stati' . "\r\n"; /* отправляет ОТ КОГО */
            /* и теперь отправим из */
            mail($to, $subject, $message, $headers);
            $json['error'] = 0; // ошибок не было

		echo json_encode($json); // выводим массив ответа
}
?>