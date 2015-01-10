<?php

class gt3_description_walker extends Walker_Nav_Menu {
    function start_el(&$output, $item, $depth = 0, $args = array(), $id = 0) {
        global $wp_query;
        $indent = ( $depth ) ? str_repeat( "\t", $depth ) : '';

        $class_names = $value = '';

        $classes = empty( $item->classes ) ? array() : (array) $item->classes;

        $class_names = join( ' ', apply_filters( 'nav_menu_css_class', array_filter( $classes ), $item ) );
        $class_names = ' class="'. esc_attr( $class_names ) . '"';

        $attributes  = ! empty( $item->attr_title ) ? ' title="'  . esc_attr( $item->attr_title ) .'"' : '';
        $attributes .= ! empty( $item->target )     ? ' target="' . esc_attr( $item->target     ) .'"' : '';
        $attributes .= ! empty( $item->xfn )        ? ' rel="'    . esc_attr( $item->xfn        ) .'"' : '';

        if (!isset($item_output)) {
            $item_output = '';
        }

        if($item->object == 'page') {
            $cur_pageID = get_post($item->object_id);
            $gt3_theme_pagebuilder = gt3_get_theme_pagebuilder($item->object_id);
            $standalone_page = (isset($gt3_theme_pagebuilder['settings']['standalone-page-status']) ? $gt3_theme_pagebuilder['settings']['standalone-page-status'] : "");

            $output .= $indent . '<li id="menu-item-'. $item->ID . '"' . $value . $class_names .'>';
            if ( $standalone_page == 'Yes' ) {
                $attributes .= ! empty( $item->url ) ? ' href="'   . esc_attr( $item->url ) .'"' : '';
            }
            else {
                if (is_front_page()) {
                    $attributes .= ' href="#' . $cur_pageID->post_name . '"';
                }
                else {
                    $attributes .= ' href="' . home_url() . '#' . $cur_pageID->post_name . '"';
                }
            }

            $item_output = $args->before;
            $item_output .= '<a'. $attributes .'>';
            $item_output .= $args->link_before.apply_filters( 'the_title', $item->title, $item->ID );
            $item_output .= '</a>';
            $item_output .= $args->after;

            $output .= apply_filters( 'walker_nav_menu_start_el', $item_output, $item, $depth, $args );
        } else {

            $output .= $indent . '<li id="menu-item-'. $item->ID . '"' . $value . $class_names .'>';
            $attributes .= ! empty( $item->url ) ? ' href="'   . esc_attr( $item->url ) .'"' : '';

            if (is_object($args)) {$item_output = $args->before;}
            $item_output .= '<a'. $attributes .'>';
            if (is_object($args)) {$item_output .= $args->link_before.apply_filters( 'the_title', $item->title, $item->ID );}
            $item_output .= '</a>';
            if (is_object($args)) {$item_output .= $args->after;}

            $output .= apply_filters( 'walker_nav_menu_start_el', $item_output, $item, $depth, $args );
        }
    }
}

?>