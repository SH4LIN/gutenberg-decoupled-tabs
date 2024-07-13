/**
 * WordPress dependencies
 */
import { useSelect } from '@wordpress/data';
import { store as blockEditorStore } from '@wordpress/block-editor';

/**
 * Dynamic Section selector id hook
 *
 * @return {string} Block client id
 */
const useDynamicSectionSelectorId = () => {
	return useSelect(
		( select ) => {
			const dynamicSectionSelectorBlocks = select( blockEditorStore ).getBlocksByName( 'caris-features/dynamic-section-selector' );
			if ( dynamicSectionSelectorBlocks && dynamicSectionSelectorBlocks.length > 0 ) {
				return dynamicSectionSelectorBlocks[ 0 ];
			}
			return null;
		},
		[],
	);
};

export default useDynamicSectionSelectorId;
