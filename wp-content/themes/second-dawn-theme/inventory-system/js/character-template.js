tmpstr.card =
'<div class="character-sheet {{pages}}">\
  <div class="char-top"></div>\
  <table cellpadding="0" cellspacing="0" border="0" width="100%" class="main-page char-page full">\
    <tr class="bottom-line">\
      <td><table cellpadding="0" cellspacing="0" width="100%" border="0">\
          <tr class="top-line">\
            <td class="print-logo"><img class="print-logo" src="data:image/jpg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAABkAAD/4QNvaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjAtYzA2MSA2NC4xNDA5NDksIDIwMTAvMTIvMDctMTA6NTc6MDEgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6MzIyNzdEMUVBRThCRTQxMTk3OTRFMjYxRUZDQ0Q1NzMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QzA4OEMwMjI4QzZBMTFFNEFBOTlGMEY2MDY1OUU0MkQiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QzA4OEMwMjE4QzZBMTFFNEFBOTlGMEY2MDY1OUU0MkQiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNS4xIFdpbmRvd3MiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo0MDU0OTBFRjUzOENFNDExOTNEM0RCOThFNUEzM0Y2QSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDozMjI3N0QxRUFFOEJFNDExOTc5NEUyNjFFRkNDRDU3MyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6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"/></td>\
            <td class="character-name"><h1>{{char_name}}</h1></td>\
            <td class="player-name top"><h2>{{user_name}}</h2></td>\
            <td class="level top"><h2>{{level}}</h2></td>\
            <td class="build"><h2><span class="free-build">{{free_build}}</span>/{{build}}</h2></td>\
          </tr>\
        </table></td>\
    </tr>\
    <tr class="bottom-line">\
      <td><table cellpadding="0" cellspacing="0" id="slots-table" class="inline-tbl top-space" width="200" border="0">\
          <tr>\
            <td class="index">Slots</td>\
            <td class="index">Low</td>\
            <td class="index" >Mid</td>\
            <td class="index">High</td>\
          </tr>\
          <tr>\
            <td class="left-pad">Build</td>\
            <td>{{low}}</td>\
            <td>{{mid}}</td>\
            <td>{{high}}</td>\
          </tr>\
          <tr>\
            <td class="left-pad">Other</td>\
            <td>{{other_slots.low}}</td>\
            <td>{{other_slots.mid}}</td>\
            <td>{{other_slots.high}}</td>\
          </tr>\
          <tr>\
            <td class="shade left-pad">Total</td>\
            <td class="shade">{{total_slots.low}}</td>\
            <td class="shade">{{total_slots.mid}}</td>\
            <td class="shade">{{total_slots.high}}</td>\
          </tr>\
        </table>\
        <table cellpadding="0" cellspacing="0" id="under-top-table"  class="inline-tbl top-space" width="200" border="0">\
          <tr>\
            <td class="index character-name">Character</td>\
            <td class="index player-name">Player</td>\
            <td class="index level">Level</td>\
            <td class="index build">Build</td>\
          </tr>\
        </table>\
        <table cellpadding="0" cellspacing="0" id="class-table"  class="inline-tbl"width="200" border="0">\
          <tr>\
            <td class="attr"><span class="key short left-pad">Class:</span><span class="value">{{char_class}}</span></td>\
            <td class="attr"><span class="key">Organization:</span><span class="value">{{org.org_name}}</span></td>\
            <td class="attr"><span class="key">Orizon:</span><span class="value">{{orizon.or_name}}</span></td>\
          </tr>\
          <tr>\
            <td class="attr"><span class="key short left-pad">Race:</span><span class="value">{{race.rc_name}}</span></td>\
            <td class="attr"><span class="key">Order:</span><span class="value">{{order.order_name}}</span></td>\
            <td class="attr"><span class="key">Pantheon:</span><span class="value">{{orizon.pantheon}}</span></td>\
          </tr>\
        </table>\
        <table cellpadding="0" cellspacing="0" id="class-table" width="100%" border="0">\
          <tr>\
            <td class="shade small left-pad">Backgrounds: {{bg_names}}</td>\
          </tr>\
          <tr>\
            <td class="left-pad"><span class="ability">Secondary Skills:</span>{{#each abilities}}<span class="ability"><span class="num">{{count}}:</span>{{name}}</span>{{/each}}</td>\
          </tr>\
        </table></td>\
    </tr>\
    <tr class="bottom-line">\
      <td><table cellpadding="0" cellspacing="0" id="race-table" class="top-space">\
          <tr>\
            <td class="index">Racial Advantages</td>\
            <td class="index">Racial Disadvantages</td>\
          </tr>\
          <tr>\
            <td class="full-text">{{race.rc_benefit}}</td>\
            <td class="full-text">{{race.rc_disadvantage}}</td>\
          </tr>\
        </table>\
        <div class="defense-box shade">Defense</div></td>\
    </tr>\
    <tr class="bottom-line">\
      <td><table cellpadding="0" cellspacing="0" class="full top-space">\
          <tr>\
            <td class="line-item index"><span class="item-name">Worn Items</span><span class="type">Type</span><span class="quality">Quality</span><span class="location">Location</span><span class="armor-num">Armor</span><span class="slot-num">L</span><span class="slot-num">M</span><span class="slot-num">H</span><span class="combat">Combat</span></td>\
          </tr>\
        </table>\
        <table cellpadding="0" cellspacing="0" class="worn short">\
			{{#min worn 9}}\
				<tr>\
					<td class="line-item worn"><span class="item-name">{{#if rel_info.[0]}}{{rel_info.[0]}}{{else}}<span class="empty-val"></span>{{/if}}</span><span class="type">{{eq_type}}</span><span class="quality">{{quality}}</span><span class="location">{{location.loc_name}}</span><span class="armor-num">{{eq_points}}</span><span class="slot-num">{{eq_low_slot}}</span><span class="slot-num">{{eq_mid_slot}}</span><span class="slot-num">{{eq_high_slot}}</span></td>\
				</tr>\
			{{/min}}\
        </table>\
        <table cellpadding="0" cellspacing="0" id="combat-counts">\
          <tr>\
            <td><span class="label">Lives</span><span class="count">{{lives}}</span></td>\
          </tr>\
          <tr>\
            <td><span class="label">Health</span><span class="count">{{health}}</span></td>\
          </tr>\
          <tr>\
            <td><span class="label">Armor</span><span class="count">{{armor}}</span></td>\
          </tr>\
          <tr>\
            <td><span class="label">Bleed</span><span class="count">60</span></td>\
          </tr>\
          <tr>\
            <td><span class="label">Sys Shock</span><span class="count">{{sys_shock}}</span></td>\
          </tr>\
          <tr>\
            <td><span class="label">Death</span><span class="count">120</span></td>\
          </tr>\
        </table>\
        <table class="upper-line full">\
          <tr>\
            <td><div class="shade total-box"><span class="total-text">Total:</span><span class="slot-num armor">{{worn_slots.pts}}</span><span class="slot-num">{{worn_slots.low}}</span><span class="slot-num">{{worn_slots.mid}}</span><span class="slot-num">{{worn_slots.high}}</span></div>\
              <div class="damage-box shade">Damage</div></td>\
          </tr>\
        </table></td>\
    </tr>\
    <tr class="bottom-line">\
      <td><table cellpadding="0" cellspacing="0" class="full top-space">\
          <tr>\
            <td class="line-item index"><span class="item-name">Weapons</span><span class="type">Type</span><span class="quality">Quality</span><span class="tag-line">Tagline</span><span class="slot-num">L</span><span class="slot-num">M</span><span class="slot-num">H</span><span class="damage-base">Base</span><span class="damage-mod">Modified</span><span class="damage-total">Total</span></td>\
          </tr>\
        </table>\
        <table cellpadding="0" cellspacing="0" class="full weapon short">\
          {{#min weapons 6}}\
				<tr>\
					<td class="line-item worn"><span class="item-name">{{#if rel_info.[0]}}{{rel_info.[0]}}{{else}}<span class="empty-val"></span>{{/if}}</span><span class="type">{{eq_type}}</span><span class="quality">{{quality}}</span><span class="tag-line">{{eq_tags}}</span><span class="slot-num">{{eq_low_slot}}</span><span class="slot-num">{{eq_mid_slot}}</span><span class="slot-num">{{eq_high_slot}}</span><span class="damage-base">{{eq_points}}</span><span class="damage-mod">{{#if eq_points}}{{../../mod_damage}}{{/if}}</span><span class="damage-total">{{total_damage}}</span></td>\
				</tr>\
		 {{/min}}\
        </table>\
        <table class="upper-line full weapon-totals">\
          <tr>\
            <td><div class="shade total-box"><span class="total-text">Total:</span><span class="slot-num armor"></span><span class="slot-num">{{weapon_slots.low}}</span><span class="slot-num">{{weapon_slots.mid}}</span><span class="slot-num">{{weapon_slots.high}}</span></div></td>\
          </tr>\
        </table></td>\
    </tr>\
    <tr>\
      <td><table class="skill-table short">\
          <tr>\
            <td class="index">Skill Name</td>\
		  </tr>\
		   <tr><td class="line-item"></td></tr>\
		  {{#min skill_pages.[0] 20}}\
            <tr><td class="line-item">{{#if sk_name}}{{sk_name}}{{else}}<span class="empty-val"></span>{{/if}}</td></tr>\
		  {{/min}}\
		  </table>\
		  <table class="skill-table short">\
          <tr>\
            <td class="index">Skill Name</td>\
		  </tr>\
		   <tr><td class="line-item"></td></tr>\
		  {{#min skill_pages.[1] 20}}\
             <tr><td class="line-item">{{#if sk_name}}{{sk_name}}{{else}}<span class="empty-val"></span>{{/if}}</td></tr>\
		  {{/min}}\
		  </table>\
		  <table class="skill-table short">\
          <tr>\
            <td class="index">Notes / Updates</td>\
		  </tr>\
		  <tr><td class="line-item"></td></tr>\
		  {{#min skill_pages.[0] 20}}\
             <tr><td class="line-item">&nbsp;</td></tr>\
		  {{/min}}\
          </tr>\
        </table></td>\
    </tr>\
  </table>\
  {{#each skill_pages}}\
  {{#if [0].sk_name}}\
	  <table class="char-page skill-page full upper-line ind-{{@index}}">\
		<tr>\
		  <td colspan="2" class="index">Skills</td>\
		</tr>\
		<tr>\
		  <td colspan="2"></td>\
		</tr>\
		{{#each .}}\
		<tr>\
		  <td class="line-item">{{sk_name}}</td>\
		  <td class="line-item">{{sk_ability}}</td>\
		</tr>\
		{{/each}}\
	  </table>\
  {{/if}}\
  {{/each}}\
  {{#if Lost_Art.length}}\
  <table class="char-page lost-art-index upper-line full">\
    <tr>\
      <td class="index"><span class="title">Lost Arts</span>\
        <div class="lost-art-legend"> Enabled Lost Arts:\
          <div class="key">Available</div>\
          <div class="value">{{level}}</div>\
          <div class="key">Used</div>\
          <div class="value">{{enabled_lost_arts}}</div>\
          <div class="key">Open</div>\
          <div class="value">{{open_lost_arts}}</div>\
        </div></td>\
    </tr>\
    <tr>\
      <td><table class="lost-art-list full upper-line">\
          <tr>\
            <td class="index line-item"><span class="name title">Name</span><span class="category">Category</span><span class="requirement">Requirement</span><span class="teach">Teach</span><span class="tier">Tier</span><span>Lock</span><span class="enable">Enable</span></td>\
          </tr>\
          <tr>\
            <td></td>\
          </tr>\
		  {{#each Lost_Art}}\
          <tr>\
            <td  class="line-item"><span class="name first">{{la_name}}</span><span class="category">{{la_category}}</span><span class="requirement">{{la_prereq}}</span><span class="teach">{{#ifCond teach "y"}}yes{{else}}no{{/ifCond}}</span><span class="tier">{{tier}}</span><span>{{#ifCond locked "y"}}yes{{else}}no{{/ifCond}}</span><span class="enable">{{#if rel_info}}yes{{else}}no{{/if}}</span></td>\
          </tr>\
		  {{/each}}\
        </table></td>\
    </tr>\
  </table>\
  <table class="char-page lost-art skill-page full upper-line">\
    <tr>\
      <td colspan="2" class="index">Lost Arts</td>\
    </tr>\
    <tr>\
      <td colspan="2"></td>\
    </tr>\
	{{#each Lost_Art}}\
    <tr>\
      <td class="line-item">{{la_name}}</td>\
      <td class="line-item">{{la_description}}</td>\
    </tr>\
	{{/each}}\
  </table>\
  {{/if}}\
  {{#if Equipment.length}}\
  <table class="equipment-page char-page full upper-line">\
    <tr>\
      <td colspan="2" class="index line-item"><span class="name title">Non Consumeable Items</span><span class="item">Item</span><span class="type">Type</span><span class="quality">Quality</span><span class="low">L</span><span class="mid">M</span><span class="high">H</span></td>\
    </tr>\
    <tr>\
      <td><table class="full">\
	  {{#each Equipment}}\
	  	<tr>\
            <td class="line-item"><div>\
                <div class="first-line"> <span class="name">{{rel_info.[0]}}</span><span class="item">{{eq_type}}</span><span class="type">{{eq_name}}</span><span class="quality">{{quality}}</span><span class="low">{{eq_low_slot}}</span><span class="mid">{{eq_mid_slot}}</span><span class="high">{{eq_high_slot}}</span></div>\
                <div class="influence">\
                  <div class="inf-type">{{#ifCond eq_type "Weapon"}}Damage{{else}}Armor{{/ifCond}}</div>\
                  <div class="num">{{#if total_damage}}{{total_damage}}{{else}}{{eq_points}}{{/if}}</div>\
                </div>\
                <div class="descp">Information:<br/>{{#if rel_info.[2]}}{{rel_info.[2]}}{{else}}{{eq_props}}{{/if}}</div>\
              </div>\
            </td>\
          </tr>\
	  {{/each}}\
      </table></td>\
    </tr>\
  </table>\
  {{/if}}\
</div>';