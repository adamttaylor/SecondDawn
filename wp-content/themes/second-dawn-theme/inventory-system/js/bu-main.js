var tmpstr = {};
var tmp = {};
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
	<input type="submit" class="show-more new-character circle-button" value="+"/>\
	<div class="name">{{name}}</div>\
	<div class="access">{{>access select}}</div>\
	<div class="characters">{{{char}}}</div>\
	<div id="form-box">{{>newcharacter}}</div>\
</div>';

tmpstr.newCharacterUI = 
'<div class="new-character-form inventory-box">\
	<div class="input-line small"><label>Character Name</label><div class="input-wrap"><input type="text" class="required" name="char_name"/></div><input type="submit" id="link-user" name="link-user" value="Create"/></div>\
</div>';

tmpstr.characterListUI =
'<div id="char-{{char_id}}" class="list-item character">\
	<input type="submit" class="show-more show-character circle-button" value="+"/>\
	<div class="name">{{char_name}}</div>\
	<div id="{{id}}" class="user_name">{{user}}</div>\
	<div id="form-box"><div>Character details</div></div>\
</div>';

tmpstr.makeTradeUI = 
'<div class="trade-form inventory-box">\
message, notes, trade to, trade type, itemlist,: add anonymmous to chars, and staff, for staff\
	<div id="type" class="input-line"><label>Action</label></div>\
	<div id="sender" class="input-line"><label>From:</label><select class="character-drop"><option>Loading...</option></select></div>\
	<div id="reciever" class="input-line"><label>To:</label><select class="user-list-drop"><option>Loading...</option></select></div>\
	<div id="send-resources" class="input-line">Resources here</div>\
	<div id="get-resources" class="input-line">Resources here</div>\
</div>';

tmpstr.newItemUI =
'<div class="new-item-form inventory-box">\
	<div id="item_name" class="input-line"><label>Name</label><div class="input-wrap"><input class="required" type="text" name="item_name"/></div></div>\
	<div id="item_type" class="input-line"><label>Type</label><select name="item_type"><option value="loot">Treasure</option><option value="plot">Plot</option></select></div>\
	<div id="item_value" class="input-line"><label>Value</label><div class="input-wrap"><input type="text" name="item_value" value="1"/></div></div>\
	<div id="item_description" class="input-line"><label>Description</label><textarea name="item_description"></textarea></div>\
	<div id="trade_options" class="input-line"><label>Trade options</label>\<select name="trade-options">\
			<option value="gt">Give & Trade</option>\
			<option value="g">Give Only</option>\
		</select>\
	</div>\
	<input type="submit" id="create-item" value="Create"/>\
</div>';
tmpstr.listItems = 
'<div id="{{item_id}}" class="list-item item">\
	<input type="submit" class="show-more show-character circle-button" value="+"/>\
	<div class="name">{{item_name}}</name>\
	<div class="type">{{type}}</div>\
	<div class="value">{{item_value}}</div>\
	<div class="options">{{trade_options}}</div>\
	<div id="form-box"><div>{{item_description}}</div></div>\
</div>';

function log(str){
	console.log(str)
}
var p = '';
$(document).ready(function(){
	Handlebars.registerPartial('newcharacter',tmpstr.newCharacterUI);
	Handlebars.registerPartial('access',tmpstr.accessDrop);
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
		$(this).stop().animate({opacity:0}, 14000,closeDialog)
	});
	$('#footer-dialog .close, #footer-dialog .answer-no').click(function(){
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
			queryInventory("method=add_character&char_name="+char_name+"&user_id="+user_id,function(html){
				dialog('User "'+char_name+'" created')
				var userlst = tmp.characterlist({name:char_name})
				$(item).find('.characters').append(userlst);				
			},function(err){
				dialog('An error occured adding "'+char_name+'"')	
			});
		}
	});
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
		if($(this).val()=='+'){			
			$(this).val('-');
			$(item).find("#form-box").stop().animate({height:$(item).find("#form-box").contents().outerHeight()})
		}else{
			$(this).val('+');
			$(item).find("#form-box").stop().animate({height:0});
		}
	});
	$('body').on('change','.list-item.user .access select',function(){
		log('---> Changed')
		var id = $(this).parents('.list-item.user').attr('id').replace(/user-/g,'');
		var val = $(this).val();
		log(id+'::'+val)
		queryInventory("method=permission&user_id="+id+"&level="+val,function(html){
			dialog('Permissions updated')	
			//$(charNode).remove();
		},function(err){
			log(err)
			dialog('An error occured permissions could not be set',false,'<p>Error: '+err[0].error+'</p><p>Query: '+err[0].query+'</p>')	
		});
	})
	$('body').on('click','#create-item',function(){
		var frm = $(this).parents('.inventory-box');
		var valid = validateForm(frm,true);
		if(valid){
			var data = formData(frm);
			var qstr = jsonToQueryVar(data);
			queryInventory("method=createItem"+qstr,function(html){
				dialog('Item "'+data.item_name+'" Created')	
				//$(charNode).remove();
			},function(err){
				log(err)
				dialog('An error occured "'+data.item_name+'" was not saved',false,'<p>Error: '+err[0].error+'</p><p>Query: '+err[0].query+'</p>')	
			});	
		}
	});
	//formData(form)
	
});
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
	if(answer){
		$('#footer-dialog').trigger('answer-yes');
	}else{
		$('#footer-dialog').trigger('answer-no');
	}
	$('#footer-dialog').removeClass('prompt');
}
function init(){
	//getUsers()
	//getUserList()
	//getCharacters()
	tradeItems()
}
function buildUI(method,template,index,form,noItems,process){
	index = index? index : '';
	form = form? form : '';
	$('#standalone-form').html(form);
	$('#user-list').html(index);
	if(template){
		queryInventory("method="+method,function(html){
			log((html.length>0)+'::'+( html[0].data != ''))
			if(html.length>1 || html[0].data != ''){
				_.each(html,function(h){
					if(typeof process == 'function'){
						h = process(h);	
					}
					$('#user-list').append(template(h))
				});
			}else if(noItems){
				$('#user-list').html(noItems);
			}
		});
	}
}
function tradeItems(){
	buildUI("items",tmp.listItems,'',tmp.newItemUI,"No items found")
	
	/*$('#standalone-form').html(tmp.newItemUI());	
	$('#user-list').html('');
	queryInventory("method=items",function(html){
		log(html)
		_.each(html,function(c){
			$('#user-list').append(tmp.listItems(c))
		});
	});*/
}
function getCharacters(){
	var ind = '<div id="character-none" class="list-item index"><div class="name">Name</div><div class="user">User</div></div>';
	buildUI("characters",tmp.characterListUI,ind,tmp.newCharacterUI,"No characters found")
	
	/*$('#standalone-form').html(tmp.newCharacterUI());
	$('#user-list').html('<div id="character-none" class="list-item index"><div class="name">Name</div><div class="user">User</div></div>')
	queryInventory("method=characters",function(html){
		log(html)
		_.each(html,function(c){
			$('#user-list').append(tmp.characterListUI(c))
		});		
	});*/
}
/*function getUsers(){
	queryInventory("method=users",function(html){
		//$('#user-id')
		_.each(html,function(u){
			//log(u);
			$('#user-id').append('<option value="'+u.id+'">'+u.name+'</option>');
		});
	},function(err){
		log(err)
	});
}*/
function getUserList(){
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
	
	/*$('#standalone-form').html('');
	$('#user-list').html('<div id="user-none" class="list-item index"><div class="name">Name</div><div class="access">Permissions</div><div class="characters">Characters</div></div>')
	queryInventory("method=userlist",function(html){
		_.each(html,function(u){
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
			$('#user-list').append(tmp.listUser(u));
		});
	});*/
}
function queryInventory(str,success,error){
	success = success? success : function(){};
	error = error? error : function(err){ dialog('Operation failed because an error occured',false,'<p>Error: '+err[0].error+'</p><p>Query: '+err[0].query+'</p>')};
	$.ajax({
		type: 'POST',
		//url: "inventory-system.php",
		url: 'inventory-system.php?'+str,
		dataType: 'json',
		//data: {'method':'users'},
		success: function(html){
			if(html[0].hasOwnProperty('error')){
				error(html);
			}else{
				success(html);
			}			
		},
		error: error
	});
	
}
function validateForm(target,notify){
	$(target).find('.invalid').removeClass('invalid')
	$(target).find('input[type=text].required').each(function(index, element) {
		
        if(!$(element).val()){
			$(element).addClass('invalid');
		}
    });
	$(target).find('select.required').each(function(index, element) {
        if(!$(element).val()){
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
	$(form).find('input[name],select[name],textarea[name]').each(function(index, element) {
    	//var obj = {};
		retObj[$(element).attr('name')] = $(element).val();
		//retArr.push(obj);
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
	queryInventory('method=build',
	function(){
		dialog('Database Rebuilt')
	},function(err){
		log('ERROR:')
		log(err)
		$('.error-text').append(err.responseText)
	})
	/*$.ajax({
		type: 'POST',
		//url: "inventory-system.php",
		url: "method=build",
		dataType: 'json',
		//data: {'method':'users'},
		success: function(){
			log('successs. Database created')
		},
		error: function(err){
			log('ERROR:')
			log(err)
			$('.error-text').append(err.responseText)
		}
	});*/
}