<?php
function sendMail(){
	$to = 'adam.t.taylor@gmail.com';
	$subject = 'Hello Dave';
	$headers = 'From: webmaster@seconddawn.legynds.com' . "\r\n" .
		'X-Mailer: PHP/' . phpversion();
	$headers  .= 'MIME-Version: 1.0' . "\r\n";
	$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
	$message = getRestVar('message');
	
	mail($to, $subject, $message, $headers);
}
function prefix(){
	return defined('INV_PREFIX')? INV_PREFIX : '_';
}
function backgrounds(){
	$str = 'select * from '.prefix().'background order by bk_name';	
	queryInventory($str);
}
function skills(){
	$str = 'select * from '.prefix().'skills order by sk_name';	
	queryInventory($str);
}
function orizons(){
	$str = 'select * from '.prefix().'orizons order by or_name';	
	queryInventory($str);
}
function equipment(){
	$str = 'select * from '.prefix().'equipment order by eq_name';	
	queryInventory($str);
}
function races(){
	$str = 'select * from '.prefix().'races order by rc_name';	
	queryInventory($str);
}
function listLostArts(){
	$where = getRestVar('in')? 'where la_id in('.getRestVar('in').')' : '';
	$str = 'select * from '.prefix().'lost_arts '.$where.' order by la_name';
	queryInventory($str);	
}
function createLostArt(){
	$name = getRestVar('la_name');
	$type = getRestVar('la_type');
	$cat = getRestVar('la_category');
	$tree = getRestVar('la_tree');
	$branch = getRestVar('branch');
	$prereq = getRestVar('la_prereq');
	$teach = getRestVar('teach');
	$tier = getRestVar('tier');
	$locked = getRestVar('locked');
	$des = addslashes(getRestVar('la_description'));
	$str = 'insert into '.prefix().'lost_arts (la_name,la_type,la_category ,la_tree,branch,la_prereq,teach,tier,locked,la_description) values("'.$name.'","'.$type.'","'.$cat.'","'.$tree.'","'.$branch.'","'.$prereq.'","'.$teach.'","'.$tier.'","'.$locked.'","'.$des.'");'; 
	if(getRestVar('la_id')){
		$str = 
		'update '.prefix().'lost_arts set la_name="'.$name.'",la_type="'.$type.'",la_prereq="'.$prereq.'",teach="'.$teach.'",tier="'.$tier.'",locked="'.$locked.'",la_description="'.$des.'" where la_id = '.getRestVar('la_id');
	}
	queryNoResult($str);	
}
function matchInventory(){
	$str=
	'update '.prefix().'characters set inventory=\''.getRestVar('inventory').'\', escro=\''.getRestVar('escro').'\' where char_id='.getRestVar('char_id');
	queryNoResult($str);	
}
function getTrade(){
	$str = 
	'select * from '.prefix().'transactions where trans_id='.getRestVar('trans_id');
	queryInventory($str);
}
function updateTrade(){
	$str = 
	'update '.prefix().'transactions set trans_status = "'.getRestVar('trans_status').'" where trans_id='.getRestVar('trans_id').' and trans_status="Offered";';
	queryNoResult($str);
}
function fixTrade(){
	$str = 
	'update '.prefix().'transactions set '.getRestVar('target').' = \''.getRestVar('pre_data').'\' where trans_id='.getRestVar('trans_id').';';
	queryNoResult($str);
}
function listTrades(){
	$and = getRestVar('pending')? 'and trans_status="Offered" ' : 'and trans_status!="Offered" and trans_status != "Completed" ';
	$str = 
	'select trans.*,send.char_name as sender_name,recieve.char_name as reciever_name, '.INVENTORY_USER.' as current_user_id from '.prefix().'transactions as trans 
	left join '.prefix().'characters as ch on (trans.sender = ch.char_id OR trans.reciever = ch.char_id and ch.user_id='.INVENTORY_USER.' ) 
	left join '.prefix().'characters as send on (send.char_id = sender) 
	left join '.prefix().'characters as recieve on (recieve.char_id = reciever) 
	where ch.char_id="'.getRestVar('char_id').'"'.$and.' order by date_initiated desc;'; 
	queryInventory($str);
}
function auditList(){
	$str = 'select * from '.prefix().'transactions where sender = '.getRestVar('char_id').' or reciever = '.getRestVar('char_id').' order by date_initiated desc limit 10;';
	queryInventory($str);
}
function sendTrade(){
	$str = 
//'update characters set inventory = \''.getRestVar('inventory').'\', escro = \''.getRestVar('escro').'\' where char_id = '.getRestVar('sender').';
'insert into '.prefix().'transactions (comments,message,pre_reciever,pre_sender,reciever,sender,trans_action,trans_info,trans_status,trans_type,reference_id) values( 
	"'.getRestVar('comments').'", 
	"'.getRestVar('message').'",
	\''.getRestVar('pre_reciever').'\',
	\''.getRestVar('pre_sender').'\', 
	"'.getRestVar('reciever').'", 
	"'.getRestVar('sender').'", 
	"'.getRestVar('trans_action').'",
	\''.getRestVar('trans_info').'\', 
	"'.getRestVar('trans_status').'", 
	"'.getRestVar('trans_type').'",
	"'.getRestVar('reference_id').'" );
';	
	queryNoResult($str);
}
function listItems(){
	//$str = 'select * from items  where status !="archive" order by item_name;';
	$str = 'select * from '.prefix().'items  where status IS NULL order by item_name;';
	queryInventory($str);	
}
function createItem(){
	$str = 'insert into '.prefix().'items (item_name,item_type,item_value,item_description)values("'.getRestVar('item_name').'","'.getRestVar('item_type').'",'.getRestVar('item_value').',"'.getRestVar('item_description').'") ON DUPLICATE KEY UPDATE
	item_name="'.getRestVar('item_name').'",item_value='.getRestVar('item_value').',item_description="'.getRestVar('item_description').'";'; 
	queryNoResult($str);	
}
function getCount(){
	$queryType = getRestVar('query');
	$search = getRestVar('search');
	$join  = getRestVar('join')?  ' '.getRestVar('join') : '';
	$where = getRestVar('where')? ' where '.getRestVar('where') : '';
	if($queryType == 'characters'){
		$str = searchStr('count(1) as c');
	}else if($queryType == 'users'){
		$str = searchStr('count(1) as c');
	}else if($queryType == 'lost_arts'){
		$str = searchStr('count(1) as c');
	}else{
		$str = 'select count(1) as c from '.prefix().getRestVar('table').$join.$where.';';
	}
	queryInventory($str);
}
function searchStr($fields){
	$str = false;
	$queryType = getRestVar('query');
	$search = getRestVar('search');
	$search = strtolower($search);
	
	if($queryType == 'characters'){
		if($search == 'pending'){
			$search = 'and pending = "y"';
		}else{
			$search = $search? ' and (ch.char_name like "%'.$search.'%" or orz.or_name like "%'.$search.'%" or race.rc_name like "%'.$search.'%" or ordr.grp_name like "%'.$search.'%" or org.grp_name like "%'.$search.'%" or prof.value like "%'.$search.'%")' : '';
		}
		$str =
		'select '.$fields.' from dawn_characters as ch 
		left join dawn_orizons as orz on (orz.or_id = ch.orizon) 
		left join dawn_races as race on (race.rc_id = ch.race)
		left join dawn_groups as ordr on (ordr.grp_id = ch.Char_order)
		left join dawn_groups as org on (org.grp_id = ch.org)
		left join '.DB_NAME.'.wp_bp_xprofile_data as prof on (prof.user_id=ch.user_id and prof.field_id=5)
		where ch.status = "active" '.$search;
	}else if($queryType == 'users'){
		$search = $search? 'and (prof.value like "%'.$search.'%" or perm.permission_level like "%'.$search.'%")' : '';
		$str = 
		'select '.$fields.' from $DB_NAME.wp_users 
		left join '.prefix().'permissions as perm on (perm.user_id = $DB_NAME.wp_users.$id_index)
		left join $DB_NAME.wp_bp_xprofile_data as prof on (prof.user_id=$DB_NAME.wp_users.$id_index and prof.field_id=5) 
		where user_status = 0 '.$search;
	}else if($queryType == 'lost_arts'){
		$search = $search? 'where la_name like "%'.$search.'%" or la_type like "%'.$search.'%" or la_category like "%'.$search.'%" or la_tree like "%'.$search.'%" or branch like "%'.$search.'%"' : '';
		$str = 
		'select '.$fields.' from '.prefix().'lost_arts '.$search;
	}
	return $str;
}

function findIndices(){
	$queryType = getRestVar('query');
	$search = getRestVar('search');
	$limit = ' limit '.getRestVar('start_index').','.getRestVar('max');
	
	if($queryType == 'characters'){
		$str = searchStr('ch.*,orz.or_name,race.rc_name,ordr.grp_name,org.grp_name,prof.value').$limit;
	}else if($queryType == 'users'){
		/*$search = $search? 'and (prof.value like "%'.$search.'%" )' : '';
		$str = 
		'select prof.user_id as ID from $DB_NAME.wp_users
		left join $DB_NAME.wp_bp_xprofile_data as prof on (prof.user_id=$DB_NAME.wp_users.$id_index and prof.field_id=5) 
		where user_status = 0 '.$search.' limit '.getRestVar('start_index').','.getRestVar('max').';';*/
		$str = searchStr('prof.user_id as ID').$limit;
	}else if($queryType == 'lost_arts'){
		/*$search = $search? 'where la_name like "%'.$search.'%" or la_type like "%'.$search.'%" or la_category like "%'.$search.'%" or la_tree like "%'.$search.'%" or branch like "%'.$search.'%"' : '';
		$str = 
		'select la_id from '.prefix().'lost_arts '.$search.' limit '.getRestVar('start_index').','.getRestVar('max').';';
		*/
		$str = searchStr('la_id').$limit;
	}else{
		$fields = getRestVar('fields')? getRestVar('fields')           : '*';
		$join   = getRestVar('join')?  ' '.getRestVar('join')          : '';
		$where  = getRestVar('where')? ' where '.getRestVar('where')   : '';
		$order  = getRestVar('sort')?  ' order by '.getRestVar('sort') : '';
		$str = 'select '.$fields.' from '.prefix().getRestVar('table').$join.$where.$order.' limit '.getRestVar('start_index').','.getRestVar('max').';';
	}
	queryInventory($str);
}
function getCharacterList(){
	global $userlevel;
	$where = getRestVar('onlyuser')? 'and ch.user_id = '.INVENTORY_USER : '';
	$where = getRestVar('notuser')? 'and ch.user_id != '.INVENTORY_USER : $where;
	$where = getRestVar('char_id')? 'and ch.char_id ='.getRestVar('char_id') : $where;
	$where = getRestVar('in')? 'and ch.char_id in('.getRestVar('in').')' :  $where;
	$str = 
	'select rel.*,ch.*,COALESCE(perm.user_build,"50")as user_build,id_tab.'.id_index.' as id,id_tab.'.id_user.' as user 
	from '.prefix().'characters as ch 
	left join '.DB_NAME.'.'.id_table.' as id_tab on (id_tab.id = ch.user_id) 
	left join '.prefix().'permissions as perm on (perm.user_id = id_tab.'.id_index.')
	left join '.prefix().'relationships as rel on (ch.char_id = rel.char_id)
	where ch.status = "active" '.$where.' order by ch.char_name';
	queryInventory($str);
}
function characterMenu(){
	global $userlevel;
	$where = getRestVar('onlyuser')? 'and ch.user_id = '.INVENTORY_USER : '';
	$where = getRestVar('notuser')? 'and ch.user_id != '.INVENTORY_USER : $where;
	$where = getRestVar('char_id')? 'and ch.char_id ='.getRestVar('char_id') : $where;
	$str = 'select ch.*,id_tab.'.id_index.' as id,id_tab.'.id_user.' as user from '. prefix().'characters as ch left join '.DB_NAME.'.'.id_table.' as id_tab on (id_tab.id = ch.user_id) where ch.status = "active" '.$where.' order by ch.char_name';
	queryInventory($str);
}
function setUserPermision(){
	$str = 'INSERT INTO '. prefix().'permissions (user_id, permission_level) VALUES('.getRestVar('user_id').',"'.getRestVar('level').'") ON DUPLICATE KEY UPDATE permission_level="'.getRestVar('level').'"';
	queryNoResult($str);	
}
function archive_character(){
	$and = getRestVar('char_id')? 'and char_id = '.getRestVar('char_id') : 'and user_id = '.getRestVar('user_id');
	$str = 'update '. prefix().'characters set status = "archive" where char_name = "'.getRestVar('char_name').'" '.$and;
	queryNoResult($str);
}
function archive_item(){
	$str = 'update '.prefix().'items set status = "archive" where item_id = "'.getRestVar('item_id').'"';
	queryNoResult($str);
	//echo 'Break this';
}
function add_character(){
	$str = 'insert into '.prefix().'characters (user_id,char_name,inventory,build,build_spent,char_class,char_order,high,mid,low,lives,org,orizon,race) values("'.getRestVar('assign_user_id').'","'.getRestVar('char_name').'",\''.getRestVar('inventory').'\',"'.getRestVar('build').'","'.getRestVar('build_spent').'","'.getRestVar('char_class').'","'.getRestVar('char_order').'","'.getRestVar('high').'","'.getRestVar('mid').'","'.getRestVar('low').'","'.getRestVar('lives').'","'.getRestVar('org').'","'.getRestVar('orizon').'","'.getRestVar('race').'"
	);';
	$str .= 'SET @last_char_id = LAST_INSERT_ID();';
	$relz  = getRestVar('relationships');
	$trans = getRestVar('transactions');
	if($relz){
		$relz = stripslashes($relz);
		$la = json_decode($relz,true);
		foreach($la as $l){
			$str .= 'insert into '.prefix().'relationships(char_id,skill_id,rel_active,rel_info,rel_key)values(@last_char_id,'.$l['skill_id'].',"'.$l['active'].'","'.$l['info'].'","'.$l['key'].'");';	
		}
	}
	if($trans){
		$trans = stripslashes($trans);
		$la = json_decode($trans,true);
		foreach($la as $l){
			$preinfo = !is_array($l['pre_reciever'])? $l['pre_reciever'] : json_encode($l['pre_reciever']);
			$postinfo = !is_array($l['trans_info'])? $l['trans_info'] : json_encode($l['trans_info']);
			$str .= 'insert into '.prefix().'transactions (pre_reciever,reciever,sender,trans_action,trans_info,trans_status,trans_type,message) values( \''.$preinfo.'\',@last_char_id, "'.$l['sender'].'", "'.$l['trans_action'].'",\''.$postinfo.'\', "'.$l['trans_status'].'", "'.$l['trans_type'].'","Staff has added items to your inventory.");';	
		}
	}
	//echo $str;
	queryNoResult($str);
}
function update_character(){
	$inv = getRestVar('inventory');
	$invstr = $inv? ", inventory ='".$inv."'" : '';
	$str = 
	'update '.prefix().'characters set 
	user_id="'.getRestVar('assign_user_id').'",
	status2="'.getRestVar('status2').'",
	char_name ="'.getRestVar('char_name').'" '.$invstr.', 
	build="'.getRestVar('build').'",
	build_spent="'.getRestVar('build_spent').'",
	char_class="'.getRestVar('char_class').'",
	char_order="'.getRestVar('char_order').'",
	high="'.getRestVar('high').'",
	mid="'.getRestVar('mid').'",
	low="'.getRestVar('low').'",
	lives="'.getRestVar('lives').'",
	org="'.getRestVar('org').'",
	orizon="'.getRestVar('orizon').'",
	race="'.getRestVar('race').'",
	pending = ""
	where char_id ='.getRestVar('char_id').';';
	
	if(getRestVar('pre_sender')){
		$str .='
		insert into '.prefix().'transactions (trans_type,trans_action,trans_info,pre_sender,pre_reciever,reciever,sender,trans_status,message)values
		("Inventory","assign",\''.getRestVar('trans_info').'\',\''.getRestVar('pre_sender').'\',\''.getRestVar('pre_reciever').'\',"'.getRestVar('reciever').'",0,"Accepted","'.getRestVar('message').'");';
	}
	$relz = getRestVar('relationships');
	$trans = getRestVar('transactions');
	if($relz){
		$relz = stripslashes($relz);
		$la = json_decode($relz,true);
		foreach($la as $l){
			if(array_key_exists('rel_id',$l)){
				$str .= 'update '.prefix().'relationships set rel_active="'.$l['active'].'",rel_info="'.$l['info'].'" where rel_id ='.$l['rel_id'].';';	
			}else{
				$str .= 'insert into '.prefix().'relationships(char_id,skill_id,rel_active,rel_info,rel_key,unique_info)values('.getRestVar('char_id').','.$l['skill_id'].',"'.$l['active'].'","'.$l['info'].'","'.$l['key'].'","'.$l['unique_info'].'") ON DUPLICATE KEY UPDATE rel_active="'.$l['active'].'",rel_info="'.addslashes($l['info']).'";';	
			}
		}
	}
	if($trans){
		//echo $trans.'<---<br/>';
		//$trans = stripslashes($trans);
		$la = json_decode($trans,true);
		//var_dump($la);
		foreach($la as $l){
			$preinfo = !is_array($l['pre_reciever'])? $l['pre_reciever'] : json_encode($l['pre_reciever']);
			$postinfo = !is_array($l['trans_info'])? $l['trans_info'] : json_encode($l['trans_info']);
			$str .='
			insert into '.prefix().'transactions (trans_type,trans_action,trans_info,pre_sender,pre_reciever,reciever,sender,trans_status,message)values
			("Inventory","assign",\''.$postinfo.'\',\''.$l['pre_sender'].'\',\''.$preinfo.'\',"'.$l['reciever'].'",0,"Accepted","'.$l['message'].'");';	
		}
	}
	//echo ($str);
	queryNoResult($str);
}
function currentBuild(){
	$str = 'select user_build from '.prefix().'permissions where user_id ='.INVENTORY_USER;
	queryInventory($str);	
}
function update_character_profile(){
	//Don't update name, don't update invenory
	//build,build_spent,char_class,char_id,char_name,high,low,mid
	//optional: order,race,org,orizon
	$orizon= getRestVar('orizon')? 'orizon="'.getRestVar('orizon').'",' : '';
	$order	= getRestVar('char_order')? 'char_order="'.getRestVar('char_order').'",' : '';
	$org	= getRestVar('org')? 'org="'.getRestVar('org').'",' : '';
	$race	= getRestVar('race')? 'race="'.getRestVar('race').'",' : '';
	$changes= getRestVar('setPending')? 'pending="'.getRestVar('setPending').'",': '';
	
	$str = 
	'update '.prefix().'characters set 
	build="'.getRestVar('build').'",
	build_spent="'.getRestVar('build_spent').'",
	char_class="'.getRestVar('char_class').'",
	high="'.getRestVar('high').'",
	low="'.getRestVar('low').'",'.$orizon.$order.$org.$race.$changes.'
	mid="'.getRestVar('mid').'"
	where char_id ='.getRestVar('char_id').';';
	
	if(getRestVar('pre_sender')){
		$str .='
		insert into '.prefix().'transactions (trans_type,trans_action,trans_info,pre_sender,pre_reciever,reciever,sender,trans_status,message)values
		("Inventory","assign",\''.getRestVar('trans_info').'\',\''.getRestVar('pre_sender').'\',\''.getRestVar('pre_reciever').'\',"'.getRestVar('reciever').'",0,"Accepted","'.getRestVar('message').'");';
	}
	$relz = getRestVar('relationships');
	$trans = getRestVar('transactions');
	if($relz){
		$relz = stripslashes($relz);
		$la = json_decode($relz,true);
		foreach($la as $l){
			if(array_key_exists('rel_id',$l)){
				$str .= 'update '.prefix().'relationships set rel_active="'.$l['active'].'",rel_info="'.$l['info'].'" where rel_id ='.$l['rel_id'].';';	
			}else{
				$str .= 'insert into '.prefix().'relationships(char_id,skill_id,rel_active,rel_info,rel_key,unique_info)values('.getRestVar('char_id').','.$l['skill_id'].',"'.$l['active'].'","'.$l['info'].'","'.$l['key'].'","'.$l['unique_info'].'") ON DUPLICATE KEY UPDATE rel_active="'.$l['active'].'",rel_info="'.$l['info'].'";';	
			}
		}
	}
	//echo ($str);
	queryNoResult($str);
}
//restapi for ajax calls
function users(){
	$where = getRestVar('in')? 'and id in('.getRestVar('in').')' : '';
	$str = 'select id_tab.'.id_index.' as id,prof.value as name 
	from '.DB_NAME.'.'.id_table.' as id_tab 
	left join '.DB_NAME.'.wp_bp_xprofile_data as prof on (prof.user_id=id_tab.id and prof.field_id=5) 
	where user_status = 0 '.$where.'order by name;';
	queryInventory($str);
}
function setUserBuild(){
	$str = '';
	if(getRestVar('user_id')){
		$str = 'insert into '.prefix().'permissions (user_id,user_build) values('.getRestVar('user_id').','.getRestVar('user_build').') 
		ON DUPLICATE KEY UPDATE user_build='.getRestVar('user_build').', permission_level="'.getRestVar('permission_level').'", dawn_points='.getRestVar('dawn_points').';';
	}
	return $str;
}
function updateBuild(){
	$str = setUserBuild();
	queryNoResult($str);
}
function userlist(){
	$where = getRestVar('in')? ' and id_tab.id in('.getRestVar('in').')' : '';
	$str = 
/*'select perm.*, id_tab.'.id_index.' as id, id_tab.'.id_user.' as name, GROUP_CONCAT(carac.char_name) as characters 
from '.DB_NAME.'.'.id_table.' as id_tab 
left join '. prefix().'permissions as perm on (id = perm.user_id)
left join '.prefix().'characters as carac on (id = carac.user_id and carac.status = "active") 
where user_status = 0 GROUP BY id order by name;';*/
'select perm.*, id_tab.'.id_index.' as id, prof.value as name,perm.user_build, GROUP_CONCAT(carac.char_name) as characters 
from '.DB_NAME.'.'.id_table.' as id_tab 
left join '. prefix().'permissions as perm on (id_tab.id = perm.user_id)
left join '.prefix().'characters as carac on (id_tab.id = carac.user_id and carac.status = "active")
left join '.DB_NAME.'.wp_bp_xprofile_data as prof on (prof.user_id=id_tab.id and prof.field_id=5) 
where user_status = 0'.$where.' GROUP BY id order by name;';

	queryInventory($str);
}
function userandPermissions(){
	$str = 
	'select ch.*,id_tab.'.id_index.' as id,id_tab.'.id_user.' as user,race.rc_name,prof.value as real_name 
	from '.prefix().'characters as ch 
	left join '.DB_NAME.'.'.id_table.' as id_tab on (id_tab.id = ch.user_id)
	left join '.prefix().'races as race on (race.rc_id = ch.race)
	left join '.DB_NAME.'.wp_bp_xprofile_data as prof on (prof.user_id=ch.user_id and prof.field_id=5)
	where ch.status = "active" and ch.user_id = '.INVENTORY_USER.' order by ch.char_name';
	$data = queryReturn($str);
	//echo $str.'<br/>';
	if($data && $data[0]){
		return $data;
	}
	return false;
}
function staffPermission(){
	if(INV_ADMIN == INVENTORY_USER){
		return 'Admin';
	}else{
		$str = 'select * from '. prefix().'permissions where user_id = '.INVENTORY_USER;
		$data = queryReturn($str);
		if($data && $data[0]&& $data[0]){
			$level = $data[0]->permission_level;
			if(strtolower($level)!='user'){
				return $data[0]->permission_level;
			}
		}
		return false;
	}
}
function menuUsers($data,$staff){
	$active = ' active';
	$validChars = 0;
	if($data){
		foreach($data as $key => $val){
			if(!$val->status2 || $val->status2=='a')$validChars++; 
			echo '<span id="'.$val->char_id.'" data-action="viewTrades" class="character'.$active.'" data-sub="user"><h3>'.$val->char_name.'</h3>'.$val->char_class.', '.$val->rc_name.'</span>';
			$active ='';
		}
	}
	if($staff == 'Admin' || $staff == 'Moderator'){
		echo '<span id="0" data-action="tradeItems" class="character staffer '.$active.'" data-sub="staffer"><h3>Staff</h3>'.$staff.'</span>';
	}
	if($validChars<2){
		echo '<span id="create-character" data-action="userCreateCharacter" class="character nuevo '.$active.'"><h3>Create</h3>Character</span>';
	}
}


function getRestVar($var){
	//$method = isset($_POST['method'])? $_POST['method'] : '';
	//$method = $method? $method : '';
	$p = isset($_POST[ $var ])?	$_POST[ $var ]	: false;
	$g = isset($_GET[ $var ])?	$_GET[ $var ]	: false;
	$prop = $p? $p : $g;
	return $prop;
}
function formatStr($str){
	$str = str_replace(prefix().'$DB_NAME',DB_NAME,$str);
	$str = str_replace('$DB_NAME',DB_NAME,$str);
	$str = str_replace('$current_user_id',INVENTORY_USER,$str);
	$str = str_replace('$id_index',id_index,$str);
	return $str;	
}
function queryNoResult($str){
	global $userlevel;
	$str = formatStr($str);
	try{
		$mysqli = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, INV_DB);
	}catch(Exception $e){
		echo  '{"error":"'.$e.'"}';
		exit();
	}
	if (mysqli_connect_errno()) {
		echo '{"error":"connnection error"}';
		exit();
	}
	$output = array();
	$res = $mysqli->multi_query($str);
	if(!$res){
		$arr = array(
			"error"=> "Query failed: (" . $mysqli->errno . ") " . $mysqli->error,
			"query"=> $str,
			"level"=> $userlevel,
			"method"=> getRestVar('method')
		);
		echo json_encode($arr);
		die;
	}else {
		$arr = array(
			"data"=>"success",
			"query"=>$str,
			"method"=> getRestVar('method'),			
			"rows"=> mysqli_affected_rows($mysqli)
		);
		echo json_encode($arr);
		//$res->close();
		exit;
	}
}
function queryInventory($str){
	global $userlevel;
	$str = formatStr($str);
	try{
		$mysqli = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, INV_DB);
	}catch(Exception $e){
		echo  '{"error":"'.$e.'"}';
		exit();
	}
	if (mysqli_connect_errno()) {
		return '{"error":"connnection error"}';
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
		echo json_encode($arr);
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
				"data"=> $output,
				"method"=> getRestVar('method')
			);
			echo json_encode($arr);
		}else{
			if($userlevel){
				echo '{"data":"","current_user_level":"'.$userlevel.'"}';
			}else{
				echo '{"data":""}';	
			}
		}
		$res->close();
		exit();
	}
}
function queryReturn($str){
	global $userlevel;
	$str = formatStr($str);
	try{
		$mysqli = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, INV_DB);
	}catch(Exception $e){
		return array(
			"error"=> $e,
			"data"=> ""
		);
	}
	if (mysqli_connect_errno()) {
		return array(
			"error"=> "connnection error",
			"data"=> ""
		);
	}
	$output = array();
	$res = $mysqli->query($str);
	if(!$res){
		$arr = array(
			"error"=> "Query failed: (" . $mysqli->errno . ") " . $mysqli->error,
			"query"=> $str,
			"level"=> $userlevel,
			"method"=> getRestVar('method')
		);
		return $arr;
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
				return  array(
					"data"=> "",
					"current_user_level"=>$userlevel
				);
			}else{
				return array(
					"data"=> ""
				);
			}
		}
		$res->close();
	}
}
function buildDatabase(){
	$buildScript = 
"
-- MySQL Script generated by MySQL Workbench
-- 01/03/15 18:26:51
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Table `prefix_characters`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `prefix_characters` (
  `char_id` INT NOT NULL AUTO_INCREMENT,
  `char_name` VARCHAR(150) NOT NULL,
  `user_id` INT NOT NULL,
  `status` VARCHAR(45) NULL DEFAULT 'active',
  `status2` VARCHAR(10) NULL,
  `inventory` VARCHAR(5000) NULL DEFAULT '[]',
  `escro` VARCHAR(5000) NULL DEFAULT '[]',
  `char_class` VARCHAR(45) NULL,
  `race` VARCHAR(45) NULL,
  `build` INT NULL DEFAULT 50,
  `build_spent` INT NULL DEFAULT 0,
  `org` VARCHAR(100) NULL,
  `char_order` VARCHAR(100) NULL,
  `orizon` VARCHAR(100) NULL,
  `lives` INT NULL DEFAULT 3,
  `high` INT NULL DEFAULT 3,
  `mid` INT NULL,
  `low` INT NULL,
  PRIMARY KEY (`char_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `prefix_permissions`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `prefix_permissions` (
  `permission_id` INT NOT NULL AUTO_INCREMENT,
  `user_id` VARCHAR(45) NOT NULL,
  `permission_level` VARCHAR(45) NULL,
  `user_build` INT NULL,
  PRIMARY KEY (`permission_id`),
  UNIQUE INDEX `user_id_UNIQUE` (`user_id` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `prefix_transactions`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `prefix_transactions` (
  `trans_id` INT NOT NULL AUTO_INCREMENT,
  `trans_type` VARCHAR(45) NOT NULL,
  `trans_action` VARCHAR(45) NOT NULL,
  `trans_info` VARCHAR(1000) NULL,
  `pre_sender` VARCHAR(5000) NULL,
  `pre_reciever` VARCHAR(5000) NOT NULL,
  `reciever` INT NOT NULL,
  `sender` INT NOT NULL,
  `trans_status` VARCHAR(45) NOT NULL DEFAULT 'Offered',
  `comments` VARCHAR(150) NULL,
  `message` VARCHAR(150) NULL,
  `date_initiated` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `reference_id` INT NULL,
  PRIMARY KEY (`trans_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `prefix_items`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `prefix_items` (
  `item_id` INT NOT NULL AUTO_INCREMENT,
  `item_type` VARCHAR(45) NULL,
  `item_value` INT NULL,
  `item_description` VARCHAR(150) NULL,
  `item_name` VARCHAR(150) NOT NULL,
  `status` VARCHAR(45) NULL,
  PRIMARY KEY (`item_id`),
  UNIQUE INDEX `ietm_name_UNIQUE` (`item_name` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `prefix_lost_arts`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `prefix_lost_arts` (
  `la_id` INT NOT NULL AUTO_INCREMENT,
  `la_name` VARCHAR(45) NOT NULL,
  `la_type` VARCHAR(55) NULL,
  `la_category` VARCHAR(45) NULL,
  `la_tree` VARCHAR(45) NULL,
  `branch` VARCHAR(45) NULL,
  `tier` INT NULL DEFAULT 1,
  `la_prereq` VARCHAR(150) NULL,
  `teach` VARCHAR(1) NULL DEFAULT 'N',
  `locked` VARCHAR(1) NULL DEFAULT 'N',
  `la_description` VARCHAR(550) NULL,
  `la_notes` VARCHAR(150) NULL,
  PRIMARY KEY (`la_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `prefix_relationships`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `prefix_relationships` (
  `rel_id` INT NOT NULL AUTO_INCREMENT,
  `char_id` INT NULL,
  `skill_id` INT NULL,
  `rel_active` VARCHAR(1) NULL DEFAULT 'y',
  `rel_info` VARCHAR(45) NULL,
  `rel_key` VARCHAR(45) NULL,
  PRIMARY KEY (`rel_id`),
  UNIQUE INDEX `secondary` (`char_id` ASC, `skill_id` ASC, `rel_key` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `prefix_equipment`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `prefix_equipment` (
  `eq_id` INT NOT NULL AUTO_INCREMENT,
  `eq_name` VARCHAR(150) NULL,
  `eq_type` VARCHAR(45) NULL,
  `quality` VARCHAR(20) NULL,
  `eq_points` INT NULL,
  `eq_slots` VARCHAR(150) NULL,
  `eq_props` VARCHAR(150) NULL,
  `eq_materials` VARCHAR(150) NULL,
  `eq_estate` VARCHAR(45) NULL,
  `eq_cost` INT NULL,
  `eq_dimension` VARCHAR(45) NULL,
  `eq_tags` VARCHAR(45) NULL,
  `eq_display_props` VARCHAR(45) NULL,
  `eq_low_slot` INT NULL,
  `eq_mid_slot` INT NULL,
  `eq_high_slot` INT NULL,
  `rune_low_slot` INT NULL,
  `rune_mid_slot` INT NULL,
  `rune_high_slot` INT NULL,
  PRIMARY KEY (`eq_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `prefix_skills`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `prefix_skills` (
  `sk_id` INT NOT NULL AUTO_INCREMENT,
  `sk_name` VARCHAR(45) NULL,
  `sk_cost` INT NULL,
  `sk_ability` VARCHAR(550) NULL,
  `sk_prereq` VARCHAR(150) NULL,
  `sk_class` VARCHAR(45) NULL,
  `sk_prereq_eval` VARCHAR(200) NULL,
  PRIMARY KEY (`sk_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `prefix_races`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `prefix_races` (
  `rc_id` INT NOT NULL AUTO_INCREMENT,
  `rc_name` VARCHAR(45) NULL,
  `rc_description` VARCHAR(550) NULL,
  `rc_benefit` VARCHAR(550) NULL,
  `rc_disadvantage` VARCHAR(500) NULL,
  `rc_overview` VARCHAR(550) NULL,
  `armor` INT NULL,
  `health` INT NULL,
  `sys_shock` VARCHAR(45) NULL,
  `rc_slot` INT NULL DEFAULT 60,
  `rc_strength` VARCHAR(45) NULL,
  PRIMARY KEY (`rc_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `prefix_orizons`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `prefix_orizons` (
  `or_id` INT NOT NULL AUTO_INCREMENT,
  `or_culture` VARCHAR(45) NULL,
  `or_name` VARCHAR(45) NULL,
  `pantheon` VARCHAR(45) NULL,
  `or_org` VARCHAR(45) NULL,
  `or_order` VARCHAR(45) NULL,
  PRIMARY KEY (`or_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `prefix_background`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `prefix_background` (
  `bk_id` INT NOT NULL AUTO_INCREMENT,
  `bk_name` VARCHAR(45) NULL,
  `bk_description` VARCHAR(200) NULL,
  `abilities` VARCHAR(155) NULL,
  PRIMARY KEY (`bk_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `prefix_groups`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `prefix_groups` (
  `grp_id` INT NOT NULL AUTO_INCREMENT,
  `grp_name` VARCHAR(150) NULL,
  `grp_type` VARCHAR(45) NULL,
  PRIMARY KEY (`grp_id`))
ENGINE = InnoDB;


DELIMITER $$
$$


DELIMITER ;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

";
	$prefix = defined('INV_PREFIX')? INV_PREFIX : '_';
	
	$buildScript = str_replace('prefix_',$prefix,$buildScript);
	queryNoResult($buildScript);
}
?>