$ = jQuery;
var inprocess = false;
var tmp = {};
var p = '';
var search_limit = 20;
var cache = {};
var maxBuild = 220;
var current_character = false;
var queryQueue = [];
cache.items = [];
cache.lost_arts=[];
cache.users = [];
cache.classes = [
	{'class_id':'1','class_name':'Mage'},
	{'class_id':'2','class_name':'Rogue'},
	{'class_id':'3','class_name':'Warden'},
	{'class_id':'4','class_name':'Warrior'},
]
cache.organizations = [
	{'org_id':'1','org_name':'Caravel'},
	{'org_id':'2','org_name':'Iron Legion'},
	{'org_id':'3','org_name':'Lorekeepers'},
	{'org_id':'4','org_name':'Templars'}
]
cache.orders = [
	{'order_id':'8','order_name':'Cowl'},
	{'order_id':'5','order_name':'Convocation'},
	{'order_id':'6','order_name':'Runemasters'},
	{'order_id':'7','order_name':'Wayfarers'}
]
cache.armor_locations = [
	{'loc_id':'1','loc_name':'Chest'},
	{'loc_id':'2','loc_name':'Head'},
	{'loc_id':'3','loc_name':'Neck'},
	{'loc_id':'4','loc_name':'Arm:Right'},
	{'loc_id':'5','loc_name':'Arm:Left'},
	{'loc_id':'6','loc_name':'Leg:Right'},
	{'loc_id':'7','loc_name':'Leg:Left'},
	{'loc_id':'8','loc_name':'Hand:Right'},
	{'loc_id':'9','loc_name':'Hand:Left'},
]
cache.lost_art_types = [
'Aspect','Background','Class','Crafting','Culture','Faith','Fey','General','Ghoul','Infernal','Meditation','Order','Organization','Race','Redempion','Redemption','Ritual','Tieka','Tournament of Spirit','Wayfarer','Weapon'
]
$(document).ready(function(){
	//var h = window.location.hash.split('_')
	current_character = get_current_character()
	initTemplates()
	
	//Get the user permissions then startup
	queryInventory("method=permissions",function(html){
		p = html.data;
		init();
	});
	
	//Set up the actions for the ui
	mainUIActions();
	tradeActions();
	characterActions();
	saveActions();
	transactionFunctions();
});
//Safe console log
function log(str){
	if(window.console){
		console.log(str)
	}
}
//Safe console low with stringify
function logstr(obj){
	log(JSON.stringify(obj));
}
/*
New int  functions

1) set a cokie with the current character.
2) If there is no character set, use the first one in the tabs
3) Create lots of get and set functions
4) Set the hashtag as an action


a) get_current_character: 
   - get the cookie that is set,
   - see if the user has access to the character
   - if not set_current_character to the frst character in the list
b) set_current_character
   - set the cookie with the selected number
c) set_character_action
   - set the action in the hashtag
d) set_menu_view
   - get the hashtag action
   - display the appropriate menu
*/

function get_current_character(){
	var char = getCookie('dawn_inv_char');
	var hasPerm = $('.top-line #'+char+'.character').length>0;
	if(!hasPerm){
		char = $('.top-line .character').first().attr('id');
		set_current_character(char);
	}
	return char;
}
function set_current_character(c){
	setCookie('dawn_inv_char',c,5);
	current_character = c;
}
function set_menu_view(){
	$('.inv-menu .character').removeClass('active');
	var selectedTab = $('.inv-menu #'+current_character+'.character') 
	$(selectedTab).addClass('active');
	var subTab = $(selectedTab).attr('data-sub')
	$('.inv-menu .sub-line').hide();
	if(subTab){
		$('.inv-menu .sub-line.'+subTab).show()
	}
	var action = window.location.hash
	if(!action){
		action = $(selectedTab).attr('data-action')
		window.location.hash = action;
	}else{
		action = action.substr(1);
	}
	var srch = '.inv-menu .sub-line span[data-action="'+action+'"]'
	$('.inv-menu .sub-line .active').removeClass('active')
	$(srch).addClass('active')
}
function setHashAction(action){
	var ss = '<div id="search-section"></div>';
	 $('#search-section').remove();
	 $('#search-wrap').append(ss);
	 window.location.hash = action;
	 set_menu_view();
	 var exec = window[action];
	 if(typeof exec == 'function') exec();
}




////Set cookie function (from w3c)
//--Used with set coomies session

function setCookie(c_name,value,exdays){
	var exdate=new Date();
	exdate.setDate(exdate.getDate() + exdays);
	var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
	document.cookie=c_name + "=" + c_value;
}
////Retieve cookie (from w3c)
//--Used with set coomies session

function getCookie(c_name){
	var i,x,y,ARRcookies=document.cookie.split(";");
	for (i=0;i<ARRcookies.length;i++){
		x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
		y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
	 	x=x.replace(/^\s+|\s+$/g,"");
		if (x==c_name){
			return unescape(y);
		}
	}
}

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

function mainUIActions(){
	//User: Change permission on dropdown change
	$('body').on('change','.list-item.user .access select',function(){
		var id = $(this).parents('.list-item.user').attr('id').replace(/user-/g,'');
		var val = $(this).val();
		queryInventory("method=permission&user_id="+id+"&level="+val,function(html){
			dialog('Permissions updated');
		},function(err){
			dialog('An error occured permissions could not be set',false,'')	
			//dialog('An error occured permissions could not be set',false,'<p>Error: '+err[0].error+'</p><p>Query: '+err[0].query+'</p>')	
		});
	})
	//User: Update build
	$('body').on('click','.update-build',function(){
		var box = $(this).parents('.virtual-form')
		
		/*var par =  $(this).parents('.list-item');
		var buildval = $(par).find('#user_build').val()
		var user = $(par).attr('id')*/
		
		var data = formData(box);
		//user = user.replace(/user-/g,'')
		var qstr = jsonToQueryVar(data);
		log(data)
		queryInventory("method=updateBuild&"+qstr,function(html){
			dialog('User updated');
		},function(err){
			dialog('Error updating Build');
			log(err)
		})
		/*queryInventory("method=updateBuild&user_id="+user+"&user_build="+buildval,function(html){
			dialog('Build updated');
		},function(err){
			dialog('Error updating Build');
			log(err)
		})*/
	})
		
	//Main Tab: Sub nav, set the active tab
	$('body').on('click','.inv-menu .sub-line span',function(){
		var action  = $(this).attr('data-action');
		setHashAction(action);
	});
	//Main Tab: Show/hide secondary menu and set active tab
	$('body').on('click','.inv-menu .top-line span',function(){
		var id = $(this).attr('id');
		var action  = $(this).attr('data-action');
		set_current_character(id);		
		setHashAction(action);
	});
	//Show/hide more details of an list item
	$('.inventory-ui').on('click','.show-more',function(){
		showMore($(this).parents('.list-item'))
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
	//Print Character sheet button
	$('body').on('click','.submit-button.print',function(){
		window.print();
	})
	$('body').on('click','#download-character',function(){
		downloadCharacter();
	})
	$('body').on('click','#download-all-characters',function(){
		downloadAllCharacters();
	});
	//Toggle less and more pages when printing
	$('body').on('change','#less-pages',function(){
		$('.character-sheet').toggleClass('more-pages');
	})
	//View as Player button
	$('body').on('click','#player-view',function(){
		var id = $(this).parents('.list-item').attr('id')
		viewAsPlayer(id)
	})
	
}
function downloadCharacter(){
	//get the stylesheet via ajax
	//combine the stylesheet and loaded character cards
	 $.when($.get("/wp-content/themes/second-dawn-theme/inventory-system/css/char-sheet-src.css")).done(function(response) {
     	var text = '<style>'+response+'</style>'+$('.print-sheet').html();
		var title = $('.print-sheet h1').text();
		var filename = title.replace(/[^a-z0-9]/gi, '_').toLowerCase()+'_character_card.html'
		var blob = new Blob([text], {type: "text/plain;charset=utf-8"});
		saveAs(blob, filename);
     });	
}
function downloadAllCharacters(){
	var css = '';
	 $.when($.get("/wp-content/themes/second-dawn-theme/inventory-system/css/char-sheet-src.css")).done(function(response) {
     	css = '<style>'+response+'</style>'
		//var text = +$('.print-sheet').html();
		if($('.character-sheet').length>0){
			$('.character-sheet').each(function(index, sheet) {
				saveCharacter(sheet)
			});
		}else{;
			var start = ($('#start-index').val()-1) * search_limit;
			start = start < 0? 0 : start;
			queryInventory('method=get&table=characters&sort=char_name&max='+search_limit+'&start_index='+start,function(inz){
				$('.print-sheet').remove();
				var ids = _.pluck(inz.data,'char_id').join(',')
				queryInventory("method=characters&in="+ids,function(html){
					var data = mapFullCharacter(html.data);
					_.each(data,function(h){
						h = expandCharacter(h);
						var tt = $(tmp.card(h))
						//$('#user-list > #'+time+'.inv-panel').append(tt)
						saveCharacter(tt)
					});
				});
			})
		}
     });
	 function saveCharacter(sheet){
		var text = css + $(sheet)[0].outerHTML;
		var title = $(sheet).find('h1').text();
		var filename = title.replace(/[^a-z0-9]/gi, '_').toLowerCase()+'_character_card.html'
		var blob = new Blob([text], {type: "text/plain;charset=utf-8"});
		saveAs(blob, filename);
	 }
}
function tradeActions(){
	//Make Trade UI: Limit the amount of give items in user's box
	$('body').on('change','.gift-item .name select',function(){
		var op = $(this).find(':selected').attr('data-max')
		$(this).parents('.gift-item').find('[data-name=qty]').attr('max',op)
		giftBoxToJson($(this).parents('.giftbox'))
	})	
	
	$('body').on('change','.gift-item select',function(){
		giftBoxToJson($(this).parents('.giftbox'))
	})
	$('body').on('input','.gift-item input',function(){
		giftBoxToJson($(this).parents('.giftbox'))
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
		giftBoxToJson($(this).parents('.giftbox'))
	});
	$('body').on('input','[type=number]',function(){
		var val = $(this).val()
		var reg = /^\d+$/;
		val = val.replace(/-/g,'');
		$(this).val(val)
		
	});
	//Gift box: Remove gift
	$('body').on('click','.remove-gift',function(){
		var item = $(this).parents('.gift-item')
		$(item).remove();
		giftBoxToJson($(this).parents('.giftbox'))
	})
}
function characterActions(){
	//Lost Arts: Add Lost Art
	$('body').on('click','.add-lost-art',function(){
		var box = $(this).parents('.bankbox').find('.lost-art-hold');
		var obj = {};
		obj.allLostArts = cache.lost_arts;
		if($(box).find('[type=checkbox]').length>9){
			obj.disable = true;
		}
		$(box).prepend(tmp.lostArtItem(obj));
		//setLostArtBoxValue($(box).parents('.lost-art-box'));
	});
	//Skills: Add Skill
	$('body').on('click','.select .move-skill',function(){
		var item = $(this).parents('.skill-item');
		var id   = $(item).find('#sk_id').val();
		var box  = $(this).parents('.skill-box');
		
		$(item).addClass('assigned')
		var ss   = _.find(cache.skills,function(s){
			return s.sk_id == id;
		});
		var ex = {};
		ex.current = true;
		ex.rel_active = 'y';
		ex.starting_skill = ss.sk_prereq.toLowerCase() == 'none' && ss.sk_cost+'' == '0';
		ss = _.extend(ss,ex);
		$(box).find('.assign.skill-hold').prepend(tmp.skillItem(ss));
		evaluateSkills($(this).parents('.new-character-form'))
	});
	//Skill: Remove Skill
	$('body').on('click','.remove-skill, .assign .move-skill',function(){
		var form = $(this).parents('.new-character-form')
		var item = $(this).parents('.skill-item');
		var id   = $(item).find('#sk_id').val();
		var box  = $(this).parents('.skill-box');
		
		if($(item).hasClass('static')){
			$(item).find('[data-name=active]').val('');
			$(item).hide();
		}else{
			$(item).remove();
		}		
		$(box).find('.select.skill-hold #'+id).removeClass('assigned');
		evaluateSkills(form);
	});
	//Skill: Select a class, show skills
	$('body').on('change','#class-selector',function(){
		var form = $(this).parents('.new-character-form')
		initSkillsDisplay(form);
		evaluateSkills(form)
	});
	
	//Skill: Calculate build on build edit
	$('body').on('input','[name=build]',function(){
		var form = $(this).parents('.new-character-form');
		evaluateBuild(form)
	})
	//Skill: Show/Hide skills
	$('body').on('click','.buyable-skills,.all-skills',function(){
		var skillHold = $(this).parents('.skill-panel');
		$(skillHold).toggleClass('full-view');
		$(skillHold).find('.buyable-skills,.all-skills').toggle();		
	});
	//Background: Eval on change
	$('body').on('change','.background-box select',function(){
		var form = $(this).parents('.new-character-form');
		evaluateBg(form);
	});
	//Background: Add Background
	$('body').on('click','.add-background',function(){
		var box = $(this).parents('.bankbox').find('.background-hold');
		var obj = {};
		obj.cache = cache;
		obj.rel_active = true;
		$(box).prepend(tmp.backgroundItem(obj));
		//setLostArtBoxValue($(box).parents('.lost-art-box'));
	});
	//Background: Remove Background
	$('body').on('click','.remove-background',function(){
		var form = $(this).parents('.new-character-form')
		var item = $(this).parents('.background-item');
		
		if($(item).hasClass('static')){
			$(item).find('#active').val('');
			$(item).hide();
		}else{
			$(item).remove();
		}		
		evaluateBg(form);
	});
	//Equipment: Eval on change
	$('body').on('change','.equipment-item select',function(){
		var form = $(this).parents('.new-character-form');
		evaluateEquipment(form)
	});
	$('body').on('input','.equipment-box input, .equipment-box textarea',function(){
		var form = $(this).parents('.new-character-form');
		evaluateEquipment(form)
	});
	//Equipment: Add Equipment
	$('body').on('click','.add-equipment',function(){
		var box = $(this).parents('.bankbox').find('.equipment-hold');
		var selector = $(this).parents('.bankbox').find('#eq_selector')
		if($(selector).val()){
			var op = $(selector).find('option:selected')
			//get id and Name
			var obj = {rel_active:'y',skill_id:$(selector).val(),eq_name:$(op).attr('data-name'),quality:$(op).attr('data-quality'),description:$(op).attr('data-props'),cache:cache,unique_info:new Date().getTime()}
			$(box).prepend(tmp.equipmentItem(obj));
			$(selector).val('')
			var form = $(this).parents('.new-character-form');
			evaluateEquipment(form)
		}else{
			alert('Select an Equipment item to add')	
		}
	});
	//Equipment: Remove Equipment
	$('body').on('click','.remove-equipment',function(){
		var form = $(this).parents('.new-character-form')
		var item = $(this).parents('.equipment-item');
		
		if($(item).hasClass('static')){
			$(item).find('#active').val('');
			$(item).hide();
		}else{
			$(item).remove();
		}		
		evaluateEquipment(form);
	});
	//Slot: Remove slot
	$('body').on('click','.minus-slot',function(){
		var input = $(this).parents('.input-line').find('input').not('#init-value');
		var slot = parseInt($(input).val())
		slot--;
		slot = slot <0? 0 : slot
		$(input).val(slot);
		$(this).parents('.input-line').find('label').not('.slot-title').text(slot);
		evaluateBuild($(this).parents('.new-character-form'))
	})
	//Slot: Add slot
	$('body').on('click','.add-slot',function(){
		var input = $(this).parents('.input-line').find('input').not('#init-value');
		var slot = parseInt($(input).val())
		slot++;
		$(input).val(slot);
		$(this).parents('.input-line').find('label').not('.slot-title').text(slot);
		evaluateBuild($(this).parents('.new-character-form'))
	})
	//Lost Arts: Evaluate value on select and checkbox change
	$('body').on('change input','.lost-art-box input, .lost-art-box select',function(e){
		var la = $(this).val();
		var f = _.find(cache.lost_arts,function(l){
			return l.la_name.toLowerCase() == la.toLowerCase();
		})
		if(f){
			$(this).parents('.lost-art-item').find('.tier label').text(f.tier)
		}
		setLostArtBoxValue($(this).parents('.lost-art-box'));
		evalLostArts($(this).parents('.new-character-form'))
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
function viewAsPlayer(id){
	queryInventory('method=characters&char_id='+id,function(html){
		var ch = mapFullCharacter(html.data);
		var rc = extendDataFromCache({},ch[0].race,'races')
		var str = '<span id="'+id+'" data-action="viewTrades" class="character" data-sub="user"><h3>'+ch[0].char_name+'</h3>'+ch[0].char_class+', '+rc.rc_name+'</span>'
		$('.inv-menu .top-line .inner').append(str);
	})
}
function initSkillsDisplay(form){
	var selClass = $(form).find('#class-selector').val()
	if(selClass){
		$(form).find('.skill-panel.no_class_selected').removeClass('no_class_selected');
		$(form).find('.skill-item[data-char-class="'+selClass+'"]').removeClass('wrong-class')
		$(form).find('.skill-item[data-char-class!="'+selClass+'"]').addClass('wrong-class')
		$(form).find('.assign.skill-hold .need_prereq').removeClass('need_prereq')
	}
}
function evaluateBg(form){
	var data = [];
	$(form).find('.background-item').each(function(index, element) {
        var obj = {};
		obj.skill_id = $(this).find('#bg_id').val()
		obj.key = 'Backgrounds';
		obj.active = $(this).find('#active').val();
		data.push(obj);
    });
	$(form).find('.background-box').attr('data-value',JSON.stringify(data));
}
function evaluateEquipment(form){
	var data = [];
	$(form).find('.equipment-item').each(function(index, element) {
		var skill = $(this).find('#eq_id').val()
		if(skill){
			var obj = {};
			obj.skill_id = skill
			obj.key = 'Equipment';
			obj.active = $(this).find('#active').val();
			var item_name =  $(this).find('#eq_info-label').val()
			obj.info = $(this).find('#eq_info-label').val()+'::'+$(this).find('#location').val()+'::'+$(this).find('#notes').val()
			obj.info = obj.info.replace(/(\r\n|\n|\r)/gm,"<br/>");
			obj.info = obj.info.replace(/"/g,'&quot;');
			obj.info = escape(obj.info)
			
			var id  =  $(this).find('#rel_id').val()
			var uni =  $(this).find('#unique_info').val()
			if(id) obj.rel_id = id;
			if(uni) obj.unique_info = uni;
			//obj.info = $(this).find('#eq_info').val() + (item_name? ':'+item_name : '');
			data.push(obj);
		}
    });
	$(form).find('.equipment-box').attr('data-value',JSON.stringify(data));
}
function mapPrereqData(form){
	var reqs= {'skills':['None'],'skill_ids':[],'tags':[],'slots':{'low':0,'mid':0,'high':0}}
	var skills = $(form).find('.assign.skill-hold .skill-item').not('wrong-class').find('#sk_name').map(function(index,el){
		return $(el).val();
	}).get();
	var skill_ids = $(form).find('.assign.skill-hold .skill-item').not('wrong-class').find('#sk_id').map(function(index,el){
		return $(el).val();
	}).get();
	reqs.slots.low  = parseInt($(form).find('#low-slots').val());
	reqs.slots.mid  = parseInt($(form).find('#mid-slots').val());
	reqs.slots.high = parseInt($(form).find('#high-slots').val());
	reqs.skills = reqs.skills.concat(skills);
	reqs.skill_ids = skill_ids;
	$(form).find('.assign.skill-hold .skill-item #tags').each(function(index, element) {
		if(!$(this).parents('.skill-item').hasClass('wrong-class')){
			if($(this).val().length>0){
           		var tagz = $(this).val().split(',')
				reqs.tags = reqs.tags.concat(tagz)
			}
		}
    });
	return reqs		
}
function evaluateSkills(form){
		//find the list of skills that are assigned and remove the class need_prereq
		$(form).find('.select.skill-hold .skill-item').addClass('need_prereq');
		$(form).find('.assign.skill-hold .skill-item').removeClass('is_prereq')
		
		var skillset = []
		$(form).find('.assign.skill-hold .skill-item').not('.wrong-class').map(function(index,el){
			var obj = {};
			obj.skill_id  = $(this).find('#sk_id').val();
			obj.key = 'Skills';
			obj.active = $(this).find('#active').val();
			skillset.push(obj);
		}).get();
		if($(form).find('#class-selector').val()){
			$(form).find('.skill-box').attr('data-value',JSON.stringify(skillset));
		}else{
			$(form).find('.skill-box').attr('data-value','');
		}
		var req_conditions = mapPrereqData(form)
		_.each(req_conditions.skill_ids,function(sk){
			$(form).find('.select.skill-hold .skill-item#'+sk).addClass('assigned');
		});
		//Writing Prerequeues
		//start with the target taxonomy like "skill" or "slot" add a colon. ex:
		//"skill:School of Everbreath"
		//seperate or statements using "||" seperate and statements using "&&"
		//ex:
		//skill:School of Everbreath || skill:School of Embercrown || tag:conjuration && !tag:Shadowmaw
		//You can specify a number for each statement ex:
		//skill:School of Everbreath,School of Embercrown,School of Darkhollow:2
		//the above means you have to have 2 of the 3 skills listed
		$(form).find('.select.skill-hold .skill-item').not('.wrong-class,.assigned').each(function(index, element) {
            var params = $(this).attr('data-sk-prereq-eval')
			params = params? params : 'skill:'+$(this).attr('data-prereq')+':1';
			var andTrue = true;
			//If any of the and statements are false then the end result is false
			_.each(params.split('&&'),function(and){				
				and = $.trim(and);
				var orTrue = false;
				//If any of the or statements are true the and statement is true
				_.each(and.split('||'),function(or){
					or = $.trim(or);
					var orArr = or.split(':');
					var type = orArr[0];
					var mat  = orArr[1].toLowerCase();
					var count = orArr.length ==3? orArr[2] : 1;
					switch(type){
						case 'skill':
						var fnd = _.filter(req_conditions.skills,function(s){
							s = s.toLowerCase()
							var skArr = mat.split(',');
							var ind = skArr.indexOf(s);
							return skArr.indexOf(s)!=-1;
						});
						if(fnd.length >= count) orTrue = true;
						break;
						
						case '!skill':
						var fnd = _.find(req_conditions.skills,function(s){
							return s.toLowerCase() == mat;
						})
						if(!fnd) orTrue = true;
						break;
						
						case 'tag':
						var fnd = _.filter(req_conditions.tags,function(s){
							return s.toLowerCase() == mat;
						})
						if(fnd.length >= count) orTrue = true;
						break;
						
						case '!tag':
						var fnd = _.filter(req_conditions.tags,function(s){
							return s.toLowerCase() == mat;
						})
						if(fnd.length < count) orTrue = true;
						break;	
						
						case 'slot':
						if(req_conditions.slots.high > 0) orTrue = true;	
						break;
					}
				});
				if(!orTrue){
					andTrue = false;
				}
			});
			if(andTrue){
				$(this).removeClass('need_prereq');	
			}
        });
		$(form).find('.assign.skill-hold .skill-item').not('.wrong-class,[data-prereq=None]').each(function(index, e) {
			var params = $(this).attr('data-sk-prereq-eval')
			params = params? params : 'skill:'+$(this).attr('data-prereq')+':1';
			_.each(params.split('&&'),function(and){				
				and = $.trim(and);
				var trueCnt = 0;
				var orz = and.split('||')
				_.each(orz,function(or){
					or = $.trim(or);
					var orArr = or.split(':');
					var type = orArr[0];
					var mat  = orArr[1].toLowerCase();
					var count = orArr.length ==3? orArr[2] : 1;
					
					switch(type){
						case 'skill':
						var fnd = _.filter(req_conditions.skills,function(s){
							s = s.toLowerCase();
							var skArr = mat.split(',');
							var ind   = skArr.indexOf(s);
							return skArr.indexOf(s)!=-1 
						})
						if(fnd.length >= count) trueCnt++;
						if(fnd.length > count) trueCnt++;
						break;
						
						case 'tag':
						//if this has the tag searching for add 1
						var thisTags = $(e).find('#tags').val()
						thisTags = thisTags.split(',');
						if(thisTags.indexOf(mat)!=-1) count++;
						var fnd = _.filter(req_conditions.tags,function(s){
							return s.toLowerCase() == mat && s!=$(this).find('#sk_name').val();
						})
						if(fnd.length > count) trueCnt++;
						if(fnd.length >= count) trueCnt++;
						break;
					}
				})
				if(trueCnt<2){
					_.each(orz,function(or){
						or = $.trim(or);
						var orArr = or.split(':');
						if(orArr[0] =='skill'){
							var mat = orArr[1];
							mat = mat.split(',')
							_.each(mat,function(m){
								$(form).find('.assign.skill-hold .skill-item #sk_name[value="'+m+'"]').parents('.skill-item').addClass('is_prereq')
							})
						}
						if(orArr[0]=='tag'){
							var mat = orArr[1];
							$(form).find('.assign.skill-hold .skill-item').not(e).find('#tags[value*="'+mat+'"]').each(function(index, el) {
                                var tgs = $(el).val();
								tgs = tgs.split(',');
								if(tgs.indexOf(mat)!=-1){
									$(el).parents('.skill-item').addClass('is_prereq');	
								}
                            });
						}
					});
				}
			})
        });
		evaluateBuild(form)
	}
function evalLostArts(form){
	var usedArts = 0;
	var level = parseInt($(form).find('[name=build]').val())
	level = (level-20)/10
	level = Math.floor(level)
	$(form).find('.available-la-count').text(level)
	$(form).find('.lost-art-item').each(function(index, element) {
        var enabled = $(this).find('.enable-la [type=checkbox]');
		var active = $(this).find('#active').val()
		var tier = $(this).find('.tier label').text();
		if($(enabled).attr('checked')=='checked' && active){
			usedArts+=parseInt(tier);	
		}
    });
	var available = level - parseInt(usedArts)
	$(form).find('.available-la-count').text(available)
	$(form).find('.lost-art-item').each(function(index, element) {
		var enabled = $(this).find('.enable-la [type=checkbox]')
        var tier = $(this).find('.tier label').text();
		if($(enabled).attr('checked')!='checked' && parseInt(tier) > available){
			$(enabled).attr('disabled','disabled')
			$(this).find('.enable-la').addClass('disable')
		}else if($(enabled).attr('checked')=='checked'){
			$(this).find('.enable-la').addClass('enable');
		}else{
			$(this).find('.enable-la').removeClass('disable')
			$(enabled).removeAttr('disabled');
			$(this).find('.enable-la').removeClass('enable')	
		}
		
    });
}
function evaluateBuild(form){
	evalLostArts(form)
		$('.select.skill-hold .skill-item').removeClass('not_enough_build');
		$(form).find('.add-slot').hide();
		$(form).find('.minus-slot').hide();
		var bld = $(form).find('[name=build]').val()
		var total = bld > maxBuild? maxBuild : bld
		$(form).find('[name=cappedBuild]').val(total)
		//var total = $(form).find('[name=cappedBuild]').val();
		var skillcost = 0; 
		$(form).find('.assign.skill-hold').not('.no_class_selected').find('.skill-item').not('.wrong-class').each(function(index, element) {
			if( $(element).find('[data-name=active]').val()=='y'){
				skillcost += parseInt( $(element).find('#sk_cost').val() );
			}
        });
		
		/*Evaluate skill cost in slots*/
		//low 
		
		var low = parseInt($(form).find('#low-slots').val());
		var mid = parseInt($(form).find('#mid-slots').val()); 
		var high = parseInt($(form).find('#high-slots').val());
		
		var lowCost = 0;
		var midCost = 0;
		var highCost = 0;
		if(low < 4){
			lowCost = low * 5;
		}else{
			lowCost = 15 + ((low - 3) * 10)	
		}
		if(mid < 3){
			midCost = mid * 5;
		}else{
			midCost = 10 + ((mid - 2) * 10)	
		}
		if(high == 1){
			highCost = 10
		}else if( high > 1){
			highCost = 10 + ((high - 1) * 20)	
		}
		skillcost = skillcost + lowCost + midCost + highCost;
		$(form).find('[name="build_spent"]').val(skillcost)
		var freeBuild = $(form).find('[name=cappedBuild]').val() - skillcost;
		$(form).find('.free-build-count').text(freeBuild)
		$(form).find('.select.skill-hold .skill-item').not('.wrong-class,.assigned').each(function(index, element) {
			if( parseInt($(this).find('#sk_cost').val()) > parseInt(freeBuild)){
				$(element).addClass('not_enough_build');
			}
        });
		 
		var lowp = ( (low - mid) < 2 || low < 2 );
		var lowp2 = ((mid-high) < 2 || mid < 2)
		var low1 =  freeBuild >4 && low < 3;
		var low2 =  freeBuild >9 && low > 2;
		
		var midp = ( (low - mid) == 2 ) && ( (mid-high) < 2 || mid < 2 )//low must be 2 greater
		var mid1 = freeBuild > 4 && mid < 2;
		var mid2 = freeBuild > 9 && mid > 1;
		
		var highp = mid-high == 2;
		var high1 = freeBuild > 9 && high == 0 && total > 69;
		var high2 = freeBuild > 19 && high > 0 && total > 119;
		
		if((low1 || low2) && lowp && lowp2){
			var cost = 
			$(form).find('#low.add-slot').show()
		}
		if((mid1 || mid2) && midp){
			$(form).find('#mid.add-slot').show();
		}
		if((high1 || high2) && highp){
			$(form).find('#high.add-slot').show();
		}
		var initLow = parseInt($(form).find('.input-line.low #init-value').val())
		var initMid = parseInt($(form).find('.input-line.mid #init-value').val())
		var initHigh = parseInt($(form).find('.input-line.high #init-value').val())
		var inLow = low - mid == 2 || low < 2;
		var inMid = (low - mid == 1) && ((mid-high == 2) || (mid < 2 && high == 0));
		var inHigh = mid-high == 1 && low - mid ==1;
		
		if(low > initLow && inLow){
			$(form).find('.input-line.low .minus-slot').show();
		}
		if(mid > initMid && inMid){
			$(form).find('.input-line.mid .minus-slot').show();
		}
		if(high > initHigh && inHigh){
			$(form).find('.input-line.high .minus-slot').show();
		}
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
			obj.key = 'Lost_Art';
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
	$('body').on('click','.list-item.character .archive-character',function(){
		var char_node = $(this).parents('.list-item');
		var id = $(char_node).attr('id');
		var char_name = $(char_node).find('.user-name').text()
		$('#footer-dialog').bind('answer-no',function(){
			$('#footer-dialog').unbind('answer-no');
			$('#footer-dialog').unbind('answer-yes');
		});
		$('#footer-dialog').bind('answer-yes',function(){
			$('#footer-dialog').unbind('answer-no');
			$('#footer-dialog').unbind('answer-yes');
			queryInventory("method=archive_character&char_name="+char_name+"&char_id="+id,function(html){
				dialog('Character "'+char_name+'" deleted')	
				$(char_node).remove();
			},function(err){
				dialog('An error occured "'+char_name+'" could not be deleted')	
			});
		});
		dialog('Delete character "'+char_name+'"?',true)
	});
	//Save a character
	$('body').on('click','.new-character-form #create-character',function(){
		var box = $(this).parents('.virtual-form');
		if(!$(box).hasClass('inProcess')){
			$(box).addClass('inProcess');
			var item = $(this).parents('.list-item')
			var valid = validateForm(box,true);
			inprocess=true;
			if(valid){
				var user_id = $(item).length>0? $(item).attr('id').replace(/user-/g,''):'';
				var char_name = $(box).find('[name="char_name"]').val();
				//var json = giftBoxToJson($(item).find('.giftbox'))
				var data = formData(box);	
				var action = $(box).attr('data-action')
				if(action == 'profile'){
					var nonSkillz = _.filter(JSON.parse(data.relationships),function(d){
						return d.key.toLowerCase() != 'skills';
					})
					data.setPending = nonSkillz.length >0? 'y' : '';
					var qstr = jsonToQueryVar(data)
					//need to check and see if equipment or backgrounds were added, if so will need approval
					queryInventory("method=update_character_profile&user_id="+user_id+"&"+qstr,function(html){
						dialog('Changes Saved')
						//var userlst = tmp.characterlist({name:char_name})
						//$(item).find('.characters').append(userlst);
						inprocess=false;
						$(box).removeClass('inProcess');				
					},function(err){
						dialog('An error occured adding "'+char_name+'"');
						inprocess=false;
						$(box).removeClass('inProcess');
					});
				}else if(action == 'create-profile'){
					data.setPending = 'y';
					var qstr = jsonToQueryVar(data)
					queryInventory("method=add_character&assign_user_id="+cache_level+"&"+qstr,function(html){
						dialog('Character "'+char_name+'" created')
						var userlst = tmp.characterlist({name:char_name})
						$(item).find('.characters').append(userlst);
						inprocess=false;
						$(box).removeClass('inProcess');
						window.location.hash = '';
						window.location.reload();				
					},function(err){
						dialog('An error occured adding "'+char_name+'"');
						inprocess=false;
						$(box).removeClass('inProcess');
					});
					
				}else if(action == 'Update'){
					//Update characters
					formInventoryInfo(data,function(trans){	
						var transactions = [];
						if(trans){
							transactions.push(trans);	
						}
						delete data.trans_info;
						data.transactions = JSON.stringify(transactions);
						var qstr = jsonToQueryVar(data);
						queryInventory("method=update_character&"+qstr,function(html){
							if(data.reciever){
								audit(data.reciever)
							}
							dialog('Character "'+char_name+'" updated')
							var userlst = tmp.characterlist({name:char_name})
							$(item).find('.characters').append(userlst);
							inprocess=false;
							$(box).removeClass('inProcess');			
						},function(err){
							dialog('An error occured Updatings "'+char_name+'"');
							inprocess=false;
							$(box).removeClass('inProcess');
						});						
					});
					//Get the transaction info 
					function formInventoryInfo(data,callback){
						var transinfo = _.clone(data.transinfo);
						getCurrentInventory(transinfo.reciever,function(obj){
							
							var info = advSubtractInventory(safeParse(data.inventory),safeParse(data['init-inventory']),false)
							//Remove 0 quantity values
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
							transinfo.pre_reciever = JSON.stringify(obj);
							transinfo.trans_info = JSON.stringify(info);
							transinfo.pre_sender = '[]';
							transinfo.char_id = data.transinfo.reciever;
							if(gv && rec){
								transinfo.message = 'Staff has altered items from your inventory';
							}else if(gv){
								transinfo.message = 'Staff has added items to your inventory';
							}else if(rec){
								transinfo.message = 'Staff has removed items from your inventory';	
							}else{
								transinfo = false;		
							}
							callback(transinfo)	
						})
					}
							
				}else{
					//New character
					if(data.inventory){
						var trans = _.clone( data.transinfo );
						trans.pre_reciever = [];
						trans.trans_info = JSON.parse(data.inventory);
						data.transactions = JSON.stringify( [ trans ] );
					}
					var qstr = jsonToQueryVar(data)
					queryInventory("method=add_character&user_id="+user_id+"&"+qstr,function(html){
						dialog('Character "'+char_name+'" created')
						var userlst = tmp.characterlist({name:char_name})
						$(item).find('.characters').append(userlst);
						inprocess=false;
						$(box).removeClass('inProcess');				
					},function(err){
						dialog('An error occured adding "'+char_name+'"');
						inprocess=false;
						$(box).removeClass('inProcess');
					});
				}	
			}else{
				inprocess=false;	
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
				dialog('An error occured "'+data.item_name+'" was not saved',false,'');
				inprocess=false;
			});
				
		}else{
			inprocess=false;	
		}
	});
	//Create a lost Art
	$('body').on('click','#create-lost-art',function(){
		var frm = $(this).parents('.virtual-form');
		var valid = validateForm(frm,true);
		inprocess=true;
		if(valid){
			var data = formData(frm);
			data.la_description = escape(data.la_description)
			var qstr = jsonToQueryVar(data);
			queryInventory("method=createLostArt&"+qstr,function(html){
				var action = $(frm).attr('data-method');
				dialog('Item "'+data.la_name+'" '+(action=='create'? 'Created':'updated'));
				lostArts();
				inprocess=false;
			},function(err){
				dialog('An error occured "'+data.la_name+'" was not saved',false,'');
				inprocess=false;	
			});
		}else{
			inprocess=false;	
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
					data.pre_sender = JSON.stringify(obj);
					var diff = validateInventory(obj.i,giv)
					if(diff){
						var qstr = jsonToQueryVar(data)
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
			}else{
				dialog(message);
				inprocess=false;
			}
		}else{
			inprocess=false;	
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
	item = item[0]
	var button = $(item).find('.show-more')[0]
	$(button).toggleClass('open');
	var box = $(item).find("#form-box")[0];
	$(box).toggleClass('open');
	$(item).toggleClass('open');
	if($(button).hasClass('open')){
		if($(box).hasClass('char-process')){
			var cData = $(item).find('.data-hold').text();
			cData = JSON.parse(cData)
			var dat = processChars(cData)
			var ch = tmp.newCharacterUI(dat)
			$(box).html(ch);
			parseCharacterForm()
			$(box).removeClass('char-process')
		}	
		$(box).stop().animate({height:$(box).contents().outerHeight()},function(){
			$(box).css({height:'auto'});
		});
		$(item).attr('data-width',$(item).css('width'))
		$(item).animate({width:'100%'},500);
	}else{
		$(item).animate({width: $(item).attr('data-width')},300,function(){
			$(item).css({width:''});	
		})
		
		$(box).stop().animate({height:0});
	}
}
function mergeInventory(main,plus,dropZero,invert){
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
		var ops = (f2 && invert? 'inverted, ' : '')+(f2? f2.e : 'no_plus')+', '+(f?'main':'no_main');
		var nQ = 0;
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
function cacheLostArts(call){
	if(cache.lost_arts.length==0){
		queryInventory("method=lost_arts",function(la){
			cache.lost_arts = la.data;
			call();
		})
	}else{
		call();	
	}
}
function cacheUsers(call){
	if(cache.users.length==0){
		queryInventory("method=users",function(la){
			cache.users = la.data;
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
	//setInitHashView();
	set_menu_view()
	pre_load_assets(function(){
		cache.startskills = _.filter(cache.skills, function(ss){
			return ss.sk_prereq.toLowerCase() == 'none' && ss.sk_cost+'' == '0';
		})
		cache.buyskills = _.filter(cache.skills, function(ss){
			return ss.sk_prereq.toLowerCase() != 'none' || ss.sk_cost+'' != '0';
		})
		var startAdd = {current:true,rel_active:'y',starting_skill:true,static:true};
		cache.startskills = _.map(cache.startskills,function(sk){
			return _.extend(sk,startAdd)
		});
		var tags = ['brightgaze','shadowmaw','conjuration','invocation','stance','school'];
		cache.buyskills = _.map(cache.buyskills,function(bs){
			var tgz = _.filter(tags,function(t){
				var name = bs.sk_name.toLowerCase()
				return name.indexOf(t)!=-1;
			})
			bs.tags = tgz.join(',');
			return bs;
		});
		//Permorm initial action
		var action = $('.inv-menu .sub-line span.active').attr('data-action')
		if(!action){
			action = $('.inv-menu .top-line span.active').attr('data-action')
		}
		setHashAction(action)
		/*var exec = window[action];
		if(typeof exec =='function'){
			exec();	
		}*/
	})	
}
function pre_load_assets(callback){
	callback = callback? callback : function(){};
	var completeCnt = 0;
	var methods = ['items','skills','lost_arts','backgrounds','orizons','equipment','races'];
	_.each(methods,function(m){
		queryInventory("method="+m,function(html){
			cache[m] = html.data;
			is_complete()
		},false,true)
	})	
	function is_complete(){
		completeCnt++;
		if(completeCnt == methods.length){
			callback();
		}
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
function buildUI(atts){
	var defFunction = function(val){ return val; }
	var ins = atts.ins? '&in='+atts.ins : '';
	var defNoItems = function (html){ return html.data.length>1 || html.data != '';	}
	var defaults = 
	{'method':false,'template':'','index':'','form':'','noItems':'','process':defFunction,'callback':defFunction,'append':false,'class':'','noItemsCall':defNoItems,'processHtml':defFunction}
	atts = _.defaults(atts,defaults);
	if(!atts.append){
		$('#standalone-form').html(atts.form);
		$('#user-list').html(atts.index);
	}else{
		$('#standalone-form').append(atts.form);
		$('#user-list').append(atts.index);
	}
	var time = new Date().getTime()
	if(atts.template){
		$('#user-list').append('<div id="'+time+'" class="inv-panel loading-data '+atts.class+'"></div>')
		queryInventory("method="+atts.method+ins,function(html){
			if(atts.noItemsCall(html)){				
				var data = atts.processHtml(html.data);
				_.each(data,function(h){
					h = atts.process(h);
					var tt = atts.template(h)
					$('#user-list > #'+time+'.inv-panel').append(tt)
				});
				$('#user-list > #'+time+'.inv-panel').removeClass('loading-data');
				atts.callback();
			}else if(atts.noItems){
				$('#user-list > #'+time+'.inv-panel').remove();
				$('#user-list').append('<div class="no-items">'+atts.noItems+'</div>');
				atts.callback()
			}
		});
	}
}
function searchUI(atts){
	//Needed keys: table, where, search_class, currentPage, onload, sortBy,primary
	var sortBy = atts.sortBy? '&sort='+atts.sortBy :'';
	var joinStr = atts.join? '&join='+atts.join : '';
	var query = atts.query? '&query='+atts.query : '';
	var searchStr = '';
	var start = 1;
	var wasSearch = false
	var secondBuild = false;
	initSearchBuild();
	
	$('body').on('click','#view-search, .search-icon',doSearch);
	$('body').on('change','.search-bar select',doSearch);
	$('body').on('input','#search-input',function(event){
		if($('#search-input').val().toLowerCase() == $('#search-input').attr('data-last-search').toLowerCase()){
			$('.search-icon').removeClass('new-search')
		}else{
			$('.search-icon').addClass('new-search')
		}
	})
	$('body').on('keyup','#search-input',function(event){
		if (event.keyCode == '13') {
        	doSearch();
        }
	});
	function doSearch(){
		if($('.search-icon').hasClass('new-search')){
			start = 0;	
		}else{
			start = ($('#start-index').val()-1) * search_limit;
		}
		$('.search-icon').removeClass('new-search')
		searchStr = $('#search-input').val()
		$('#search-input').attr('data-last-search',searchStr)
		searchStr = searchStr? '&search='+searchStr : '';
		if(searchStr || wasSearch){			
			initSearchBuild();
			wasSearch = searchStr!= '';
		}else{
			searchBuild();
		}
	}
	function initSearchBuild(){
		$('.pgSelect').show()
		queryInventory('method=getCount&table='+atts.table+'&where='+atts.where+query+searchStr,function(html){
			var total = html.data[0].c;
			var obj = {total: total, pages: Math.ceil(total/search_limit),class:atts.search_class,searchVal: searchStr.replace(/\&search=/g,''),placeholder:atts.placeholder}
			var srch = tmp.searchBar(obj);
			$('#search-section').html(srch)
			//if the count is 0 show 
			log('total: '+(total == 0))
			if(total == 0){
				$('#user-list').html('<div class="no-items">'+atts.noItems+'</div>');
				$('.pgSelect').hide()
			}else if(atts.onload || secondBuild){
				searchBuild();
			}else{
				$('#user-list').html(atts.index);
				$('#standalone-form').html('');
			}
		});
	}
	function searchBuild(){
		secondBuild = true;
		start = start < 0? 0 : start;
		queryInventory('method=getIDs&table='+atts.table+sortBy+'&max='+search_limit+'&start_index='+start+atts.where+joinStr+query+searchStr,function(inz){
			$('.print-sheet').remove();
			var ids = _.pluck(inz.data,atts.primary).join(',')
			atts.ins = ids;
			buildUI(atts)
		},function(err){
			dialog('Error occured reaching the database');
		})
	}
}
function showInventory(){
	$('#standalone-form').html('');
	var atts = {
		'method':'characters&char_id='+current_character,
		'template':tmp.inventory,
		'index':'<h4>Inventory</h4>',
		'noItems':'There are no items in your inventory',
		'process': processInv,
		'processHtml':mapFullCharacter,
		'callback':secondBuild,
		'class':'inven',
		'noItemsCall':noInvItems
	};
	var secAtts = {
		'method':'characters&char_id='+current_character,
		'template':tmp.inventory,
		'index':'<h4>Items held in escro</h4>',
		'noItems':'There are no items in escro',
		'process': processEsc,
		'processHtml':mapFullCharacter,
		'append':true,
		'class':'escro',
		'noItemsCall':noEscItems		
	}
	buildUI(atts);
	
	function secondBuild(){
		buildUI(secAtts);
	}
	function processEsc(h){
		var es = h.escro? JSON.parse(h.escro) : [];
		var m = mapInventory( es );
		return m;	
	}
	function processInv(h){
		var inv = h.inventory? JSON.parse(h.inventory) : [];
		var m = mapInventory( inv );
		return m;	
	}	
	function noInvItems(html){
		if(html.data.length ==0){
			return false	
		}else if(html.data[0].inventory == '[]' || html.data[0].inventory == ''){
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
				//html = mapFullCharacter(html)
				data.other_characters = mapFullCharacter(html.data);
				data.give = {"method":"g","label":"Items to Give","bank":inv};
				data.get = {"method":"r","label":"Items Requested"};
				//inv = inv?  JSON.parse(inv) : [];
				data.realdata = mapInventory( inv );
				data.current_character = current_character;
				$('#standalone-form').html(tmp.makeTradeUI(data))
			})
		},function(err){
			dialog('An error occured could not create trade form',false,'')	
	});
	
}
function userCreateCharacter(){
	//add the form
	//allow user to edit char_name
	//set the itital object to "new-profile":true
	queryInventory('method=currentBuild',function(html){
		$('#user-list').html(tmp.characterProfileUI({cache:cache,build:html.data[0].user_build}))
		$('#standalone-form').html('')
	})
	
}
function parseBuild(obj){
	var build = parseInt(obj.user_build) > parseInt(obj.build)? obj.user_build : obj.build
	return build;
}
function viewProfile(){
	var atts = {
		'method':'characters&char_id='+current_character,
		'template':tmp.characterProfileUI,
		'index':'<h4>Character Profile</h4>',
		'process':processChar,
		'processHtml':mapFullCharacter,
		'class':'profile',
		'callback':endHtml
	};
	buildUI(atts)
	function processChar(me){
		me = expandCharacterLess(me)
		me.staff_edit = false;		
		return me;
	}	
	function endHtml(html){
		$('.new-character-form').each(function(index, form) {
            //evaluateBuild(form)
			initSkillsDisplay(form)
			evaluateSkills(form)
        });	
	}
}
function characterCardsUI(){
	var ind = 
	'<div class="print-char inv-panel">\
		<div class="print-globals input-line">\
			<input id="less-pages" type="checkbox" value="true" checked="checked"/><!--\
		 --><label>Less Pages</label><!--\
		 --><div class="submit-button print" style="display:none">Print</div><!--\
		 --><div id="download-all-characters" class="submit-button download">Download</div><div style="clear:both"></div>\
		</div>\
	</div>';
	var atts = {
		'method':'characters',
		'template':tmp.card,
		'process':expandCharacter,
		'processHtml':mapFullCharacter,
		'class':'print-sheet',
		'callback':endHtml,
		'table':'characters',
		'where':'&where=status=\"active\"',
		'search_class':'char-search',
		'sortBy':'char_name',
		'primary':'char_id',
		'query': 'characters',
		'placeholder':'Enter Player, Character, Organization, Order, Race, or Orison',
		'index':ind
	};
	searchUI(atts)
	function endHtml(){
		//$('.submit-button.view').hide();
		$('.submit-button.print').show();
	}	
}
function printCharacter(){ 
	var atts = {
		'method':'characters&char_id='+current_character,
		'template':tmp.card,
		'index':'<div class="print-char input-line"><div class="print-globals"><input id="less-pages" type="checkbox" value="true" checked="checked"/><label>Less Pages</label><div class="submit-button print">Print</div><div id="download-character" class="submit-button download">Download</div></div><h4>Print Character Card</h4></div>',
		'process':expandCharacter,
		'processHtml':mapFullCharacter,
		'class':'print-sheet'
		//'callback':endHtml
	};
	buildUI(atts)
		
}

function expandCharacterLess(me){
	//log(me)
	me.id = cache_level;
	me.cache = cache;
	me.static = true;
	me.build = parseBuild(me);
	me.cappedBuild = me.build >  maxBuild?  maxBuild : me.build;
	me.race  = extendDataFromCache({},me.race,'races')
	me.org   = extendDataFromCache({},me.org,'organizations')
	me.order = extendDataFromCache({},me.char_order,'orders');
	me.orizon= extendDataFromCache({},me.orizon,'orizons')
	
	me.Equipment = _.filter(me.Equipment,function(obj){
		return obj.rel_active.toLowerCase() == 'y';
	})
	me.Backgrounds = _.filter(me.Backgrounds,function(obj){
		return obj.rel_active.toLowerCase() == 'y';
	})
	me.Lost_Art = _.filter(me.Lost_Art,function(obj){
		return obj.rel_active.toLowerCase() == 'y';
	})
	me.Equipment = _.map(me.Equipment,function(obj){
		obj.rel_info = obj.hasOwnProperty('rel_info') && obj.rel_info? obj.rel_info : '[]';
		obj.rel_info = obj.rel_info.replace(/\&quot;/g,'"');
		obj.rel_info = obj.rel_info.replace(/<br\/>/g,'\n');
		obj.rel_info = obj.rel_info.split('::')
		//obj.rel_info = obj.hasOwnProperty('rel_info') && obj.rel_info? obj.rel_info.split('::') : [];
		if(obj.rel_info.length > 1){
			obj.location =extendDataFromCache({},obj.rel_info[1],'locations')
		}
		obj.armor_locations = cache.armor_locations
		obj.total_damage = me.mod_damage + parseInt(obj.eq_points)
		return obj;
	})
	
	return me;
}

function expandCharacter(me){
	if($('#less-pages:checked').length==0){
		me.pages ='more-pages';
	}
	me = expandCharacterLess(me)
	me.id = me.user_id//cache_level;
	//me.cache = cache;
	//me.staff_edit = true;
	//me.static = true;
	me.armor = 0;
	me.health = 10;
	me.sys_shock = 60;
	me.mod_damage = 0;
	me.weapon_slots    = {low:0,mid:0,high:0};
	me.worn_slots      = {low:0,mid:0,high:0,pts:0};
	me.other_slots = {low:0,mid:0,high:0}; 
	me.total_slots     = {low:0,mid:0,high:0}; 
	me.user_name = me.user//user_name;
	me.level = Math.floor( (me.build -20)/10 );
	//me.build = parseBuild(me);
	me.free_build = me.build - me.build_spent;
	me.enabled_lost_arts = 0;
	me.open_lost_arts = parseInt(me.level);	
	if(me.race.hasOwnProperty('rc_id')){
		if(me.race.sys_shock){
			me.sys_shock = parseInt(me.race.sys_shock);
		}
		me.armor += parseInt(me.race.armor);
		me.other_slots.low += parseInt(me.race.rc_slot);
		me.health += parseInt(me.race.health);
		if(me.race.rc_strength){
			me.mod_damage = 1;
		}
	}
	
	_.each(me.Lost_Art,function(la){
		if(la.rel_info){
			me.enabled_lost_arts += parseInt(la.tier);
		}
	});
	me.open_lost_arts = me.open_lost_arts - me.enabled_lost_arts;
	me.Backgrounds = _.map(me.Backgrounds,function(bg){
		//get the bg name and abilities
		var f = _.find(cache.backgrounds,function(b){
			return b.bk_id == bg.skill_id;	
		})
		if(f){
			_.extend(bg,f);	
		}
		return bg;
	});
	me.bg_names = _.pluck(me.Backgrounds,'bk_name').join(', ')
	var abilities = _.pluck(me.Backgrounds, 'abilities').join(',')
	abilities = abilities.split(',');
	me.abilities = [];
	_.each(_.uniq(abilities),function(a){
		//add to new aray {name:a, count: number of occur}
		var obj = {
			name:a,count:_.filter(abilities,function(cnt){
				return cnt == a;
			}).length
		}
		me.abilities.push(obj)
	});
	me.weapons = _.filter(me.Equipment,function(obj){
		return obj.eq_type.toLowerCase() == 'weapon' || obj.eq_name.toLowerCase().indexOf('wand')!=-1 || obj.eq_name.toLowerCase() =='ring';
	})
	me.worn = _.filter(me.Equipment,function(obj){
		return obj.eq_type.toLowerCase() != 'weapon' && obj.eq_name.toLowerCase().indexOf('wand')==-1 && obj.eq_name.toLowerCase() !='ring';
	})
	_.each(me.weapons,function(obj){
		obj.total_damage = me.mod_damage + parseInt(obj.eq_points);
		var low = obj.eq_low_slot?  parseInt(obj.eq_low_slot) : 0;
		var mid = obj.eq_mid_slot?  parseInt(obj.eq_mid_slot) : 0;
		var high = obj.eq_high_slot? parseInt(obj.eq_high_slot) : 0;
		me.weapon_slots.low  += low;
		me.weapon_slots.mid  += mid;
		me.weapon_slots.high += high;
	});
	_.each(me.worn,function(obj){
		var low = obj.eq_low_slot?  parseInt(obj.eq_low_slot) : 0;
		var mid = obj.eq_mid_slot?  parseInt(obj.eq_mid_slot) : 0;
		var high = obj.eq_high_slot? parseInt(obj.eq_high_slot) : 0;
		var pts = obj.eq_points? parseInt(obj.eq_points) : 0;
		me.worn_slots.low  += low;
		me.worn_slots.mid  += mid;
		me.worn_slots.high += high;
		me.worn_slots.pts  += pts; 
	});
	me.other_slots.low  += me.weapon_slots.low;
	me.other_slots.mid  += me.weapon_slots.mid;
	me.other_slots.high += me.weapon_slots.high;
	me.total_slots.low  = parseInt(me.low)  + me.other_slots.low;
	me.total_slots.mid  = parseInt(me.mid)  + me.other_slots.mid;
	me.total_slots.high = parseInt(me.high) + me.other_slots.high;
	me.armor += me.worn_slots.pts;
	me.skill_pages = [];
	if(me.Skills){
		me.skill_pages.push(me.Skills.slice(0,20));
		me.skill_pages.push(me.Skills.slice(20));
	}else{
		me.skill_pages.push([])
		me.skill_pages.push([])
	}
	log(me)
	return me;
}
function viewTrades(){
	var cInv = [];
	var atts = {
		'method':'trades&char_id='+current_character+'&pending=true',
		'template':tmp.transListUI,
		'index':'<h4>Pending Transactions</h4>',
		'noItems':'You have no pending actions',
		'process':fixtransationData,
		'callback':secondCall,
		'class':'pending-transactions'
	};
	var atts2 = {
		'method':'trades&char_id='+current_character,
		'template':tmp.transListUI,
		'index':'<h4>Past Transactions</h4>',
		'noItems':'You have no past transactions',
		'process':fixtransationData,
		'append':true,
		'class':'past-transactions'				
	};
	getCurrentInventory(current_character,function(inv){
		cInv = inv.i;
		cacheItems(function(){
			$('#standalone-form').html('');
			buildUI(atts);
		});
	});
	function secondCall(){
		buildUI(atts2)	
	}
		
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
	var atts = {
		'method':'lost_arts',
		'template':tmp.listLostArts,
		'index':'',
		'form':tmp.newLostArtUI(),
		'noItems':'No Lost Arts',
		'table':'lost_arts',
		'where':'',
		'search_class':'la-search',
		'sortBy':'la_name',
		'primary':'la_id',
		'query': 'lost_arts',
		'placeholder':'Search Name, type, category, tree, or branch',
		'onload':true	
	}
	searchUI(atts)
	//buildUI({'method':'lost_arts','template':tmp.listLostArts,'form':tmp.newLostArtUI,'noItems':'No Lost Arts'});	
}
function tradeItems(){
	buildUI({'method':'items','template':tmp.listItems,'form':tmp.newItemUI,'noItems':'No items found'});
}
function getCharacters(){
	
	cacheItems(function(){
		cacheLostArts(function(){
			cacheUsers(function(){
				var atts = {
					'method':'characters',
					'template':tmp.characterListUI,
					'index':'',
					'form':tmp.newCharacterUI({cache:cache,staff_edit:true}),
					'noItems':'No characters found',
					//'process':processChars,
					'processHtml':mapFullCharacter,
					'callback':endChars,
					'table':'characters',
					'where':'&where=status=\"active\"',
					'search_class':'char-search',
					'sortBy':'char_name',
					'primary':'char_id',
					'query': 'characters',
					'placeholder':'Enter Player, Character, Organization, Order, Race, or Orison',
					'onload':true	
				}
				//buildUI(atts)
				searchUI(atts)
			})
		})
	})
	function endChars(){
		parseGiftBox()
		$('.new-character-form').each(function(index, form) {
            //evaluateBuild(form)
			initSkillsDisplay(form)
			evaluateSkills(form)
        });		
	}
}
function parseCharacterForm(){
	parseGiftBox()
	$('.new-character-form').each(function(index, form) {
            //evaluateBuild(form)
			initSkillsDisplay(form)
			evaluateSkills(form)
    });	
}
function processChars(me){
	c = expandCharacterLess(me)
	c.id = c.user_id;
	c.save_action = "Update";
	return c;	
}
function extendDataFromCache(start,key,type){
	var cacheKey = [];
	if(type){
		switch(type.toLowerCase()){
			case 'skills':
			cacheKey = cache.skills;
			compareKey = 'sk_id';
			break;
					
			case 'lost_art':
			cacheKey = cache.lost_arts;
			compareKey = 'la_id';
			break;
					
			case 'equipment':
			cacheKey = cache.equipment;
			compareKey = 'eq_id';
			break;
			
			case 'backgrounds':
			cacheKey = cache.backgrounds;
			compareKey = 'bk_id';
			break;
			
			case 'races':
			cacheKey = cache.races
			compareKey = 'rc_id';
			break;
			
			case 'organizations':
			cacheKey = cache.organizations
			compareKey = 'org_id';
			break;
			
			case 'orders':
			cacheKey = cache.orders
			compareKey = 'order_id';
			break;
			
			
			case 'orizons':
			cacheKey = cache.orizons
			compareKey = 'or_id';
			break;
			
			case 'locations':
			cacheKey = cache.armor_locations;
			compareKey = 'loc_id';
			break;
		}
		var f = _.find(cacheKey,function(meta){
			return meta[compareKey] == key;
		})
		if(f){
			start = _.extend(start,f);	
			return _.extend(start,{static:true});
		}
	}
	return start;	
	
}
function mapFullCharacter(data){
	var grp = _.groupBy(data,'char_id');
	var newData = [];
	_.each(_.keys(grp),function(k){
		var relCols = ['skill_id','rel_active','rel_info','rel_key','unique_info','rel_id']//rel_id
		var index = _.omit(grp[k][0],relCols)
		var relatives = _.map(grp[k],function(rel){
			var start = _.pick(rel,relCols);
			return extendDataFromCache(start,start.skill_id,start.rel_key)
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
					var g = {};
					g.qty = i.qty;
					g.static = true;
					_.extend(g,f);
					$(element).find('.gift-hold').append(tmp.giftItem(g))
				}catch(err){
					dialog('There was an error and some treasure data could not be loaded');
				}
			})
		}
    });	
}
function getUserList(){
	cacheItems()
	var atts = {
		'method':'userlist',
		'template':tmp.listUser,
		'process':processUsers,
		'noItems':'No Users Found',
		'table':'$DB_NAME.wp_users',
		'where':'&where user_status = 0',
		'search_class':'user-search',
		'join':'left join $DB_NAME.wp_bp_xprofile_data as prof on (prof.user_id=$DB_NAME.wp_users.$id_index and prof.field_id=5)',
		'sortBy':'prof.value',
		'query': 'users',
		'placeholder':'Player name or Permission level',
		'primary':'ID',
		'onload':true	
	}
	searchUI(atts)
	
	//buildUI(atts);
	
	function processUsers(u){
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
	}
	
}
function queryInventory(str,success,error,preserveQuery){
	//var url = window.ajaxurl? window.ajaxurl+'?action=inventory&' : 'inventory-system.php?';
	//var url = 'inventory-system.php?';
	if(!preserveQuery){
		_.each(queryQueue,function(q){
			q.query.abort();
		})
	}
	var url = '/wp-content/themes/second-dawn-theme/inventory-system/inventory-system.php?uid='+cache_level+'&';
	success = success? success : function(){};
	function defaultError(err){
		if(err.hasOwnProperty('status') && err.status == '404'){
			dialog('Path to inventory not found');
		}else if(err.hasOwnProperty('responseText')){
			dialog(err.responseText)
			
		}else{
			//dialog('Operation failed because an error occured',false,'<p>Error: '+err.error+'</p><p>Query: '+err.query+'</p>');
			dialog('Operation failed because an error occured',false,'');	
		}
	};
	error = error? error : defaultError
	var timeId = new Date().getTime()
	var aj =  $.ajax({
		type: 'POST',
		url: url+str,
		dataType: 'json',
		//data: {'method':'users'},
		success: function(html){
			log('QUERY INVENTORY')
			log(html)
			if(html.hasOwnProperty('error') || (_.isArray(html) && html[0].hasOwnProperty('error'))){
				removeAjax();
				doError(html);
			}else{
				//$('#devpanel').prepend('<div class="dev-result"><h3>'+html.method+'</h3>'+html.query+'</div>')
				removeAjax();
				success(html);
			}			
		},
		error: doError
	});
	var onlyMethod  = str.indexOf('&')==-1? str.length : str.substring(0,str.indexOf('&'))
	queryQueue.push({'query':aj,'method':onlyMethod,'id':timeId});
	
	function removeAjax(){
		queryQueue = _.reject(queryQueue,function(qry){
			return qry.id == timeId
		});
	}
	function doError(err){
		log(err)
		var method = str.replace(/\&/g,'%26')
		var obj = {}
		obj.method = str.replace(/\&/g,'%26');
		obj.user = cache_level
		if(err.hasOwnProperty('statusText') && err.statusText == "abort"){
		}else{
			if(err.hasOwnProperty('responseText')){
				obj.error = err.responseText;
				obj.error_type = 'PHP';
			}else{
				var query = err.query;
				query = query.replace(/(\r\n|\n|\r)/gm,'<br/>');
				query = query.replace(/\\t/g,' ');
				obj.query = query;
				obj.error = err.error;
				obj.error_type = 'MYSQL';
				//var text = '<div class="dev-result"><h3>User:  '+cache_level+'<br/>Request:</h3><p>'+method+'</p><h3>Error type:</h3><p>MYSQL</p><h3>Error:</h3><p>'+encodeURIComponent(err)+'</p><h3>Query</h3><p>'+query+'</p></div>'
				//log(query)
			
				//log(text)
				//sendMail(text)
			}
			var email = tmp.errorEmail(obj)
			sendMail(encodeURIComponent(email))
			try{
				error(err);
			}catch(errr){
				defaultError(err);	
			}
		}
	}
	
}
function sendMail(message){
	var url = '/wp-content/themes/second-dawn-theme/inventory-system/inventory-system.php?uid='+cache_level+'&method=sendMail&message='+message;
	$.ajax({
		type: 'POST',
		url: url,
		dataType: 'json',
		//data: {'method':'users'},
		success: function(html){
			log('email sent with error')		
		}
	});	
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
	var relationships = [];
	var transaction = {};
	$(form).find('[relation-name]').each(function(index, rel) {
        var val = $(rel).attr('data-value')? $(rel).attr('data-value') : $(rel).val()
		var pval = [];
		
		if(val){
			try {
				pval = JSON.parse(val);
			}catch(err){
				pval = val;
			}
			if(_.isArray(pval)){
				relationships = relationships.concat(pval)
			}
		}
    });
	$(form).find('[trans-name]').each(function(index, tran) {
		var val = $(tran).attr('data-value')? $(tran).attr('data-value') : $(tran).val()
		transaction[$(tran).attr('trans-name')] = val;
	})
	retObj['transinfo'] = transaction;
	retObj['relationships'] = JSON.stringify(relationships);
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