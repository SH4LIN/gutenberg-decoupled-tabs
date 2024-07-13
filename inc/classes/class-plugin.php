<?php
/**
 * Plugin manifest class.
 *
 * @package decoupled-tabs
 */

namespace DecoupledTabs\Inc;

use DecoupledTabs\Inc\Traits\Singleton;

/**
 * Class Plugin
 */
class Plugin {

	use Singleton;

	/**
	 * Construct method.
	 */
	protected function __construct() {
		add_action( 'init', [ $this, 'register_blocks' ] );
	}

	/**
	 * Registers the `decoupled-tabs/tabs-selector` block on the server.
	 *
	 * @return void
	 */
	function register_blocks() {

		register_block_type_from_metadata( sprintf( '%s/blocks/tabs-selector', DECOUPLED_TABS_BUILD_PATH ) );

	}
}
