/**
 * Tabs List Component
 *
 * @param {Object}   props               - Component props
 * @param {Object}   props.attributes    - Attributes
 * @param {Function} props.setAttributes - Set attributes function
 *
 * @return {JSX.Element} Tabs List Component
 */
const TabsSelectorList = ( { attributes, setAttributes } ) => {
	const { tabs, selectedTab } = attributes;

	return (
		<div className="tabs-selector-list-wrapper">
			<ul id="tabs-selector-list" className="tabs-selector-list">
				{
					tabs.map( ( tab ) => (
						<li key={ tab.id }>
							<button
								data-tab-id={ tab.id }
								onClick={ () => setAttributes( { selectedTab: tab.id } ) }
								className={ selectedTab === tab.id ? 'selected' : '' }>
								{ tab.name }
							</button>
						</li>
					) )
				}
			</ul>
		</div>
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
TabsSelectorList.Save = ( { attributes } ) => {
	const { tabs, selectedTab } = attributes;
	return (
		<div className="tabs-selector-list-wrapper">
			<ul id="tabs-selector-list" className="tabs-selector-list">
				{
					tabs.map( ( tab ) => (
						<li key={ tab.id }>
							<button
								data-tab-id={ tab.id }
								className={ selectedTab === tab.id ? 'selected' : '' }>
								{ tab.name }
							</button>
						</li>
					) )
				}
			</ul>
		</div>
	);
};

export default TabsSelectorList;
