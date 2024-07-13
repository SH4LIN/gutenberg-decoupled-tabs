/**
 * WordPress dependencies
 */
import { useSelect } from '@wordpress/data';
import { store as blockEditorStore } from '@wordpress/block-editor';

/**
 * Tabs selector id hook
 *
 * @return {string} Block client id
 */
const useTabsSelectorId = () => {
	return useSelect(
		( select ) => {
			const tabsSelectorBlocks = select( blockEditorStore ).getBlocksByName( 'decoupled-tabs/tabs-selector' );
			if ( tabsSelectorBlocks && tabsSelectorBlocks.length > 0 ) {
				return tabsSelectorBlocks[ 0 ];
			}
			return null;
		},
		[],
	);
};

export default useTabsSelectorId;
