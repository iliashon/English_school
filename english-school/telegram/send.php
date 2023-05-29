<?php

//В переменную $token нужно вставить токен, который нам прислал @botFather
$token = "5729610781:AAFD2_OACBp72beO9LUQuQs09VZy4SAnuSw";

//Сюда вставляем chat_id
$chat_id = "-1001739007459";

//Определяем переменные для передачи данных из нашей формы
$_POST = json_decode(file_get_contents("php://input"), true);
if ($_POST['act'] == 'order') {
    $lastName = ($_POST['lastName']);
    $firstName = ($_POST['firstName']);
    $telegram = ($_POST['telegram']);
    $phone = ($_POST['phone']);


//Собираем в массив то, что будет передаваться боту
    $arr = array(
        'Имя:' => $lastName,
        'Фамилия:' => $firstName,
        'Телеграм:' => $telegram,
        'Телефон:' => $phone
    );

//Настраиваем внешний вид сообщения в телеграме
    foreach($arr as $key => $value) {
        $txt .= "<b>".$key."</b> ".$value."%0A";
    };

//Передаем данные боту
    $sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}","r");

//Выводим сообщение об успешной отправке
    if ($sendToTelegram) {
        echo ('Спасибо! Ваша заявка принята. Мы свяжемся с вами в ближайшее время.');
    }

//А здесь сообщение об ошибке при отправке
    else {
        echo ('Что-то пошло не так. ПОпробуйте отправить форму ещё раз.');
    }
}

?>