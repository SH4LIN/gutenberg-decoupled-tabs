/**
 * WordPress dependencies
 */
import { useSelect } from '@wordpress/data';
import { store as blockEditorStore } from '@wordpress/block-editor';

/**
 * Tabs selector attributes hook
 *
 * @param {string} clientId - Block client id
 * @param {Array}  deps     - Dependencies
 *
 * @return {Object} Block attributes
 */
const useTabsSelectorAttributes = ( clientId, deps ) => {
	return useSelect(
		( select ) => {
			return select( blockEditorStore ).getBlockAttributes( clientId );
		},
		deps, // eslint-disable-line react-hooks/exhaustive-deps
	);
};

export default useTabsSelectorAttributes;
