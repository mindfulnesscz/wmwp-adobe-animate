<?php
/*
Plugin Name:      WMWP Adobe Animate Integration
Description:      Gutenberg plugin for inserting Adobe Animate exported javascript animations as gutenberg blocks.
Author:           Webmind Agency
Version:          0.1.1
Author URI:       https://webmind.agency
Text Domain:      wmwp_adobe_animate
*/

/* Copyright 2023 Webmind

This program is free software; you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation; either version 2 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program; if not, please find it at https://webmind.agency/licenses/wmwp-webmind-license
*/


define('WMWP_ADOBE_ANIMATE_VERSION', '0.1.1');

add_action('wp_enqueue_scripts', 'wmwpaa_frontend');
add_action('enqueue_block_editor_assets', 'wmwpaa_block');

/**
 * Registers ADMIN GUTENBERG BLOCK scripts and styles
 * @return void
 * @since 0.1.0
 */
function wmwpaa_block()
{
  wp_enqueue_script('wmwpaa-block', plugins_url("/dist/js/wmwpaa-block.js", __FILE__), ['wp-blocks', 'wp-editor', 'wp-element', 'createjs'], ESS_BLOCKS_VERSION);
  wp_enqueue_script('createjs', 'https://code.createjs.com/1.0.0/createjs.min.js', [], WMWP_ADOBE_ANIMATE_VERSION);
}


/**
 * Registers FRONTEND scripts and styles
 * @return void
 * @since 0.1.0
 */
function wmwpaa_frontend()
{

  if (is_singular() || is_page()) {
    $id = get_the_ID();
    if (has_block('wmwpaa/block', $id)) {
      wp_enqueue_script('createjs', 'https://code.createjs.com/1.0.0/createjs.min.js', [], WMWP_ADOBE_ANIMATE_VERSION, true);
      wp_enqueue_script('wmwpaa-front', plugins_url("/dist/js/wmwpaa-front.js", __FILE__), ['createjs'], WMWP_ADOBE_ANIMATE_VERSION, true);
    }
  }
}
