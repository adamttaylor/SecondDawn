$ = jQuery;
var inprocess = false;
var tmpstr = {};
var tmp = {};
var cache = {};
var current_character = false;
cache.items = [];
cache.lostarts=[];
tmpstr.accessDrop = 
'<select class="access-dropdown">\
	{{#each .}}<option{{#if selected}} selected="selected"{{/if}}>{{text}}</option>{{/each}}\
</select>';
tmpstr.characterlist = 
'<span class="user-character">\
	<span class="close"></span>\
	<span class="txt">{{name}}</span>\
</span>';

tmpstr.listUser = 
'<div id="user-{{id}}" class="list-item user">\
	<div class="outer">\
		<div class="inner">\
			<div class="input-line">\
				{{#unless limited}}<div class="show-more edit-item circle-button new"></div>{{/unless}}\
				<div class="user-name">{{name}}</div>\
				<div class="access">\
					<div class="input-wrap">\
						<div class="input-inner">\
							{{>access select}}\
						</div>\
					</div>\
				</div>\
			</div>\
			<div class="description">{{{char}}}</div>\
		</div>\
		<div id="form-box">{{>newcharacter}}</div>\
	</div>\
</div>';

tmpstr.newCharacterUI = 
'{{#unless char_name}}<div class="headline inv-panel"><h3>Create New Character</h3></div>{{/unless}}\
<div class="virtual-form new-character-form inv-panel" data-action="{{#if save_action}}{{save_action}}{{else}}Create{{/if}}">\
	<input type="hidden" name="trans_type" value="inventory"/>\
	<input type="hidden" name="trans_action" value="assign"/>\
	<input type="hidden" name="trans_info" value=""/>\
	<input type="hidden" name="pre_sender" value="{{inventory}}"/>\
	<input type="hidden" name="pre_reciever" value=""/>\
	<input type="hidden" name="reciever" value="{{char_id}}"/>\
	<input type="hidden" name="sender" value="$current_user_id"/>\
	<input type="hidden" name="trans_status" value="Accepted"/>\
	{{#ifCond save_action create}}\
	<div class="input-line small"><label>Character Name</label><div class="input-wrap"><div class="input-inner"><input type="text" class="required" name="char_name" value="{{char_name}}"/></div></div></div>\
	{{else}}\
		<input type="hidden" name="char_id" value="{{char_id}}"/>\
		<div class="input-line small"><label>Edit: </label><label>{{char_name}}</label></div>\
	{{/ifCond}}\
	{{>lostArtBox}}\
	{{>giftBox}}\
	<div class="input-line">\
		<div id="create-character" class="submit-button {{#if save_action}}{{save_action}}{{else}}Create{{/if}}">{{#if save_action}}{{save_action}}{{else}}Create{{/if}}</div>\
	</div>\
</div>';


tmpstr.characterListUI =
'<div id="char-{{char_id}}" class="list-item character">\
	<div class="outer">\
		<div class="inner">\
			<div class="input-line">\
				{{#unless limited}}<div class="show-more edit-item circle-button edit"></div>{{/unless}}\
				<div class="user-name">{{char_name}}</div>\
				<div id="{{id}}" class="user_name">{{user}}</div>\
			</div>\
		</div>\
		<div id="form-box">{{>newcharacter}}</div>\
	</div>\
</div>';

tmpstr.giftItem = 
'{{#if static}}\
	<div class="bank-item gift-item list-item">\
		<div class="inner">\
			<input type="hidden" data-name="item_id" value="{{item_id}}"/>\
			<div class="remove-gift circle-button close"></div>\
			<div class="input-line qty-num">\
				<div class="input-wrap">\
					<div class="input-inner">\
						<input type="number" data-name="qty"/>\
					</div>\
				</div>\
			</div>\
			<div class="input-line">\
				<div class="input-wrap">\
					<div class="input-inner">\
						<label>{{item_name}}</label>\
					</div>\
				</div>\
			</div>\
		</div>\
	</div>\
{{else}}\
	<div class="bank-item gift-item list-item">\
		<div class="inner">\
			<div class="remove-gift circle-button close"></div>\
			<div class="input-line qty-num">\
				<div class="input-wrap">\
					<div class="input-inner">\
						<input type="number" value="1" data-name="qty"/>\
					</div>\
				</div>\
			</div>\
			<div class="input-line">\
				<div class="input-wrap">\
					<div class="input-inner">\
						<select data-name="item_id">\
							{{#each item_list}}\
								<option data-max="{{qty}}" value="{{item_id}}">{{item_name}}</option>\
							{{/each}}\
						</select>\
					</div>\
				</div>\
			</div>\
		</div>\
	</div>\
{{/if}}';

tmpstr.giftBox =
'<div class="bankbox giftbox{{#if method}} {{method}}{{else}} a{{/if}}" data-value="{{inventory}}" {{#if bank}}data-bank="{{bank}}" {{/if}}data-method="{{#if method}}{{method}}{{/if}}" name="{{#if inv_name}}{{inv_name}}{{else}}inventory{{/if}}">\
	<p class="title{{#if method}} {{method}}{{else}} a{{/if}}">{{#if label}}{{label}}{{else}}Inventory{{/if}}<span class="add-gift inline-button">Add Line Item</span></p>\
	<div class="bank-hold gift-hold"></div>\
</div>';

tmpstr.lostArtItem = 
'{{#if static}}\
	<div class="bank-item lost-art-item static list-item">\
		<div class="inner">\
			<input type="hidden" data-name="item_id" value="{{la_id}}"/>\
			<input type="hidden" data-name="active" value="{{rel_active}}"/>\
			<div class="remove-la circle-button close"></div>\
			<div class="input-line enable-la">\
				<div class="input-wrap">\
					<div class="input-inner">\
						<div><input type="checkbox" value="enabled" {{#ifCond rel_info "enabled"}} checked="checked"{{/ifCond}}/><label>Enabled</label></div>\
					</div>\
				</div>\
			</div>\
			<div class="input-line">\
				<div class="input-wrap">\
					<div class="input-inner">\
						<input id="la_id" type="hidden" value="{{skill_id}}"/>\
						<label>{{la_name}}</label>\
					</div>\
				</div>\
			</div>\
		</div>\
	</div>\
{{else}}\
	<div class="bank-item lost-art-item list-item">\
	<input type="hidden" data-name="active" value="y"/>\
		<div class="inner">\
			<div class="remove-la circle-button close"></div>\
			<div class="input-line enable-la">\
				<div class="input-wrap">\
					<div class="input-inner">\
						<div><input type="checkbox" value="enabled" {{#unless disable}}checked="checked"{{/unless}}/><label>Enabled</label></div>\
					</div>\
				</div>\
			</div>\
			<div class="input-line">\
				<div class="input-wrap">\
					<div class="input-inner">\
						<input id="la_id" data-name="la_id" list="la_list" placeholder="Select Lost Art"/>\
						<datalist id="la_list">\
							{{#each allLostArts}}\
								<option id="{{la_id}}" value="{{la_name}}"/>\
							{{/each}}\
						</datalist>\
					</div>\
				</div>\
			</div>\
		</div>\
	</div>\
{{/if}}';

tmpstr.lostArtBox =
'<div class="bankbox lost-art-box{{#if method}} {{method}}{{else}} a{{/if}}" data-value="{{lost_art_list}}" data-method="{{#if method}}{{method}}{{/if}}" name="lost_arts">\
	<p class="title">Lost Arts<span class="add-lost-art inline-button">Add Lost Art</span></p>\
	<p id="too-many-arts" class="warn-user">* Over the maximum of lost arts enabled</p>\
	<p id="duplicate" class="warn-user">* There are duplicate lost arts below</p>\
	<div class="bank-hold lost-art-hold">\
	{{#if Lost_Art}}{{#each Lost_Art}}\
		{{>lostArt .}}\
	{{/each}}{{/if}}\
	</div>\
</div>';
tmpstr.makeTradeUI = 
'<div class="trade-form">\
	<input type="hidden" name="trans_type" value="inventory"/>\
	<input type="hidden" name="trans_info" value=""/>\
	<input type="hidden" name="pre_sender" value="{{characters.0.inventory}}"/>\
	<input type="hidden" name="pre_reciever" value=""/>\
	<input type="hidden" name="trans_status" value="Offered"/>\
	<input type="hidden" name="sender" value="{{current_character}}"/>\
	<div class="inv-menu trades" data-value="{{#if realdata.length}}Trade{{else}}Request{{/if}}">\
		<div class="inv-panel">\
			<div class="inner">\
				{{#if realdata.length}}<!--\
				 --><span class="gift trade-ops" data-value="Give"><h3>Give</h3></span><!--\
				 --><span class="trade trade-ops active" data-value="Trade"><h3>Trade</h3></span><!--\
				 --><span class="request trade-ops" data-value="Request"><h3>Request</h3></span>\
				{{else}}\
					<span class="trade-ops active"><h3>Request</h3></span>\
				{{/if}}\
			</div>\
		</div>\
	</div>\
	<div class="">\
		<!--<div id="action" class="input-line">\
			<label>Action</label>\
			<select name="trans_action">\
				<option>Trade</option>\
				<option>Give</option>\
				<option>Request</option>\
			</select>\
		</div>-->\
		<div class="inv-hold">\
			<div class="char-inv floating-box">\
				{{#if realdata.length}}\
				<label>Trade items owned by {{char_name}}</label>\
				{{>inventory realdata}}\
				{{else}}\
					<div class="no-items">You have no items in your inventory</div>\
				{{/if}}\
			</div><!--\
		 	{{#if realdata.length}}\
		 --><div id="send-resources" class="floating-box half">\
				<div class="inner">\
					{{>giftBox give}}\
				</div>\
			</div><!--\
			{{/if}}\
		 --><div id="get-resources" class="floating-box {{#if realdata.length}}half{{/if}}">\
		 		<div class="inner">\
				{{>giftBox get}}\
				</div>\
			</div><!--\
	 --></div><!--\
	 --><div id="message" class="floating-box half">\
			<div class="inner">\
				<label>Message to Recipient</label>\
				<textarea name="message"></textarea>\
			</div>\
		</div><!--\
	 --><div id="notes" class="floating-box half">\
	 		<div class="inner">\
				<label>Private Notes</label>\
				<textarea name="comments"></textarea>\
			</div>\
		</div><!--\
 --></div>\
	<div class="inv-panel send-line list-item">\
		<div class="-outer">\
			<div class="inner">\
				<div class="input-line send-button">\
					<div id="make-trade" class="submit-button send">Send Offer</div>\
				</div><!--\
			 --><div class="input-line recipient-label">\
					<div class="label">Recipient:</div>\
				</div><!--\
			 --><div class="input-line">\
			 		<div class="input-wrap">\
						<div class="input-inner">\
							<select class="user-list-drop required" name="reciever">\
								<option value="">--Select--</option>\
								{{#each other_characters}}\
								<option value="{{char_id}}">{{char_name}}</option>\
								{{/each}}\
							</select>\
						</div>\
					</div>\
				</div>\
			</div>\
		</div>\
	</div>\
</div>';


tmpstr.newItemUI =
'{{#unless item_name}}\
	<div class="headline inv-panel"><h3>Create New Item</h3></div>\
{{/unless}}\
<div data-method="{{#unless item_name}}create{{else}}update{{/unless}}" class="virtual-form new-item-form {{#unless item_name}}inv-panel{{/unless}}">\
	<input type="hidden" name="item_type" value="Treasure">\
	<div id="item_name" class="input-line quarter">\
		<label>Name</label>\
		<div class="input-wrap"><div class="input-inner">\
			<input class="required" type="text" name="item_name"{{#if item_name}} value="{{item_name}}"{{/if}}/>\
		</div></div>\
	</div><!--\
	--><div id="item_value" class="input-line third">\
		<label>Value</label>\
		<div class="input-wrap"><div class="input-inner">\
			<input type="text" name="item_value" value="{{#if item_value}}{{item_value}}{{else}}1{{/if}}"/>\
		</div></div>\
	</div>\
	<div id="item_description" class="input-line">\
		<label>Description</label>\
		<textarea name="item_description">{{item_description}}</textarea>\
	</div>\
	<div class="input-line right">\
		<div id="create-item" class="submit-button">{{#if item_name}}Update{{else}}Save{{/if}}</div>\
	</div>\
</div>';

tmpstr.listItems = 
'<div id="{{item_id}}" class="list-item four item {{e}}">\
	<div class="outer">\
		<div class="inner">\
			<div class="input-line">\
				{{#unless limited}}<div class="show-more edit-item circle-button edit"></div>{{/unless}}\
				{{#if qty}}<div class="qty">{{qty}}</div>{{/if}}<div class="name">{{item_name}}</div>\
			</div>\
			<div class="description">value: {{item_value}}, {{#if item_description}}{{item_description}}{{else}}(no description){{/if}}</div>\
		</div>\
		{{#unless limited}}<div id="form-box"><div class="inner"><div class="delete-item circle-button archive"></div>{{>newitem .}}</div></div>{{/unless}}\
	</div>\
</div>';

tmpstr.inventory =
'<div class="character-inventory inv-panel">\
	{{#each .}}\
		{{>item .}}\
	{{/each}}\
</div>';

tmpstr.transListUI =
'<div id="{{trans_id}}" class="list-item trades {{trans_action}}" data-action="{{trans_action}}" data-sender="{{sender}}" data-reciever="{{reciever}}">\
	<div class="outer">\
		<div class="inner">\
			<div class="input-line">\
				<div class="show-more new-character circle-button view"></div>\
				<span class="trade-icon {{trans_action}}" title="{{trans_action}}"></span>\
				<div class="statement">{{statement}}</div>\
			</div>\
			<div class="description">{{date_initiated}}{{#if message}}: "{{message}}"{{/if}}</div>\
		</div>\
		<div id="form-box"><div>\
			<div class="comments">{{comments}}</div>\
			{{>inventory trans_info}}\
			{{#ifCond trans_status "Offered"}}\
			<div class="input-line right">\
				{{#if isSender}}\
				<div id="rescind-offer" class="submit-button reject">Cancel</div>\
				{{else}}\
				{{#if invalid}}\
				<div id="not-enough" class="submit-button">Not Enough items</div>\
				{{else}}\
				<div id="accept-offer" class="submit-button accept">Accept</div>\
				{{/if}}\
				<div id="reject-offer" class="submit-button reject">Reject</div>\
				{{/if}}\
			</div>\
			{{/ifCond}}\
		</div></div>\
	</div>\
</div>';
tmpstr.listLostArts = 
'<div id="la-{{la_id}}" class="list-item lost-art">\
	<div class="outer">\
		<div class="inner">\
			<div class="input-line">\
				<div class="show-more edit-item circle-button edit"></div>\
				<div class="la-name">{{la_name}}</div>\
			</div>\
			<div class="description">{{la_description}}</div>\
		</div>\
		<div id="form-box"><div class="inner"><div class="delete-lost-art circle-button archive"></div>{{>newLostArt}}</div></div>\
	</div>\
</div>';
tmpstr.newLostArtUI =
'{{#unless la_name}}\
	<div class="headline inv-panel"><h3>Create New Lost Art</h3></div>\
{{/unless}}\
<div data-method="{{#unless la_name}}create{{else}}update{{/unless}}" class="virtual-form new-lost-art-form {{#unless la_name}}inv-panel{{/unless}}">\
	<input type="hidden" name="la_id" value="{{la_id}}">\
	<div id="la_name" class="input-line quarter">\
		<label>Name</label>\
		<div class="input-wrap"><div class="input-inner">\
			<input class="required" type="text" name="la_name"{{#if la_name}} value="{{la_name}}"{{/if}}/>\
		</div></div>\
	</div>\
	<div id="la_type" class="input-line quarter">\
		<label>Category</label>\
		<div class="input-wrap"><div class="input-inner">\
			<input class="required" type="text" name="la_type"{{#if la_type}} value="{{la_type}}"{{/if}}/>\
		</div></div>\
	</div>\
	<div id="tier" class="input-line quarter">\
		<label>Tier</label>\
		<div class="input-wrap"><div class="input-inner">\
			<input class="required" type="text" name="tier"{{#if tier}} value="{{tier}}"{{/if}}/>\
		</div></div>\
	</div>\
	<div id="la_checks" class="input-line">\
		<div class="check"><input type="checkbox" value="y" name="teach"{{#ifCond teach "y"}} checked="checked"{{/ifCond}}/><label>Teach</label></div>\
		<div class="check"><input type="checkbox" value="y" name="locked"{{#ifCond locked "y"}} checked="checked"{{/ifCond}}/><label>Locked</label></div>\
	</div>\
	<div id="la_prereq" class="input-line">\
		<label>Pre-requisites</label>\
		<textarea name="la_prereq">{{la_prereq}}</textarea>\
	</div>\
	<div id="la_description" class="input-line">\
		<label>Description</label>\
		<textarea name="la_description">{{la_description}}</textarea>\
	</div>\
	<div class="input-line right">\
		<div id="create-lost-art" class="submit-button">{{#if la_name}}Update{{else}}Save{{/if}}</div>\
	</div>\
</div>';

function logstr(obj){
	log(JSON.stringify(obj));
}
function log(str){
	console.log(str)
}
function plurals(name,options){
	var last = name.substring(name.length-1)
	var plural = last=='s'? "'" : "'s"
	return name+plural;
}
var p = '';
$(document).ready(function(){
	current_character = $('.top-line .character.active').attr('id');
	Handlebars.registerHelper('ifCond', function(v1, v2, options) {
		if(v1 === v2 || this[v1]==v2) {
			return options.fn(this);
		}
		return options.inverse(this);
	});
	Handlebars.registerHelper('string', function(v1,options) {
	 	return JSON.stringify(v1);
	});
	Handlebars.registerHelper('plurals',plurals)
	Handlebars.registerPartial('newcharacter',tmpstr.newCharacterUI);
	Handlebars.registerPartial('newitem',tmpstr.newItemUI);
	Handlebars.registerPartial('item',tmpstr.listItems);
	Handlebars.registerPartial('access',tmpstr.accessDrop);
	Handlebars.registerPartial('giftBox',tmpstr.giftBox);
	Handlebars.registerPartial('inventory',tmpstr.inventory);
	Handlebars.registerPartial('newLostArt',tmpstr.newLostArtUI);
	Handlebars.registerPartial('lostArtBox',tmpstr.lostArtBox);
	Handlebars.registerPartial('lostArt',tmpstr.lostArtItem);
	_.each(_.keys(tmpstr),function(k){
		tmp[k] = Handlebars.compile(tmpstr[k])
	});
	
	queryInventory("method=permissions",function(html){
		p = html.data;
		init();
	});
	
	
	
	//User: Change permission on dropdown change
	$('body').on('change','.list-item.user .access select',function(){
		var id = $(this).parents('.list-item.user').attr('id').replace(/user-/g,'');
		var val = $(this).val();
		queryInventory("method=permission&user_id="+id+"&level="+val,function(html){
			dialog('Permissions updated');
		},function(err){
			dialog('An error occured permissions could not be set',false,'<p>Error: '+err[0].error+'</p><p>Query: '+err[0].query+'</p>')	
		});
	})
	
	
	mainUIActions();
	tradeActions();
	characterActions();
	saveActions();
	transactionFunctions();
});
function transactionFunctions(){
	/*
	!!! Need to add a check on requested items to see if the user has the correct # of items
	Nwe start: About these actions
	1) You can cancel, acccept or reject an offer
	2) If you cancel an offer, 
	   - you will change the status of the offer to cacnelled
	   - enter pre-audit
	3) If you accept an offer sent to you
	   - You will change the statur of the offer to accepted
	   - enter pre-audit
	4) If you reject the offer 
	   - Channge the offere to rejected
	   - enter pre-audit
	   
	5) Pre-Audit
	   - Depending on the trans_action of the subject transaction you will
	   a) Give: Audit the sender (accepted or rejected)
	   b) Request: Audit the reciever only if accepted, otherwise Audit nothing! Because no items have entered escro 
	   c) Trade: Audit the sender and reciever if accepted, otherwise audit the sender
	*/
	$('body').on('click','#rescind-offer',function(){
		var par = $(this).parents('.list-item.trades')
		var trans_id = $(par).attr('id')
		preAudit(trans_id,'Cancelled')
		
	})
	$('body').on('click','#accept-offer',function(){
		//!!! freeze sibling buttons		
		var par = $(this).parents('.list-item.trades')
		var trans_id = $(par).attr('id')
		preAudit(trans_id,'Accepted')
		//!!!! need to change date_initiated
	});
	$('body').on('click','#reject-offer',function(){
		//!!! freeze sibling buttons
		var par = $(this).parents('.list-item.trades')
		var trans_id = $(par).attr('id')
		preAudit(trans_id,'Rejected')
		//!!!! need to change date_initiated
	});
	function preAudit(trans_id,action){
		
		queryInventory('method=getTrade&trans_id='+trans_id,function(html){
			var trans = html.data[0];
			delete trans.pre_sender;
			delete trans.pre_reciever; 
			trans.trans_status = action;
			trans.reference_id = trans_id
			
			queryInventory('method=updateTrade&trans_status=Completed&trans_id='+trans_id,function(html){
				var data = html.data;
				if(html.rows==0){
					dialog('This offer is no longer pending');
					$('.list-item.trades#'+trans_id).addClass('inactive');
					$('.list-item.trades#'+trans_id).find('.submit-button ').addClass('inactive');
				}else{
					var qstr = jsonToQueryVar(trans)
					queryInventory('method=sendTrade&'+qstr,function(){	
						audit(trans.reciever,function(){
							log('Audit reciever')
							audit(trans.sender,function(){
								//move this to the top of the past transactions
								var transitem = $('#'+trans_id+'.list-item.trades');
								showMore(transitem)
								$(transitem).animate({'opacity':0,height:0},300,function(){
									$(transitem).prependTo('.past-transactions')
									log($('#'+trans_id+'.list-item.trades').length)
									$('#'+trans_id+'.list-item.trades').css({height:'auto'})
									$('#'+trans_id+'.list-item.trades').animate({'opacity':1},300);
								});
							});
						})
					})
				}
			})
		})
	}
	
	
	$('body').on('click','#rescind-offerrrrrrrrrrrrrrrr',function(){
		if(!$(this).hasClass('inactive')){
			var btn = this
			var par = $(this).parents('.list-item.trades')
			var trans_id = $(par).attr('id')
			queryInventory('method=updateTrade&trans_status=Cancelled&trans_id='+trans_id,function(html){
				var data = html.data;
				if(html.rows==0){
					dialog('This offer is no longer pending and cant be cancelled');
					$(btn).addClass('inactive');
					$(par).addClass('inactive');
				}else{
					queryInventory('method=getTrade&trans_id='+trans_id,function(html){
						var info = html.data[0].trans_info;
						info = JSON.parse(info);
						getCurrentInventory(html.data[0].sender,function(obj){
							var newIn = mergeInventory(obj.i,info,true)
							var newEs = mergeInventory(obj.e,info,true,true)//Inverted
						})
					})
					
				}
			});
		}
	});
	
}
function manual_audit(){
	var chid = $('.inv-menu .character.active').attr('id')
	audit(chid,function(){
		dialog('Audit complete.')
	})
}
function audit(char_id,callback){
	callback = callback? callback : function(){};
	queryInventory('method=auditList&char_id='+char_id,function(html){
		var data = html.data;
		if(data){
		data = data.reverse()
		log(data)
		var isSender = data[0].sender == char_id;
		var startpoint = isSender? data[0].pre_sender : data[0].pre_reciever;
		log('Begin Audit::')
		log(startpoint)
		log('&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&7\n')
		startpoint = startpoint? JSON.parse(startpoint) :  {i:[],e:[]};
		startpoint.i = startpoint.i? startpoint.i : [];
		startpoint.e = startpoint.e? startpoint.e : [];
		//next go through each transaction and add combine them, then check the next and see if it exists and if the total is correct
		for(var i=0;i<data.length;i++){
			var currData = data[i].trans_info;
			currData = currData? JSON.parse(currData) : {i:[],e:[]};
			//compareInventory(one,two)
			var invert = data[i].sender != char_id;//Only invert if the char is the reciever
			//mergeInventory(main,plus,dropZero,invert)
			var transAction = data[i].trans_action;
			var transStatus = data[i].trans_status.toLowerCase()
			transStatus = transStatus=='rejected'?  'cancelled' : transStatus;
			transStatus = transStatus=='completed'? 'offered'   : transStatus;
			var actions = transStatus + '_'+(data[i].sender == char_id? 'sender' : 'reciever')+'_'+data[i].trans_action
			actions = actions.toLowerCase();
			//Changing conditions: offered vs accepted vs cancelled/rejected sender vs reciever, escro vs inventory
			
			log(actions)
			log('========================================')
			var newStart = false
			switch(actions){
			/****/case 'accepted_reciever_assign':
				//--> add/remove items directly to inventory
				var outcomeINV = mergeInventory(startpoint.i,currData,true,true)
				newStart = {i:outcomeINV,e:startpoint.e}
				break;
				
			/****/case 'accepted_reciever_trade':
				//--> add/subtract items to inventory
				var outcomeINV = mergeInventory(startpoint.i,currData,true,true);
				newStart = {i:outcomeINV,e:startpoint.e}
				break;
				
			/****/case 'accepted_reciever_give':
				//--> add items to inventory
				var outcomeINV = mergeInventory(startpoint.i,currData,true,true);
				newStart = {i:outcomeINV,e:startpoint.e}
				break;
				
			/****/case 'accepted_reciever_request':
				//--> remove requested items from inventory
				var outcomeINV = mergeInventory(startpoint.i,currData,true,true);
				newStart = {i:outcomeINV,e:startpoint.e}
				break;
				
			/****/case 'accepted_sender_trade':
				//--> add requested items to inventory, remove gifted items from escro
				var giftOnly = _.reject(currData,function(cd){
					return cd.e =='r';
				});
				var reqOnly = _.reject(currData,function(cd){
					return cd.e =='g';
				});				
				var outcomeINV = mergeInventory(startpoint.i,reqOnly,true);
				var outcomeESC = mergeInventory(startpoint.e,giftOnly,true);
				newStart = {i:outcomeINV,e:outcomeESC}
				break;
				
			/****/case 'accepted_sender_give':				
				//--> remove gifted items from escro,
				var giftOnly = _.reject(currData,function(cd){
					return cd.e =='r';
				});
				var outcomeESC = mergeInventory(startpoint.e,giftOnly,true);				
				newStart = {i:startpoint.i,e:outcomeESC}
				break;
				
			/****/case 'accepted_sender_request':
				//--> add items to inventory
				var outcomeINV = mergeInventory(startpoint.i,currData,true);
				newStart = {i:outcomeINV,e:startpoint.e}
				break;
				
			/****/case 'offered_sender_trade':
			/****/case 'offered_sender_give':
				//--> remove gifted items from inventory add to escro
				var giftOnly = _.reject(currData,function(cd){
					return cd.e =='r';
				});
				var outcomeINV = mergeInventory(startpoint.i,giftOnly,true);
				var outcomeESC = mergeInventory(startpoint.e,giftOnly,true,true);				
				newStart = {i:outcomeINV,e:outcomeESC}
				break;
				
				case 'cancelled_sender_trade':
				case 'cancelled_sender_give':
				--> remove gifted items from escro and add them to inventory
				var giftOnly = _.reject(currData,function(cd){
					return cd.e =='r';
				});				
				var outcomeINV = mergeInventory(startpoint.i,giftOnly,true,true);
				var outcomeESC = mergeInventory(startpoint.e,giftOnly,true);				
				newStart = {i:outcomeINV,e:outcomeESC}
				break;
				
			/****/case 'offered_reciever_trade':
			/****/case 'offered_reciever_give':
				case 'offered_reciever_request':
				case 'offered_sender_request':
				case 'cancelled_reciever_trade':
				case 'cancelled_reciever_give':
				case 'cancelled_reciever_request':
				case 'cancelled_sender_request':
				//--> do nothing;
				break	
			}
			
			
			if(newStart){
				
				log(JSON.stringify(startpoint))
				log(JSON.stringify(currData))
				log('=_____________________________________')
				log(JSON.stringify(newStart))
				log('\n\n')
				startpoint = newStart;
			}else{
				log('%%%% Ignore\n\n')	
			}
			if(startpoint && (i+1) < data.length){
				log('\n\n$$$$$$ fix the next record: '+(i+1)+' L: '+(data.length-1))
							
				var attrName =  data[i+1].sender == char_id? 'pre_sender' : 'pre_reciever';
				log('Attr: '+attrName)
				var compare = compareInventory(data[i+1][attrName],startpoint)
				log('Are they the same?:: '+compare)
				if(!compare){
					queryInventory("method=fixTrade&target="+attrName+"&pre_data="+JSON.stringify(startpoint)+"&trans_id="+data[i+1].trans_id);
				}
			}
			
		}
		log('=======================================\nFinal\n============================================\n'+JSON.stringify(startpoint)+'\n\n\n')
		//update the user's inventory and escro
		queryInventory('method=matchInventory&inventory='+JSON.stringify(startpoint.i)+'&escro='+JSON.stringify(startpoint.e)+'&char_id='+char_id,callback);
		}else{
			dialog('No transactions to audit')	
		}
		
	},function(){
		dialog('An error occured and the inventory could not be updated. Try to audit again');	
	});
}
function compareInventory(one,two){
	var oneStr = typeof one=='string'? one : JSON.stringify(one);
	var twoStr = typeof two=='string'? two : JSON.stringify(two);
	oneStr = oneStr.replace(/'/g,''); 
	oneStr = oneStr.replace(/"/g,'');
	twoStr = twoStr.replace(/'/g,''); 
	twoStr = twoStr.replace(/"/g,'');
	return twoStr == oneStr;
}
function setHashAction(action){
	var exec = window[action];
	if(typeof exec == 'function'){	
		window.location.hash = action;
		$('.inv-menu .sub-line span[data-action='+action+']').addClass('active')
		exec();
	}
}
function setAtiveView(topitem,action){
	$('.inv-menu .top-line .character').removeClass('active');
	$(topitem).addClass('active');
	if($(topitem).hasClass('staffer')){
		$('.inv-menu .sub-line.staffer').show();
		$('.inv-menu .sub-line.user').hide();
		current_character = $(topitem).attr('id');
		$('.inv-menu .sub-line span').removeClass('active');
		$('.inv-menu .view-trades').addClass('active');
		if(action){
			setHashAction(action);
		}else{
			setHashAction('tradeItems');			
		}
	}else{
		$('.inv-menu .sub-line.staffer').hide();
		$('.inv-menu .sub-line.user').show();
		current_character = $(topitem).attr('id');	
		$('.inv-menu .sub-line span').removeClass('active');
		$('.inv-menu .items').addClass('active');	
		if(action){
			setHashAction(action);
		}else{	
			setHashAction('viewTrades');
		}
	}
}
function mainUIActions(){
	//Main Tab: Sub nav, set the active tab
	$('body').on('click','.inv-menu .sub-line span',function(){
		$('.inv-menu .sub-line span').removeClass('active');
		$(this).addClass('active');
		var action  = $(this).attr('data-action');
		setHashAction(action);
	});
	//Main Tab: Show/hide secondary menu and set active tab
	$('body').on('click','.inv-menu .top-line span',function(){
		$('.inv-menu .top-line span').removeClass('active');
		setAtiveView(this)
		/*$(this).addClass('active');
		if(!$(this).hasClass('staffer')){
			$('.inv-menu .sub-line.staffer').show();
			$('.inv-menu .sub-line.user').hide();
			current_character = $(this).attr('id');
			$('.inv-menu .sub-line span').removeClass('active');
			$('.inv-menu .view-trades').addClass('active');
			setHashAction('viewTrades');
		}else{
			$('.inv-menu .sub-line.staffer').hide();
			$('.inv-menu .sub-line.user').show();
			current_character = $(this).attr('id');	
			$('.inv-menu .sub-line span').removeClass('active');
			$('.inv-menu .items').addClass('active');		
			setHashAction('tradeItems');
		}*/
	});
	//Show/hide more details of an list item
	$('#user-list').on('click','.show-more',function(){
		showMore($(this).parents('.list-item'))
		/*var item = $(this).parents('.list-item');
		$(this).toggleClass('open');
		$(item).find("#form-box").toggleClass('open');
		$(item).toggleClass('open');
		if($(this).hasClass('open')){			
			$(item).find("#form-box").stop().animate({height:$(item).find("#form-box").contents().outerHeight()},function(){
				$(item).find("#form-box").css({height:'auto'});
			});
			$(item).attr('data-width',$(item).css('width'))
			$(item).animate({width:'100%'},500);
		}else{
			$(item).animate({width: $(item).attr('data-width')},300,function(){
				$(item).css({width:''});	
			})
			$(item).find("#form-box").stop().animate({height:0});
		}*/
	});
	
	//Footer dialog: Hover in and out	
	$('#footer-dialog').mouseenter(function(){
		$(this).stop().css({opacity:1});
	}).mouseleave(function(){
		if(!$(this).hasClass('end')){
			$(this).stop().animate({opacity:0}, 14000,closeDialog)
		}
	});
	//Footer dialog: clicked no
	$('#footer-dialog .close, #footer-dialog .answer-no').click(function(){
		$('#footer-dialog').addClass('end')
		$('#footer-dialog').stop().animate({opacity:0},closeDialog)
	})
	//Footer dialog: clicked yes
	$('#footer-dialog .answer-yes').click(function(){
		$('#footer-dialog').stop().animate({opacity:0},function(){
			closeDialog(true)
		})
	})
	//Footer dialog: Show/hide error details 
	$('#footer-dialog .details .view').click(function(){
		$('#footer-dialog .detail-content').toggle(); 
	})	
}
function tradeActions(){
	//Make Trade UI: Limit the amount of give items in user's box
	$('body').on('change','.gift-item .name select',function(){
		var op = $(this).find(':selected').attr('data-max')
		$(this).parents('.gift-item').find('[data-name=qty]').attr('max',op)
	})	
	//Make Trade UI: Switch the trade method from give, trade, reequest
	$('body').on('click','.inv-menu .trade-ops',function(){
		$('.inv-menu .trade-ops').removeClass('active');
		$(this).addClass('active')
		var box = $(this).parents('.trade-form')
		$(this).parents('.inv-menu.trades').attr('data-value',$(this).attr('data-value'));
		switch($(this).attr('data-value')){
			case 'Give':
			$(box).find('#send-resources').show()
			$(box).find('#get-resources').hide()
			$(box).find('#send-resources').removeClass('half')
			break;
			
			case 'Request':
			$(box).find('#send-resources').hide()
			$(box).find('#get-resources').show()
			$(box).find('#get-resources').removeClass('half')
			
			break;
			
			case 'Trade':
			$(box).find('#send-resources').show()
			$(box).find('#get-resources').show()
			$(box).find('#send-resources').addClass('half')
			$(box).find('#get-resources').addClass('half');
			
			break;	
		}
	});
	//Gift box: Add gift
	$('body').on('click','.add-gift',function(){
		var box = $(this).parents('.giftbox').find('.gift-hold');
		var obj = {};
		var bank = $(this).parents('.giftbox').attr('data-bank');
		if(bank){
			obj.item_list = mapInventory(bank)
		}else{
			obj.item_list = cache.items;
		}
		$(box).append(tmp.giftItem(obj));
		
	});
	
	//Gift box: Remove gift
	$('body').on('click','.remove-gift',function(){
		var item = $(this).parents('.gift-item')
		$(item).remove();
	})	
}
function characterActions(){
	//Lost Arts: Add Lost Art
	$('body').on('click','.add-lost-art',function(){
		var box = $(this).parents('.bankbox').find('.lost-art-hold');
		var obj = {};
		obj.allLostArts = cache.lostarts;
		if($(box).find('[type=checkbox]').length>9){
			obj.disable = true;
		}
		$(box).prepend(tmp.lostArtItem(obj));
		//setLostArtBoxValue($(box).parents('.lost-art-box'));
	});
	$('body').on('change input','.lost-art-box input, .lost-art-box select',function(e){
		setLostArtBoxValue($(this).parents('.lost-art-box'));
	})
	//Lost Arts: Remove Lost Art Item
	$('body').on('click','.remove-la',function(){
		var item = $(this).parents('.lost-art-item')
		var box = $(item).parents('.lost-art-box')
		//if there is no value completely remove otherwise set to inactuve and hide
		if($(item).hasClass('static')){
			$(item).find('[data-name=active]').val('');
			$(item).hide();
		}else{
			$(item).remove();	
		}
		setLostArtBoxValue(box);
	})
}
function setLostArtBoxValue(box){
	var valz = [];
	$(box).find('.lost-art-item').each(function(index, element) {
    	var value = $(element).find('#la_id').val()
		if(value){
			var obj = {};
			var chck = $(element).find('input[type=checkbox]');
			obj.active = $(element).find('[data-name=active]').val();
			obj.info = $(chck).is(":checked")? $(chck).val() : '';
			obj.skill_id = $(element).hasClass('static')? value : $(element).find('option[value="'+value+'"]').attr('id');
			valz.push(obj)
		}
    });
	valz = _.reject(valz,function(v){
		if(!v.active){
			var f = _.find(valz,function(vv){
				return vv.skill_id == v.skill_id && vv.active;
			})
			return f? true : false;
		}
		return false;
	})
	$(box).attr('data-value',JSON.stringify(valz));
	if($(box).find('[type=checkbox]').length>9){
		//warn user
	}
}
function saveActions(){
	//Archive/Delete item 	
	$('body').on('click','.delete-item',function(){
		var par = $(this).parents('.list-item');
		var id = $(par).attr('id')
		var name =$(par).find('.name').text()
		$('#footer-dialog').bind('answer-no',function(){
			$('#footer-dialog').unbind('answer-no');
			$('#footer-dialog').unbind('answer-yes');
		});
		$('#footer-dialog').bind('answer-yes',function(){
			$('#footer-dialog').unbind('answer-no');
			$('#footer-dialog').unbind('answer-yes');
			queryInventory("method=archive_item&item_id="+id,function(html){
				dialog('Item "'+name+'" deleted')	
				$(par).remove();
			},function(err){
				dialog('An error occured "'+name+'" could not be deleted');	
			});
		});
		dialog('Delete Item "'+name+'"?',true)
	});
	//Archive a character
	$('body').on('click','.user-character .close',function(){
		var charNode = $(this).parents('.user-character')
		var char_name = $(charNode).find('.txt').text();
		var user_id = $(this).parents('.list-item').attr('id').replace(/user-/g,'');
		$('#footer-dialog').bind('answer-no',function(){
			$('#footer-dialog').unbind('answer-no');
			$('#footer-dialog').unbind('answer-yes');
		});
		$('#footer-dialog').bind('answer-yes',function(){
			$('#footer-dialog').unbind('answer-no');
			$('#footer-dialog').unbind('answer-yes');
			queryInventory("method=archive_character&char_name="+char_name+"&user_id="+user_id,function(html){
				dialog('Character "'+char_name+'" deleted')	
				$(charNode).remove();
			},function(err){
				dialog('An error occured "'+char_name+'" could not be deleted')	
			});
		});
		dialog('Delete character "'+char_name+'"?',true)
	});
	//Save a character
	$('body').on('click','.new-character-form #create-character',function(){
		var box = $(this).parents('.virtual-form');
		var item = $(this).parents('.list-item')
		var valid = validateForm(box,true);
		inprocess=true;
		if(valid){
			var user_id = $(item).length>0? $(item).attr('id').replace(/user-/g,''):'';
			var char_name = $(box).find('[name="char_name"]').val();
			var json = giftBoxToJson($(item).find('.giftbox'))
			//$(item).find('.giftbox').attr('data-value',JSON.stringify(json));
			var data = formData(box);		
			var action = $(box).attr('data-action')
			//log(data)
			if(action == 'Update'){
				getCurrentInventory(data.reciever,function(obj){
					var info = advSubtractInventory(safeParse(data.inventory),safeParse(data.pre_sender),false)
					info = _.reject(info,function(i){
						return i.qty == 0;
					});
					var gv = false;
					var rec = false;
					info = _.map(info,function(it){
						var q = it.qty+'';
						if(q.indexOf('-')!=-1){
							it.e = 'r';
							it.qty = q.substring(1);
							rec	= true;
						}else{
							it.e = 'g';
							gv = true;
						}
						return it;
					})
					data.pre_reciever = JSON.stringify(obj);
					data.trans_info = JSON.stringify(info);
					//var post = mergeInventory(obj.i,info,true)
					data.pre_sender = '[]';//JSON.stringify({i:post,e:obj.e});
					data.char_id = data.reciever;
					if(gv && rec){
						data.message = 'Staff has altered items from your inventory';
					}else if(gv){
						data.message = 'Staff has added items to your inventory';
					}else if(rec){
						data.message = 'Staff has removed items from your inventory';	
					}else{
						data = _.omit(data,'trans_info','trans_action','inventory','message','pre_reciever','pre_sender','reciever','sender','trans_status','trans_type');		
					}
					var qstr = jsonToQueryVar(data);
					//log(data)
					queryInventory("method=update_character&"+qstr,function(html){
						if(data.reciever){
							audit(data.reciever)
						}
						dialog('Character "'+char_name+'" updated')
						var userlst = tmp.characterlist({name:char_name})
						$(item).find('.characters').append(userlst);
						inprocess=false;			
					},function(err){
						dialog('An error occured Updatings "'+char_name+'"');
						inprocess=false;
					});
						
				})
						
			}else{
				var qstr = jsonToQueryVar(data)
				queryInventory("method=add_character&user_id="+user_id+"&"+qstr,function(html){
					dialog('Character "'+char_name+'" created')
					var userlst = tmp.characterlist({name:char_name})
					$(item).find('.characters').append(userlst);
					inprocess=false;				
				},function(err){
					dialog('An error occured adding "'+char_name+'"');
					inprocess=false;
				});
			}	
		}
	});
	
	//Create an item
	$('body').on('click','#create-item',function(){
		var frm = $(this).parents('.virtual-form');
		var valid = validateForm(frm,true);
		inprocess=true;
		if(valid){
			var data = formData(frm);
			var qstr = jsonToQueryVar(data);
			
			queryInventory("method=createItem&"+qstr,function(html){
				var action = $(frm).attr('data-method');
				dialog('Item "'+data.item_name+'" '+(action=='create'? 'Created':'updated'));
				tradeItems();
				inprocess=false;
			},function(err){
				dialog('An error occured "'+data.item_name+'" was not saved',false,'<p>Error: '+err[0].error+'</p><p>Query: '+err[0].query+'</p>');
				inprocess=false;
			});
				
		}
	});
	//Create a lost Art
	$('body').on('click','#create-lost-art',function(){
		var frm = $(this).parents('.virtual-form');
		var valid = validateForm(frm,true);
		inprocess=true;
		if(valid){
			var data = formData(frm);
			var qstr = jsonToQueryVar(data);
			queryInventory("method=createLostArt&"+qstr,function(html){
				//log(html)
				var action = $(frm).attr('data-method');
				dialog('Item "'+data.la_name+'" '+(action=='create'? 'Created':'updated'));
				lostArts();
				inprocess=false;
			},function(err){
				dialog('An error occured "'+data.la_name+'" was not saved',false,'<p>Error: '+err[0].error+'</p><p>Query: '+err[0].query+'</p>');
				inprocess=false;	
			});
		}
	});
	//Make a trade
	$('body').on('click','#make-trade',function(){
		var frm = $(this).parents('.trade-form')
		var valid = validateForm(frm,true);
		inprocess=true;
		if(valid){
			var giv = giftBoxToJson($(frm).find('#send-resources .giftbox'));
			var get = giftBoxToJson($(frm).find('#get-resources .giftbox'));
			var data = formData(frm)
			var secondValid = false;
			var message = '';
			var trans_action = $(frm).find('.inv-menu.trades').attr('data-value');
			switch($(frm).find('.inv-menu.trades').attr('data-value').toLowerCase()){
				case 'trade':
				//secondValid = $(frm).find('#send-resources').val() && $(frm).find('#get-resources').val()
				secondValid = giv.length>0  && get.length>0;
				message = "You must select items to send AND recieve when making a trade";
				break;
				
				case 'give':
				secondValid = giv.length>0;
				message = "No items to send";
				break;
				
				case 'request':
				secondValid = get.length>0;
				message = "No items requested";
				break;	
				
			}
			if(secondValid){
				var data = formData(frm);
				data.trans_info = JSON.stringify(giv.concat(get));
				data.trans_action = trans_action;
				
				getCurrentInventory(data.sender,function(obj){
				//queryInventory('method=characters&char_id='+data.sender,function(ch){
					/*ch=ch.data[0]
					var nData = _.clone(data);
					var i = JSON.parse(ch.inventory);
					var e = ch.escro? ch.escro : "[]";
					e = JSON.parse(e)	*/				
					data.pre_sender = JSON.stringify(obj);
					var diff = validateInventory(obj.i,giv)
					if(diff){
						/*var post = subtractInventory(obj.i,giv,true);
						var es   = addInventory(obj.e,giv)
						data.inventory =JSON.stringify(post);
						data.escro = JSON.stringify(es);
						/*!!!!!!!!!!!!!!!!!!!!!! POST EDIT*/
						//data.post_edit = JSON.stringify({"i":data.inventory,"e":data.escro});
						var qstr = jsonToQueryVar(data)
						//log(qstr)
						//next set a trade transaction then audit the inventory
						
						
						queryInventory('method=sendTrade&'+qstr,function(html){
							audit(data.sender)
							dialog('Transaction sent successfully');
							inprocess=false;							
						},function(err){
							dialog('An error occured and your transaction did not go through.')	
						})
					}else{
						var t = ch.char_name;
						var ptag ='<p class="title">'+plurals(t)+' Items</p>';
						dialog('Your inventory has changed since you began your transaction, please try again.');
						inprocess=false;
					}
					 					 
				 })
				
				//Limiting user's selection
				//x1) Create a function that will use the cache to fill out the user's inventory ex ({id:123, qty:3}) ==> ({id:123, item_id:123, item_name:Mark})
				//2) Use limit to apply to the input field (get the limit js from gf)
				//3) Build a "current" inventory below the charactre select drop down, move the transaction type below the curent inventory
				//4) 
				
				//On send
				//1 to update the tranaction as accepted
				//2: 1 to show before and after snapshots of each user's inventory, pre and post edit
				//3: update each user's account adding/removing treasure from the inventory and the escro
				
				/*
				
				UI
				------
				x- Need to show the user their inventory
				
				Validation
				------------
				x- validate the required fields
				-- text: create a js keypress function to limit numbers to numbers
				-- Right before submit get the user's data again and make sure there are enough funds: need a function for this
				   - Perhaps a fucntion to subtract and a funciton to check and see if the result is negative, will need a function to subtract and add eventually
				   
				
				
				escro process
				--------------
				1) the sender creates a trade, (send the give data as the escro query var) 
				2) A transaction is saved that records the trade data(info) the user's inventory before the transaction (pre_sender) and the inventory after the traandaction (post_data) adds the give portion of the trade in the character's escro field, and removes the give portion from the user's inventory
				3) The character is then updated with the post_edit info and the escro info, appending anyy escro amount already present
				4) When the reciever accepts the offer, the funds are placed in the reciever's account, then removed from the sender's escro
				5) If the reciever rejects the offer, the funds are removed from the escro and placed back in the sender's inventory
				
				*/
			}else{
				dialog(message);	
			}
		}
	});
}
function safeParse(arr,asObj){
	if(asObj){
		return arr? JSON.parse(arr) : {};	
	}else{
		return arr? JSON.parse(arr) : [];		
	}
}
//Show/Hide expandable data in list item
function showMore(item){
	var button = $(item).find('.show-more')
	$(button).toggleClass('open');
	$(item).find("#form-box").toggleClass('open');
	$(item).toggleClass('open');
	if($(button).hasClass('open')){			
		$(item).find("#form-box").stop().animate({height:$(item).find("#form-box").contents().outerHeight()},function(){
			$(item).find("#form-box").css({height:'auto'});
		});
		$(item).attr('data-width',$(item).css('width'))
		$(item).animate({width:'100%'},500);
	}else{
		$(item).animate({width: $(item).attr('data-width')},300,function(){
			$(item).css({width:''});	
		})
		$(item).find("#form-box").stop().animate({height:0});
	}
	/*if($(item).hasClass('character') && $(item).hasClass('open')){
		var id = $(item).attr('id');
		id = id.replace(/char-/g,'');
		fillOutFullCharacter(id)
	}*/
}
/*function fillOutFullCharacter(id){
	log('--'+id)
	queryInventory('method=getFullCharacter&char_id='+id,function(html){
		log(html[0].data)
		var data = html[0].data;
		//if(data.hasOwnProperty('')
	},function(){
		
	});
}*/
function mergeInventory(main,plus,dropZero,invert){
	var all = main.concat(plus)
	all = _.pluck(all,'id')
	all = _.uniq(all);
	var outcome = [];
	//log(JSON.stringify(all))
	_.each(all,function(a){
		var f = _.find(main,function(m){
			return m.id == a;
		})
		var f2 = _.find(plus,function(p){
			return p.id == a;
		})
		var ops = (f2 && invert? 'inverted, ' : '')+(f2? f2.e : 'no_plus')+', '+(f?'main':'no_main');
		var nQ = 0;
		//log('000000000000000 '+ops+': '+a)
		switch(ops){
			case 'inverted, g, main':
			case 'r, main':
			--> add to original
			nQ = parseInt(f.qty) + parseInt(f2.qty)
			break;
			
			case 'inverted, r, main':
			case 'g, main':		
			//--> subtract from original
			nQ = parseInt(f.qty) - parseInt(f2.qty)
			break;
			
			case 'inverted, g, no_main':
			case 'r, no_main':
			--> leave positive value
			nQ = parseInt(f2.qty)
			break;
			
			case 'inverted, r, no_main':
			case 'g, no_main':
			--> make negative value
			nQ = -1 * parseInt(f2.qty)
			break;
			
			case 'no_plus, main':
			nQ = parseInt(f.qty)
			break;
		}
		/*
		if(f && f2 && invert){
			if(f2.g == 'g'){
				//Inverted give = recieve
				nQ = parseInt(f.qty) + parseInt(f2.qty)
			}else{
				
			}
		}else if(f && f2){
			
		}else if(f){
			
		}
		if(f && f2){
			//log('MERGE: Has both')
			if(f2.e =='g' && !invert){
				nQ = parseInt(f.qty) - parseInt(f2.qty)				
				
			}else{
				nQ = parseInt(f.qty) + parseInt(f2.qty)
			}
			//outcome.push({"id":a,"qty":nQ})
		}else if(f){
			//log('MERGE: In Main')
			nQ = f.qty;
			//outcome.push({"id":a,"qty":f.qty})	
		}else if(f2){
			//log('MERGE: Secondary '+f2.qty+"|| E: "+f2.e+" invert: "+invert)
			nQ = f2.e =='g' || invert? f2.qty * -1 :  f2.qty;
			//outcome.push({"id":a,"qty":nQ})	
		}*/
		if(nQ != 0 || !dropZero){
			outcome.push({"id":a,"qty":nQ})
		}
	})
	return outcome;
}
function subtractInventory(main,minus,removeZero){
	var outcome = [];
	_.each(main,function(m){
		var f = _.find(minus,function(n){
			return n.id == m.id;
		})
		if(f){
			var nQ = parseInt(m.qty) - parseInt(f.qty)
			if(nQ > 0 || !removeZero){
				outcome.push({"id":m.id,"qty":nQ})
			}
		}else{
			outcome.push({"id":m.id,"qty":m.qty})	
		}
	})
	return outcome;
}
function advSubtractInventory(main,plus){
	plus = _.reject(plus,function(p){
		return p.e=='g';
	})
	var all = main.concat(plus)
	all = _.pluck(all,'id')
	all = _.uniq(all);
	var outcome = [];
	_.each(all,function(a){
		var f = _.find(main,function(m){
			return m.id == a;
		})
		var f2 = _.find(plus,function(p){
			return p.id == a;
		})
		if(f && f2){
			var nQ = parseInt(f.qty) - parseInt(f2.qty)
			outcome.push({"id":a,"qty":nQ})
		}else if(f){
			outcome.push({"id":a,"qty":f.qty})	
		}else if(f2){
			outcome.push({"id":a,"qty":-f2.qty})	
		}
	})
	return outcome;
}
function addInventory(main,plus){
	var all = main.concat(plus)
	all = _.pluck(all,'id')
	all = _.uniq(all);
	var outcome = [];
	_.each(all,function(a){
		var f = _.find(main,function(m){
			return m.id == a;
		})
		var f2 = _.find(plus,function(p){
			return p.id == a;
		})
		if(f && f2){
			var nQ = parseInt(f.qty) + parseInt(f2.qty)
			outcome.push({"id":a,"qty":nQ})
		}else if(f){
			outcome.push({"id":a,"qty":f.qty})	
		}else if(f2){
			outcome.push({"id":a,"qty":f2.qty})	
		}
	})
	return outcome;
}
function getCurrentInventory(id,callback){
	queryInventory('method=characters&char_id='+id,function(ch){
		//log(ch)
		ch=ch.data[0]
		var i = safeParse(ch.inventory);
		var e = safeParse(ch.escro);				
		var obbj =({"i":i,"e":e});
		if(callback){
			callback(obbj);
		}			
	})	
}
function validateInventory(main,minus){
	var s = subtractInventory(main,minus)
	var p = _.pluck(s,'qty');
	
	return p.join('').indexOf('-')==-1;
}
function advValidateInventory(main,minus){
	var s = advSubtractInventory(main,minus)
	var p = _.pluck(s,'qty');
	
	return p.join('').indexOf('-')==-1;
}
function mapInventory(bank,admin){
	bank = typeof bank == 'string'? JSON.parse(bank) : bank;
	var m = _.map(bank,function(b){
		if(!admin){
			b.limited = true;	
		}
		var f = _.find(cache.items,function(i){
			return i.item_id == b.id;
		})
		if(f){
			delete f.qty;
		}
		return f? _.extend(b,f) : b
	})
	return m
}
function cacheItems(call){
	call = call? call : function(){};
	if(cache.items.length==0){
		queryInventory("method=items",function(items){
			cache.items = items.data;
			updateGiftDrops()
			call();
		})
	}else{
		call();	
	}
	
}
function updateGiftDrops(){
		var str = '';
		_.each(cache.items,function(i){
			str +='<option value="'+i.item_id+'">'+i.item_name+'</option>';
		});
		$('.gift-item .name select').each(function(index, element) {
            if($(element).find('option').length==0){
				$(element).html(str)
			}
        });
	}
function cacheLostArts(call){
	if(cache.lostarts.length==0){
		queryInventory("method=lost_arts",function(la){
			cache.lostarts = la.data;
			call();
		})
	}else{
		call();	
	}
}
function dialog(str,prompt,deets){
	prompt = prompt? prompt : false;
	deets = deets? deets : false;
	$('#footer-dialog').toggleClass('prompt',prompt);
	$('#footer-dialog').toggleClass('deets',deets!=false);
	$('#footer-dialog .content').html(str);
	$('#footer-dialog .detail-content').html(deets?deets:'');
	$('#footer-dialog').show().stop().animate({opacity:1},300,function(){
		$('#footer-dialog').stop().animate({opacity:0},14000,function(){
			closeDialog();
		});
	});
}
function closeDialog(answer){
	$('#footer-dialog').hide();
	$('#footer-dialog').removeClass('end');
	if(answer){
		$('#footer-dialog').trigger('answer-yes');
	}else{
		$('#footer-dialog').trigger('answer-no');
	}
	$('#footer-dialog').removeClass('prompt');
}
function init(){
	cacheItems();
	var hash = window.location.hash;
	hash = hash.substring(1);
	if(current_character==0){
		$('.inv-menu .sub-line.user').hide();
		$('.inv-menu .sub-line.staffer').show();
		$('.inv-menu .sub-line span').removeClass('active');
		$('.inv-menu .items').addClass('active');
		
		setAtiveView($('.inv-menu .character.staffer'),hash? hash : 'tradeItems');		
		//tradeItems();
		
	}else{
		//getUsers()
		//getUserList()
		//getCharacters()
		//tradeItems()
		if(hash){
			var k = $('.inv-menu [data-action='+hash+']')
			var staffFunction = $('.inv-menu [data-action='+hash+']').parents('.sub-line').hasClass('staffer');
			var obj = staffFunction? $('.inv-menu .character.staffer') : $('.inv-menu .character.active');
			setAtiveView(obj,hash);
		}else{
			viewTrades();
		}
		//makeTrade()
	}
}
function giftBoxToJson(target){
	//exchange = exchange? exchange : 'Recieve';
	var arr = [];
	var obj = {};
	var exchange = $(target).attr('data-method');
	$(target).find('.gift-item').each(function(index, e) {
        var id = $(e).find('[data-name="item_id"]').val();
		var qty = $(e).find('[data-name="qty"]').val()
		var f = _.find(arr,function(a){
			return a.id == id;
		});
		if(f){
			f.qty = parseInt(f.qty) + parseInt(qty); 
		}else{
			var g = {'id':id,'qty':qty}
			if(exchange){
				g.e = exchange	
			}
			arr.push(g)
		}
    });
	$(target).attr('data-value',JSON.stringify(arr));
	return arr;	
}
function buildUI(method,template,index,form,noItems,process,callback,append,clazz,noItemsCall,processHtml){
	callback = callback? callback : function(){};
	index = index? index : '';
	form = form? form : '';
	processHtml = processHtml? processHtml : function(html){return html}
	if(!append){
		$('#standalone-form').html(form);
		$('#user-list').html(index);
	}else{
		$('#standalone-form').append(form);
		$('#user-list').append(index);
	}
	noItemsCall = typeof noItemsCall == "function"? noItemsCall : function (html){
		return html.data.length>1 || html.data != '';
	}
	var time = new Date().getTime()
	if(template){
		queryInventory("method="+method,function(html){
			//log(html)
			if(noItemsCall(html)){
				$('#user-list').append('<div id="'+time+'" class="inv-panel '+clazz+'"></div>')
				var data = processHtml(html.data);
				_.each(data,function(h){
					if(typeof process == 'function'){
						h = process(h);	
					}
					$('#user-list > #'+time+'.inv-panel').append(template(h))
				});
				callback();
			}else if(noItems){
				$('#user-list').append('<div class="no-items">'+noItems+'</div>');
				callback()
			}
		});
	}
}
function showInventory(){
	$('#standalone-form').html('');
	buildUI('characters&char_id='+current_character,tmp.inventory,'<h4>Inventory</h4>',false,'There are no items in your inventory',function(h){
		var m = mapInventory( JSON.parse(h.inventory));
		return m;	
	},function(){
		buildUI('characters&char_id='+current_character,tmp.inventory,'<h4>Items held in escro</h4>',false,'There are no items in escro',function(h){
			var m = mapInventory( JSON.parse(h.escro));
			return m;	
		},false,true,'escro',noEscItems)
	}, false,'inven',noInvItems)
	
	function noInvItems(html){
		if(html.data.length ==0){
			return false	
		}else if(html.data[0].inventory == '[]'){
			return false
		}
		return true;
	}
	function noEscItems(html){
		if(html.data.length ==0){
			return false	
		}else if(html.data[0].escro == '[]'){
			return false
		}
		return true;
	}
}
function makeTrade(){
	cacheItems()
	//Need current charactre and current login level
	//Add a param for notuser = adds a where statement to say where user is not x
	$('#standalone-form').html('');
	$('#user-list').html('');
	queryInventory('method=characters&char_id='+current_character,function(ch){
			var inv = ch.data[0].inventory
			var data = ch.data[0];
			queryInventory("method=characters&notuser=true",function(html){
				logstr(html)
				data.other_characters = html.data;
				data.give = {"method":"g","label":"Items to Give","bank":inv};
				data.get = {"method":"r","label":"Items Requested"};
				data.realdata = mapInventory( JSON.parse(inv) );
				data.current_character = current_character;
				$('#standalone-form').html(tmp.makeTradeUI(data))
			})
		},function(err){
			dialog('An error occured could not create trade form',false,'<p>Error: '+err[0].error+'</p><p>Query: '+err[0].query+'</p>')	
	});
	
}
function viewTrades(){
	var cInv = [];
	getCurrentInventory(current_character,function(inv){
		cInv = inv.i;
		cacheItems(function(){
			//Need current charactre and current login level
			//Add a param for notuser = adds a where statement to say where user is not x
			$('#standalone-form').html('');
			var ind = '<div id="items-none" class="list-item four index"><div>To</div><div>From</div></div>';
			//what do we expect here:
			//id is a list of 
			//can we send the current user id and do the ifcond to see which template to assign?
			buildUI("trades&char_id="+current_character+'&pending=true',tmp.transListUI,'<h4>Pending Transactions</h4>',false,'You have no pending actions',function(t){
				
				return fixtransationData(t);
			},function(){
				buildUI('trades&char_id='+current_character,tmp.transListUI,'<h4>Past Transactions</h4>',false,'You have no past transactions',function(t){
					return fixtransationData(t);	
				},false,true,'past-transactions')	
			});
		});
	});
	
		
	function fixtransationData(t){
		var isSender = current_character==t.sender;
		var you = isSender? t.sender_name : t.reciever_name;
		var them = isSender? t.reciever_name : t.sender_name;
		var format = t.trans_action+','+(isSender? 'sender':'reciever');
		if(!isSender){
			t.comments ='';	
		}
		var str = '';
		var evaluate = false;
		switch(format.toLowerCase()){
			case 'trade,sender':
			str = 'You proposed a trade with '+them
			break;
			
			case 'trade,reciever':
			str = them+' proposes a trade';
			evaluate = true;
			break;
			
			case 'give,sender':
			str = 'You sent you a gift to '+them;
			break;
			
			case 'give,reciever':
			str = them+' sent you a gift';
			break;
			
			case 'assign,sender':
			case 'assign,reciever':
			str = 'Staff has adjusted your inventory';
			break;
			
			case 'request,sender':
			str = 'You requested items from '+them;
			break;
			
			case 'request,reciever':
			str = them+ ' is requesting items';
			evaluate = true;
			break;			
				
		}
		t.statement = str;
		var info = t.trans_info? JSON.parse(t.trans_info) : [];
		if(evaluate){
			//check to see if there are enough items in the inventory to accomidate the trade
			t.invalid = !advValidateInventory(cInv,info);	
		}
		var i  = mapInventory(info)
		if(!isSender){
			var m = _.map(i,function(obj){
				if(obj.e == 'r'){
					obj.e = 'g';	
				}else if(obj.e == 'g'){
					obj.e = 'r';	
				}
				return obj;
			})
			i = m
		}
		t.isSender = isSender; 
		t.trans_info = i;
		return t;
	}
}
function lostArts(){
	buildUI("lost_arts",tmp.listLostArts,'',tmp.newLostArtUI,"No Lost Arts")
	
}
function tradeItems(){
	//var ind = '<div id="items-none" class="list-item four index"><div>Name</div><div>Type</div><div>Level</div></div>';
	buildUI("items",tmp.listItems,'',tmp.newItemUI,"No items found")
}
function getCharacters(){
	cacheItems(function(){
		cacheLostArts(function(){
			var ind = '<div id="character-none" class="list-item index"><div class="name">Name</div><div class="user">User</div></div>';
			buildUI("characters",tmp.characterListUI,'',tmp.newCharacterUI,"No characters found",function(c){
				c.save_action = "Update";
				return c;	
			},function(){
				parseGiftBox()
				$('.lost-art-box').each(function(index, box) {
                   setLostArtBoxValue(box); 
                });
				
			},false,false,false,mapFullCharacter)
		})
	})
}
function mapFullCharacter(data){
	var grp = _.groupBy(data,'char_id');
	var newData = [];
	_.each(_.keys(grp),function(k){
		var relCols = ['skill_id','rel_active','rel_info','rel_key']//rel_id
		var index = _.omit(grp[k][0],relCols.concat('rel_id'))
		var relatives = _.map(grp[k],function(rel){
			var start = _.pick(rel,relCols);
			var cachKey = [];
			var compareKey = '';
			switch(start.rel_key){
				case 'Lost_Art':
				cachKey = cache.lostarts;
				compareKey = 'la_id';
				break;
			}
			var f = _.find(cachKey,function(meta){
				return meta[compareKey] == start.skill_id;
			})
			if(f){
				start = _.extend(start,f);	
			}
			
			return _.extend(start,{static:true});
		})
		
		var meta = _.groupBy(relatives,'rel_key')
		delete meta.null;
		
		
		index = _.extend(index,meta);
		newData.push(index);
	})
	newData =_.sortBy(newData,function(s){
		return s.char_name;
	})
	return newData;
}
function parseGiftBox(){
	$('.giftbox').each(function(index, element) {
        if($(element).attr('data-value')){
			var itms = JSON.parse($(element).attr('data-value'));
			_.each(itms,function(i){
				var f = _.find(cache.items,function(ci){
					return i.id == ci.item_id;
				})
				try{
				f.qty = i.qty;
				f.static = true;
				$(element).find('.gift-hold').append(tmp.giftItem(f))
				}catch(err){
					dialog('There was an error and some treasure data could not be loaded');
				}
			})
		}
    });	
}
function getUserList(){
	cacheItems()
	var ind = '<div id="user-none" class="list-item index"><div class="name">Name</div><div class="access">Permissions</div><div class="characters">Characters</div></div>';
	buildUI("userlist",tmp.listUser,'',false,"No users found",function(u){
		var newP = p.concat([]).reverse()
		var m = _.map(newP,function(lvl){
			return {text:lvl,selected:(u.permission_level==lvl)};
		});
		var char='';
		if(u.characters){
			_.each(u.characters.split(','),function(c){
				char+= tmp.characterlist({name:c})
			})
		}
		u.select = m;
		u.char = char;
		u.inv_name = 'inventory'
		return u;
	});
}
function queryInventory(str,success,error){
	//var url = window.ajaxurl? window.ajaxurl+'?action=inventory&' : 'inventory-system.php?';
	//var url = 'inventory-system.php?';
	var url = '/wp-content/themes/second-dawn-theme/inventory-system/inventory-system.php?uid='+cache_level+'&';
	success = success? success : function(){};
	function defaultError(err){
		if(err.hasOwnProperty('status') && err.status == '404'){
			dialog('Path to inventory not found');
		}else if(err.hasOwnProperty('responseText')){
			dialog(err.responseText)
			
		}else{
			dialog('Operation failed because an error occured',false,'<p>Error: '+err.error+'</p><p>Query: '+err.query+'</p>');	
		}
	};
	error = error? error : defaultError
	$.ajax({
		type: 'POST',
		url: url+str,
		dataType: 'json',
		//data: {'method':'users'},
		success: function(html){
			if(html.hasOwnProperty('error') || (_.isArray(html) && html[0].hasOwnProperty('error'))){
				doError(html);
			}else{
				$('#devpanel').prepend('<div class="dev-result"><h3>'+html.method+'</h3>'+html.query+'</div>')
				success(html);
			}			
		},
		error: doError
	});
	function doError(err){
		log(err)
		$('#devpanel').prepend('<div class="dev-result"><h3>'+err.method+'</h3>'+err.error+'<br/>'+err.query+'</div>')
		try{
			error(err);
		}catch(errr){
			defaultError(err);	
		}
	}
	
}
function validateForm(target,notify){
	$(target).find('.invalid').removeClass('invalid')
	$(target).find('.lost-art-box').each(function(index, element) {
		var valz = JSON.parse( $(element).attr('data-value') );
		var ids = _.pluck(valz,'skill_id')
		if( ids.length != _.unique(ids).length ){
			$(element).addClass('invalid')
		}
    });
	$(target).find('input[type=text].required').each(function(index, element) {
		
        if(!$(element).val() && $(element).parent('.ignore').length==0){
			$(element).addClass('invalid');
			$(element).parents('.input-wrap').addClass('invalid');
			$(element).parents('.input-wrap').siblings('label').addClass('invalid');
		}
    });
	$(target).find('select.required').each(function(index, element) {
        if(!$(element).val() && $(element).parent('.ignore').length==0 ){
			$(element).addClass('invalid');
			$(element).parents('.input-wrap').addClass('invalid');
			$(element).parents('.input-wrap').siblings('label').addClass('invalid');
		}
    });
	var outcome = $(target).find('.invalid').length==0;
	if(!outcome && notify){
		dialog('Some fields have not been filed out correctly.')	
	}
	return outcome 
}
function formData(form){
	var retObj = [];
	$(form).find('[name]').each(function(index, element) {
		var val = $(element).attr('data-value')? $(element).attr('data-value') : $(element).val()
		if($(element).attr('type') == 'checkbox'){
			val = $(element).attr('checked') == 'checked'? val : '';
		}
    	retObj[$(element).attr('name')] = val;
    });
	return retObj;
}
function jsonToQueryVar(obj){
	var strArr = [];
	_.each(_.keys(obj),function(k){
		strArr.push(k+'='+obj[k]);
	});
	return strArr.join('&');	
}
function buildDB(){
	queryInventory('method=build',function(){
		dialog('Database Rebuilt')
	},function(err){
		log(err)
	})
}