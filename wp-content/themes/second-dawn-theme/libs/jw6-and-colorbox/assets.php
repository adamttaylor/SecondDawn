<?php
/*
1) Add scripts and styles
2) Add the shortcode
*/

/*Enque colorbox scripts*/
if(!function_exists('enqueue_colorbox_js')){
	function enqueue_colorbox_js(){
		wp_enqueue_script(
			'colorbox',
			get_stylesheet_directory_uri() . '/libs/jw6-and-colorbox/colorbox/colorbox/jquery.colorbox-min.js',
			array( 'jquery' )
		);
		wp_enqueue_script(
			'colorbox-auto',
			get_stylesheet_directory_uri() . '/libs/jw6-and-colorbox/automate-colorbox.js',
			array( 'colorbox' )
		);
	}
}
if (!is_admin()) add_action("wp_enqueue_scripts", "enqueue_colorbox_js", 20);

/*Enqueue colorbox styles*/
if(!function_exists('enqueue_colorbox_css')){
	function enqueue_colorbox_css(){
		//wp_enqueue_style( 'colorbox-style', get_stylesheet_directory_uri() . '/libs/jw6-and-colorbox/colorbox/example1/colorbox.css');
		wp_enqueue_style( 'colorbox-style', get_stylesheet_directory_uri() . '/libs/jw6-and-colorbox/colorbox/colorbox.css');
	}
}

add_action( 'wp_enqueue_scripts', 'enqueue_colorbox_css' );
/*
add_action('wp_head', 'addassetshead');
if(!function_exists('addassetshead')){
	function addassetshead() {
		?>
<link rel="stylesheet" href="<?php echo bloginfo('template_url');?>/libs/jw6-and-colorbox/colorbox/example1/colorbox.css" type="text/css" media="all"/>  
        <?php
	}
}

/*add_action('wp_footer', 'addassets');
if(!function_exists('addassets')){
	function addassets() {
		?>
<script type="text/javascript" src="<?php echo bloginfo('template_url');?>/libs/jw6-and-colorbox/colorbox/colorbox/jquery.colorbox-min.js"></script>  
<script type="text/javascript" src="<?php echo bloginfo('template_url');?>/libs/jw6-and-colorbox/automate-colorbox.js"></script>     
        <?php
	}
}*/
//Shortcode to add jwplayer to a page 
//[jw url="url value"]
if(!function_exists('jw_player_func')){
	function jw_player_func( $atts ){
		$att2 = extract( shortcode_atts( array(
			'url' => '',
			'width'=>'620',
			'height'=>'345',
			'id'=>'',
			'autostart'=>false,
			'mute'=>false,
			'img'=>'',
		), $atts ) );
		return
		'
		<script type="text/javascript" src="http://www.mobileasiaexpo.com/wp-content/themes/event-site/jw6/jwplayer.js"></script>
		<script>jwplayer.key="EpzxpnV7mesdlRMj05arfHZkrsfBeRuPD9NwzVdhrCY="</script>
		<div id="jwPlay'.$id.'"></div>
		<script type="text/javascript">
			//console.log(\'URL: '.json_encode($att).'\')
			$(document).ready(function(){
				jwplayer("jwPlay'.$id.'").setup({
					file: "'.$url.'",
					'.($img? "image: '".$img."'," : '').'
					width: "'.$width.'",
					height: "'.$height.'",
					'.($autostart? "autostart: ".$autostart."," : '').'
					'.($mute? "mute: ".$mute."," : '').'
				});
			})
		</script>';
		
	}
}
add_shortcode( 'jw', 'jw_player_func' );

if(!function_exists('stream_func')){
	function stream_func( $atts ){
		$att2 = extract( shortcode_atts( array(
			'url' => '',
			'width'=>'620',
			'height'=>'345',
			'id'=>'',
			'autostart'=>false,
			'mute'=>false,
			'img'=>'',
			'method'=>false,
			'type'=> 'hls'
		), $atts ) );
		//if there is a url load the player otherwise use just the image
		//if the customm field is yospace use the yospace player
		
		/*if($method == 'yospace'){			
			yospace_hls($url,$img);
		}else if($method){
			//show playyer as jw
			echo 
			'<script type="text/javascript" src="http://www.mobileasiaexpo.com/wp-content/themes/event-site/jw6/jwplayer.js"></script>
			 <script>jwplayer.key="EpzxpnV7mesdlRMj05arfHZkrsfBeRuPD9NwzVdhrCY="</script>
			 <script type="text/javascript">
			 $(document).ready(function(){
				jwplayer("player1").setup({
					file: "'.$url.'",
					'.($img? "image: '".$img."'," : '').'
					width: "'.$width.'",
					height: "'.$height.'",
					'.($autostart? "autostart: ".$autostart."," : '').'
					'.($mute? "mute: ".$mute."," : '').'
				});
			 })
			 </script>';			 
		}else if($img){
			//show player with Image
		}
		*/
		if($method == 'yospace'){			
			yospace_hls($url,$img,$height,$width,$type);
		}else if($method){
			echo
			'<script type="text/javascript" src="http://www.mobileasiaexpo.com/wp-content/themes/event-site/jw6/jwplayer.js"></script>
			 <script>jwplayer.key="EpzxpnV7mesdlRMj05arfHZkrsfBeRuPD9NwzVdhrCY="</script>
			 <script type="text/javascript">
			 $(document).ready(function(){
				jwplayer("player1").setup({
					file: "'.$url.'",
					'.($img? "image: '".$img."'," : '').'
					width: "'.$width.'",
					height: "'.$height.'",
					'.($autostart? "autostart: ".$autostart."," : '').'
					'.($mute? "mute: ".$mute."," : '').'
				});
			 })
			 </script>';
		}
		
		
		return 
		'';		
	}
}
add_shortcode( 'stream', 'stream_func' );

if(!function_exists('yospace')){
	function yospace_hls($url,$img,$height,$width){
		$iPod    = stripos($_SERVER['HTTP_USER_AGENT'],"iPod");
		$iPhone  = stripos($_SERVER['HTTP_USER_AGENT'],"iPhone");
		$iPad    = stripos($_SERVER['HTTP_USER_AGENT'],"iPad");
		
		//if(true){
		if($iPod || $iPhone || $iPad){
		?> 
			<script>
            $YOPLAYER('player1', {
                'player':	'<?php echo get_stylesheet_directory_uri();?>/libs/yospace/yoplayer-2.1-7.swf',
                'width':	'<?php echo $width;?>',
                'height':	'<?php echo $height;?>',
                'unique':	'unique',
                'poster':	'<?php echo get_stylesheet_directory_uri();?>/images/player_bg.jpg',
                'file':     '<?php echo $url;?>',
                'skin':		'<?php echo get_stylesheet_directory_uri();?>/libs/yospace/mwl-skin/mwl-novolume.skin',
                'base':     '<?php echo get_stylesheet_directory_uri();?>/libs/yospace/',
                'type' :    'hls',
                'autoplay' : true,
                'callbacks': {
                    'start': function(player) {
                        $YOFIND(player).volume(0);
                    }
                }
            });
            </script>
        <?php
		}else{
		?>
			<script>
            swfobject.embedSWF(
                'http://www.mobileworldcongress.com/wp-content/themes/event-site-2013/libs/yospace/yoplayer-2.1-7.swf',
                'player1',
                640, 360,
                "10.0.0",
                '',
                {
                    buffer: 30,
                    lwm:    5,
                    lss:    4,
                    poster: '<?php echo get_stylesheet_directory_uri();?>/images/player_bg.jpg',
                    url:    'http://csm-e.cds1.yospace.com/csm/restart/live/78066265.m3u8',
                    skin:   '<?php echo get_stylesheet_directory_uri();?>/libs/yospace/mwl-skin/mwl-novolume.skin',
                    autoplay: true
                },
                {
                    allowscriptaccess:'always',
                    allowfullscreen:'true',
                    allowfullscreeninteractive:'true',
                    base : '<?php echo get_stylesheet_directory_uri();?>/libs/yospace/',
					wmode : 'transparent'
                },
                {
                    id: 'player1',
                    name: 'player1'
                }
            );
			window.onPlayerReady = function (id) {
				$('#player1')[0].volume(0)
			};
            </script>
		<?php	
		}
	}
}
//Shortcode to add jwplayer in a colorbox
if(!function_exists('jw_player_func_pop')){
	function jw_player_func_pop( $atts ){
		$att2 = extract( shortcode_atts( array(
			'url' => '',
			'width'=>'620',
			'height'=>'345',
			'id'=>'',
			'autostart'=>false,
			'mute'=>false,
			'img'=>'',
			'thumb'=>'',
		), $atts ) );
		$thumb = $thumb? $thumb : $img;
		return
		'
		<script type="text/javascript" src="http://www.mobileasiaexpo.com/wp-content/themes/event-site/jw6/jwplayer.js"></script>
		<script>jwplayer.key="EpzxpnV7mesdlRMj05arfHZkrsfBeRuPD9NwzVdhrCY="</script>
		<div class="popupbox" id="pop'.$id.'" style="margin: 0;">
			<a class="colorbox found cboxElement"><img src="'.$thumb.'" alt="mae_video" /></a>
			<div class="ninja">
				<div class="inlinebox" style="width: '.$width.'px; height: '.$height.'px; overflow: hidden;">
					<div id="jwPlay'.$id.'"></div>
				</div>
		  </div>
		</div>
		<div style="clear:both"></div>
		<script type="text/javascript">
			$(document).ready(function(){
				jwplayer("jwPlay'.$id.'").setup({
					file: "'.$url.'",
					'.($img? "image: '".$img."'," : '').'
					width: "'.$width.'",
					height: "'.$height.'",
					'.($mute? "mute: ".$mute."," : '').'
				});
				'.($autostart?
				'$("#pop'.$id.'").click(function(){
					jwplayer().play();
				});' : '').'
			})		
		</script>';
		
	}
}
add_shortcode( 'jw-pop', 'jw_player_func_pop' );


if(!function_exists('colorbox_pop')){
	function colorbox_pop( $atts ){
		$att2 = extract( shortcode_atts( array(
			'link'   => 'Link',
			'content'=> 'Content',
		), $atts ) );
		return 
		'<div class="popupbox">
			<a class="colorbox">'.$link.'</a>
			<div style="display:none">
				<div class="inlinebox">
					'.$content.'
				</div>
			</div>
		</div>';
	}
}
add_shortcode( 'pop', 'colorbox_pop' );
?>