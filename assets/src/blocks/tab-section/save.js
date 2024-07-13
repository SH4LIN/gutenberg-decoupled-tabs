/**
 * WordPress dependencies
 */
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @return {JSX.Element} Element to render.
 */
export default function save() {
	const blockProps = useBlockProps.save();
	const { children, ...innerBlockProps } = useInnerBlocksProps.save( blockProps );

	return (
		<div { ...innerBlockProps } >
			{ children }
		</div>
	);
}
