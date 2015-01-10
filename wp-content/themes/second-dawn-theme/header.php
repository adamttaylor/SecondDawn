<!DOCTYPE html>
<!--[if IE 8 ]><html class="ie ie8" <?php language_attributes(); ?>> <![endif]-->
<!--[if (gte IE 9)|!(IE)]><!--><html class="ie ie9" <?php language_attributes(); ?>> <!--<![endif]-->
<head>
    <meta http-equiv="Content-Type" content="<?php bloginfo('html_type'); ?>; charset=<?php bloginfo('charset'); ?>">

    <!-- Mobile Specific Metas
   ================================================== -->
    <?php if (gt3_get_theme_option("responsive")=="on") { ?>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <?php } ?>

    <!-- Favicon && Apple touch -->
    <link rel="shortcut icon" href="<?php echo gt3_get_theme_option('favicon'); ?>" type="image/x-icon">
    <link rel="apple-touch-icon" href="<?php echo gt3_get_theme_option('apple_touch_57'); ?>">
    <link rel="apple-touch-icon" sizes="72x72" href="<?php echo gt3_get_theme_option('apple_touch_72'); ?>">
    <link rel="apple-touch-icon" sizes="114x114" href="<?php echo gt3_get_theme_option('apple_touch_114'); ?>">

    <title><?php bloginfo('name'); ?> <?php wp_title(); ?></title>
    <link rel="pingback" href="<?php bloginfo('pingback_url'); ?>">
    <?php gt3_the_theme_option("code_before_head"); ?>
    <script>
        mixajaxurl = "<?php echo get_option("siteurl") ?>/wp-admin/admin-ajax.php";
        themerooturl = "<?php echo THEMEROOTURL; ?>";
    </script>
    <!--[if IE 8 ]><script>
        var e = ("article,aside,figcaption,figure,footer,header,hgroup,nav,section,time").split(',');
        for (var i = 0; i < e.length; i++) {
            document.createElement(e[i]);
        }
    </script><![endif]-->
    <?php wp_head(); ?>
    <?php echo gt3_get_if_strlen(gt3_get_theme_option("custom_css"), "<style>", "</style>"); ?>
    <link href="//maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css" rel="stylesheet">
</head>

<body <?php body_class("faded"); ?>><a name="top"></a>
<div class="innerBody">
	<header class="main_header">       
        <div class="header_wrapper container">
        	<a href="<?php echo get_site_url(); ?>" class="logo"><img src="<?php echo get_stylesheet_directory_uri();?>/img/logo-lg.png" alt="" class="logo_def"><img src="<?php echo get_stylesheet_directory_uri();?>/img/logo-lg.png" alt="" class="logo_retina"></a>
			<nav class="prime">
            	<div style="display:none" class="logout-link"><?php echo wp_logout_url(site_url()) ?></div>
            	<?php
					wp_nav_menu( array(
					'container' =>false,
					'menu_class' => 'menu',
					'echo' => true,
					'before' => '',
					'after' => '',
					'link_before' => '',
					'link_after' => '',
					'depth' => 3,
					'walker' => new gt3_description_walker())
					);
				?>
                <div class="nav-icons "><div style="display:none" class="search awesome">&#xf002;</div><div class="share awesome"><a class="addthis_button_compact" href="#"><img src="<?php echo get_stylesheet_directory_uri();?>/img/transparent.jpg"/>&#xf1e0;</a></div></div>
                <div class="circle"></div>
                <div class="second">
               <?php
			   //if(function_exists(‘bp_is_active’) ==> is buddpress turned on
			   //bp_is_directory() ==> is a wordpres page
			   $has_bbpress = function_exists('bbpress');
			   $has_buddpress = function_exists('bp_is_active');
			   if($has_bbpress){
					$active			= bbp_is_single_forum() || bbp_is_forum_archive() || bbp_is_single_topic(); 
					$markAllUnread  = bbp_is_single_forum() && function_exists('bbP_Pencil_Unread');
					$bbSingle		= bbp_is_single_topic();
			   }
			   if($has_buddpress){
					$active =  bp_is_directory(); 
			   }
			   ?>
                	<ul class="social sub-menu<?php if($active) echo ' current-menu-item';?>" <?php echo is_user_logged_in()? '' : 'style="opacity:0"';?>>
					<?php if(is_user_logged_in()):?>
                    	<li class="menu-item menu-item-type-custom menu-item-object-custom"><a href="<?php if($has_buddpress) echo bp_loggedin_user_domain();?>">Profile</a></li>
                        <li class="menu-item menu-item-type-custom menu-item-object-custom"><a href="/characters">Characters</a></li>
                    	<li class="menu-item menu-item-type-custom menu-item-object-custom"><a href="<?php if($has_buddpress) echo bp_loggedin_user_domain();?>messages/">Private Messages <span class="msgcount" <?php echo bp_get_total_unread_messages_count()==0? 'style="display:none"' : ''  ?>><?php bp_total_unread_messages_count() ?></span></a></li>
                        <li class="menu-item menu-item-type-custom menu-item-object-custom"><a href="/members/">Members</a></li>
                        <?php if($has_buddpress)?><li class="menu-item menu-item-type-custom menu-item-object-custom"><a href="/groups/">Groups</a></li>
                        <?php if($markAllUnread):?>
								<li class="menu-item menu-item-type-custom menu-item-object-custom">
									<?php bbP_Pencil_Unread()->mark_as_read_single_forum_link();?>
							   </li>
						<?php endif;?>
                        <?php if($bbSingle)bbp_topic_subscription_link(array('before'=>'<li>','after'=>'</li>')); 
							  if($bbSingle)bbp_topic_favorite_link(array('before'=>'<li>','after'=>'</li>'));?>
                      <?php else:?>
                      	<li><a href="">&nbsp;</a></li>
					  <?php endif;?>
                	</ul>
				
                </div>
              
                <div class="clear"></div>

                <div class="floatie"><?php if($bbSingle &&  is_user_logged_in()):?><div title="Reply" class="awesome reply">&#xf044;</div><?php endif;?><div title="Events" class="awesome events">&#xf073;</div><div title="Register" class="awesome reg">&#xf145;</div><?php if(is_user_logged_in()):?><a class="treasure" href="/characters"><div title="Characters" class="treasure">&nbsp;</div></a><?php endif;?><div title="Top" class="awesome top">&#xf062;</div></div>
            </nav>            
        </div>        
	</header>
	
	<div class="main_wrapper">
    <?php
	if(!is_user_logged_in()):?>
        <div class="login-panel">
            <div class="log-inner">
                <a name="login">&nbsp;</a>
                <h3>Login to Second Dawn</h3>
                <div class="close-log">X</div>
                <div class="log-bg">
           			<div class="secure"><?php wp_nonce_field( 'ajax-login-nonce', 'security' ); ?></div>
                	<div id="loginformHere"></div>
                    <div class="reg-link" style="visibility:hidden"><a href="/register/?newuser=true">New user &raquo;</a></div>
                    <div class="reg-link pw"><a href="/wp-login.php?action=lostpassword">Forgot Password &raquo;</a></div>
                    <div style="clear:both"></div>
                </div>
            </div>
        </div>
	<?php endif;?>