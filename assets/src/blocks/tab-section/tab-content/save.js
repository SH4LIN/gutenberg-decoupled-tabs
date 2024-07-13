/**
 * WordPress dependencies
 */
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

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
	const { tabContentId } = attributes;

	const blockProps = useBlockProps.save(
		{
			'data-tab-content-id': tabContentId,
			'aria-hidden': true,
		},
	);

	const innerBlockProps = useInnerBlocksProps.save( blockProps );

	return (
		<div { ...innerBlockProps } />
	);
}
