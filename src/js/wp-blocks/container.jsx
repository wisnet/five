const {assign} = lodash;
const {__} = wp.i18n;
const {Fragment} = wp.element;
const {
	InnerBlocks,
	InspectorControls
} = wp.editor;

import {layoutAttributes, panels} from './settings/layoutSettings';
import containerAllowedBlocks from './config/blocks';

const blockAttributes = assign({}, layoutAttributes);

/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
wp.blocks.registerBlockType('wisnet/container', {
	title: __('Container'), // Block title.
	icon: 'welcome-write-blog', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	attributes: blockAttributes,
	category: 'layout', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__('container'),
		__('section'),
		__('content')
	],
	
	/**
	 * The edit function describes the structure of your block in the context of the editor.
	 * This represents what the editor will render when the block is used.
	 *
	 * The "edit" property must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */
	edit(props) {
		const {attributes} = props;
		
		const {
			container,
			alignment_vertical,
			alignment_horizontal,
			gutters
		} = attributes;
		
		return (
			<Fragment>
				<InspectorControls>
					{panels(props)}
				</InspectorControls>
				
				<div className={container}>
					<div className={'row ' + alignment_vertical + ' ' + alignment_horizontal + ' ' + gutters}>
						<InnerBlocks allowedBlocks={['wisnet/row', 'core/paragraph', 'core/image', 'acf/slideshow', 'acf/recent-posts']} />
					</div>
				</div>
			</Fragment>
		);
		
		
	},
	
	/**
	 * The save function defines the way in which the different attributes should be combined
	 * into the final markup, which is then serialized by Gutenberg into post_content.
	 *
	 * The "save" property must be specified and must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */
	save(props) {
		const {attributes} = props;
		const {
			container,
			alignment_vertical,
			alignment_horizontal,
			gutters
		} = attributes;
		
		return (
			<div className={container}>
				<div className={'row ' + alignment_vertical + ' ' + alignment_horizontal + ' ' + gutters}>
					<InnerBlocks.Content />
				</div>
			</div>
		);
	}
});
