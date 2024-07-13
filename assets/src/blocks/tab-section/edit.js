/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps, store as blockEditorStore, useInnerBlocksProps } from '@wordpress/block-editor';
import { useSelect, useDispatch } from '@wordpress/data';
import { useEffect, useState } from '@wordpress/element';
import { createBlock } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import { isObjectEmpty } from '../../js/utils';
import { useTabsSelectorAttributes, useTabsSelectorId } from '../../js/hooks';

/**
 * The edit function describes the structure of your block in the context of the editor.
 *
 * @param {Object}   props               - Properties passed to the block.
 * @param {Function} props.setAttributes - Function to set attributes value.
 * @param {string}   props.clientId      - Client ID
 *
 * @return {JSX.Element} Element to render.
 */
export default function Edit( { setAttributes, clientId } ) {
	const blockProps = useBlockProps();
	const { children, ...innerBlockProps } = useInnerBlocksProps(
		blockProps,
		{
			allowedBlocks: [ 'decoupled-tabs/tab-content' ],
		},
	);

	const [ tabSelectorBlockClientId, setTabSelectorBlockClientId ] = useState( null );
	const [ tabSelectorAttributes, setTabSelectorAttributes ] = useState( null );
	const [ shouldRemoveAllBlocks, setShouldRemoveAllBlocks ] = useState( false );

	const { updateBlockAttributes, removeBlocks, insertBlock, replaceInnerBlocks } = useDispatch( blockEditorStore );

	const innerBlocks = useSelect(
		( select ) => {
			return select( blockEditorStore ).getBlocks( clientId );
		},
		[], // eslint-disable-line react-hooks/exhaustive-deps
	);

	/**
	 * Remove all blocks
	 *
	 * @return {void}
	 */
	const removeAllBlocks = () => {
		replaceInnerBlocks( clientId, [], false );
	};

	const newTabSelectorBlockClientId = useTabsSelectorId();
	const newTabSelectorAttributes = useTabsSelectorAttributes( tabSelectorBlockClientId, [ tabSelectorBlockClientId ] );

	useEffect(
		() => {
			if ( areTabsSelectorAttributesChanged( tabSelectorAttributes, newTabSelectorAttributes ) ) {
				setTabSelectorAttributes( newTabSelectorAttributes );
				setAttributes( { defaultTabSection: newTabSelectorAttributes?.defaultTab ?? '' } );
			}
		},
		[ newTabSelectorAttributes ], // eslint-disable-line react-hooks/exhaustive-deps
	);

	useEffect( () => {
		if ( newTabSelectorBlockClientId === tabSelectorBlockClientId ) {
			return;
		}

		setTabSelectorBlockClientId( newTabSelectorBlockClientId );
		setShouldRemoveAllBlocks( ! newTabSelectorBlockClientId );
	}, [ newTabSelectorBlockClientId ] ); // eslint-disable-line react-hooks/exhaustive-deps

	useEffect(
		() => {
			if ( ! isTabSelectorAttributeAvailable() ) {
				return;
			}

			if ( tabSelectorAttributes.tabs.length !== innerBlocks.length ) {
				if ( tabSelectorAttributes.tabs.length > innerBlocks.length ) {
					// Filter the new tabs
					tabSelectorAttributes.tabs.forEach( ( tab, index ) => {
						if ( ! innerBlocks.find( ( block ) => block.attributes.tabContentId.toLowerCase() === tab.id.toLowerCase() ) ) {
							const newBlock = createBlock(
								'decoupled-tabs/tab-content',
								{
									tabContentId: tab.id,
									visible: false,
									metadata: {
										name: `${ tab.name } - ${ __( 'Content', 'decoupled-tabs' ) }`,
									},
								},
							);
							insertBlock( newBlock, index, clientId, false );
						}
					} );
				} else {
					// Filter the tabs to be removed
					let tabsToRemove = innerBlocks.filter( ( block ) => {
						return ! tabSelectorAttributes.tabs.find( ( tab ) => tab.id === block.attributes.tabContentId );
					} );

					if ( ! tabsToRemove?.length ) {
						// Find duplicated tabs.
						tabsToRemove = innerBlocks.filter( ( block, index ) => {
							return innerBlocks.findIndex( ( b ) => b.attributes.tabContentId === block.attributes.tabContentId ) !== index;
						} );
					}

					removeBlocks( tabsToRemove.map( ( block ) => block.clientId ), false );
				}
			} else {
				innerBlocks.forEach( ( block ) => {
					const tabSection = tabSelectorAttributes.tabs.find( ( tab ) => tab.oldId === block.attributes.tabContentId );

					const newAttributes = {
						...block.attributes,
					};

					if ( tabSection ) {
						newAttributes.tabContentId = tabSection.id;
					}

					newAttributes.visible = block.attributes.tabContentId === tabSelectorAttributes.selectedTab;

					updateBlockAttributes( block.clientId, newAttributes );
				} );
			}
		},
		[ tabSelectorAttributes, innerBlocks ], // eslint-disable-line react-hooks/exhaustive-deps
	);

	useEffect(
		() => {
			if ( shouldRemoveAllBlocks ) {
				removeAllBlocks();
			}
		}, [ shouldRemoveAllBlocks ], // eslint-disable-line react-hooks/exhaustive-deps
	);

	/**
	 * Check if the selected tab section changed.
	 *
	 * @param {Object} oldAttributes - Old Attributes
	 * @param {Object} newAttributes - New Attributes
	 *
	 * @return {boolean} - True if selected tab section changed.
	 */
	const isSelectedTabSectionChanged = ( oldAttributes, newAttributes ) => {
		return oldAttributes?.selectedTab !== newAttributes?.selectedTab;
	};

	/**
	 * Check if the default tab section changed.
	 *
	 * @param {Object} oldAttributes - Old Attributes
	 * @param {Object} newAttributes - New Attributes
	 *
	 * @return {boolean} - True if default tab section changed.
	 */
	const isDefaultTabSectionChanged = ( oldAttributes, newAttributes ) => {
		return oldAttributes?.defaultTab !== newAttributes?.defaultTab;
	};

	/**
	 * Check if the attributes of the tabs selector block has changed
	 *
	 * @param {Object} oldAttributes - Old Attributes
	 * @param {Object} newAttributes - New Attributes
	 *
	 * @return {boolean} - True if tabs selector attributes changed or false.
	 */
	const areTabsSelectorAttributesChanged = ( oldAttributes, newAttributes ) => {
		if ( newAttributes === oldAttributes ) {
			return false;
		}

		if ( ( ! newAttributes && oldAttributes ) || ( newAttributes && ! oldAttributes ) ) {
			return true;
		}

		if ( isSelectedTabSectionChanged( oldAttributes, newAttributes ) ) {
			return true;
		}

		if ( isDefaultTabSectionChanged( oldAttributes, newAttributes ) ) {
			return true;
		}

		if ( oldAttributes.tabs.length !== newAttributes.tabs.length ) {
			return true;
		}

		for ( let i = 0; i < oldAttributes.tabs.length; i++ ) {
			if ( oldAttributes.tabs[ i ].id !== newAttributes.tabs[ i ].id ) {
				return true;
			}
		}

		return false;
	};

	/**
	 * Check if tab selector is available.
	 *
	 * @return {boolean} True if tab selector is available.
	 */
	const isTabSelectorAvailable = () => tabSelectorBlockClientId || newTabSelectorBlockClientId;

	/**
	 * Check if tab selector attribute is available.
	 *
	 * @return {boolean} True if tab selector attribute is available.
	 */
	const isTabSelectorAttributeAvailable = () => ! isObjectEmpty( tabSelectorAttributes ) || ! isObjectEmpty( newTabSelectorAttributes );

	/**
	 * Check if tabs are available.
	 *
	 * @return {boolean} True if tabs are available.
	 */
	const areTabsAvailable = () => isTabSelectorAttributeAvailable() && ( tabSelectorAttributes?.tabs?.length > 0 || newTabSelectorAttributes?.tabs?.length > 0 );

	/**
	 * Tabs conditions.
	 *
	 * @return {JSX.Element|null} Element to render.
	 */
	const tabsConditions = () => {
		if ( isTabSelectorAvailable() && isTabSelectorAttributeAvailable() ) {
			if ( ! areTabsAvailable() ) {
				return (
					<p>{ __( 'No tabs sections available.', 'decoupled-tabs' ) }</p>
				);
			}
			return null;
		}

		return (
			<p>{ __( 'Please add a tabs selector block to the page.', 'decoupled-tabs' ) }</p>
		);
	};

	return (
		<div { ...innerBlockProps }>
			{ tabsConditions() }
			{ children }
		</div>
	);
}
