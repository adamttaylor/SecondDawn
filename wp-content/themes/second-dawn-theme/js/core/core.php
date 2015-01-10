<?php
/* Send headers & start */
header("Content-type: application/x-javascript");
$wp_include = "../../../../wp-load.php";
$i = 0;
while (!file_exists($wp_include) && $i++ < 10) {
	$wp_include = "../$wp_include";
}

require($wp_include);

?>
jQuery(document).ready(function($) {
    /*jQuery('.module_toggle').each(function(){
        jQuery(this).find('.expanded_yes').click();
    });*/

    /* SHORTCODE TABS */
    jQuery('.shortcode_tabs').each(function(index) {
        /* GET ALL HEADERS */
        var i = 1;
        jQuery(this).find('.shortcode_tab_item_title').each(function(index) {
        jQuery(this).addClass('it'+i); jQuery(this).attr('whatopen', 'body'+i);
        jQuery(this).addClass('head'+i);
        jQuery(this).parents('.shortcode_tabs').find('.all_heads_cont').append(this);
        i++;
        });

        /* GET ALL BODY */
        var i = 1;
        jQuery(this).find('.shortcode_tab_item_body').each(function(index) {
        jQuery(this).addClass('body'+i);
        jQuery(this).addClass('it'+i);
        jQuery(this).parents('.shortcode_tabs').find('.all_body_cont').append(this);
        i++;
        });

        /* OPEN ON START */
        jQuery(this).find('.expand_yes').addClass('active');
        var whatopenOnStart = jQuery(this).find('.expand_yes').attr('whatopen');
        jQuery(this).find('.'+whatopenOnStart).addClass('active');
        });

        //jQuery('.shortcode_tabs .all_body_cont div:first-child').addClass('active');
        //jQuery('.shortcode_tabs .all_heads_cont li:first-child').addClass('current');

        jQuery(document).on('click', '.shortcode_tab_item_title', function(){
        jQuery(this).parents('.shortcode_tabs').find('.shortcode_tab_item_body').removeClass('active');
        jQuery(this).parents('.shortcode_tabs').find('.shortcode_tab_item_title').removeClass('active');
        var whatopen = jQuery(this).attr('whatopen');
        jQuery(this).parents('.shortcode_tabs').find('.'+whatopen).addClass('active');
        jQuery(this).addClass('active');
    });
    /* END SHORTCODE TABS */

    jQuery('.comment-reply-link').click(function(){
        jQuery('#commentform').find('.form_field').each(function(){
            jQuery(this).width(jQuery(this).parent('form').width()-38);
        });
    });

    jQuery('.feedback_go').click(function(){
        var par = $(this).parents(".feedback_form");
        var name = par.find(".field-name").val();
        var email = par.find(".field-email").val();
        var message = par.find(".field-message").val();
        var subject = par.find(".field-subject").val();
        var captcha = par.find(".field-captcha-a").val();
        $.ajax({
            url: mixajaxurl,
            type: "POST",
            data: { name: name, email: email, message: message, subject: subject, action: "send_feedback", captcha: captcha },
            success: function(data) {
                $('.ajaxanswer').hide().empty().html(data).show("slow");
                setTimeout("$('.ajaxanswer').fadeOut('slow')",5000);
                $.ajax({
                    url: mixajaxurl,
                    type: "POST",
                    data: { action: "get_new_captcha" },
                    success: function(data) {
                        $(".field-captcha-q").val(data);
                    }
                });
            }
        });
        });
        $('.wpcf7-form-control').each(function(){
            wpcf7Width = $(this).parents("form").width();
            if ($(this).hasClass("wpcf7-submit")) {
            	if ($(this).parents('.module_cont').hasClass('white_form')) {
                	$(this).addClass("shortcode_button btn_normal btn_type4");
                } else {
                	$(this).addClass("shortcode_button btn_normal btn_type1");
                }
            } else {
                $(this).width(wpcf7Width-16);
        }
    });

});