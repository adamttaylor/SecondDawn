var tmpstr = {};
tmpstr.accessDrop = 
'<select class="access-dropdown">\
	{{#each .}}<option{{#if selected}} selected="selected"{{/if}}>{{text}}</option>{{/each}}\
</select>';

tmpstr.listEvents = 
'<div id="user-{{id}}" class="list-item event">\
	<div class="outer">\
		<div class="inner">\
			<div class="input-line">\
				{{#unless limited}}<div class="show-more edit-item circle-button edit"></div>{{/unless}}\
				<div class="event-name">{{post_title}}</div>\
			</div>\
			<div class="description">{{DTT_EVT_start}} - {{DTT_EVT_end}}</div>\
		</div>\
		<div id="form-box"></div>\
	</div>\
</div>';

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
				{{#unless limited}}<div class="show-more edit-item circle-button edit"></div>{{/unless}}\
				<div class="user-name">{{name}}</div>\
				{{#if permission_level}}{{permission_level}}{{else}}User{{/if}}\
				{{#if isPlat}}<div class="platinum pending search-button">Platinum</div>{{/if}}\
			</div>\
			<div class="description">{{{char}}}</div>\
		</div>\
		<div id="form-box">{{>editUserForm}}</div>\
	</div>\
</div>';
tmpstr.editUserForm = 
'<div class="virtual-form staff-form edit-user inv-panel">\
	<input type="hidden" name="user_id" value="{{id}}"/>\
	<div class="grid quarter">\
		<div class="outer">\
			<label>Permission Level</label>\
			<div class="input-inner">\
				<select name="permission_level" class="access-dropdown">\
					{{#each select}}<option{{#if selected}} selected="selected"{{/if}}>{{text}}</option>{{/each}}\
				</select>\
			</div>\
		</div>\
	</div>\
	<div class="grid quarter">\
		<div class="outer">\
			<label>Build</label>\
			<div class="input-inner">\
				<input id="user_build" type="text" name="user_build" value="{{#if user_build}}{{user_build}}{{else}}50{{/if}}"/>\
			</div>\
		</div>\
	</div>\
	<div class="grid quarter">\
		<div class="outer">\
			<label>Dawn Points</label>\
			<div class="input-inner">\
				<input type="number" name="dawn_points" value="{{dawn_points}}"/>\
			</div>\
		</div>\
	</div>\
	<div class="grid quarter">\
		<div class="outer">\
			<label>Platinum End Date</label>\
			<div class="input-inner">\
				<input type="date" name="platinum" value="{{platinum}}"/>\
			</div>\
		</div>\
	</div>\
	<div class="grid">\
		<div class="outer">\
			<label>Permissions</label>\
			<div class="input-inner">\
				<div class="checklist">\
					<input type="checkbox" name="permission-edit-la" value="true"{{#if permission-edit-la}} checked="checked"{{/if}}/><label>Edit Lost Arts</label>\
			 	</div><!--\
			 --><div class="checklist">\
					<input type="checkbox" name="permission-edit-user" value="true"{{#if permission-edit-user}} checked="checked"{{/if}}/><label>Edit Users</label>\
				</div>\
			</div>\
		</div>\
	</div>\
	<span class="update-build circle-button save"></span>\
	<div class="input-line">\
		{{#if user_perm.edit-user}}<div id="create-character" class="submit-button update-build">Update</div>{{/if}}\
	</div>\
</div>';
tmpstr.newCharacterUI = 
'{{#unless char_name}}<div class="headline inv-panel"><h3>Create New Character</h3></div>{{/unless}}\
<div class="virtual-form staff-form new-character-form inv-panel" data-action="{{#if save_action}}{{save_action}}{{else}}Create{{/if}}">\
	<input type="hidden" trans-name="trans_type" value="inventory"/>\
	<input type="hidden" trans-name="trans_action" value="assign"/>\
	<input type="hidden" trans-name="reciever" value="{{#if char_id}}{{char_id}}{{else}}@last_char_id{{/if}}"/>\
	<input type="hidden" trans-name="sender" value="0"/>\
	<input type="hidden" trans-name="trans_status" value="Accepted"/>\
	<input type="hidden" name="init-inventory" value="{{#if inventory}}{{inventory}}{{else}}[]{{/if}}"/>\
	<input type="hidden" name="cappedBuild" value="{{#if cappedBuild}}{{cappedBuild}}{{else}}50{{/if}}"/>\
	<input type="hidden" name="init-build" value="{{#if build}}{{build}}{{else}}50{{/if}}"/>\
	<input type="hidden" name="build_spent" value="{{build_spent}}"/>\
	{{#ifCond save_action create}}\
	{{else}}\
		<input type="hidden" name="char_id" value="{{char_id}}"/>\
	{{/ifCond}}\
	<div class="grid half">\
		<div class="outer">\
			<label>Character Name</label>\
			<div class="input-inner">\
				<input type="text" class="required" name="char_name" value="{{char_name}}"/>\
			</div>\
		</div>\
	</div><!--\
 --><div class="grid half">\
		<div class="outer">\
			<label>True Name</label>\
			<div class="input-inner">\
				<input type="text" name="true_name" value="{{true_name}}"/>\
			</div>\
		</div>\
	</div><!--\
 --><div class="grid quarter">\
		<div class="outer">\
			<label>Assign to: </label>\
			<div class="input-inner">\
				<select name="assign_user_id">\
					<option value="">Select User</option>\
					{{#each cache.users}}\
						<option value="{{id}}" {{#ifCond ../id id}} selected="selected"{{/ifCond}}>{{name}}</option>\
					{{/each}}\
				</select>\
			</div>\
		</div>\
	</div><!--\
 --><div class="grid eighth">\
		<div class="outer">\
			<label>Build</label>\
			<div class="input-inner">\
				<input type="text" name="build" value="{{#if build}}{{build}}{{else}}50{{/if}}"/>\
			</div>\
		</div>\
	</div><!--\
 --><div class="grid eighth">\
		<div class="outer">\
			<label>Lives</label>\
			<div class="input-inner">\
				<input type="text" name="lives" value="{{#if lives}}{{lives}}{{else}}3{{/if}}"/>\
			</div>\
		</div>\
	</div><!--\
  --><div class="grid quarter">\
		<div class="outer">\
			<label>Race</label>\
			<div class="input-inner">\
				<select name="race">\
					<option value="">Choose Race:</option>\
					{{#each cache.races}}\
						<option id="{{rc_id}}" value="{{rc_id}}" {{#ifCond rc_id ../race.rc_id}}selected="selected"{{/ifCond}}>{{rc_name}}</option>\
					{{/each}}\
				</select>\
			</div>\
		</div>\
	</div><!--\
 --><div class="grid quarter">\
		<div class="outer">\
			<label>Class</label>\
			<div class="input-inner">\
				<select id="class-selector" name="char_class">\
					<option value="">Choose Class</option>\
					{{#each cache.classes}}\
						<option id="{{class_id}}" value="{{class_name}}" {{#ifCond class_name ../char_class}}selected="selected"{{/ifCond}}>{{class_name}}</option>\
					{{/each}}\
				</select>\
			</div>\
		</div>\
	</div><!--\
  --><div class="grid quarter">\
		<div class="outer">\
			<label>Organization</label>\
			<div class="input-inner">\
				<select name="org">\
					<option value="">Choose Organization</option>\
					{{#each cache.organizations}}\
						<option value="{{org_id}}" {{#ifCond org_id ../org.org_id}}selected="selected"{{/ifCond}}>{{org_name}}</option>\
					{{/each}}\
				</select>\
			</div>\
		</div>\
	</div><!--\
   --><div class="grid quarter">\
		<div class="outer">\
			<label>Order</label>\
			<div class="input-inner">\
				<select name="char_order">\
					<option value="">Choose Order</option>\
					{{#each cache.orders}}\
						<option value="{{order_id}}" {{#ifCond order_id ../order.order_id}}selected="selected"{{/ifCond}}>{{order_name}}</option>\
					{{/each}}\
				</select>\
			</div>\
		</div>\
	</div><!--\
 --><div class="grid quarter">\
		<div class="outer">\
			<label>Orison</label>\
			<div class="input-inner">\
				<select name="orizon">\
					<option value="">Choose Orison</option>\
					{{#each cache.orizons}}\
						<option value="{{or_id}}" {{#ifCond or_id ../orizon.or_id}}selected="selected"{{/ifCond}}>{{or_name}}</option>\
					{{/each}}\
				</select>\
			</div>\
		</div>\
	</div><!--\
 --><div class="grid">\
		<div class="outer">\
			<label>Notes</label>\
			<div class="input-inner">\
				<textarea name="notes">{{char_notes}}</textarea>\
			</div>\
		</div>\
	</div><!--\
-->{{>backgroundBox}}<!--\
--><div class="bankbox slotsbox{{#if method}} {{method}}{{else}} a{{/if}}" data-method="{{#if method}}{{method}}{{/if}}">\
		<p class="title">Slots <small class="spent-slots"></small></p>\
		<div class="bank-hold">\
		<div class="list-item"><div class="inner">\
			<div class="input-line quarter low">\
				<label class="slot-title">Low Slots</label>\
				<span id="low" class="add-slot circle-button new"></span>\
				<span id="low" class="minus-slot circle-button open" style="display:none"></span>\
				<div class="input-wrap">\
					<div class="input-inner">\
						<input id="init-value" type="hidden"  value="{{#if low}}{{low}}{{else}}0{{/if}}"/>\
						<input id="low-slots" type="hidden" name="low" value="{{#if low}}{{low}}{{else}}0{{/if}}">\
						<label>{{#if low}}{{low}}{{else}}0{{/if}}</label>\
					</div>\
				</div>\
			</div>\
			<div class="input-line quarter mid">\
				<label class="slot-title">Mid Slots</label>\
				<span id="mid" class="add-slot circle-button new"></span>\
				<span id="mid" class="minus-slot circle-button open" style="display:none"></span>\
				<div class="input-wrap">\
					<div class="input-inner">\
						<input id="init-value" type="hidden" value="{{#if mid}}{{mid}}{{else}}0{{/if}}"/>\
						<input id="mid-slots" type="hidden" name="mid" value="{{#if mid}}{{mid}}{{else}}0{{/if}}">\
						<label>{{#if mid}}{{mid}}{{else}}0{{/if}}</label>\
					</div>\
				</div>\
			</div>\
			<div class="input-line quarter high">\
				<label class="slot-title">High Slots</label>\
				<span id="high" class="add-slot circle-button new"></span>\
				<span id="high" class="minus-slot circle-button open" style="display:none"></span>\
				<div class="input-wrap">\
					<div class="input-inner">\
						<input id="init-value" type="hidden"  value="{{#if high}}{{high}}{{else}}0{{/if}}"/>\
						<input id="high-slots" type="hidden" name="high" value="{{#if high}}{{high}}{{else}}0{{/if}}">\
						<label>{{#if high}}{{high}}{{else}}0{{/if}}</label>\
					</div>\
				</div>\
			</div>\
		</div>\
		</div></div>\
	</div><!--\
-->{{>skillBox}}<!--\
-->{{>lostArtBox}}<!--\
-->{{>equipmentBox}}\
	{{>giftBox}}\
	<div class="input-line eighth">\
		<label>Active: </label>\
		<div class="input-wrap">\
			<div class="input-inner">\
				<select name="status2">\
					<option value="">Active</option>\
					<option value="d"{{#ifCond status2 "d"}} selected="selected"{{/ifCond}}>Deceased</option>\
					<option value="r"{{#ifCond status2 "r"}} selected="selected"{{/ifCond}}>Retired</option>\
				</select>\
			</div>\
		</div>\
	</div>\
	<div class="input-line">\
		<div id="create-character" class="submit-button {{#if save_action}}{{save_action}}{{else}}Create{{/if}}">{{#if save_action}}{{save_action}}{{else}}Create{{/if}}</div>\
	</div>\
</div>';

tmpstr.characterProfileUI = 
'<div class="headline inv-panel">{{#if char_name}}<h3>{{plurals char_name}} Profile</h3>{{else}}Create Character{{/if}}</div>\
<div class="virtual-form new-character-form inv-panel" data-action="{{#if char_name}}profile{{else}}create-profile{{/if}}">\
	<input type="hidden" name="build" value="{{#if build}}{{build}}{{else}}50{{/if}}"/>\
	<input type="hidden" name="cappedBuild" value="{{#if cappedBuild}}{{cappedBuild}}{{else}}50{{/if}}"/>\
	<input type="hidden" name="build_spent" value="{{build_spent}}"/>\
	<input type="hidden" name="char_id" value="{{char_id}}"/>\
	<input type="hidden" name="lives" value="{{#if lives}}{{lives}}{{else}}3{{/if}}"/>\
	{{#if char_name}}\
	<input type="hidden" name="char_name" value="{{char_name}}"/><!--\
	{{else}}\
	<div class="grid half">\
		<div class="outer">\
			<label>Character Name</label>\
			<div class="input-inner">\
				<input type="text" class="required" name="char_name" value="{{char_name}}"/>\
			</div>\
		</div>\
	</div><!--\
	{{/if}}\
 --><div class="grid half">\
		<div class="outer">\
			<label>True Name</label>\
			<div class="input-inner">\
				<input type="text" name="true_name" value="{{true_name}}"/>\
			</div>\
		</div>\
	</div><!--\
 --><div class="grid eighth">\
		<div class="outer">\
			<label>Build</label>\
			<div class="input-inner">\
				<label>{{#if cappedBuild}}{{cappedBuild}}{{else}}{{#if build}}{{build}}{{else}}50{{/if}}{{/if}}</label>\
			</div>\
		</div>\
	</div><!--\
 --><div class="grid eighth">\
		<div class="outer">\
			<label>Lives</label>\
			<div class="input-inner">\
				<label>{{#if lives}}{{lives}}{{else}}3{{/if}}</label>\
			</div>\
		</div>\
	</div><!--\
 --><div class="grid quarter">\
		<div class="outer">\
			<label>Race</label>\
			<div class="input-inner">\
				{{#if race.rc_name}}\
					<label>{{race.rc_name}}</label>\
				{{else}}\
					<select name="race">\
						<option value="">Choose Race:</option>\
						{{#each cache.races}}\
							<option id="{{rc_id}}" value="{{rc_id}}">{{rc_name}}</option>\
						{{/each}}\
					</select>\
				{{/if}}\
			</div>\
		</div>\
	</div><!--\
 --><div class="grid quarter">\
		<div class="outer">\
			<label>Class</label>\
			<div class="input-inner">\
				{{#if char_class}}\
					<input type="hidden" id="class-selector" name="char_class" value="{{char_class}}">\
					<label>{{char_class}}</label>\
				{{else}}\
					<select id="class-selector" name="char_class">\
						<option value="">Choose Class</option>\
						{{#each cache.classes}}\
							<option id="{{class_id}}" value="{{class_name}}">{{class_name}}</option>\
						{{/each}}\
					</select>\
				{{/if}}\
			</div>\
		</div>\
	</div><!--\
  --><div class="grid quarter">\
		<div class="outer">\
			<label>Organization</label>\
			<div class="input-inner">\
				{{#if org.org_name}}\
					<label>{{org.org_name}}</label>\
				{{else}}\
					<select name="org">\
						<option value="">Choose Organization</option>\
						{{#each cache.organizations}}\
							<option value="{{org_id}}">{{org_name}}</option>\
						{{/each}}\
					</select>\
				{{/if}}\
			</div>\
		</div>\
	</div><!--\
   --><div class="grid quarter">\
		<div class="outer">\
			<label>Order</label>\
			<div class="input-inner">\
				{{#if order.order_name}}\
					<label>{{order.order_name}}</label>\
				{{else}}\
					<select name="char_order">\
						<option value="">Choose Order</option>\
						{{#each cache.orders}}\
							<option value="{{order_id}}">{{order_name}}</option>\
						{{/each}}\
					</select>\
				{{/if}}\
			</div>\
		</div>\
	</div><!--\
 --><div class="grid quarter">\
		<div class="outer">\
			<label>Orison</label>\
			<div class="input-inner">\
				{{#if orizon.or_name}}\
					<label>{{orizon.or_name}}</label>\
				{{else}}\
					<select name="orizon">\
						<option value="">Choose Orison</option>\
						{{#each cache.orizons}}\
							<option value="{{or_id}}">{{or_name}}</option>\
						{{/each}}\
					</select>\
				{{/if}}\
			</div>\
		</div>\
	</div><!--\
-->{{>backgroundBox}}<!--\
--><div class="bankbox a slotsbox">\
		<p class="title">Slots <small class="spent-slots"></small></p>\
		<div class="bank-hold">\
		<div class="list-item"><div class="inner">\
			<div class="input-line quarter low">\
				<label class="slot-title">Low Slots</label>\
				<span id="low" class="add-slot circle-button new"></span>\
				<span id="low" class="minus-slot circle-button open" style="display:none"></span>\
				<div class="input-wrap">\
					<div class="input-inner">\
						<input id="init-value" type="hidden"  value="{{#if low}}{{low}}{{else}}0{{/if}}"/>\
						<input id="low-slots" type="hidden" name="low" value="{{#if low}}{{low}}{{else}}0{{/if}}">\
						<label>{{#if low}}{{low}}{{else}}0{{/if}}</label>\
					</div>\
				</div>\
			</div>\
			<div class="input-line quarter mid">\
				<label class="slot-title">Mid Slots</label>\
				<span id="mid" class="add-slot circle-button new"></span>\
				<span id="mid" class="minus-slot circle-button open" style="display:none"></span>\
				<div class="input-wrap">\
					<div class="input-inner">\
						<input id="init-value" type="hidden" value="{{#if mid}}{{mid}}{{else}}0{{/if}}"/>\
						<input id="mid-slots" type="hidden" name="mid" value="{{#if mid}}{{mid}}{{else}}0{{/if}}">\
						<label>{{#if mid}}{{mid}}{{else}}0{{/if}}</label>\
					</div>\
				</div>\
			</div>\
			<div class="input-line quarter high">\
				<label class="slot-title">High Slots</label>\
				<span id="high" class="add-slot circle-button new"></span>\
				<span id="high" class="minus-slot circle-button open" style="display:none"></span>\
				<div class="input-wrap">\
					<div class="input-inner">\
						<input id="init-value" type="hidden"  value="{{#if high}}{{high}}{{else}}0{{/if}}"/>\
						<input id="high-slots" type="hidden" name="high" value="{{#if high}}{{high}}{{else}}0{{/if}}">\
						<label>{{#if high}}{{high}}{{else}}0{{/if}}</label>\
					</div>\
				</div>\
			</div>\
		</div>\
		</div></div>\
	</div><!--\
-->{{>skillBox}}<!--\
-->{{>lostArtBox}}<!--\
-->{{>equipmentBox}}\
	<div class="input-line">\
		<div id="create-character" class="submit-button profile">{{#if char_name}}Update{{else}}Create{{/if}}</div>\
	</div>\
</div>';


tmpstr.characterListUI =
'<div id="{{char_id}}" class="list-item character{{#if pending}} pending{{/if}}">\
	<div class="outer">\
		<div class="inner">\
			<div class="input-line">\
				{{#unless limited}}<div class="show-more edit-item circle-button edit"></div><div class="archive-character circle-button archive"></div>{{/unless}}\
				<div class="char-name">{{char_name}}</div>\
				<div id="{{id}}" class="user_name">{{user}}</div>\
				<div id="plus-print" class="search-button"></div>\
				<div id="player-view" class="search-button">View as Player</div>\
				{{#if pending}}<div class="pending search-button">Pending</div>{{/if}}\
			</div>\
		</div>\
		<div class="data-hold" style="display:none">{{string .}}</div>\
		<div id="form-box" class="char-process"></div>\
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
						<input type="number" value="{{qty}}" data-name="qty"/>\
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
						<input type="number" value="{{#if qty}}{{qty}}{{else}}1{{/if}}" data-name="qty"/>\
					</div>\
				</div>\
			</div>\
			<div class="input-line">\
				<div class="input-wrap">\
					<div class="input-inner">\
						<select id="select-gift" data-name="item_id">\
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
			<input id="active" type="hidden" data-name="active" value="{{rel_active}}"/>\
			<div class="show-more circle-button view"></div>\
			<div class="remove-la circle-button close"></div>\
			<div class="input-line enable-la">\
				<div class="input-wrap">\
					<div class="input-inner">\
						<div{{#ifCond locked "y"}} class="locked"{{/ifCond}}><input type="checkbox" value="enabled" {{#ifCond locked "y"}}checked="checked"{{else}}{{#ifCond rel_info "enabled"}} checked="checked"{{/ifCond}}{{/ifCond}}/><label>Enable</label></div>\
					</div>\
				</div>\
			</div>\
			<div class="input-line tier">\
				<div class="input-wrap">\
					<div class="input-inner">\
						<div><label>{{tier}}</label></div>\
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
		<div id="form-box"><div class="inner">{{la_description}}</div></div>\
	</div>\
{{else}}\
	<div class="bank-item lost-art-item list-item">\
	<input id="active"  type="hidden" data-name="active" value="y"/>\
		<div class="inner">\
			<div class="remove-la circle-button close"></div>\
			<div class="input-line enable-la">\
				<div class="input-wrap">\
					<div class="input-inner">\
						<div><input type="checkbox" value="enabled" {{#unless disable}}checked="checked"{{/unless}}/><label>Enable</label></div>\
					</div>\
				</div>\
			</div>\
			<div class="input-line tier">\
				<div class="input-wrap">\
					<div class="input-inner">\
						<div><label>&nbsp;</label></div>\
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

tmpstr.backgroundItem = 
'{{#if static}}\
	<div class="bank-item background-item static list-item">\
		<div class="inner">\
			<input id="active" type="hidden" data-name="active" value="{{rel_active}}"/>\
			<div class="remove-background circle-button close"></div>\
			<div class="input-line">\
				<div class="input-wrap">\
					<div class="input-inner">\
						<input id="bg_id" type="hidden" value="{{skill_id}}"/>\
						<label>{{bk_name}}, {{abilities}}</label>\
					</div>\
				</div>\
			</div>\
		</div>\
	</div>\
{{else}}\
	<div class="bank-item background-item list-item">\
	<input id="active" type="hidden" data-name="active" value="y"/>\
		<div class="inner">\
			<div class="remove-background circle-button close"></div>\
			<div class="input-line">\
				<div class="input-wrap">\
					<div class="input-inner">\
						<select id="bg_id" data-name="bg_id" list="la_list">\
							<option id="{{bk_id}}" value="">Select background</div>\
							{{#each cache.backgrounds}}\
								<option id="{{bk_id}}" value="{{bk_id}}">{{bk_name}}:   {{abilities}}</div>\
							{{/each}}\
						</select>\
					</div>\
				</div>\
			</div>\
		</div>\
	</div>\
{{/if}}';

tmpstr.equipmentItem = 
'<div class="bank-item equipment-item {{#if static}}static{{/if}} list-item">\
	{{#if unique_info}}<input id="unique_info" type="hidden" value="{{unique_info}}"/>{{/if}}\
	<input id="rel_id" type="hidden" value="{{rel_id}}"/>\
	<input id="active" type="hidden" data-name="active" value="{{rel_active}}"/>\
	<div class="inner first">\
		<div class="remove-equipment circle-button close"></div><!--\
	 --><div class="grid half">\
			<div class="outer">\
				<div class="input-inner">\
					<input id="eq_info-label" type="text" value="{{rel_info.[0]}}" placeholder="Item Name"/>\
				</div>\
			</div>\
		</div><!--\
	 --><div class="grid quarter">\
			<div class="outer">\
				<div class="input-inner">\
					<input id="eq_id" type="hidden" value="{{skill_id}}"/>\
					<label id="eq_type_name">{{eq_name}}, {{quality}}</label>\
				</div>\
			</div>\
		</div><!--\
	 --><div class="grid quarter">\
			<div class="outer">\
				<div class="input-inner">\
					<select id="location" data-name="rel_info_b"{{#if location.loc_name}} value="{{location.loc_id}}"{{/if}}>\
						<option value="" {{#unless location.loc_id}} selected="selected"{{/unless}}>Unequipped</div>\
						{{#each armor_locations}}\
							<option id="loc-{{loc_id}}" value="{{loc_id}}" {{#ifCond ../location.loc_name loc_name}} selected="selected"{{/ifCond}}>{{loc_name}}</option>\
						{{/each}}\
					</select>\
				</div>\
			</div>\
		</div>\
	</div><!--\
 --><div class="inner">\
		<div class="grid">\
			<div class="outer">\
				<div class="input-inner">\
					<textarea id="notes">{{#if description}}{{{description}}}{{else}}{{rel_info.[2]}}{{/if}}</textarea>\
				</div>\
			</div>\
		</div>\
	</div>\
</div>';

tmpstr.skillItem = 
'<div id="{{sk_id}}" class="bank-item skill-item list-item{{#if static}} static{{/if}}{{#unless current}} need_prereq wrong-class{{/unless}}" data-char-class="{{sk_class}}" data-prereq="{{sk_prereq}}"{{#if sk_prereq_eval}}data-sk-prereq-eval="{{sk_prereq_eval}}"{{/if}}>\
	<div class="inner">\
		<input id="active" type="hidden" data-name="active" value="{{rel_active}}"/>\
		<input id="sk_id" type="hidden" value="{{sk_id}}"/>\
		<input id="sk_class" type="hidden" value="{{sk_class}}"/>\
		<input id="sk_name" type="hidden" value="{{sk_name}}"/>\
		<input id="sk_cost" type="hidden" value="{{sk_cost}}"/>\
		<input id="tags" type="hidden" value="{{tags}}"/>\
		{{#if current}}{{#unless starting_skill}}<div class="remove-skill circle-button close"></div>{{/unless}}\
		{{else}}<div class="move-skill circle-button move"></div>\
		{{/if}}\
		<div class="show-more circle-button view"></div>\
		<label class="sk_cost">{{sk_cost}}</label>\
		<label>{{sk_name}}</label>\
		<div class="show-prereq">Prerequisite: {{sk_prereq}}</div>\
	</div>\
	<div id="form-box"><div class="inner">{{sk_ability}}</div></div>\
</div>';

tmpstr.lostArtBox =
'<div class="bankbox lost-art-box{{#if method}} {{method}}{{else}} a{{/if}}" data-value="{{#if lost_art_list}}{{lost_art_list}}{{else}}[]{{/if}}" data-method="{{#if method}}{{method}}{{/if}}" relation-name="lost_arts">\
	<p class="title">Lost Arts</span><span class="add-lost-art inline-button">Add Lost Art</span><span class="title-right lost-art-max">Open Lost Arts<span class="inv-container available-la-count">{{#if level}}{{level}}{{else}}3{{/if}}</span></span></p>\
	<div class="bank-hold lost-art-hold">\
	{{#if Lost_Art}}{{#each Lost_Art}}\
		{{>lostArt .}}\
	{{/each}}{{/if}}\
	</div>\
</div>';

tmpstr.backgroundBox =
'<div class="bankbox background-box{{#if method}} {{method}}{{else}} a{{/if}}" data-value="{{background_list}}" data-method="{{#if method}}{{method}}{{/if}}" relation-name="backgrounds">\
	<p class="title">Backgrounds\
		<span class="title-right"><span class="add-background inline-button">Add Background</span>\
		<span class="inv-container"><select id="bk_selector">\
			<option id="{{eq_id}}" value="">Select Background</div>\
			{{#each cache.backgrounds}}\
				<option id="{{bk_id}}" value="{{bk_id}}" data-name="{{bk_name}}" data-abilities="{{abilities}}">{{bk_name}}, {{abilities}}</div>\
			{{/each}}\
		</select></span></span>\
	</p>\
	<div class="bank-hold background-hold">\
	{{#if Backgrounds}}{{#each Backgrounds}}\
		{{#if active}}{{>backgroundItem .}}{{/if}}\
		{{#if rel_active}}{{>backgroundItem .}}{{/if}}\
	{{/each}}{{/if}}\
	</div>\
</div>';

tmpstr.equipmentBox =
'<div class="bankbox equipment-box{{#if method}} {{method}}{{else}} a{{/if}}" data-value="{{equipment_list}}" data-method="{{#if method}}{{method}}{{/if}}" relation-name="equipment">\
	<p class="title">Equipment\
		<span class="title-right"><span class="add-equipment inline-button">Add Equipment</span>\
		<span class="inv-container"><select id="eq_selector">\
			<option id="{{eq_id}}" value="">Select Equipment</div>\
			{{#each cache.equipment}}\
				<option id="{{eq_id}}" value="{{eq_id}}" data-name="{{eq_name}}" data-quality="{{quality}}" data-props="{{eq_props}}" data-locations="{{location_areas}}">{{eq_name}}, {{quality}}</div>\
			{{/each}}\
		</select></span></span>\
	</p>\
	<div class="bank-hold equipment-hold">\
	{{#if Equipment}}{{#each Equipment}}\
		{{#if active}}{{>equipmentItem this}}{{/if}}\
		{{#if rel_active}}{{>equipmentItem this}}{{/if}}\
	{{/each}}{{/if}}\
	</div>\
</div>';

tmpstr.skillBox =
'<div class="bankbox skill-box{{#if method}} {{method}}{{else}} a{{/if}}" data-value="{{equipment_list}}" data-method="{{#if method}}{{method}}{{/if}}" relation-name="skills">\
	<p class="title">Skills  <small class="spent-skills"></small><span class="title-right free-build-ui">Free Build<span class="inv-container free-build-count">{{#if free_build}}{{free_build}}{{else}}50{{/if}}</span></p>\
	<div class="skill-panel {{#unless char_class}}no_class_selected{{/unless}}">\
		<label class="index">Cost</label><label class="index">All Skills</label><label class="buyable-skills" style="display:none">Purchasable Skills Only >></label><label class="all-skills">Show All Skills >></label>\
		<div class="bank-hold select skill-hold">\
		<div class="no-items">select a class</div>\
		{{#each cache.buyskills}}{{>skillItem .}}{{/each}}\
		</div>\
	</div><!--\
 --><div class="skill-panel {{#unless char_class}}no_class_selected{{/unless}}">\
		<label class="index">Cost</label><label class="index">Current Skills</label>\
		<div class="bank-hold assign skill-hold">\
		<div class="no-items">select a class</div>\
		{{#if Skills}}\
			{{#each Skills}}\
				{{#if active}}{{>skillItem .}}{{/if}}\
				{{#if rel_active}}{{>skillItem .}}{{/if}}\
			{{/each}}\
		{{else}}\
			{{#each cache.startskills}}\
				{{>skillItem .}}\
			{{/each}}\
		{{/if}}\
		</div>\
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
tmpstr.listGroups =  
'<div id="{{grp_id}}" class="list-item four group">\
	<div class="outer">\
		<div class="inner">\
			<div class="input-line">\
				<div class="show-more edit-item circle-button edit"></div>\
				<div class="name"><span class="group_name">{{grp_name}}:</span> <small>{{grp_type}}</small></div>\
			</div>\
		</div>\
		{{#unless limited}}<div id="form-box"><div class="inner"><div class="delete-group circle-button archive"></div>{{>newGroupUI .}}</div></div>{{/unless}}\
	</div>\
</div>';

tmpstr.newGroupUI =
'{{#unless grp_name}}\
	<div class="headline inv-panel"><h3>Create New Group</h3></div>\
{{/unless}}\
<div data-method="{{#unless grp_name}}create{{else}}update{{/unless}}" class="virtual-form new-item-form {{#unless grp_name}}inv-panel{{/unless}}">\
	{{#if grp_id}}<input type="hidden" value="{{grp_id}}" name="grp_id"/>{{/if}}\
	<div class="grid half">\
		<div class="outer">\
			<label>Group Name</label>\
			<div class="input-inner">\
				<input type="text" class="required" name="grp_name" value="{{grp_name}}"/>\
			</div>\
		</div>\
	</div><!--\
 --><div class="grid half">\
		<div class="outer">\
			<label>Group Name</label>\
			<div class="input-inner">\
				<select name="grp_type">\
					<option>organization</option>\
					<option {{#ifCond grp_type "order"}} selected="selected"{{/ifCond}}>order</option>\
				</select>\
			</div>\
		</div>\
	</div><!--\
 --><div class="grid half">\
		<div class="outer">\
			<label>Skill Name</label>\
			<div class="input-inner">\
				<input type="text" class="required" name="o_skill" value="{{o_skill}}"/>\
			</div>\
		</div>\
	</div><!--\
 --><div class="input-line right">\
		<div id="create-group" class="submit-button">{{#if grp_name}}Update{{else}}Save{{/if}}</div>\
	</div>\
</div>';

tmpstr.newItemUI =
'{{#unless item_name}}\
	<div class="headline inv-panel"><h3>Create New Item</h3></div>\
{{/unless}}\
<div data-method="{{#unless item_name}}create{{else}}update{{/unless}}" class="virtual-form new-item-form {{#unless item_name}}inv-panel{{/unless}}">\
	<input type="hidden" name="item_type" value="Treasure">\
	{{#if item_id}}<input name="item_id" type="hidden" value="{{item_id}}"/>{{/if}}\
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
				<div class="statement">{{statement}} ( {{trans_status}} )</div>\
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
'<div id="{{la_id}}" class="list-item lost-art">\
	<div class="outer">\
		<div class="inner">\
			<div class="input-line">\
				<div class="show-more edit-item circle-button edit"></div>\
				<div class="la-name">{{la_name}}</div>\
				<div id="lost-art-ops" class="description search-button">\
					Tier: {{tier}}, Teach: {{#ifCond teach "y"}}yes{{else}}no{{/ifCond}}, Locked: {{#ifCond locked "y"}}yes{{else}}no{{/ifCond}}\
				</div>\
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
		<label>Type</label>\
		<div class="input-wrap"><div class="input-inner">\
			<input type="text" name="la_type"{{#if la_type}} value="{{la_type}}"{{/if}}/>\
		</div></div>\
	</div>\
	<div id="la_category" class="input-line quarter">\
		<label>Category</label>\
		<div class="input-wrap"><div class="input-inner">\
			<input type="text" name="la_category"{{#if la_category}} value="{{la_category}}"{{/if}}/>\
		</div></div>\
	</div>\
	<div id="la_tree" class="input-line quarter">\
		<label>Tree</label>\
		<div class="input-wrap"><div class="input-inner">\
			<input type="text" name="la_tree"{{#if la_tree}} value="{{la_tree}}"{{/if}}/>\
		</div></div>\
	</div>\
	<div id="branch" class="input-line quarter">\
		<label>Branch</label>\
		<div class="input-wrap"><div class="input-inner">\
			<input type="text" name="branch"{{#if branch}} value="{{branch}}"{{/if}}/>\
		</div></div>\
	</div>\
	<div id="tier" class="input-line quarter">\
		<label>Tier</label>\
		<div class="input-wrap"><div class="input-inner">\
			<input type="text" name="tier"{{#if tier}} value="{{tier}}"{{/if}}/>\
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
		{{#if user_perm.edit-la}}<div id="create-lost-art" class="submit-button">{{#if la_name}}Update{{else}}Save{{/if}}</div>{{/if}}\
	</div>\
</div>';
tmpstr.searchBar = 
'<div class="search-bar inv-panel {{class}}">\
	<div class="search-line input-line">\
		<div class="input-wrap">\
			<div class="input-inner">\
				<div class="search-icon"></div><input id="search-input" type="text" name="build" placeholder="{{placeholder}}" value="{{searchVal}}" data-last-search="{{searchVal}}"/>\
				{{#if pages}}\
					<span class="title-right pgSelect">Pg:<select id="start-index">\
					{{#times pages}}\
						<option>{{this}}</option>\
					{{/times}}\
					</select></span>\
				{{else}}\
					<div id="search-view" class="search-button">GO</div>\
				{{/if}}\
				<div style="clear:both"></div>\
			</div>\
		</div>\
	</div>\
	<label>Total items: {{total}}</label>\
</div>';
tmpstr.errorEmail = 
'<table width=500 border=0><tr><td width=110 style=background:wheat;padding:10px>User</td><td width="380">{{user}}</td></tr><tr><td style=background:wheat;padding:10px>Request</td><td style=background:#F0F0F0;padding:10px>{{method}}</td></tr><tr><td style=background:wheat;padding:10px>Type</td>\<td style=padding:10px>{{error_type}}</td></tr><tr><td style=background:wheat;padding:10px>Error</td>\<td style=background:#F0F0F0;padding:10px>{{error}}</td></tr>{{#if query}}<tr><td style=background:wheat;padding:10px>Query</td><td style=padding:10px>{{query}}</td></tr>{{/if}}</table>'
function plurals(name,options){
	var last = name.substring(name.length-1)
	var plural = last=='s'? "'" : "'s"
	return name+plural;
}
function initTemplates(){
	Handlebars.registerHelper('plurals',plurals);
	Handlebars.registerHelper('string',log);
	var partials = [
		{alias: 'newcharacter',		VAR: 'newCharacterUI'},
		{alias: 'newitem',			VAR: 'newItemUI'},
		{alias: 'item',				VAR: 'listItems'},
		{alias: 'access',			VAR: 'accessDrop'},
		{alias: 'giftBox',			VAR: 'giftBox'},
		{alias: 'inventory',		VAR: 'inventory'},
		{alias: 'newLostArt',		VAR: 'newLostArtUI'},
		{alias: 'lostArtBox',		VAR: 'lostArtBox'},
		{alias: 'lostArt',			VAR: 'lostArtItem'},
		{alias: 'backgroundItem',	VAR: 'backgroundItem'},
		{alias: 'backgroundBox',	VAR: 'backgroundBox'},
		{alias: 'equipmentItem',	VAR: 'equipmentItem'},
		{alias: 'equipmentBox',		VAR: 'equipmentBox'},
		{alias: 'skillBox',			VAR: 'skillBox'},
		{alias: 'skillItem',		VAR: 'skillItem'},
		{alias: 'editUserForm',		VAR: 'editUserForm'},
		{alias: 'newGroupUI',		VAR: 'newGroupUI'},
	]
	_.each(partials,function(ps){
		Handlebars.registerPartial(ps.alias,tmpstr[ps.VAR]);
	});
	Handlebars.registerHelper('times', function(n, block) {
		var accum = '';
		for(var i = 1; i < n+1; ++i)
			accum += block.fn(i);
		return accum;
	});
	Handlebars.registerHelper('ifCond', function(v1, v2, options) {
		if(v1 === v2 || (this[v1]===v2 && typeof v2 != 'undefined')) {
			return options.fn(this);
		}
		return options.inverse(this);
	});
	Handlebars.registerHelper('string', function(v1,options) {
	 	return JSON.stringify(v1);
	});
	//Like an each loop but with a minimum num or loops
	Handlebars.registerHelper('min', function(context, count, options) {
      if (!options) {
        throw new Exception('Must pass iterator to #each');
      }

      var fn = options.fn, inverse = options.inverse;
      var i = 0, ret = "", data;

      var contextPath;
      if (options.data && options.ids) {
        contextPath = Utils.appendContextPath(options.data.contextPath, options.ids[0]) + '.';
      }

      if (_.isFunction(context)) { context = context.call(this); }

      if (options.data) {
        data = Handlebars.createFrame(options.data);
      }

      if(context && typeof context === 'object') {
        if (_.isArray(context)) {
          for(var j = context.length; i<count; i++) {
            if (data) {
              data.index = i;
              data.first = (i === 0);
              data.last  = (i === (context.length-1));

              if (contextPath) {
                data.contextPath = contextPath + i;
              }
            }
            ret = ret + fn(context[i], { data: data });
          }
        } else {
          for(var key in context) {
            if(context.hasOwnProperty(key)) {
              if(data) {
                data.key = key;
                data.index = i;
                data.first = (i === 0);

                if (contextPath) {
                  data.contextPath = contextPath + key;
                }
              }
              ret = ret + fn(context[key], {data: data});
              i++;
            }
          }
        }
      }

      if(i === 0){
        ret = inverse(this);
      }

      return ret;
    });
	
	_.each(_.keys(tmpstr),function(k){
		tmp[k] = Handlebars.compile(tmpstr[k])
	});
}