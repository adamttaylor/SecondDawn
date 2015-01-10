var tmpstr = {};
var tmp = {};
var cache = {};
cache.items = [];
tmpstr.accessDrop = 
'<select class="access-dropdown">\
	{{#each .}}<option{{#if selected}} selected="selected"{{/if}}>{{text}}</option>{{/each}}\
</select>';
tmpstr.characterlist = 
'<span class="user-character">\
	<span class="close">x</span>\
	<span class="txt">{{name}}</span>\
</span>';

tmpstr.listUser = 
'<div id="user-{{id}}" class="list-item user">\
	<div class="show-more new-character circle-button"></div>\
	<div class="name">{{name}}</div>\
	<div class="access">{{>access select}}</div>\
	<div class="characters">{{{char}}}</div>\
	<div id="form-box">{{>newcharacter}}</div>\
</div>';

tmpstr.newCharacterUI = 
'<div class="new-character-form inventory-box" data-action="{{#if save_action}}{{save_action}}{{else}}Create{{/if}}">\
	<input type="hidden" name="trans_type" value="inventory"/>\
	<input type="hidden" name="trans_action" value="assign"/>\
	<input type="hidden" name="trans_info" value=""/>\
	<input type="hidden" name="pre_edit" value="{{inventory}}"/>\
	<input type="hidden" name="post_edit" value=""/>\
	<input type="hidden" name="reciever" value="{{char_id}}"/>\
	<input type="hidden" name="sender" value="$current_user_id"/>\
	<input type="hidden" name="trans_status" value="Accepted"/>\
	{{#ifCond save_action create}}\
	<div class="input-line small"><label>Character Name</label><div class="input-wrap"><input type="text" class="required" name="char_name"/></div></div>\
	{{else}}\
		<input type="hidden" name="char_id" value="{{char_id}}"/>\
		<div class="input-line small"><label>Edit: </label><label>{{char_name}}</label></div>\
	{{/ifCond}}\
	{{>giftBox}}\
	<div class="input-line"><input type="submit" id="link-user" value="{{#if save_action}}{{save_action}}{{else}}Create{{/if}}"/></div>\
</div>';

tmpstr.characterListUI =
'<div id="char-{{char_id}}" class="list-item character">\
	<div class="show-more show-character circle-button edit"></div>\
	<div class="name">{{char_name}}</div>\
	<div id="{{id}}" class="user_name">{{user}}</div>\
	<div id="form-box"><div>{{>newcharacter}}</div></div>\
</div>';

tmpstr.transListUI =
'<div id="{{trans_id}}" class="list-item trades {{trans_action}}">\
	<div class="show-more new-character circle-button"></div>\
	<span class="trade-icon {{trans_action}}" title="{{trans_action}}"></span>\
	<div class="reciever">{{reciever_name}}</div>\
	<div class="sender">{{sender_name}}</div>\
	<div class="message">{{message}}</div>\
	<div id="form-box"><div><p>{{trans_info}}</p></div></div>\
</div>';

tmpstr.makeTradeUI = 
'<div class="trade-form inventory-box">\
	{{#if characters}}\
	<input type="hidden" name="trans_type" value="inventory"/>\
	<input type="hidden" name="trans_info" value=""/>\
	<input type="hidden" name="pre_edit" value="{{characters.0.inventory}}"/>\
	<input type="hidden" name="post_edit" value=""/>\
	<input type="hidden" name="trans_status" value="Offered"/>\
	<div id="sender" class="input-line"><label>From:</label>'+
		'<select class="character-drop required" name="sender">\
			{{#each characters}}\
			<option value="{{char_id}}" data-inventory="{{inventory}}">{{char_name}}</option>\
			{{/each}}\
		</select>'+
	'</div>\
	<div id="reciever" class="input-line"><label>To:</label>'+
		'<select class="user-list-drop required" name="reciever">\
			<option value="">--Select--</option>\
			{{#each other_characters}}\
			<option value="{{char_id}}">{{char_name}}</option>\
			{{/each}}\
		</select>'+
	'</div>\
	<div class="trade-method has-inventory{{#unless realdata.length}} ignore{{else}} active{{/unless}}">\
		<div id="action" class="input-line"><label>Action</label><select name="trans_action"><option>Trade</option><option>Give</option><option>Request</option></select></div>\
		<div class="inv-hold">\
			<div class="char-inv">\
				<p class="title">{{plurals characters.0.char_name}} Items</p>\
				{{>inventory realdata}}\
			</div>\
			<div id="send-resources" class="input-line">\
				{{>giftBox give}}\
			</div>\
			<div id="get-resources" class="input-line">\
				{{>giftBox get}}\
			</div>\
		</div>\
	</div>\
	<div class="trade-method no-inventory{{#if realdata}} ignore{{else}} active{{/if}}">\
		<input type="hidden" name="trans_action" value="request"/>\
		<div class="no-items">No items to trade</div>\
		<div id="get-resources" class="input-line">\
			{{>giftBox get}}\
		</div>\
	</div>\
	<div id="message"><label>Message to Recipient</label>\
		<textarea name="message"></textarea>\
	</div>\
	<div id="notes"><label>Notes</label>\
		<textarea name="comments"></textarea>\
	</div>\
	<div class="input-line"><input type="submit" id="make-trade" value="Send Offer"/></div>\
	{{else}}\
		<div class="no-items">You must have at least 1 character to make a trade</div>\
	{{/if}}\
</div>';

tmpstr.inventory =
'<div class="character-inventory inventory-box">\
	{{#each .}}\
		<div class="inventory-line"><span class="qty">{{qty}}</span><span class="name">{{item_name}}</span></div>\
	{{/each}}\
</div>';

tmpstr.giftItem = 
'{{#if static}}\
	<div id="{{item_id}}" class="gift-item">\
		<input type="hidden" data-name="item_id" value="{{item_id}}">\
		<input type="hidden" data-name="qty" value="{{qty}}">'+
		'<div class="name"><label>{{item_name}}</label></div><div class="qty"><label>x {{qty}}</label></div><div class="remove-gift circle-button"></div></div>\
{{else}}\
	<div id="" class="gift-item"><div class="name">'+
	'<select data-name="item_id">\
		{{#each item_list}}\
			<option data-max="{{qty}}" value="{{item_id}}">{{item_name}}</option>\
		{{/each}}\
	</select>'+
	'</div><div class="qty" ><label>x</label><div class="input-wrap"><input type="number"{{#if item_list.0.qty}} pattern="[0-9]*" min="1" max="{{item_list.0.qty}}" {{/if}}value="1" data-name="qty"/></div></div><div class="remove-gift circle-button"></div></div>\
{{/if}}';

tmpstr.giftBox =
'<div class="giftbox{{#if method}} {{method}}{{else}} a{{/if}}" data-value="{{inventory}}" {{#if bank}}data-bank="{{bank}}" {{/if}}data-method="{{#if method}}{{method}}{{/if}}" name="{{#if name}}{{name}}{{else}}inventory{{/if}}">\
	<p class="title">{{#if label}}{{label}}{{else}}Inventory{{/if}}</p>\
	<div class="gift-hold"></div>\
	<div class="gift-button-wrap"><div class="add-gift circle-button"> Add Line Item</div></div>\
</div>';

tmpstr.newItemUI =
'<div class="new-item-form inventory-box">\
	<input type="hidden" name="item_type" value="Treasure">\
	<div id="item_name" class="input-line"><label>Name</label><div class="input-wrap"><input class="required" type="text" name="item_name"/></div></div>\
	<div id="item_value" class="input-line"><label>Value</label><div class="input-wrap"><input type="text" name="item_value" value="1"/></div></div>\
	<div id="item_description" class="input-line"><label>Description</label><textarea name="item_description"></textarea></div>\
	<input type="submit" id="create-item" value="Create"/>\
</div>';

tmpstr.listItems = 
'<div id="{{item_id}}" class="list-item four item">\<div class="show-more show-character circle-button"></div><div class="value">{{item_value}}</div><div class="name">{{item_name}}</div>\
	<div id="form-box"><div>{{item_description}}</div></div>\
</div>';

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
	Handlebars.registerHelper('ifCond', function(v1, v2, options) {
	  if(v1 === v2) {
		return options.fn(this);
	  }
	  return options.inverse(this);
	});
	Handlebars.registerHelper('plurals',plurals)
	/*Handlebars.registerHelper('plurals', function(name, options) {
	  var last = v1.substring(v1.length-1)
	  var plural = last=='s'? "'" : "'s"
	  return v1+plural;
	});*/
	Handlebars.registerPartial('newcharacter',tmpstr.newCharacterUI);
	Handlebars.registerPartial('access',tmpstr.accessDrop);
	Handlebars.registerPartial('giftBox',tmpstr.giftBox);
	Handlebars.registerPartial('inventory',tmpstr.inventory);
	_.each(_.keys(tmpstr),function(k){
		tmp[k] = Handlebars.compile(tmpstr[k])
	});
	
	queryInventory("method=permissions",function(html){
		p = html;
		init();
	});	
	$('#footer-dialog').mouseenter(function(){
		$(this).stop().css({opacity:1});
	}).mouseleave(function(){
		if(!$(this).hasClass('end')){
			$(this).stop().animate({opacity:0}, 14000,closeDialog)
		}
	});
	$('#footer-dialog .close, #footer-dialog .answer-no').click(function(){
		$('#footer-dialog').addClass('end')
		$('#footer-dialog').stop().animate({opacity:0},closeDialog)
	})
	$('#footer-dialog .answer-yes').click(function(){
		$('#footer-dialog').stop().animate({opacity:0},function(){
			closeDialog(true)
		})
	})
	$('#footer-dialog .details .view').click(function(){
		$('#footer-dialog .detail-content').toggle(); 
	})
	$('body').on('click','.new-character-form #link-user',function(){
		var box = $(this).parents('.inventory-box');
		var item = $(this).parents('.list-item')
		var valid = validateForm(box,true);
		if(valid){
			var user_id = $(item).length>0? $(item).attr('id').replace(/user-/g,''):'';
			var char_name = $(box).find('[name="char_name"]').val();
			var json = giftBoxToJson($(item).find('.giftbox'))
			//$(item).find('.giftbox').attr('data-value',JSON.stringify(json));
			
			var data = formData(box);
			
			var action = $(box).attr('data-action')
			if(action == 'Update'){
				var inv_unchanged = (data.inventory.replace(/"/g,'') == data.pre_edit.replace(/"/g,''));
				if(!inv_unchanged){
					data.post_edit = data.inventory;
				}
				var qstr = jsonToQueryVar(data)
				log(data)
				queryInventory("method=update_character&"+qstr,function(html){
					dialog('Character "'+char_name+'" updated')
					var userlst = tmp.characterlist({name:char_name})
					$(item).find('.characters').append(userlst);				
				});
							
			}else{
				queryInventory("method=add_character&char_name="+char_name+"&user_id="+user_id,function(html){
					dialog('Character "'+char_name+'" created')
					var userlst = tmp.characterlist({name:char_name})
					$(item).find('.characters').append(userlst);				
				},function(err){
					dialog('An error occured adding "'+char_name+'"')	
				});
			}
		}
	});
	$('body').on('change','.gift-item .name select',function(){
		var op = $(this).find(':selected').attr('data-max')
		$(this).parents('.gift-item').find('[data-name=qty]').attr('max',op)
	})
	$('body').on('change','.trade-form [name=trans_action]',function(){
		var box = $(this).parents('.trade-form')
		
		switch($(this).val()){
			case 'Trade':
			$(box).find('#send-resources').show()
			$(box).find('#get-resources').show()
			break;
			
			case 'Give':
			$(box).find('#send-resources').show()
			$(box).find('#get-resources').hide()
			break;
			
			case 'Request':
			$(box).find('#send-resources').hide()
			$(box).find('#get-resources').show()
			break;	
		}
	})
	
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
	$('#user-list').on('click','.show-more',function(){
		var item = $(this).parents('.list-item');
		$(this).toggleClass('open');
		if($(this).hasClass('open')){			
			$(item).find("#form-box").stop().animate({height:$(item).find("#form-box").contents().outerHeight()},function(){
				$(item).find("#form-box").css({height:'auto'});
			})
		}else{
			$(item).find("#form-box").stop().animate({height:0});
		}
	});
	$('body').on('change','.list-item.user .access select',function(){
		var id = $(this).parents('.list-item.user').attr('id').replace(/user-/g,'');
		var val = $(this).val();
		queryInventory("method=permission&user_id="+id+"&level="+val,function(html){
			dialog('Permissions updated')	
			//$(charNode).remove();
		},function(err){
			log(err)
			dialog('An error occured permissions could not be set',false,'<p>Error: '+err[0].error+'</p><p>Query: '+err[0].query+'</p>')	
		});
	})
	$('body').on('change','.character-drop',function(){
		//check to see if the selected character has an inventory if not switch to no-inventory mode
		var inv = $(this).find(':selected').attr('data-inventory')
		//empty holds
		//log(inv)
		var p = $(this).parents('.trade-form')
		$(p).find('.gift-hold').html('');
		$(p).find('[name="pre_edit"]').val(inv)
		if(inv){
			var i = mapInventory(JSON.parse(inv))
			var t = $(this).find(':selected').text()
			var ptag ='<p class="title">'+plurals(t)+' Items</p>';
			$(p).find('.has-inventory #send-resources .giftbox').attr('data-bank',JSON.stringify(i))
			
			$(p).find('.char-inv').html(ptag+tmp.inventory(i))
			$(p).find('.has-inventory #send-resources [name=inventory]').attr('data-value',inv)
			$(p).find('.has-inventory').removeClass('ignore');
			$(p).find('.no-inventory').addClass('ignore');
			$(p).find('.has-inventory').addClass('active');
			$(p).find('.no-inventory').removeClass('active');
		}else{
			$(p).find('.has-inventory').addClass('ignore');
			$(p).find('.no-inventory').removeClass('ignore');
			$(p).find('.has-inventory').removeClass('active');
			$(p).find('.no-inventory').addClass('active');
		}
	})
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
		
		$.defaultfilter()
	});
	$('body').on('click','.remove-gift',function(){
		var item = $(this).parents('.gift-item')
		$(item).remove();
	})
	$('body').on('keyup','[type=number]',function(){
		//$(this).val($(this).val().replace(/[^0-9]/g,''))
	});
	$('body').on('click','#create-item',function(){
		var frm = $(this).parents('.inventory-box');
		var valid = validateForm(frm,true);
		if(valid){
			var data = formData(frm);
			log(data)
			var qstr = jsonToQueryVar(data);
			
			queryInventory("method=createItem&"+qstr,function(html){
				log(html)
				dialog('Item "'+data.item_name+'" Created')	
				//$(charNode).remove();
			},function(err){
				log(err)
				dialog('An error occured "'+data.item_name+'" was not saved',false,'<p>Error: '+err[0].error+'</p><p>Query: '+err[0].query+'</p>')	
			});
				
		}
	});
	$('body').on('click','#make-trade',function(){
		var frm = $(this).parents('.trade-form')
		var valid = validateForm(frm,true);
		if(valid){
			var giv = giftBoxToJson($(frm).find('.active #send-resources .giftbox'));
			var get = giftBoxToJson($(frm).find('.active #get-resources .giftbox'));
			var data = formData(frm)
			var secondValid = false;
			var message = '';
				
			switch($(frm).find('.active [name=trans_action]').val().toLowerCase()){
				case 'trade':
				//secondValid = $(frm).find('#send-resources').val() && $(frm).find('#get-resources').val()
				secondValid = giv.length>0  && get.length>0;
				message = "You must select items to send AND recieve for a trade";
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
				queryInventory('method=characters&char_id='+data.sender,function(ch){
					ch=ch[0]
					var nData = _.clone(data);
					var i = JSON.parse(ch.inventory);
					var e = ch.escro? ch.escro : "[]";
					e = JSON.parse(e)					
					data.pre_edit = JSON.stringify({"i":i,"e":e});
					var diff = validateInventory(i,giv)
					if(diff){
						var post = subtractInventory(i,giv,true);
						var es = addInventory(e,giv)
						data.inventory =JSON.stringify(post);
						data.escro = JSON.stringify(es);
						data.post_edit = JSON.stringify({"i":data.inventory,"e":data.escro});
						
						log(data)
						var qstr = jsonToQueryVar(data)
						log(qstr)
						queryInventory('method=sendTrade&'+qstr,function(html){
							log(html[0].query)
							dialog('Transaction sent successfully');
						})
					}else{
						//fail
						var t = ch.char_name;
						var ptag ='<p class="title">'+plurals(t)+' Items</p>';
						dialog('Your inventory has changed since you began your transaction, please try again.');
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
				2) A transaction is saved that records the trade data(info) the user's inventory before the transaction (pre_edit) and the inventory after the traandaction (post_data) adds the give portion of the trade in the character's escro field, and removes the give portion from the user's inventory
				3) The character is then updated with the post_edit info and the escro info, appending anyy escro amount already present
				4) When the reciever accepts the offer, the funds are placed in the reciever's account, then removed from the sender's escro
				5) If the reciever rejects the offer, the funds are removed from the escro and placed back in the sender's inventory
				
				*/
			}else{
				dialog(message);	
			}
		}
	});
	//formData(form)
	
});
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
function addInventory(main,plus){
	var all = main.concat(plus)
	all = _.pluck(all,'id')
	all = _.uniq(all);
	log('ids: '+JSON.stringify(all))
	log(JSON.stringify(main)+' :: '+JSON.stringify(plus))
	var outcome = [];
	_.each(all,function(a){
		var f = _.find(main,function(m){
			return m.id == a;
		})
		var f2 = _.find(plus,function(p){
			return p.id == a;
		})
		log(a+' == '+f+' :: '+f2)
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
function validateInventory(main,minus){
	var s = subtractInventory(main,minus)
	var p = _.pluck(s,'qty');
	
	return p.join('').indexOf('-')==-1;
}
function mapInventory(bank){
	cache.items
	bank = typeof bank == 'string'? JSON.parse(bank) : bank;
	//log(bank)
	var m = _.map(bank,function(b){
		var f = _.find(cache.items,function(i){
			return i.item_id == b.id;
		})
		return f? _.extend(b,f) : b
	})
	return m
}
function cacheItems(){
	if(cache.items.length==0){
		queryInventory("method=items",function(items){
			cache.items = items;
			updateGiftDrops()
		})
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
}
function dialog(str,prompt,deets){
	prompt = prompt? prompt : false;
	deets = deets? deets : false;
	$('#footer-dialog').toggleClass('prompt',prompt);
	$('#footer-dialog').toggleClass('deets',deets);
	$('#footer-dialog .content').html(str);
	$('#footer-dialog .detail-content').html(deets?deets:'');
	$('#footer-dialog').stop().show().animate({opacity:1},300).animate({opacity:0},14000,function(){
		closeDialog();
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
	//getUsers()
	//getUserList()
	//getCharacters()
	tradeItems()
	
	//makeTrade()
}
function giftBoxToJson(target){
	//exchange = exchange? exchange : 'Recieve';
	var arr = [];
	var obj = {};
	var exchange = $(target).attr('data-method');
	$(target).find('.gift-item').each(function(index, e) {
        var id = $(e).find('[data-name="item_id"]').val();
		var qty = $(e).find('[data-name="qty"]').val()
		log(id+' :: '+qty)
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
	log(arr)
	$(target).attr('data-value',JSON.stringify(arr));
	return arr;	
}
function buildUI(method,template,index,form,noItems,process,callback){
	callback = callback? callback : function(){};
	index = index? index : '';
	form = form? form : '';
	$('#standalone-form').html(form);
	$('#user-list').html(index);
	if(template){
		queryInventory("method="+method,function(html){
			log((html.length>0)+'::'+( html[0].data != ''))
			if(html.length>1 || html[0].data != ''){
				$('#user-list').append('<div class="inv-panel"></div>')
				_.each(html,function(h){
					if(typeof process == 'function'){
						h = process(h);	
					}
					$('#user-list .inv-panel').append(template(h))
				});
				callback();
			}else if(noItems){
				$('#user-list').html(noItems);
			}
		});
	}
}
function makeTrade(){
	cacheItems()
	//Need current charactre and current login level
	//Add a param for notuser = adds a where statement to say where user is not x
	$('#standalone-form').html('');
	queryInventory("method=trades",function(t){
		_.each()
	})
	var ind = '<div id="items-none" class="list-item four index"><div>To</div><div>From</div></div>';
	//what do we expect here:
	//id is a list of 
	//can we send the current user id and do the ifcond to see which template to assign?
	buildUI('trades',tmp.transListUI,ind,false,'You have no pending trades',function(t){
		
		return t;	
	})
	
	queryInventory("method=characters&onlyuser=true&permission=true",
		function(html){
			log('users chars')
			//if
			log(html)
			var data = {};
			data.characters = [];
			var emptyset = html[0].hasOwnProperty('data') && html[0].data == '';
			var userlevel = html[0].current_user_level;
			
			if(!emptyset){
				data.characters = data.characters.concat(html)
			}
			if(userlevel == 'Moderator' || userlevel == 'Admin'){
				data.characters.push({'char_name':'Staff','char_id':'0'});
			}
			log(data.characters)
			
			queryInventory("method=characters&notuser=true",function(html){
				log('Not user')
				log(html)
				data.other_characters = html;
				data.give = {"method":"g","label":"Send items","bank":data.characters[0].inventory};
				data.get = {"method":"r","label":"Request items"};
				data.realdata = mapInventory( JSON.parse(data.characters[0].inventory) );
				$('#standalone-form').html(tmp.makeTradeUI(data))
			})
		},function(err){
			log(err)
			dialog('An error occured could not create trade form',false,'<p>Error: '+err[0].error+'</p><p>Query: '+err[0].query+'</p>')	
	});
	
	
	/*
	Stuff to consider
	//Replace optins give/trade with removeOnAction : this means do you remove it from the user's horde? Treasure = yes, lost arts = no
	// Then we need to consider the option "tradeable" some lost arts can't be taught
	//Maybe this is thinking too far ahead, maybe this form should just be for items and if we want to do lost arts that is a diff form/story
	Load:
	-- Get the user's chanractres and populate the from deopdown, if there is only 1 character make it just text
	-- Get all the characters in the db who are not the user's characters
	
	Next:
	-- When selecting a character load all the character's treasure into the pre_edit field. Convert the json to a hidden dropdown value for later use.
	-- 
	1) Before validating the form some processing needs to occur
	-- Need to read the items in the send field and 
	*/
}
function tradeItems(){
	var ind = '<div id="items-none" class="list-item four index"><div>Name</div><div>Type</div><div>Level</div></div>';
	buildUI("items",tmp.listItems,ind,tmp.newItemUI,"No items found")
}
function getCharacters(){
	cacheItems()
	var ind = '<div id="character-none" class="list-item index"><div class="name">Name</div><div class="user">User</div></div>';
	buildUI("characters",tmp.characterListUI,ind,tmp.newCharacterUI,"No characters found",function(c){
		c.save_action = "Update"
		return c;	
	},parseGiftBox)
}
function parseGiftBox(){
	$('.giftbox').each(function(index, element) {
        if($(element).attr('data-value')){
			log( $(element).attr('data-value') )
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
	buildUI("userlist",tmp.listUser,ind,false,"No users found",function(u){
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
		return u;
	});
}
function queryInventory(str,success,error){
	success = success? success : function(){};
	function defaultError(err){
		log(err)
		if(err[0]){
			dialog('Operation failed because an error occured',false,'<p>Error: '+err[0].error+'</p><p>Query: '+err[0].query+'</p>');
		}else{
			dialog(err.responseText)	
		}
	};
	error = error? error : defaultError
	$.ajax({
		type: 'POST',
		url: 'inventory-system.php?'+str,
		dataType: 'json',
		//data: {'method':'users'},
		success: function(html){
			if(html[0].hasOwnProperty('error')){
				doError(html);
				
			}else{
				success(html);
			}			
		},
		error: doError
	});
	function doError(err){
		try{
			error(err);
		}catch(errr){
			defaultError(err);	
		}
	}
	
}
function validateForm(target,notify){
	$(target).find('.invalid').removeClass('invalid')
	$(target).find('input[type=text].required').each(function(index, element) {
		
        if(!$(element).val() && $(element).parent('.ignore').length==0){
			$(element).addClass('invalid');
		}
    });
	$(target).find('select.required').each(function(index, element) {
        if(!$(element).val() && $(element).parent('.ignore').length==0 ){
			$(element).addClass('invalid');
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
		if($(element).parents('.ignore').length==0){
			var val = $(element).attr('data-value')? $(element).attr('data-value') : $(element).val()
    		retObj[$(element).attr('name')] = val;
		}
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
	})
}