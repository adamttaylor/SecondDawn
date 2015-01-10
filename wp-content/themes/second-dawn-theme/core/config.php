<?php

#Change this
$gt3_themename = "Quidditch Theme";
$gt3_themeshort = "quidditch_";

if (!defined("GT3THEME_INSTALLED")) {
    define("GT3THEME_INSTALLED", true);
}

#ADD SUPPORT FOR CUSTOM FONTS (NOT GOOGLE)
$gt3_themeconfig['custom_fonts'] = false;
#JUST FILENAME WITHOUT EXT
$gt3_themeconfig['custom_fonts_array'] = array(
    array(
        "font_family" => "Arial",
        "font_file_name" => "default_font",
        "font_weight" => "normal",
        "font_style" => "normal",
        "svg_id" => "default_font",
    ),
);

/*echo "<pre>";
print_r($gt3_themeconfig['custom_fonts_array']);
echo "</pre>";*/

?>