<?php

/* require __DIR__.
'../vendor/autoload.php'; */

/*
  PHP contact form script
  Version: 1.1
  Copyrights BootstrapMade.com
*/

/***************** Configuration *****************/

  // Title prefixes
  $subject_title = "(Contacto Enlace Sigma)";
  $name_title = "Nombre:";
  $email_title = "Email:";
  $message_title = "Mensaje:";

  // Error messages
  $contact_error_name = "Debes escribir tu nombre";
  $contact_error_email = "Por favor escribe un email valido";
  $contact_error_subject = "Por favor escribe un asunto";
  $contact_error_message = "Debes escribir un mensaje";

/********** Do not edit from the below line ***********/

if(!isset($_SERVER['HTTP_X_REQUESTED_WITH']) AND strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) != 'xmlhttprequest') {
  die('Sorry Request must be Ajax POST');
}

if(isset($_POST)) {

  $name = filter_var($_POST["name"], FILTER_SANITIZE_STRING);
  $email = filter_var($_POST["email"], FILTER_SANITIZE_EMAIL);
  $subject = filter_var($_POST["subject"], FILTER_SANITIZE_STRING, FILTER_FLAG_NO_ENCODE_QUOTES);
  $message = filter_var($_POST["message"], FILTER_SANITIZE_STRING);

  // if(!$contact_email_to || $contact_email_to == 'contact@example.com') {
  //   die('The contact form receiving email address is not configured!');
  // }

  if(strlen($name)<3){
    die($contact_error_name);
  }

  if(!$email){
    die($contact_error_email);
  }

  if(strlen($subject)<3){
    die($contact_error_subject);
  }

  if(strlen($message)<3){
    die($contact_error_message);
  }

  // if(!isset($contact_email_from)) {
  //   $contact_email_from = "contactform@" . @preg_replace('/^www\./','', $_SERVER['SERVER_NAME']);
  // }

  // Replace with your real receiving email address    
  $email_from = "contacto@enlacesigma.com.co";
  $email_to = 'info@enlacesigma.com.co';
  $email_to2 = $email;
    
  $headers = 'From: ' . $name . ' <' . $email_from . '>' . PHP_EOL;
  $headers .= 'Reply-To: ' . $email_to . PHP_EOL;

  $headers2 = 'From: ' . $name . ' <' . $email_from . '>' . PHP_EOL;
  $headers2 .= 'Reply-To: ' . $email_to . PHP_EOL;

  // $headers .= 'MIME-Version: 1.0' . PHP_EOL;
  // $headers .= 'Content-Type: text/html; charset=UTF-8' . PHP_EOL;
  // $headers .= 'X-Mailer: PHP/' . phpversion();

  $message_content2 = 'Su mensaje ha sido recibido' . PHP_EOL;
  $message_content .= nl2br($message) . PHP_EOL;
  $message_content .= $name . PHP_EOL;
  $message_content .= $email . PHP_EOL;
  $message_content3 .= 'Pronto le responderemos.' . PHP_EOL . 'Gracias!';

  $sendemail = mail($email_to, $subject . ' ' . $subject_title, $message_content, $headers);
  
  $sendemail2 = mail($email_to2, $subject . ' ' . $subject_title, $message_content2 . $message_content . $message_content3, $headers2);
  if( $sendemail ) {
    echo 'OK';
  } else {
    echo 'Could not send mail! Please check your PHP mail configuration.';
  }
}
?>
