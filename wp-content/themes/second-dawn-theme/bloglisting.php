<?php
$featured_image = wp_get_attachment_image_src(get_post_thumbnail_id(get_the_ID()), 'single-post-thumbnail');
?>

<article class="date_content">
	<div class="story full">
        <div class="featured">
        	<a href="<?php the_permalink();?>"><?php the_post_thumbnail('thumbnail'); ?></a>
        </div>
        <div class="content">
             <h2><a class="blogpost_title" href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
             <?php the_excerpt(); ?>
        </div>
        <div class="bottom">
            <div class="datebox">
                <span class="day"><?php echo get_the_date( 'j');?></span>
                <span class="full-date"><?php echo get_the_date( 'F Y');?></span>
                <span class="awesome">
                	<div class='addthis_toolbox addthis_default_style' addthis:url="<?php echo get_the_permalink();?>" addthis:title="<?php echo get_the_title();?>">               	
                		<a class="addthis_button_compact" href="#"><img src="<?php echo get_stylesheet_directory_uri();?>/img/transparent.jpg"/>&#xf064;</a>
                	</div>
                </span>
               
                <span class="awesome"><a href="<?php the_permalink();?>">&#xf0c1;</a></span>
                <?php if(get_comments_number(get_the_ID())>0) :?>
                <span class="awesome comments"><a href="<?php echo get_comments_link(); ?>"><span class="count"><?php echo get_comments_number(get_the_ID());?></span>&#xf0e6;</a></span>
                <?php endif;?>
            </div>
        </div>
    </div>
</article>