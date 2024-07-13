/**
 * Tabs selector view script.
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

		this.tabsSelector = document.querySelector( '.wp-block-decoupled-tabs-tabs-selector' );

		if ( ! this.tabsSelector ) {
			return;
		}

		const selectorType = this.tabsSelector?.dataset?.selectorType || 'drop-down';

		if ( 'drop-down' === selectorType ) {
			this.handleDropDown();
		} else {
			this.handleList();
		}
	},

	/**
	 * Handle Drop Down tabs selector.
	 *
	 * @return {void}
	 */
	handleDropDown() {
		const tabsSelectorControl = this.tabsSelector.querySelector( '#tabs-selector' );

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

			this.tabsSelector.dispatchEvent( customEvent );
		} );
	},

	/**
	 * Handle List tab selector.
	 *
	 * @return {void}
	 */
	handleList() {
		const tabList = this.tabsSelector.querySelector( '.tabs-selector-list' );

		if ( ! tabList ) {
			return;
		}

		const tabButtons = tabList.querySelectorAll( 'button' );

		if ( ! tabButtons ) {
			return;
		}

		tabButtons.forEach( ( tabButton ) => {
			tabButton.addEventListener( 'click', () => {
				// Creating custom event so all other component can listen to this event
				const customEvent = new CustomEvent( 'tabChange', {
					detail: {
						value: tabButton.dataset.tabId,
					},
				} );

				this.tabsSelector.dispatchEvent( customEvent );
			} );
		} );
	},
};

(
	() => {
		document.addEventListener( 'DOMContentLoaded', () => {
			TabsSelector.init();
		} );
	}
)();
