/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { DropdownMenu, MenuGroup, MenuItem } from '@wordpress/components';

/**
 * Type Selector for the block.
 *
 * @param {Object}   props               Component props.
 * @param {string}   props.type          Selector type.
 * @param {Function} props.setAttributes Set attributes function.
 *
 * @return {JSX.Element} Element to render.
 */
const TypeSelectorBlockControl = ( { type, setAttributes } ) => {
	const selectorTypes = [
		{
			key: 'drop-down',
			label: __( 'Drop Down', 'caris-features' ),
		},
		{
			key: 'list',
			label: __( 'List', 'caris-features' ),
		},
	];

	return (
		<DropdownMenu label={ __( 'Selector type', 'caris-features' ) }>
			{ ( { onClose } ) => (
				<MenuGroup>
					{ selectorTypes.map( ( selectorType ) => {
						return (
							<MenuItem
								key={ selectorType.key }
								isSelected={ type === selectorType.key }
								onClick={ () => {
									setAttributes( { type: selectorType.key } );
									onClose();
								} }
							>
								{ selectorType.label }
							</MenuItem>
						);
					} ) }
				</MenuGroup>
			) }
		</DropdownMenu>
	);
};

export { TypeSelectorBlockControl };
export { default as TabsSelectorDropDown } from './tabs-selector-drop-down';
export { default as TabsSelectorList } from './tabs-selector-list';
