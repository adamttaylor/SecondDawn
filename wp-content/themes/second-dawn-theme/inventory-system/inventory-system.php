<?php
//To do
//Characters
//1) Make a key accrosse the char_id and char_name columns
//2) Click x to archive the character
//3) If the character already exists let the user know


require('creds.php');
require('globals.php');
include('inv-functions.php');
header("Content-Type: application/json", true);

$method = getRestVar('method');
$userlevel = 'User';
//check if the function exists othewise use the switch
if(getRestVar('permission')){
	$userstr = 'select permission_level from inventory_permissions where user_id='.INVENTORY_USER.';';	
	try{
		$mysqli = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
	}catch(Exception $e){}
	if (mysqli_connect_errno()) {}
	$res = $mysqli->query($userstr);
	if($res){		
		$row_cnt = mysqli_num_rows($res);
			while($row = $res->fetch_object()){
				$userlevel = $row->permission_level;	
			}
		$res->close();
	}
}

if($method && function_exists($method)){
	call_user_func($method);
	exit();
}else{	
	switch($method){
		case 'getIDs':
		case 'get':
		findIndices();
		break;
		
		case 'lost_arts':
		listLostArts();
		break;
		
		case 'build':
		buildDatabase();
		default:
		
		case 'permissions':
		$arr = array(
			'data'=>$permissions,
			'method' => $method
		);
		echo json_encode($arr);
		exit();
		break;
		
		case 'permission':
		setUserPermision();
		break;
		
		case 'characters':
		getCharacterList();
		break;
		
		case 'items':
		listItems();
		break;
		
		case 'trades':
		listTrades();
		break;
		
		case 'empty':
		break;
		
		default:
		$arr = array(
			array(
				'query'=> $method,
				'error'=>'No method exists'
			)
		);
		echo json_encode($arr);
		exit();
		break;
	}
}

?>