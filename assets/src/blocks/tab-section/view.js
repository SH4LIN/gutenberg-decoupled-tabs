/**
 * Tab section view script
 */

const TabSections = {
	init() {
		this.handleTabChange = this.handleTabChange.bind( this );
		this.hideAllTabContents = this.hideAllTabContents.bind( this );
		this.tabSections = document.querySelectorAll( '.wp-block-decoupled-tabs-tab-section' );

		if ( ! this.tabSections ) {
			return;
		}

		this.tabsSelector = document.querySelector( '.wp-block-decoupled-tabs-tabs-selector' );

		if ( ! this.tabsSelector ) {
			this.hideAllTabContents();
			return;
		}

		this.tabsSelector.addEventListener( 'tabChange', this.handleTabChange );
	},

	/**
	 * Hide all tab contents.
	 *
	 * @return {void}
	 */
	hideAllTabContents() {
		this.tabSections.forEach( ( tabSection ) => {
			const tabContents = tabSection.querySelectorAll( '.wp-block-decoupled-tabs-tab-content' );

			if ( ! tabContents ) {
				return;
			}

			tabContents.forEach( ( tabContent ) => {
				tabContent.setAttribute( 'aria-hidden', true );
			} );
		} );
	},

	/**
	 * Handle tab change.
	 *
	 * @param {Object} event - Event object.
	 *
	 * @return {void}
	 */
	handleTabChange( event ) {
		if ( ! event?.detail?.value ) {
			return;
		}

		const tabSectionId = event.detail.value;

		this.tabSections.forEach( ( tabSection ) => {
			const tabContents = tabSection.querySelectorAll( '.wp-block-decoupled-tabs-tab-content' );

			if ( ! tabContents ) {
				return;
			}

			tabContents.forEach( ( tabContent ) => {
				tabContent.setAttribute( 'aria-hidden', tabContent.dataset.tabContentId !== tabSectionId );
			} );
		} );
	}
};

(
	() => {
		document.addEventListener( 'DOMContentLoaded', () => {
			TabSections.init();
		} );
	}
)();
