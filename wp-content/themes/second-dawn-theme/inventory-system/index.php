<?php 
include('creds.php');
include('globals.php');
include('inv-functions.php');

?><!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<link href="http://maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css" rel="stylesheet">
<link rel="stylesheet" type="text/css" href="js/jquery-easyui-1.4.1/themes/default/easyui.css">
<link rel="stylesheet" type="text/css" href="../themes/second-dawn-theme/css/theme.css">
<link rel='stylesheet' id='open-sans-css'  href='//fonts.googleapis.com/css?family=Open+Sans%3A300italic%2C400italic%2C600italic%2C300%2C400%2C600&#038;subset=latin%2Clatin-ext&#038;ver=3.9.2' type='text/css' media='all' />
<!--<link rel="stylesheet" type="text/css" href="css/inventory.css">-->
<link rel="stylesheet" type="text/css" href="css/inv.css">
<script src="js/jquery.min.js"></script>
<script src="js/underscore.js"></script>
<script src="js/jquery-easyui-1.4.1/jquery.easyui.min.js"></script>
<script src="js/handlebars.min.js"></script>
<script src="js/jquery.keyfilter.js"></script>
<script src="js/main.js"></script>
</head>
<body>
<div id="systemkeys" style="display:none"><?php echo '{"$id_table":"'.$id_table.'","$id_index": "'.$id_index.'", "$id_user":"'.$id_user.'"}';?></div>
<div class="inventory-ui">
	<div class="inv-menu">
    	<div class="top-line inv-panel"><div class="inner"><?php menuUsers();?></div></div>
        <div class="staffer sub-line inv-panel">
            <span class="view-trades active" onclick="javascript:viewTrades()">View Trades</span><!--
         --><span class="make-trade"  onclick="javascript:makeTrade()">Make Trade</span><!--
         --><span class="inventory" onclick="javascript:showInventory()">Inventory</span><!--
         --><span class="manual_audit" onclick="javascript:manual_audit()">Audit</span>
        </div>
        <div class="user sub-line inv-panel" style="display:none">
            <span class="items active" onclick="javascript:tradeItems()">Trades Items</span><!--
         --><span class="make-trade"  onclick="javascript:getUserList()">Users</span><!--
         --><span class="characters" onclick="javascript:getCharacters()">Characters</span><!--
         --><span class="logs">Logs</span><!--
         --><span class="build"  onclick="javascript:buildDB()">Build</span>
        </div>
    </div>
    <div id="user-list"></div>
    <div id="standalone-form"></div>
    <div id="devpanel" style="display:none;"></div>
    <div id="footer-dialog"><div class="close">X</div><div class="content">Footer Dialog</div><span class="prompts"><div class="answer answer-yes">Yes</div><div class="answer answer-no">No</div></span><div class="details"><div class="view answer">View Details</div><div class="detail-content"></div></div></div>
</div>
</body>
</html>