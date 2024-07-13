/**
 * Utility functions
 */

/**
 * Check if object is empty.
 *
 * @param {Object} obj - Object tor check.
 *
 * @return {boolean} True if object is empty, false otherwise.
 */
const isObjectEmpty = ( obj ) => {
	if ( ! obj ) {
		return true;
	}

	return Object.keys( obj ).length === 0 && obj.constructor === Object;
};

/**
 * Debounce function.
 *
 * @param {Function} func    - Function to debounce.
 * @param {number}   wait    - Wait time.
 * @param {Object}   timeout - Timeout.
 *
 * @return {Function} Debounced function.
 */
const debounce = ( func, wait, timeout ) => {
	return ( ...args ) => {
		const later = () => {
			timeout.id = null;
			func( ...args );
		};
		clearTimeout( timeout.id );
		timeout.id = setTimeout( later, wait );
	};
};

export { isObjectEmpty, debounce };
