/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import { TabsSelectorDropDown, TabsSelectorList } from './components/selector-types';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @param {Object} root0            - Props
 * @param {Object} root0.attributes - Attributes
 *
 * @return {JSX.Element} Element to render.
 */
export default function save( { attributes } ) {
	const { tabs, type } = attributes;

	const blockProps = useBlockProps.save(
		{
			'data-selector-type': type,
		},
	);

	const Component = 'drop-down' === type ? TabsSelectorDropDown.Save : TabsSelectorList.Save;

	return (
		<div { ...blockProps }>
			{
				! tabs || tabs.length < 1 ? null : <Component attributes={ attributes } />
			}
		</div>
	);
}
