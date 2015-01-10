<?php

/* This is the string which will gather all the information.*/
$lcp_display_output = '';

// Show category link:
$lcp_display_output .= $this->get_category_link('strong');

//Add 'starting' tag. Here, I'm using an unordered list (ul) as an example:
$lcp_display_output .= '<div class="topstory">';

foreach ($this->catlist->get_categories_posts() as $single):
	$img      = get_the_post_thumbnail($single->ID);
	$title    = $single->post_title;
	
	$lcp_display_output .= 
	'<div class="staff popupbox">
		<div class="list-article'.($img? ' hasimage' : '').'">
			<div class="colorbox">
				<div class="featured">'.$img.'</div>
				<h3 class="title">
					<a class="name " href="#" title="'.$single->post_title.'">'.$title.'</a>					
				</h3>
			</div>
		</div>	 
	</div>';
endforeach;

$lcp_display_output .= '</div>';
$this->lcp_output = $lcp_display_output;