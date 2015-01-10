/*Colorbox Automation
Makes colorboxes easier. 
Create a div with a link with the colorbox class, then create a div with the inlinebox class inside the div housing the colorbox link.*/
jQuery(document).ready(function(e) {
	jQuery('.colorbox').each(function (index,element){
		var inline = jQuery(this).siblings("div:first").find("div.inlinebox");
		jQuery(jQuery(element)).colorbox({inline:true, href:jQuery(inline)});
	});
});
/*
<div class="popupbox">
	<a class="colorbox">//Add visible content here</a>
	<div style="display:none">
		<div class="inlinebox">
			//Add Pop up content here
		</div>
	</div>
</div>
*/