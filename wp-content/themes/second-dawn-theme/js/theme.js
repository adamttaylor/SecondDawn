var fixed_menu = true;
var GT3THEME_INSTALLED = true;
window.jQuery = window.$ = jQuery;

/* *** script.js *** */
var demo = true;


jQuery(document).ready(function() {
	//Add auto mentions for username in posts
	if (jQuery.fn.mentions){
		jQuery('#bbp_reply_content').mentions({ resultsbox : '#bbp_reply_content', resultsbox_position : 'after' });	
	}
	if(jQuery('.current-menu-item').length<1){
		jQuery('li#menu-item-15').addClass('current-menu-item');
	}
	jQuery('ul.social').appendTo('li#menu-item-15');//Move the Social menu to the correct place
	
	jQuery('.logout-menu a').attr('href',jQuery('.logout-link').text());//Fix menu to add logout link to menu
	
	jQuery('.forum-item').click(function(){
		var href = jQuery(this).find('.text h3 a').attr('href');
		if(href){
			window.location = href;
		}
	});
	addLoginForm()
	scrollingActions();
	openResponseActions();
	addMobileMenu();
	createSubNavigation('.prime','.second');
	addFixedMenu();
	subNavigationActions('.prime')
	checkFloatie();
	
	setTimeout("jQuery('body').removeClass('faded')",500);
	//Quidditch functionality encasulated into functions: may not use any of the below
	quidditchInputClickClears();
	quidditchFormActions();
	quidditchNivoSliderSetup();
	quidditchOnePageScripts();
	quidditchPortfolioHover();
	quidditchMisc();
	quidditchTestimonials();
	quidditchSponsors();
	quidditchPriceTables();
	//Hide Powered by Quform
	jQuery('.iphorm-inner div:contains("Powered by Quform")').hide();
	var $container = $('.topstory.masonry');
	$container.masonry({
		columnWidth: 390,
		itemSelector: '.story',
		gutter:20,
		isFitWidth:true
	});
	
	
});
function addLoginForm(){
	var formstr = 
	'<form name="loginform" class="loginform" action="" method="post">\
		<div class="incorrect" style="display:none">The username or password entered is incorrect.</div>\
		<div class="ajax-error" style="display:none">There was an error and you could not be logged in.<br/> Try again later</div>\
 		<p><label for="user_login">Username</label><input type="text" name="log" id="user_login" class="input" value="" size="20"></p>\
        <p><label for="user_pass">Password</label><input type="password" name="pwd" id="user_pass" class="input" value="" size="20"></p>\
        <p class="forgetmenot"><label for="rememberme"><input name="rememberme" type="checkbox" id="rememberme" value="forever"> Remember Me</label></p>\
        <p class="submit">\
        	<input type="submit" name="wp-submit" id="wp-submit" class="button button-primary button-large" value="Log In">\
            <input type="hidden" name="redirect_to" value="/">\
            <input type="hidden" name="testcookie" value="1">\
        </p>\
        <div style="margin-bottom: 3px;"><b>Or</b></div>\
        <div class="fball_ui">\
        	<div class="fball_form" title="Facebook All"><span id="fball-facebook-login">\
            	<a href="javascript:void(0);" title="Login with Facebook" onclick="FbAll.facebookLogin();" class="fball_login_facebook"><span>Login with Facebook</span></a></span></div>\
            <div id="fball_facebook_auth">\
            	<input type="hidden" name="client_id" id="client_id" value="310014599159287">\
                <input type="hidden" name="redirect_uri" id="redirect_uri" value="'+window.location.href+'">\
            </div>\
            <input type="hidden" id="fball_login_form_uri" value="">\
    	</div>\
	</form>';
	jQuery('#loginformHere').html(formstr);    
	jQuery('.log-bg .secure').appendTo(jQuery('#loginformHere form'));
	jQuery('#loginformHere form').submit(function(event){
		event.preventDefault();
		if(!jQuery('#loginformHere form').hasClass('intransit')){
			jQuery('#loginformHere form').addClass('intransit');
			jQuery('#loginformHere .ajax-error, #loginformHere.incorrect').hide();
			console.log('Clicked')
			var dat = jQuery('#loginformHere form').serializeObject();
		
			dat.action = 'ajaxlogin';
			console.log(dat)
			//'action': 'ajaxlogin'
			//set test cookie as 1
			setCookie('TEST_COOKIE','WP Cookie check',30);
			jQuery.ajax({
				type: 'POST',
				url: '/wp-admin/admin-ajax.php',//ajax_login_object.ajaxurl,
				data: dat,
				complete: function(){
					//console.log('done')
				},
				success: function(html){
					console.log(html)
					var outcome = JSON.parse(html);
					if(outcome.loggedin){
						location.reload();
					}else{	
						jQuery('#loginformHere form').removeClass('intransit');
						jQuery('#loginformHere .incorrect').show();
					}
				},
				error: function(err){
					//console.log(err)
					jQuery('#loginformHere form').removeClass('intransit');
					jQuery('#loginformHere .ajax-error').show();
				}
			})
			return false;
		}
	});
}
$.fn.serializeObject = function()
{
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};
function setCookie(c_name,value,exdays){
	var exdate=new Date();
	exdate.setDate(exdate.getDate() + exdays);
	var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
	document.cookie=c_name + "=" + c_value;
}
jQuery(window).load(function(){
	//Widget Flickr
	jQuery('.flickr_badge_image a').append('<div class="flickr_wrapper" style="opacity:0"></div>');	
	jQuery('.wpcf7-form .wpcf7-text').each(function(){		
		jQuery(this).width(jQuery(this).parents('.wpcf7-form').width()-32);
	});	
	jQuery('.wpcf7-form .wpcf7-textarea').each(function(){		
		jQuery(this).width(jQuery(this).parents('.wpcf7-form').width()-32);
	});	

	/*FW Gallery*/
	var fw_items_in_row = 6;
	if (jQuery('.content_block').hasClass('no-sidebar')) {
		if (jQuery('html').hasClass('user_bg_layout')) {
			if (jQuery(window).width() > 1440) fw_items_in_row = 6;
			if (jQuery(window).width() < 1025 && jQuery(window).width() > 768) fw_items_in_row = 4;
			if (jQuery(window).width() < 769 && jQuery(window).width() > 480) fw_items_in_row = 3;
			if (jQuery(window).width() < 481 && jQuery(window).width() > 320) fw_items_in_row = 2;
			if (jQuery(window).width() < 321) fw_items_in_row = 1;
		} else {
			if (jQuery(window).width() > 1440) fw_items_in_row = 6;
			if (jQuery(window).width() < 1440 && jQuery(window).width() > 1367) fw_items_in_row = 6;
			if (jQuery(window).width() < 1367 && jQuery(window).width() > 1025) fw_items_in_row = 5;
			if (jQuery(window).width() < 1025 && jQuery(window).width() > 768) fw_items_in_row = 4;
			if (jQuery(window).width() < 769 && jQuery(window).width() > 480) fw_items_in_row = 3;
			if (jQuery(window).width() < 481 && jQuery(window).width() > 320) fw_items_in_row = 2;
			if (jQuery(window).width() < 321) fw_items_in_row = 1;
		}
	}
	jQuery('.fw_gallery').find('.gallery_item').each(function(){
		jQuery(this).width(Math.floor(jQuery(window).width()/fw_items_in_row));
	});

});

jQuery(window).resize(function(){
	//HTML
	if (jQuery(window).width() < 1024 && jQuery(window).width() > 760) {
		jQuery('.featured_items .img_block').each(function(){
			jQuery(this).find('.featured_circle').attr('style', 'background:url('+jQuery(this).find('img').attr('src')+'); background-size:auto '+(jQuery(this).width())+'px; height:'+(jQuery(this).width())+'px; width:'+(jQuery(this).width())+'px;');
		});	
		jQuery('.module_team .img_block').each(function(){
			jQuery(this).find('.featured_circle').attr('style', 'background:url('+jQuery(this).find('img').attr('src')+'); background-size:auto '+(jQuery(this).width())+'px; height:'+(jQuery(this).width())+'px; width:'+(jQuery(this).width())+'px;');
		});		
		jQuery('.columns2 .portfolio_item_img').each(function(){
			jQuery(this).find('.featured_circle').attr('style', 'background:url('+jQuery(this).find('img').attr('src')+'); background-size:auto '+(jQuery(this).width()-56)+'px; height:'+(jQuery(this).width())+'px; width:'+(jQuery(this).width())+'px;');
		});
		jQuery('.columns3 .portfolio_item_img').each(function(){
			jQuery(this).find('.featured_circle').attr('style', 'background:url('+jQuery(this).find('img').attr('src')+'); background-size:auto '+(jQuery(this).width()-56)+'px; height:'+(jQuery(this).width())+'px; width:'+(jQuery(this).width())+'px;');
		});
		jQuery('.columns4 .portfolio_item_img').each(function(){
			jQuery(this).find('.featured_circle').attr('style', 'background:url('+jQuery(this).find('img').attr('src')+'); background-size:auto '+(jQuery(this).width()-56)+'px; height:'+(jQuery(this).width())+'px; width:'+(jQuery(this).width())+'px;');
		});
	}
	else {
		jQuery('.featured_items .img_block').each(function(){
			jQuery(this).find('.featured_circle').attr('style', 'background:url('+jQuery(this).find('img').attr('src')+'); background-size:auto '+(jQuery(this).width()-110)+'px; height:'+(jQuery(this).width()-110)+'px; width:'+(jQuery(this).width()-110)+'px;');
		});	
		jQuery('.module_team .img_block').each(function(){
			jQuery(this).find('.featured_circle').attr('style', 'background:url('+jQuery(this).find('img').attr('src')+'); background-size:auto '+(jQuery(this).width()-110)+'px; height:'+(jQuery(this).width()-110)+'px; width:'+(jQuery(this).width()-110)+'px;');
		});
		jQuery('.columns2 .portfolio_item_img').each(function(){
			jQuery(this).find('.featured_circle').attr('style', 'background:url('+jQuery(this).find('img').attr('src')+'); background-size:auto '+(jQuery(this).width()-56)+'px; height:'+(jQuery(this).width()-56)+'px; width:'+(jQuery(this).width()-56)+'px;');
		});
		jQuery('.columns3 .portfolio_item_img').each(function(){
			jQuery(this).find('.featured_circle').attr('style', 'background:url('+jQuery(this).find('img').attr('src')+'); background-size:auto '+(jQuery(this).width()-56)+'px; height:'+(jQuery(this).width()-56)+'px; width:'+(jQuery(this).width()-56)+'px;');
		});
		jQuery('.columns4 .portfolio_item_img').each(function(){
			jQuery(this).find('.featured_circle').attr('style', 'background:url('+jQuery(this).find('img').attr('src')+'); background-size:auto '+(jQuery(this).width()-56)+'px; height:'+(jQuery(this).width()-56)+'px; width:'+(jQuery(this).width()-56)+'px;');
		});
		
	}

	//FeedBack Form
	jQuery('.content_block').find('.form_field').each(function(){
		jQuery(this).width(jQuery(this).parent('form').width()-32);
	});	
	jQuery('.login_form').find('.form_field').each(function(){
		jQuery(this).width(jQuery(this).parent('form').width()-32);
	});	
	jQuery('.mc_input').each(function(){
		jQuery(this).width(jQuery(this).parents('.widget_mailchimpsf_widget').width()-32);
	});
	jQuery('.sidepanel').find('.field_search').each(function(){
		jQuery(this).width(jQuery(this).parent('.search_form').width()-55);
	});

	jQuery('.wpcf7-form .wpcf7-text').each(function(){
		jQuery(this).width(jQuery(this).parents('.wpcf7-form').width()-32);
	});
	jQuery('.wpcf7-form .wpcf7-textarea').each(function(){
		jQuery(this).width(jQuery(this).parents('.wpcf7-form').width()-32);
	});	

	if (jQuery('.content_block').hasClass('no-sidebar')) {
		if (jQuery('html').hasClass('user_bg_layout')) {
			jQuery('.module_line_trigger').each(function(){
				jQuery(this).css('margin-left' , -1*(jQuery('.main_wrapper').width()-jQuery('.container').width())/2+'px').width(jQuery('.main_wrapper').width());
			});
		} else {
			jQuery('.module_line_trigger').each(function(){
				jQuery(this).css('margin-left' , -1*(jQuery(window).width()-jQuery('.container').width())/2+'px').width(jQuery(window).width());
			});
		}
	}

	if ($('.fw_gallery').size() > 0) {
		if (jQuery('.content_block').hasClass('no-sidebar')) {
			if (jQuery('html').hasClass('user_bg_layout')) {
				$('.fw_gallery').css('margin-left' , -1*(jQuery('.main_wrapper').width()-jQuery('.container').width())/2+'px').width(jQuery('.main_wrapper').width());
			} else {
				$('.fw_gallery').width($(window).width()).css('margin-left', -1*(jQuery(window).width()-jQuery('.container').width())/2+'px');
			}
		}				
	}
	var fw_items_in_row = 6;
	if (jQuery('.content_block').hasClass('no-sidebar')) {
		if (jQuery('html').hasClass('user_bg_layout')) {
			if (jQuery(window).width() > 1440) fw_items_in_row = 5;
			if (jQuery(window).width() < 1025 && jQuery(window).width() > 768) fw_items_in_row = 4;
			if (jQuery(window).width() < 769 && jQuery(window).width() > 480) fw_items_in_row = 3;
			if (jQuery(window).width() < 481 && jQuery(window).width() > 320) fw_items_in_row = 2;
			if (jQuery(window).width() < 321) fw_items_in_row = 1;
		} else {
			if (jQuery(window).width() > 1440) fw_items_in_row = 6;
			if (jQuery(window).width() < 1440 && jQuery(window).width() > 1367) fw_items_in_row = 6;
			if (jQuery(window).width() < 1367 && jQuery(window).width() > 1025) fw_items_in_row = 5;
			if (jQuery(window).width() < 1025 && jQuery(window).width() > 768) fw_items_in_row = 4;
			if (jQuery(window).width() < 769 && jQuery(window).width() > 480) fw_items_in_row = 3;
			if (jQuery(window).width() < 481 && jQuery(window).width() > 320) fw_items_in_row = 2;
			if (jQuery(window).width() < 321) fw_items_in_row = 1;
		}
	}
	jQuery('.fw_gallery').find('.gallery_item').each(function(){
		jQuery(this).width(Math.floor(jQuery(window).width()/fw_items_in_row));
	});	
	
	if ($(window).width() > 1025 && fixed_menu == true) {
		if ($(window).scrollTop() > $('header.main_header').height()) {
			$('header.fixed_header').removeClass('hided');
			
		} else {
			$('header.fixed_header').addClass('hided');
		}
	}
	
});

jQuery(window).scroll(function(){
	if (!jQuery('html').hasClass('isScrolling')) {
		jQuery('section.page_section').each(function(){	
			if(jQuery(window).scrollTop() > jQuery(this).offset().top-($('header.fixed_header').height()+10) && jQuery(window).scrollTop() < jQuery(this).offset().top-($('header.fixed_header').height()+10)+jQuery(this).height()) {
				jQuery('.current-menu-item').removeClass('current-menu-item');
				jQuery('header').find('a[href=#'+jQuery(this).attr('id')+']').parent('li').addClass('current-menu-item');
			}
		});
	}
	checkFloatie();	
});
//~ Adam Taylor
function checkFloatie(){
	if ( fixed_menu == true) {
		if ($(window).scrollTop() > $('header.main_header').height()) {
			$('header.fixed_header').removeClass('hided');
			$('.floatie .top').show(300);
		} else {
			$('header.fixed_header').addClass('hided');
			$('.floatie .top').hide(300);
		}
	}
}



/*Better paralax functionality ~ Adam Taylor*/
$(document).ready(function(e) {
	
	$('.plax, .plax-it .module_line').each(function(index,element){
		plaxIt(element)
	})
    $( window).scroll(function() {
		$('.plax, .plax-it .module_line').each(function(index,element){
			plaxIt(element)
		})		
	})
	$( window).resize(function() {
		$('.plax, .plax-it .module_line').each(function(index,element){
			plaxIt(element)
		})		
	})
});
function plaxIt(element){
	var menuoffset = $('.fixed_header').height()
	//var a = $(element).height();
	var b = $(window).width();
	var c = $(window).scrollTop()
	var d = $(element).offset().top
	var backgroundPos = $(element).css('backgroundPosition').split(" ");
	var yPos = backgroundPos[1];
	yPos = yPos.substring(0,yPos.length-2)
	
	var x  = b * .000475;
	//The above kind of works but what we are really lookign at is what is the real estate that the image height takes up on the stage.
	//To determine this we need to know
	yPos = Math.floor(((c - d) + menuoffset)*x);
	$(element).css('background-position', '0px '+yPos+'px');
}
function scrollToHash(name,callback){
	if(jQuery('[name='+name+']').length>0){
		jQuery(document.body).animate({				
				'scrollTop':   jQuery('[name='+name+']').offset().top
				}, 300,function(){
				window.location.hash = name;
				jQuery('.mobile_menu_wrapper').slideUp(300);
				jQuery(window).trigger('scroll');
				if(callback) callback();	
		});
	}
}
/*Add secondary menu  and interaction*/
function createSubNavigation(target,to,actions){
	jQuery(to).append('<div class="second-menu"></div>');
	jQuery(target+' .ignore.current-menu-item').each(function(index,element){
		jQuery(this).parents('li').removeClass('current-menu-ancestor');
		jQuery(this).parents('li').removeClass('current-menu-parent');
		jQuery(this).removeClass('current-menu-item');
		
	})
	jQuery(target+' .sub-menu').each(function(index, element) {
    	var p = jQuery(element).parents('li');
		jQuery(element).attr('id', jQuery(p).attr('id'))
		if((jQuery(p).hasClass('current-menu-item') || jQuery(p).hasClass('current-menu-parent'))&& !jQuery(p).hasClass('ignore')){
		    jQuery(element).addClass('current-menu-item');
		}
	   jQuery(element).appendTo('.second-menu')
    });	
	if(actions){
		subNavigationActions()
	}
	
}
function subNavigationActions(target){
	jQuery(target+' li').hover(function(e){
		if(jQuery(this).parents('.second-menu').length==0){
			var id = jQuery(this).attr('id');
			jQuery(this).addClass('hover-target');
			jQuery('.second-menu .sub-menu').hide();
			jQuery('.second-menu .sub-menu').removeClass('hover-sub')
			if(jQuery('.second-menu #'+id).length>0){
				jQuery('.second-menu #'+id).show();
				jQuery('.second-menu #'+id).addClass('hover-sub')
			}else{
				jQuery('.sub-menu.current-menu-item, .current-menu-parent').show();
			}
		}
	},function(e){
		jQuery(this).removeClass('hover-target');
	});
	jQuery(target).hover(false,function(e){
		jQuery(target+' li').removeClass('hover-target');
		jQuery('.second-menu .sub-menu').hide();
		jQuery('.second-menu .sub-menu.current-menu-item').show();
	});
}
function scrollingActions(){
	jQuery('.login-menu').live('click',function(e){
		e.preventDefault();
		scrollToHash('top',function(){
			jQuery('.login-panel').stop().animate({height:jQuery('.log-inner').outerHeight(),opacity:1},300);
			jQuery('.login-panel').find('[name=user_username]').focus();
		})
	});
	jQuery('.close-log').click(function(){
		jQuery('.login-panel').stop().animate({height:0,opacity:0},300)
	});
	jQuery('.awesome.top').click(function(){
		scrollToHash('top')
	});
	jQuery('.awesome.reg').click(function(){
		scrollToHash('register')
	});
	jQuery('.awesome.events').click(function(){
		window.location = '/upcoming-events/';
	});
}
function openResponseActions(){
	//bbp-reply-form
	jQuery('.floatie .reply, .topic .reply-button').click(function(){
		var targetoffset = jQuery('.bbp-no-reply').length==0? jQuery('.bbp-reply-form').offset().top-120 : jQuery('.bbp-no-reply').offset().top -50
		jQuery('body,html').animate({				
				'scrollTop':   targetoffset
			}, 300,function(){
				jQuery('.bbp-reply-form').animate({height:jQuery('.bbp-reply-form form').height()+10,opacity:1},300,function(){
					jQuery('.bbp-reply-form').height('auto')
				});
				$('.plax, .plax-it .module_line').each(function(index,element){
					plaxIt(element);
				})
				jQuery(window).trigger('scroll');	
		});
		
	})
	jQuery('.bbp-topics .new-topic').click(function(){
		var targetoffset = jQuery('.bbp-no-topic').length ==0? jQuery('.bbp-topic-form').offset().top-120 : jQuery('.bbp-no-topic').offset().top -50;
		jQuery('body,html').animate({				
				'scrollTop':   targetoffset
			}, 300,function(){
				jQuery('.bbp-topic-form').animate({height:jQuery('.bbp-topic-form form').height()+10,opacity:1},300);				
				$('.plax, .plax-it .module_line').each(function(index,element){
					plaxIt(element);
				})
				jQuery(window).trigger('scroll');	
		});
	});
	jQuery('.bbp-topic-form .close').click(function(){
		jQuery('.bbp-topic-form').animate({'height':0,'opacity':0},300)
		$('.plax, .plax-it .module_line').each(function(index,element){
			plaxIt(element);
		})
	});
}
function addMobileMenu(){
	//MobileMenu
	jQuery('header').append('<div class="mobile_menu_wrapper"><div class="mobile_menu container"/></div>');	
	jQuery('.mobile_menu').html(jQuery('header').find('.menu').html());
	jQuery('.mobile_menu_wrapper').hide();
	jQuery('body').on('click','.menu_toggler',function(){
		jQuery('.mobile_menu_wrapper').slideToggle(300);
	});	
}
function addFixedMenu(){
	jQuery('.header_wrapper').append('<div class="mobileMen"><a href="javascript:void(0)" class="menu_toggler">MENU &raquo;</a><div class="second-menu"><div class="nav-icons"><div class="share awesome">&#xf1e0;</div><div class="search awesome">&#xf002;</div></div></div></div>');
	if (fixed_menu == true) {
		jQuery('body').append('<header class="fixed_header hided">'+jQuery('header').html()+'</header>');
		jQuery('.fixed_header .logo').find('img').width(jQuery('.fixed_header .logo').find('img').width()/2);

		if ($(window).width() > 1025) {
			if ($(window).scrollTop() > $('header.main_header').height()) {
				$('header.fixed_header').removeClass('hided');
				
			} else {
				$('header.fixed_header').addClass('hided');
			}
		}
	}
}
function quidditchInputClickClears(){
	//Input and Textarea Click-Clear
	jQuery('input[type=text]').focus(function() {
		if(jQuery(this).attr('readonly') || jQuery(this).attr('readonly') == 'readonly') return false;
		if (jQuery(this).val() === jQuery(this).attr('title')) {
				jQuery(this).val('');
		}   
		}).blur(function() {
		if(jQuery(this).attr('readonly') || jQuery(this).attr('readonly') == 'readonly') return false;
		if (jQuery(this).val().length === 0) {
			jQuery(this).val(jQuery(this).attr('title'));
		}                        
	});	
	jQuery('textarea').focus(function() {
		if (jQuery(this).text() === jQuery(this).attr('title')) {
				jQuery(this).text('');
			}        
		}).blur(function() {
		if (jQuery(this).text().length === 0) {
			jQuery(this).text(jQuery(this).attr('title'));
		}                        
	});	
}
function quidditchFormActions(){
	//JS from theme (possibly superfluous)
	/*//FeedBack Form
	jQuery('.content_block').find('.form_field').each(function(){
		jQuery(this).width(jQuery(this).parent('form').width()-32);
	});	
	jQuery('.login_form').find('.form_field').each(function(){
		jQuery(this).width(jQuery(this).parent('form').width()-32);
	});	
	jQuery('.mc_input').each(function(){
		jQuery(this).width(jQuery(this).parents('.widget_mailchimpsf_widget').width()-32);
	});			
	jQuery('.sidepanel').find('.field_search').each(function(){
		jQuery(this).width(jQuery(this).parent('.search_form').width()-55);
	});	*/

	//.wpcf7-form span.placeholder
	jQuery('.wpcf7-form .wpcf7-text').each(function(){
		jQuery(this).attr('placeholder', jQuery(this).parent('span').prev('span.placeholder').text());
	});
	jQuery('.wpcf7-form .wpcf7-textarea').each(function(){		
		jQuery(this).attr('placeholder', jQuery(this).parent('span').prev('span.placeholder').text());
	});		

	if (jQuery('.layout_trigger').hasClass('boxed_bg_cont')) {
		jQuery('html').addClass('user_bg_layout');
		jQuery('.header_wrapper').wrap('<div class="header_layout"/>');
	}
	if (jQuery('.layout_trigger').hasClass('image_bg_cont')) {
		jQuery('html').addClass('user_bg_layout');
		jQuery('.custom_bg_cont').height(jQuery(window).height());
		jQuery('html').addClass('user_pic_layout');
	}

	if (jQuery('.content_block').hasClass('no-sidebar')) {
		if (jQuery('html').hasClass('user_bg_layout')) {
			jQuery('.module_line_trigger').each(function(){
				jQuery(this).css('margin-left' , -1*(jQuery('.main_wrapper').width()-jQuery('.container').width())/2+'px').width(jQuery('.main_wrapper').width());
				jQuery(this).wrapInner('<div class="module_line '+jQuery(this).attr('data-option')+'" style="background:'+jQuery(this).attr('data-background')+'; padding-top:'+jQuery(this).attr('data-top-padding')+'"><div class="module_line_wrapper container"></div></div>');
			});
		} else {
			jQuery('.module_line_trigger').each(function(){
				jQuery(this).css('margin-left' , -1*(jQuery(window).width()-jQuery('.container').width())/2+'px').width(jQuery(window).width());
				jQuery(this).wrapInner('<div class="module_line '+jQuery(this).attr('data-option')+'" style="background:'+jQuery(this).attr('data-background')+'; padding-top:'+jQuery(this).attr('data-top-padding')+'"><div class="module_line_wrapper container"></div></div>');
			});
		}
	} else {
		jQuery('.module_line_trigger').each(function(){			
			jQuery(this).wrapInner('<div class="module_line '+jQuery(this).attr('data-option')+'" style="background:'+jQuery(this).attr('data-background')+'; padding-top:'+jQuery(this).attr('data-top-padding')+'"></div>');
		});		
	}
}
function quidditchNivoSliderSetup(){
	jQuery('.nivoSlider').each(function(){
		jQuery(this).nivoSlider({
			directionNav:true,
			controlNav: false,
			effect:'fade',
			pauseTime:4000,
			slices: 1
		});
	});
}
function quidditchOnePageScripts(){
	//Onepage Scripts	
	if (jQuery('.onepage_trigger').size() > 0) {
		jQuery('html').addClass('isScrolling');
		if (window.location.hash == jQuery('.main_header .menu').children('li:first').find('a').attr('href')) {
			jQuery('html, body').stop().animate({scrollTop:0}, 500, function(){
				jQuery('html').removeClass('isScrolling');
			});		
		} else {
			jQuery('html').removeClass('isScrolling');
		}	
		
		jQuery('header').find('a[href='+window.location.hash+']').parent('li').addClass('current-menu-item');
		jQuery('a[href*=#]').bind("click", function(e){
			jQuery('header ul.menu').find('.current-menu-item').removeClass('current-menu-item');
			var anchor = jQuery(this);
			if (jQuery(anchor.attr('href')).size() > 0) {
				jQuery('header').find('a[href='+anchor.attr('href')+']').parent('li').addClass('current-menu-item');
				jQuery('html').addClass('isScrolling');
				
				if (anchor.attr('href') == jQuery('.main_header .menu').children('li:first').find('a').attr('href')) {
					jQuery('html, body').stop().animate({scrollTop:0}, 500, function(){
						jQuery('html').removeClass('isScrolling');
					});		
				} else {
					jQuery('html, body').stop().animate({
						scrollTop: jQuery(anchor.attr('href')).offset().top-($('header.fixed_header').height())
					}, 500, function(){
						jQuery('html').removeClass('isScrolling');
					});
				}
				e.preventDefault();
			}
		});
	}
}
function quidditchPortfolioHover(){
	//Portfolio Hover
	jQuery('.portfolio_item_img_fx').hover(function(){
		jQuery(this).find('.portfolio_image_fadder').stop().animate({'opacity' : '0.8'},250);
		jQuery(this).find('a').stop().animate({'opacity' : '1'},250);
	}, function() {
		jQuery(this).find('.portfolio_image_fadder').stop().animate({'opacity' : '0'},300);
		jQuery(this).find('a').stop().animate({'opacity' : '0'},300);
	});	
	jQuery('.ls-wp-fullwidth-container').parents('.module_layer_slider').addClass('fullwidth_layer_slider');
}
function quidditchMisc(){
	jQuery('.flickr_badge_image a').hover(function(){
		jQuery(this).find('.flickr_wrapper').stop().animate({'opacity' : '0.8'}, 250);
	},
	function(){
		jQuery(this).find('.flickr_wrapper').stop().animate({'opacity' : '0'}, 250);
	});
	
	jQuery('ol.commentlist li').each(function(){
		if (jQuery(this).find('ul').size() > 0) {
			jQuery(this).addClass('hasComments');
		}
	});

	jQuery('.ico_wrapper').append('<div class="icb_pretitle"><span class="icb_pretitle_lt"></span><span class="icb_pretitle_mid"></span><span class="icb_pretitle_rt"></span></div>');
	jQuery('.iconbox_title').after('<span class="icb_finish"></span>');
	jQuery('hr.type2').wrap('<div class="hr_wrapper1"></div>');
	jQuery('hr.type3').wrap('<div class="hr_wrapper2"></div>');
	
	if (jQuery(window).width() < 1024 && jQuery(window).width() > 760) {
		jQuery('.featured_items .img_block').each(function(){
			jQuery(this).wrapInner('<div class="featured_circle" style="background:url('+jQuery(this).find('img').attr('src')+'); background-size:auto '+(jQuery(this).width())+'px; height:'+(jQuery(this).width())+'px; width:'+(jQuery(this).width())+'px;"></div>');
		});	
		jQuery('.module_team .img_block').each(function(){
			jQuery(this).wrapInner('<div class="featured_circle" style="background:url('+jQuery(this).find('img').attr('src')+'); background-size:auto '+(jQuery(this).width())+'px; height:'+(jQuery(this).width())+'px; width:'+(jQuery(this).width())+'px;"></div>');
		});		
		jQuery('.columns2 .portfolio_item_img').each(function(){
			jQuery(this).wrapInner('<div class="featured_circle" style="background:url('+jQuery(this).find('img').attr('src')+'); background-size:auto '+(jQuery(this).width()-56)+'px; height:'+(jQuery(this).width())+'px; width:'+(jQuery(this).width())+'px;"></div>');
		});
		jQuery('.columns3 .portfolio_item_img').each(function(){
			jQuery(this).wrapInner('<div class="featured_circle" style="background:url('+jQuery(this).find('img').attr('src')+'); background-size:auto '+(jQuery(this).width()-56)+'px; height:'+(jQuery(this).width())+'px; width:'+(jQuery(this).width())+'px;"></div>');
		});
		jQuery('.columns4 .portfolio_item_img').each(function(){
			jQuery(this).wrapInner('<div class="featured_circle" style="background:url('+jQuery(this).find('img').attr('src')+'); background-size:auto '+(jQuery(this).width()-56)+'px; height:'+(jQuery(this).width())+'px; width:'+(jQuery(this).width())+'px;"></div>');
		});
	}
	else {
		jQuery('.featured_items .img_block').each(function(){
			jQuery(this).wrapInner('<div class="featured_circle" style="background:url('+jQuery(this).find('img').attr('src')+'); background-size:auto '+(jQuery(this).width()-110)+'px; height:'+(jQuery(this).width()-110)+'px; width:'+(jQuery(this).width()-110)+'px;"></div>');
		});	
		jQuery('.module_team .img_block').each(function(){
			jQuery(this).wrapInner('<div class="featured_circle" style="background:url('+jQuery(this).find('img').attr('src')+'); background-size:auto '+(jQuery(this).width()-110)+'px; height:'+(jQuery(this).width()-110)+'px; width:'+(jQuery(this).width()-110)+'px;"></div>');
		});
		jQuery('.columns2 .portfolio_item_img').each(function(){
			jQuery(this).wrapInner('<div class="featured_circle" style="background:url('+jQuery(this).find('img').attr('src')+'); background-size:auto '+(jQuery(this).width()-56)+'px; height:'+(jQuery(this).width()-56)+'px; width:'+(jQuery(this).width()-56)+'px;"></div>');
		});
		jQuery('.columns3 .portfolio_item_img').each(function(){
			jQuery(this).wrapInner('<div class="featured_circle" style="background:url('+jQuery(this).find('img').attr('src')+'); background-size:auto '+(jQuery(this).width()-56)+'px; height:'+(jQuery(this).width()-56)+'px; width:'+(jQuery(this).width()-56)+'px;"></div>');
		});
		jQuery('.columns4 .portfolio_item_img').each(function(){
			jQuery(this).wrapInner('<div class="featured_circle" style="background:url('+jQuery(this).find('img').attr('src')+'); background-size:auto '+(jQuery(this).width()-56)+'px; height:'+(jQuery(this).width()-56)+'px; width:'+(jQuery(this).width()-56)+'px;"></div>');
		});
		
	}
	/*Pagerblock*/
	jQuery('.pagerblock').each(function(){
		jQuery(this).wrap('<div class="pager_wrapper"/>');	
		jQuery(this).before('<span class="mark1"></span>');
		jQuery(this).after('<span class="mark2"></span>');
	});

	/*Blog post prev/next seperator*/
	if (jQuery('.prev_next_links .fleft').html() !== '' && jQuery('.prev_next_links .fright').html() !== '') {
		jQuery('.prev_next_links .fleft').after('<div class="prev_next_links_seperator">:</div>');
	}
	jQuery('.comment-reply-link').html('');
	
	jQuery('.optionset').wrap('<div class="filter_wrapper"></div>');
	jQuery('.optionset').before('<span class="filter_mark1"></span>');
	jQuery('.optionset').after('<span class="filter_mark2"></span>');
	
	jQuery('.pre_footer #mc_signup_submit').addClass('shortcode_button').addClass('btn_normal').addClass('btn_type4');
	
	if (jQuery(window).width() < 760) {
		jQuery('.fw_gallery').attr('style', 'margin-left:'+((jQuery('.container').width() - jQuery(window).width())/2)+'px!important; width:'+jQuery(window).width()+'px!important');
		console.log(jQuery('.container').width() +';'+ jQuery(window).width());
	}
	
	if (jQuery('.comments_pager').html() == '') {
		jQuery('.comments_pager').addClass('none_pager');
	}
	/* Blog HTMLfix */
	jQuery('.boxed_date').each(function(){
		var date_day = jQuery(this).find('.boxed_date_day').html();
		jQuery(this).find('.boxed_date_day').remove();
		jQuery(this).find('.boxed_date_month').before('<div class="boxed_date_day">'+date_day+'</div><div class="icb_pretitle"><span class="icb_pretitle_lt"></span><span class="icb_pretitle_mid"></span><span class="icb_pretitle_rt"></span></div>');
	});
	jQuery('.blog_post_preview').each(function(){
		if (jQuery(this).find('.blog_post_image').size() < 1) {
			jQuery(this).addClass('no_featured_image');
		}
	});
}
function quidditchTestimonials(){
	jQuery('.testimonials_list').each(function(){
		var nextrow = 0;
		var item_per_row = Math.floor(jQuery(this).width()/jQuery(this).find('.item').width());
		jQuery(this).addClass('items_in_row'+item_per_row);
		for (var is = 1; is < item_per_row; is++ ) {
			jQuery(this).append('<hr style="left:'+is*(100/item_per_row)+'%;">');
		}
		jQuery(this).find('.item').each(function(i) {
			var cur_elem = (i+1)-nextrow;
			if (cur_elem == item_per_row) {
				jQuery(this).addClass("last_in_row");
				nextrow = nextrow+item_per_row;
			} else if (cur_elem == 1) {
				jQuery(this).addClass("first_in_row");
			}
		});
	});
}
function quidditchSponsors(){
	jQuery('.sponsors_works').each(function(){
		var nextrow = 0;
		var item_per_row = Math.floor(jQuery(this).width()/jQuery(this).find('.item').width());
		jQuery(this).addClass('items_in_row'+item_per_row);
		jQuery(this).find('.item_wrapper').each(function(i) {
			if (nextrow == 0) {
				jQuery(this).addClass("first-row");
			}
			var cur_elem = (i+1)-nextrow;
			if (cur_elem == item_per_row) {
				jQuery(this).addClass("last_in_row");
				nextrow = nextrow+item_per_row;
			} else if (cur_elem == 1) {
				jQuery(this).addClass("first_in_row");
			}
		});
	});
}
function quidditchPriceTables(){
	/* Price Table HTMLfix */
	jQuery('.price_item').each(function(){
		title = jQuery(this).find('.price_item_title').html();
		jQuery(this).find('.price_item_title').remove();
		jQuery(this).find('.item_cost_wrapper').after('<div class="icb_pretitle"><span class="icb_pretitle_lt"></span><span class="icb_pretitle_mid"></span><span class="icb_pretitle_rt"></span></div><div class="price_item_title">'+title+'</div>');
		jQuery(this).find('.price_item_text:first').addClass('first_text_item');
		jQuery(this).find('.price_item_text:odd').addClass('price_item_odd');
		jQuery(this).find('.price_item_text:even').addClass('price_item_even');
		jQuery(this).find('.shortcode_button').removeClass('btn_normal').addClass('btn_small');
		if (jQuery(this).hasClass('most_popular')) {
			jQuery(this).find('.shortcode_button').removeClass('btn_type1').addClass('btn_type4');
		}
		jQuery(this).find('.shortcode_button').removeClass('btn_normal').addClass('btn_small');
		if (jQuery(this).find('.price_item_btn').prev('.price_item_text').hasClass('price_item_even')) {
			jQuery(this).find('.price_item_btn').addClass('price_btn_odd')
		} else {
			jQuery(this).find('.price_item_btn').addClass('price_btn_even')
		}
	});
}