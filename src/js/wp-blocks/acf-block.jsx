// See https://richardtape.com/?p=348

import {registeredAcfBlocks} from './config/blocks';

const {assign} = lodash;
const {__} = wp.i18n;
const {addFilter} = wp.hooks;
const {createHigherOrderComponent} = wp.compose;
import editForm from './layout-settings-panel';
import {getBlockConfig} from './config/blocks';


/**
 * Override the default edit UI to include a new block inspector control for
 * adding our custom control.
 *
 * @param {function|Component} BlockEdit Original component.
 *
 * @return {string} Wrapped component.
 */
export const addMyCustomBlockControls = createHigherOrderComponent((BlockEdit) => {
	return (props) => {
		
		if (isValidBlockType(props.name) && props.isSelected) {
			return editForm(props, BlockEdit);
		}
		
		return <BlockEdit {...props} />;
	};
}, 'addMyCustomBlockControls');

addFilter('editor.BlockEdit', 'themes/wisnet', addMyCustomBlockControls);

/**
 * Is the passed block name one which supports our custom field?
 *
 * @param {string} name The name of the block.
 */
function isValidBlockType(name) {
	const validBlockTypes = registeredAcfBlocks;
	const valid = validBlockTypes.includes(name);
	
	return valid;
	
}// end isValidBlockType()

/**
 * Filters registered block settings, extending attributes with our custom data.
 *
 * @param {Object} settings Original block settings.
 *
 * @return {Object} Filtered block settings.
 */
export function addAttribute(settings) {
	
	// If this is a valid block
	if (isValidBlockType(settings.name)) {
		settings.attributes = assign(settings.attributes, getBlockConfig(settings.name).attributes);
		console.log('SETINGS.ATTRIBUTES', settings.attributes);
	}
	
	return settings;
	
}// end addAttribute()

/**
 * Override props assigned to save component to inject our custom data.
 * This is only done if the component is a valid block type.
 *
 * @param {Object} extraProps Additional props applied to save element.
 * @param {Object} blockType  Block type.
 * @param {Object} attributes Current block attributes.
 *
 * @return {Object} Filtered props applied to save element.
 */
function addSaveProps(extraProps, blockType, attributes) {
	// If the current block is valid, add our prop.
	if (isValidBlockType(blockType.name)) {
		let defaults = wp.hooks.applyFilters('five.extra_props', {
			container: attributes.container,
			gutters: attributes.gutters,
			alignment_horizontal: attributes.alignment_horizontal,
			alignment_vertical: attributes.alignment_vertical,
			fluid_items: attributes.fluid_items,
			column_width: attributes.column_width,
			items_break_point: attributes.items_break_point
		});
		console.log('THIS LOG');
		console.log({defaults, extraProps});
		extraProps = assign(extraProps, defaults);
		
	}
	
	return extraProps;
	
}// end addSaveProps()

addFilter('blocks.registerBlockType', 'themes/wisnet/add-acf-attr', addAttribute);
// for core WP blocks
addFilter('blocks.getSaveContent.extraProps', 'themes/wisnet/add-acf-props', addSaveProps);


export default this;
