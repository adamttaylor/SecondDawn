<?php
//$db	= 'legynds_2dsandboxV2';//'seconddawn';
//$dbuser = 'legynds';//'root';
//$dbpass = 'm!r@nda';//'';
//$dbhost = 'localhost';


//Name of the table thhat contains user ids to link to characters
define('id_table','wp_users');
//Field that contains the index to the user id table
define('id_index','id');
//Field that contains the user's display name
define('id_user','display_name');
//ID of the Super Admin
define('INV_ADMIN',1);
define('INV_PREFIX','dawn_');
define('INV_DB','legynds_2dsandbox');
//define('INV_DB','legynds_2dsandboxV2');


//Below is a wordpress login bridge
if(function_exists('wp_get_current_user')){
	$current_user = wp_get_current_user();
	define('INVENTORY_USER',$current_user->ID);
	//define('INVENTORY_USER','5');
	
}else if(isset($_GET[ 'uid' ])){
	define('DB_NAME','legynds_2dsandboxV2');
	define('DB_USER', 'legynds');
	define('DB_PASSWORD', 'm!r@nda');
	define('DB_HOST', 'localhost');
	
	define('INVENTORY_USER',$_GET[ 'uid' ]);
}else{
	require_once('../../../../wp-config.php');
	require_once('../../../../wp-includes/wp-db.php');
	require_once('../../../../wp-includes/pluggable.php');
	$current_user = wp_get_current_user();
	define('INVENTORY_USER',$current_user->ID);
	//live
	/*define('DB_NAME', 'legynds_2dsandboxV2');
	define('DB_USER', 'legynds');
	define('DB_PASSWORD', 'm!r@nda');
	define('DB_HOST', 'localhost');*/
	
	/*
	//dev
	define('DB_NAME', 'seconddawn');
	define('DB_USER', 'root');
	define('DB_PASSWORD', '');
	define('DB_HOST', 'localhost');	
	*/
	//define('INVENTORY_USER','5');
}

/*Iventroy transactions
1) create a transactions table
2) The transactions table shows every time build or loot is added/subtracted
3) Transaction info: 
type:"build/loot" 
action:"trade/gift/blanket/staffedit" 
info:<the text description of the transaction> 
pre_edit:"the data of the relavent field before the action as a json format ex: [{'id':'1234',qty:'2','method':'give'},{'id':'8669','gty':'8','method':'recieve'}]" post_edit:"like pre-edit but after the ACTION" 
sender:"Id of the persion who initiated the transaction" 
reciever:"id of the person who recieved the transaction" 
status = "Offered/Accepted/Rejected" 
comments: "user notes"
date_initiated
date_accepted

5) List Treasure/New Treasure
item_id
item_name: Name of item
item_type: treasure/plot
item_value
item_description
trade_options: give,trade


4) User setting (notify me of offers by email)
6) Add inventory column to character
7) Make qty changeable in edit char


For the new character, check to see if pre-edit and post edit are different
otherwise don't build a transaction

Gift box
----------
trans_type: hidden: loot
trans_action: hidden: staff-edit
trans_info: hidden: (assing on save)
pre_edit: hidden: assign on build
post_edit: giftbox: assing on save
reciever: hidden: assign on build
sender: hidden: <user id>
trans_status: hidden: Accepted
message: hiden: Staff has added items to your inventory

Trade box
----------
trans_type: loot: assign on build
trans_action: select: gift/trade/request: user assign
trans_info: hidden: assign on save
pre_edit: hidden: assign on build
post_edit: giftbox: assign on save
reciever: select: user sign
sender: hidden: assign on build
trans_status: hidden: 'Offered'
comments: textarea user assign
message: textarea: user assign
*/
?>