<?php
/**
 * Plugin Name: Decoupled Tabs
 * Description: Decoupled Tabs Block Plugin.
 * Author:      Shalin Shah
 * Author URI:  https://github.com/SH4LIN/
 * License:     GPL2
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Version:     1.0
 * Text Domain: decoupled-tabs
 *
 * @package decoupled-tabs
 */

define( 'DECOUPLED_TABS_PATH', untrailingslashit( plugin_dir_path( __FILE__ ) ) );
define( 'DECOUPLED_TABS_URL', untrailingslashit( plugin_dir_url( __FILE__ ) ) );
define( 'DECOUPLED_TABS_BUILD_PATH', untrailingslashit( plugin_dir_path( __FILE__ ) ) . '/assets/build' );
define( 'DECOUPLED_TABS_BUILD_URL', untrailingslashit( plugin_dir_url( __FILE__ ) ) . '/assets/build' );
define( 'DECOUPLED_TABS_SRC_URL', untrailingslashit( plugin_dir_url( __FILE__ ) ) . '/assets/src' );

// phpcs:disable WordPressVIPMinimum.Files.IncludingFile.UsingCustomConstant
require_once DECOUPLED_TABS_PATH . '/inc/helpers/autoloader.php';
// phpcs:enable WordPressVIPMinimum.Files.IncludingFile.UsingCustomConstant

/**
 * To load plugin manifest class.
 *
 * @return void
 */
function caris_features_plugin_loader() {
	\DecoupledTabs\Inc\Plugin::get_instance();
}

caris_features_plugin_loader();
