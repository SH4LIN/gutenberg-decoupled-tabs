/**
 * WordPress dependencies
 */
import { RichText } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

/**
 * Tabs Dropdown Component
 *
 * @param {Object}   props               - Component props
 * @param {Object}   props.attributes    - Attributes
 * @param {Function} props.setAttributes - Set attributes function
 *
 * @return {JSX.Element} Tabs Dropdown Component
 */
const TabsSelectorDropDown = ( { attributes, setAttributes } ) => {
	const { tabs, selectedTab, dropDownLabel } = attributes;

	/**
	 * On Change Event Handler
	 *
	 * @param {Object} event - Event object
	 *
	 * @return {void} Nothing
	 */
	const onChange = ( event ) => {
		setAttributes( { selectedTab: event.target.value } );
	};

	/**
	 * On Label Change Event Handler
	 *
	 * @param {string} value - Value
	 *
	 * @return {void} Nothing
	 */
	const onLabelChange = ( value ) => {
		setAttributes( { dropDownLabel: value } );
	};

	return (
		<>

			<RichText
				tagName="label"
				for="tabs-selector-control"
				className="tabs-selector-label"
				value={ dropDownLabel }
				isSelected={ true }
				onChange={ onLabelChange }
				placeholder={ __( 'Label', 'caris-features' ) } />

			<div className="tabs-selector-wrapper">
				<select
					id="tabs-selector"
					className="tabs-selector"
					value={ selectedTab }
					onChange={ onChange }
				>
					{
						tabs.map( ( tab ) => (
							<option key={ tab.id } value={ tab.id }>{ tab.name }</option>
						) )
					}
				</select>
			</div>
		</>
	);
};

/**
 * Save Component
 *
 * @param {Object} props            - Component props
 * @param {Object} props.attributes - Attributes
 *
 * @return {JSX.Element} Save Component
 */
TabsSelectorDropDown.Save = ( { attributes } ) => {
	const { tabs, selectedTab, dropDownLabel } = attributes;

	return (
		<>
			{
				dropDownLabel && (
					<RichText.Content
						tagName="label"
						for="tabs-selector-control"
						className="tabs-selector-label"
						value={ dropDownLabel }
					/>
				)
			}

			<div className="tabs-selector-wrapper">
				<select className="tabs-selector" id="tabs-selector" value={ selectedTab }>
					{
						tabs.map( ( tab ) => (
							<option key={ tab.id } value={ tab.id }>{ tab.name }</option>
						) )
					}
				</select>
			</div>
		</>
	);
};

export default TabsSelectorDropDown;
