<?php
/**
 * Render function for the tab content block.
 *
 * @package decoupled-tabs
 */

namespace DecoupledTabs\Inc\Blocks;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

use DecoupledTabs\Inc\Traits\Singleton;
use WP_HTML_Tag_Processor;

if ( ! class_exists( 'DecoupledTabs\Inc\Blocks\Tab_Content' ) ) {
	/**
	 * Class TabContent
	 */
	class Tab_Content {

		use Singleton;

		/**
		 * Construct method.
		 */
		protected function __construct() {}

		/**
		 * Render the block.
		 *
		 * @param array  $attributes The block attributes.
		 * @param string $content    The block content.
		 * @param \WP_Block  $block     The block.
		 *
		 * @return string
		 */
		public function render( $attributes, $content, $block ) {
			$tags = new WP_HTML_Tag_Processor( $content );

			if ( $attributes['tabContentId'] === $block->context['decoupledTabs/tabSection/defaultTabSection'] ) {
				if ( $tags->next_tag( array( 'class_name' => 'wp-block-decoupled-tabs-tab-content' ) ) ) {
					$tags->set_attribute( 'aria-hidden', 'false' );
					$content = $tags->get_updated_html();
				}
			}

			return $content;
		}
	}
}
