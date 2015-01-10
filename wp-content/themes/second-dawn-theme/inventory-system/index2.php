<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<link href="http://maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css" rel="stylesheet">
<link rel="stylesheet" type="text/css" href="js/jquery-easyui-1.4.1/themes/default/easyui.css">
<link rel="stylesheet" type="text/css" href="../themes/second-dawn-theme/css/theme.css">
<!--<link rel="stylesheet" type="text/css" href="css/inventory.css">-->
<link rel="stylesheet" type="text/css" href="css/inv.css">
<script src="js/jquery.min.js"></script>
<script src="js/underscore-min.js"></script>
<script src="js/jquery-easyui-1.4.1/jquery.easyui.min.js"></script>
<script src="js/handlebars.min.js"></script>
<script src="js/jquery.keyfilter.js"></script>
<script src="js/main.js"></script>
</head>
<body>
<div id="systemkeys" style="display:none"><?php echo '{"$id_table":"'.$id_table.'","$id_index": "'.$id_index.'", "$id_user":"'.$id_user.'"}';?></div>
<div class="inventory-menu">
	<div class="easyui-panel" style="padding:5px;">
        <a href="#" class="easyui-menubutton" data-options="menu:'#mm1',iconCls:'icon-edit'">Admin</a>
        <a href="#" class="easyui-menubutton" data-options="menu:'#mm2',iconCls:'icon-help'">Trade</a>
    </div>
    <div id="mm1" style="width:150px;">
        <div data-options="iconCls:'icon-undo'" onclick="javascript:getUserList()">View Users</div>
        <div data-options="iconCls:'icon-undo'" onclick="javascript:getCharacters()">View Characters</div>
        <div data-options="iconCls:'icon-redo'" onclick="javascript:buildDB()">Build</div>
    </div>
    <div id="mm2" style="width:100px;">
        <div onclick="javascript:makeTrade()">View Trades</div>
        <div>View Logs</div>
        <div onclick="javascript:tradeItems()">Items</div>
    </div>
	
    
    <!-- Trade page: 
    	- New Trade, 
        - Pending Trades: list of trades (accept, reject, Revoke options)
        	- Show all trades with above options also the innitiator, and recievor
    -->
</div>

<div class="inventory-ui">
	<div id="user-list"></div>
    <div id="standalone-form"></div>
</div>

<div id="footer-dialog"><div class="close">X</div><div class="content">Footer Dialog</div><div class="answer-yes">Yes</div><div class="answer-no">No</div><div class="details"><div class="view">---View Details---</div><div class="detail-content"></div></div></div>
</body>
</html>