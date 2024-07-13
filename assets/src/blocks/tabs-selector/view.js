/**
 * Region selector view script.
 */

const TabsSelector = {

	/**
	 * Initialize the Tabs Selector.
	 *
	 * @return {void}
	 */
	init() {
		this.handleDropDown = this.handleDropDown.bind( this );
		this.handleList = this.handleList.bind( this );

		const tabsSelector = document.querySelector( '.wp-block-decoupled-tabs-tabs-selector' );

		if ( ! tabsSelector ) {
			return;
		}

		const selectorType = tabsSelector?.dataset?.selectorType || 'drop-down';

		if ( 'drop-down' === selectorType ) {
			this.handleDropDown( tabsSelector );
		} else {
			this.handleList( tabsSelector );
		}
	},

	/**
	 * Handle Drop Down tabs selector.
	 *
	 * @param {HTMLElement} tabsSelector - Tab selector element.
	 *
	 * @return {void}
	 */
	handleDropDown( tabsSelector ) {
		const tabsSelectorControl = tabsSelector.querySelector( '#region-selector-control' );

		if ( ! tabsSelectorControl ) {
			return;
		}

		tabsSelectorControl.addEventListener( 'change', () => {
			// Creating custom event so all other component can listen to this event
			const customEvent = new CustomEvent( 'tabChange', {
				detail: {
					value: tabsSelectorControl.value,
				},
			} );

			tabsSelector.dispatchEvent( customEvent );
		} );
	},

	/**
	 * Handle List tab selector.
	 *
	 * @param {HTMLElement} tabsSelector - Tab selector element.
	 *
	 * @return {void}
	 */
	handleList( tabsSelector ) {
		const tabList = tabsSelector.querySelector( '.tabs-selector-list' );

		if ( ! tabList ) {
			return;
		}

		const tabButtons = tabList.querySelectorAll( 'button' );

		if ( ! tabButtons ) {
			return;
		}

		tabButtons.forEach( ( regionButton ) => {
			regionButton.addEventListener( 'click', () => {
				// Creating custom event so all other component can listen to this event
				const customEvent = new CustomEvent( 'tabChange', {
					detail: {
						value: regionButton.dataset.tabId,
					},
				} );

				tabsSelector.dispatchEvent( customEvent );
			} );
		} );
	},
};

wp.domReady( () => {
	TabsSelector.init();
} );
