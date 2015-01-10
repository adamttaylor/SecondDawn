<?php get_header();
the_post();

/* LOAD PAGE BUILDER ARRAY */
$gt3_theme_pagebuilder = gt3_get_theme_pagebuilder(get_the_ID());
$pf = get_post_format();
if (empty($pf)) $pf = "text";
$pfIcon = gt3_get_pf_icon($pf);
$featured_image = wp_get_attachment_image_src(get_post_thumbnail_id(get_the_ID()), 'single-post-thumbnail');
gt3_the_pb_custom_bg_and_color($gt3_theme_pagebuilder);
$gt3_current_page_sidebar = $gt3_theme_pagebuilder['settings']['layout-sidebars'];
?>

<div class="content_wrapper <?php post_class(); ?>">
  <?php if ($gt3_theme_pagebuilder['settings']['show_breadcrumb_area'] !== "no" && gt3_get_theme_option("show_breadcrumb_area") !== "no") { ?>
  <div class="page_title_block paralax">
    <div class="container">
      <h1 class="title">
        <?php the_title(); ?>
      </h1>
      <?php gt3_the_breadcrumb(); ?>
    </div>
  </div>
  <?php } ?>
  <div class="container">
    <article class="date_content">
      <div class="story full">
	  	<?php if(has_post_thumbnail()):?>
        <div class="featured">
          <?php the_post_thumbnail('full'); ?>
          <div class="bottom-rung"></div>
        </div>
		<?php endif; ?>
        <div class="post-title">
          <h1>
            <?php the_title(); ?>
          </h1>
          <div class="datebox"> <span class="day"><?php echo get_the_date( 'j');?></span> <span class="full-date"><?php echo get_the_date( 'F Y');?></span> <span class="awesome">
            <div class='addthis_toolbox addthis_default_style' addthis:url="<?php echo get_the_permalink();?>" addthis:title="<?php echo get_the_title();?>"> <a class="addthis_button_compact" href="#"><img src="<?php echo get_stylesheet_directory_uri();?>/img/transparent.jpg"/>&#xf064;</a> </div>
            </span> <span class="awesome"><a href="<?php the_permalink();?>">&#xf0c1;</a></span>
          </div>
        </div>
        <div class="content">
          <?php the_content(); ?>
        </div>
        <div class="datebox lower"> <span class="day"><?php echo get_the_date( 'j');?></span> <span class="full-date"><?php echo get_the_date( 'F Y');?></span> <span class="awesome">
          <div class='addthis_toolbox addthis_default_style' addthis:url="<?php echo get_the_permalink();?>" addthis:title="<?php echo get_the_title();?>"> <a class="addthis_button_compact" href="#"><img src="<?php echo get_stylesheet_directory_uri();?>/img/transparent.jpg"/>&#xf064;</a> </div>
          </span> <span class="awesome"><a href="<?php the_permalink();?>">&#xf0c1;</a></span>
        </div>
        <section class="blogpost_user_meta">        	
            <div class="author-body">
            	<div class="author-ava"> <?php echo get_avatar(get_the_author_meta('ID'), 176); ?> </div>
            	<div class="author-name">
                	<h5><?php the_author_posts_link(); ?></h5>
            	</div>
             	<div class="author-description">
					<?php the_author_meta('description'); ?>
                </div>
        	</div>
        	<div class="clear"></div>
        </section>
        <section class="blog-post-links">          
            <span class="prev"><?php previous_post_link('%link') ?></span>
           	<span class="next"><?php next_post_link('%link') ?></span>
        </section>
        <section class="blog-comments">
        	 <?php comments_template(); ?>
        </section>
      </div>
    </article>
    <?php get_sidebar('right'); ?>
    <div class="clear"><!-- ClearFix --></div>
  </div>
</div>
<!-- .container -->
</div>
<!-- .content_wrapper -->

<?php get_footer() ?>
