/**
 * WordPress dependencies
 */
import { useSelect } from '@wordpress/data';
import { store as blockEditorStore } from '@wordpress/block-editor';

/**
 * Dynamic section selector attributes hook
 *
 * @param {string} clientId - Block client id
 * @param {Array}  deps     - Dependencies
 *
 * @return {Object} Block attributes
 */
const useDynamicSectionSelectorAttributes = ( clientId, deps ) => {
	return useSelect(
		( select ) => {
			return select( blockEditorStore ).getBlockAttributes( clientId );
		},
		deps, // eslint-disable-line react-hooks/exhaustive-deps
	);
};

export default useDynamicSectionSelectorAttributes;
