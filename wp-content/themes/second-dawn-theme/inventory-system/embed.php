<?php
include('creds.php');
include('globals.php');
include('inv-functions.php');

$chars = userandPermissions();
$staff = staffPermission();
?>
<link href="http://maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css" rel="stylesheet">
<link rel='stylesheet' id='open-sans-css'  href='//fonts.googleapis.com/css?family=Open+Sans%3A300italic%2C400italic%2C600italic%2C300%2C400%2C600&#038;subset=latin%2Clatin-ext&#038;ver=3.9.2' type='text/css' media='all' />
<!--<link rel="stylesheet" type="text/css" href="css/inventory.css">-->
<link rel="stylesheet" type="text/css" href="<?php echo get_stylesheet_directory_uri();?>/inventory-system/css/inv.css">
<link rel="stylesheet" type="text/css" href="<?php echo get_stylesheet_directory_uri();?>/inventory-system/css/char-sheet-src.css">
<!--
<script src="https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.7.0/underscore-min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/2.0.0/handlebars.min.js"></script>
-->
<script src="<?php echo get_stylesheet_directory_uri();?>/inventory-system/js/underscore.js"></script>
<script src="<?php echo get_stylesheet_directory_uri();?>/inventory-system/js/handlebars.min.js"></script>
<script src="<?php echo get_stylesheet_directory_uri();?>/inventory-system/js/FileSaver.min.js"></script>
<script src="<?php echo get_stylesheet_directory_uri();?>/inventory-system/js/inv-templates.js"></script>
<script src="<?php echo get_stylesheet_directory_uri();?>/inventory-system/js/main.js"></script>
<script src="<?php echo get_stylesheet_directory_uri();?>/inventory-system/js/character-template.js"></script>
<script>var cache_level = <?php echo INVENTORY_USER;?>;var user_name ="<?php echo $chars[0]->real_name;?>"; </script>

<div id="systemkeys" style="display:none"><?php echo '{"$id_table":"'.$id_table.'","$id_index": "'.$id_index.'", "$id_user":"'.$id_user.'"}';?></div>
<div class="inventory-ui">
	<?php if($chars || $staff):?>
    <div class="inv-menu">
    	<div class="top-line inv-panel"><div class="inner"><?php menuUsers($chars,$staff);?></div></div>
        <div class="user sub-line inv-panel" style="display:none">
            <span data-action="viewTrades" class="view-trades active">View Trades</span><!--
         --><span data-action="viewProfile" class="view-profile">Profile</span><!--
         --><span data-action="printCharacter" class="print-character">Character Card</span><!--
         --><span data-action="makeTrade" class="make-trade">Make Trade</span><!--
         --><span data-action="showInventory" class="inventory">Inventory</span><!--
         --><span class="manual_audit" onclick="javascript:manual_audit()">Audit</span>
        </div>
        <div class="staffer sub-line inv-panel" style="display:none">
            <span data-action="tradeItems" class="items active">Trades Items</span><!--
         --><span data-action="getUserList" class="make-trade">Users</span><!--
         --><span data-action="getCharacters" class="characters">Characters</span><!--
         --><span data-action="characterCardsUI" class="characters">Print Character Cards</span><!--
         --><span data-action="lostArts" class="lost-arts">Lost Arts</span><!--
         --><span class="logs">Logs</span><!--
         --><span class="build"  onclick="javascript:buildDB()">Build</span>
        </div>
    </div>
    <?php else: ?>
    <div class="inv-menu"><div class="top-line inv-panel"><div class="inner">
    	<span id="create-character" data-action="userCreateCharacter" class="character nuevo '.$active.'"><h3>Create</h3>Character</span>
    </div></div>
    <div id="no-characters" class="no-items"><p>You have no characters assgined.</p>You can create one Now</div>
    <?php endif;?>	
    <div id="search-wrap">
    	<div id="search-section"></div>
    </div>
    <div id="user-list"></div>
    <div id="standalone-form"></div>
    <div id="devpanel" style="display:none;"></div>
    <div id="footer-dialog"><div class="close">X</div><div class="content">Footer Dialog</div><span class="prompts"><div class="answer answer-yes">Yes</div><div class="answer answer-no">No</div></span><div class="details"><div class="view answer">View Details</div><div class="detail-content"></div></div></div>
</div>