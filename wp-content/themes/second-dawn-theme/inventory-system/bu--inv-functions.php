<?php
function listTrades(){
	$and = getRestVar('pending')? 'and trans_status="Offered" ' : 'and trans_status!="Offered" ';
	$str = 
	'select trans.*,send.char_name as sender_name,recieve.char_name as reciever_name, '.INVENTORY_USER.' as current_user_id from transactions as trans 
	left join characters as ch on (trans.sender = ch.char_id OR trans.reciever = ch.char_id and ch.user_id='.INVENTORY_USER.' ) 
	left join characters as send on (send.char_id = sender) 
	left join characters as recieve on (recieve.char_id = reciever) 
	where ch.char_id="'.getRestVar('char_id').'"'.$and.' order by date_modified desc;';
	queryInventory($str);
}
function sendTrade(){
	$str = 
'update characters set inventory = \''.getRestVar('inventory').'\', escro = \''.getRestVar('escro').'\' where char_id = '.getRestVar('sender').';
insert into transactions (comments,message,post_edit,pre_edit,reciever,sender,trans_action,trans_info,trans_status,trans_type) values( 
	"'.getRestVar('comments').'", 
	"'.getRestVar('message').'",
	\''.getRestVar('post_edit').'\',
	\''.getRestVar('pre_edit').'\', 
	"'.getRestVar('reciever').'", 
	"'.getRestVar('sender').'", 
	"'.getRestVar('trans_action').'",
	\''.getRestVar('trans_info').'\', 
	"'.getRestVar('trans_status').'", 
	"'.getRestVar('trans_type').'" );
';	
	queryNoResult($str);
}
function listItems(){
	$str = 'select * from items  where status !="archive" order by item_name;';
	queryInventory($str);	
}
function createItem(){
	$str = 'insert into items (item_name,item_type,item_value,item_description)values("'.getRestVar('item_name').'","'.getRestVar('item_type').'",'.getRestVar('item_value').',"'.getRestVar('item_description').'") ON DUPLICATE KEY UPDATE
	item_name="'.getRestVar('item_name').'",item_value='.getRestVar('item_value').',item_description="'.getRestVar('item_description').'";'; 
	queryNoResult($str);	
}
function getCharacterList(){
	global $id_index, $id_user, $id_table, $userlevel;
	$where = getRestVar('onlyuser')? 'and ch.user_id = '.INVENTORY_USER : '';
	$where = getRestVar('notuser')? 'and ch.user_id != '.INVENTORY_USER : $where;
	$where = getRestVar('char_id')? 'and ch.char_id ='.getRestVar('char_id') : $where;
	$str = 'select ch.*,id_tab.'.$id_index.' as id,id_tab.'.$id_user.' as user from characters as ch left join '.$id_table.' as id_tab on (id_tab.id = ch.user_id) where ch.status = "active" '.$where.' order by ch.char_name';
	queryInventory($str);
}
function characterMenu(){
	global $id_index, $id_user, $id_table, $userlevel;
	$where = getRestVar('onlyuser')? 'and ch.user_id = '.INVENTORY_USER : '';
	$where = getRestVar('notuser')? 'and ch.user_id != '.INVENTORY_USER : $where;
	$where = getRestVar('char_id')? 'and ch.char_id ='.getRestVar('char_id') : $where;
	$str = 'select ch.*,id_tab.'.$id_index.' as id,id_tab.'.$id_user.' as user from characters as ch left join '.$id_table.' as id_tab on (id_tab.id = ch.user_id) where ch.status = "active" '.$where.' order by ch.char_name';
	queryInventory($str);
}
function setUserPermision(){
	$str = 'INSERT INTO inventory_permissions (user_id, permission_level) VALUES('.getRestVar('user_id').',"'.getRestVar('level').'") ON DUPLICATE KEY UPDATE permission_level="'.getRestVar('level').'"';
	queryNoResult($str);	
}
function archive_character(){
	$str = 'update characters set status = "archive" where char_name = "'.getRestVar('char_name').'" and user_id = "'.getRestVar('user_id').'"';
	queryNoResult($str);
}
function archive_item(){
	$str = 'update items set status = "archive" where item_id = "'.getRestVar('item_id').'"';
	queryNoResult($str);
}
function add_character(){
	$str = 'insert ignore into characters (user_id,char_name,inventory) values("'.getRestVar('user_id').'","'.getRestVar('char_name').'",\''.getRestVar('inventory').'\')';
	queryNoResult($str);	
}
function update_character(){
	$inv = getRestVar('inventory');
	$invstr = $inv? ", inventory ='".$inv."'" : '';
	$str = 'update characters set char_name ="'.getRestVar('char_name').'" '.$invstr.' where char_id ='.getRestVar('char_id').';';
	if(getRestVar('post_edit')){
		$str .='
		insert into transactions (trans_type,trans_action,trans_info,pre_edit,post_edit,reciever,sender,trans_status,message)values
		("Inventory","assign",\''.getRestVar('trans_info').'\',\''.getRestVar('pre_edit').'\',\''.getRestVar('post_edit').'\',"'.getRestVar('reciever').'",'.INVENTORY_USER.',"Accepted","'.getRestVar('message').'")';
	}
	queryNoResult($str);
}
//restapi for ajax calls
function users(){
	global $id_index, $id_user, $id_table;
	$str = 'select '.$id_index.' as id,'.$id_user.' as name from '.$id_table.' order by name;';
	queryInventory($str);
}
function userlist(){
	global $id_index, $id_user, $id_table;
	$str = 
'select perm.*, id_tab.'.$id_index.' as id, id_tab.'.$id_user.' as name, GROUP_CONCAT(carac.char_name) as characters 
from '.$id_table.' as id_tab 
left join inventory_permissions as perm on (id = perm.user_id)
left join characters as carac on (id = carac.user_id and carac.status = "active") 
GROUP BY id order by name;';

	queryInventory($str);
}
function menuUsers(){
	global $id_index, $id_user, $id_table, $userlevel;
	$str = 
	'select p.permission_level,ch.*,id_tab.'.$id_index.' as id,id_tab.'.$id_user.' as user from characters as ch 
	left join '.$id_table.' as id_tab on (id_tab.id = ch.user_id) 
	left join inventory_permissions as p on (id_tab.id = p.user_id)
	where ch.status = "active" and ch.user_id = '.INVENTORY_USER.' order by ch.char_name';
	$data = queryReturn($str);
	//var_dump($data);
	$active = ' active';
	foreach($data as $key => $val){
		//echo $val->permission_level;
		//var_dump($val);
		echo '<span id="'.$val->char_id.'" class="character'.$active.'"><h3>'.$val->char_name.'</h3>'.$val->char_class.', '.$val->race.'</span>';
		$active ='';
	}
	if($val->permission_level == 'Admin' || $val->permission_level == 'Moderator'){
		echo '<span id="0" class="character staffer"><h3>Staff</h3>'.$val->permission_level.'</span>';
	}
}
function buildDatabase(){
	$buildScript = 
"
-- MySQL Script generated by MySQL Workbench
-- 11/15/14 21:33:25
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Table `characters`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `characters` (
  `char_id` INT NOT NULL AUTO_INCREMENT,
  `char_name` VARCHAR(150) NOT NULL,
  `user_id` INT NOT NULL,
  `status` VARCHAR(45) NULL DEFAULT 'active',
  `inventory` VARCHAR(10000) NULL,
  `escro` VARCHAR(10000) NULL,
  `char_class` VARCHAR(45) NULL,
  `race` VARCHAR(45) NULL,
  `skills` VARCHAR(10000) NULL,
  PRIMARY KEY (`char_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `inventory_permissions`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `inventory_permissions` (
  `permission_id` INT NOT NULL AUTO_INCREMENT,
  `user_id` VARCHAR(45) NOT NULL,
  `permission_level` VARCHAR(45) NULL,
  PRIMARY KEY (`permission_id`),
  UNIQUE INDEX `user_id_UNIQUE` (`user_id` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `transactions`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `transactions` (
  `trans_id` INT NOT NULL AUTO_INCREMENT,
  `trans_type` VARCHAR(45) NOT NULL,
  `trans_action` VARCHAR(45) NOT NULL,
  `trans_info` VARCHAR(1000) NULL,
  `pre_edit` VARCHAR(10000) NULL,
  `post_edit` VARCHAR(10000) NOT NULL,
  `reciever` INT NOT NULL,
  `sender` INT NOT NULL,
  `trans_status` VARCHAR(45) NOT NULL DEFAULT 'Offered',
  `comments` VARCHAR(150) NULL,
  `message` VARCHAR(150) NULL,
  `date_initiated` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `date_modified` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`trans_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `items`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `items` (
  `item_id` INT NOT NULL AUTO_INCREMENT,
  `item_type` VARCHAR(45) NULL,
  `item_value` INT NULL,
  `item_description` VARCHAR(150) NULL,
  `item_name` VARCHAR(150) NOT NULL,
  `status` VARCHAR(45) NULL,
  PRIMARY KEY (`item_id`),
  UNIQUE INDEX `ietm_name_UNIQUE` (`item_name` ASC))
ENGINE = InnoDB;


DELIMITER $$
$$


DELIMITER ;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
";
	queryNoResult($buildScript);
}

function getRestVar($var){
	//$method = isset($_POST['method'])? $_POST['method'] : '';
	//$method = $method? $method : '';
	$p = isset($_POST[ $var ])?	$_POST[ $var ]	: false;
	$g = isset($_GET[ $var ])?	$_GET[ $var ]	: false;
	return $p? $p : $g;
}
function queryNoResult($str){
	global $dbhost, $dbuser, $dbpass, $db, $userlevel;
	$str = str_replace('$current_user_id',INVENTORY_USER,$str);
	try{
		$mysqli = new mysqli($dbhost, $dbuser, $dbpass, $db);
	}catch(Exception $e){
		echo  '[{"error":"'.$e.'"}]';
		exit();
	}
	if (mysqli_connect_errno()) {
		echo '[{"error":"connnection error"}]';
		exit();
	}
	$output = array();
	$res = $mysqli->multi_query($str);
	if(!$res){
		$arr = array(
			"error"=> "Query failed: (" . $mysqli->errno . ") " . $mysqli->error,
			"query"=> $str,
			"level"=> $userlevel
		);
		echo json_encode(array($arr));
		die;
	}else {
		$arr = array(
			"data"=>"success",
			"query"=>$str
		);
		echo json_encode(array($arr));
		exit;
	}
}
function queryInventory($str){
	global $dbhost, $dbuser, $dbpass, $db, $userlevel;
	try{
		$mysqli = new mysqli($dbhost, $dbuser, $dbpass, $db);
	}catch(Exception $e){
		echo  '[{"error":"'.$e.'"}]';
		exit();
	}
	if (mysqli_connect_errno()) {
		return '[{"error":"connnection error"}]';
		exit();
	}
	$output = array();
	$res = $mysqli->query($str);
	if(!$res){
		$arr = array(
			"error"=> "Query failed: (" . $mysqli->errno . ") " . $mysqli->error,
			"query"=> $str,
			"level"=> $userlevel
		);
		echo json_encode(array($arr));
		die;
	}else {
		$row_cnt = mysqli_num_rows($res);
		if($row_cnt && $row_cnt>0){
			
			while($row = $res->fetch_object()){
				if($userlevel){
				$row->current_user_level = $userlevel;
				}
				array_push($output,$row);	
			}
			$arr = array(
				"query"=> $str,
				"level"=> $userlevel,
				"data"=> $output
			);
			echo json_encode($output);
		}else{
			if($userlevel){
				echo '[{"data":"","current_user_level":"'.$userlevel.'"}]';
			}else{
				echo '[{"data":""}]';	
			}
		}
		$res->close();
		exit();
	}
}
function queryReturn($str){
	global $dbhost, $dbuser, $dbpass, $db, $userlevel;
	try{
		$mysqli = new mysqli($dbhost, $dbuser, $dbpass, $db);
	}catch(Exception $e){
		echo  '[{"error":"'.$e.'"}]';
		exit();
	}
	if (mysqli_connect_errno()) {
		return '[{"error":"connnection error"}]';
		exit();
	}
	$output = array();
	$res = $mysqli->query($str);
	if(!$res){
		$arr = array(
			"error"=> "Query failed: (" . $mysqli->errno . ") " . $mysqli->error,
			"query"=> $str,
			"level"=> $userlevel
		);
		echo json_encode(array($arr));
		die;
	}else {
		$row_cnt = mysqli_num_rows($res);
		if($row_cnt && $row_cnt>0){
			
			while($row = $res->fetch_object()){
				if($userlevel){
				$row->current_user_level = $userlevel;
				}
				array_push($output,$row);	
			}
			return $output;
		}else{
			if($userlevel){
				echo '[{"data":"","current_user_level":"'.$userlevel.'"}]';
			}else{
				echo '[{"data":""}]';	
			}
		}
		$res->close();
		exit();
	}
}

?>