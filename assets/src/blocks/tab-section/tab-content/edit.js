/**
 * WordPress dependencies
 */
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

/**
 * The edit function describes the structure of your block in the context of the editor.
 *
 * @param {Object} root0            - Props
 * @param {Object} root0.attributes - Attributes
 *
 * @return {JSX.Element} Element to render.
 */
export default function Edit( { attributes } ) {
	const { tabContentId, visible } = attributes;

	const blockProps = useBlockProps(
		{
			'data-tab-content-id': tabContentId,
			'aria-hidden': ! visible,
		},
	);
	const innerBlockProps = useInnerBlocksProps(
		blockProps,
		{
			template: [
				[
					'core/paragraph',
				],
			],
		},
	);

	return (
		<div { ...innerBlockProps } />
	);
}
