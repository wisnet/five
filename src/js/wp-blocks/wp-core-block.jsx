// See https://richardtape.com/?p=348

import {coreAllowedContainer} from './config/blocks';

const {assign} = lodash;
const {__} = wp.i18n;
const {addFilter} = wp.hooks;
const {createHigherOrderComponent, withSelect} = wp.compose;
import editForm from './layout-settings-panel';
import {layoutAttributes, getBlockConfig} from './config/blocks';

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
	const validBlockTypes = coreAllowedContainer;
	const valid = validBlockTypes.includes(name);
	
	if (valid) {
		return valid;
	}
	
	let allowed = (
		name.substr(0, 5) === 'core/' ||
		name.substr(0, 5) === 'five/' ||
		name.substr(0, 11) === 'core-embed/' ||
		name.substr(0, 14) === 'atomic-blocks/'
	);
	
	return allowed;
	
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
		settings.attributes = assign(settings.attributes, layoutAttributes);
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
export function addSaveProps(extraProps, blockType, attributes) {
	
	// If the current block is valid, add our prop.
	if (isValidBlockType(blockType.name)) {
		extraProps = assign(extraProps, {
			container: attributes.container,
			equal_height_columns: attributes.equal_height_columns,
			gutters: attributes.gutters,
			alignment_horizontal: attributes.alignment_horizontal,
			alignment_vertical: attributes.alignment_vertical,
			fluid_items: attributes.fluid_items,
			column_width: attributes.column_width,
			items_break_point: attributes.items_break_point
		});
		
	}
	
	return extraProps;
	
}// end addSaveProps()

addFilter('blocks.registerBlockType', 'themes/wisnet/add-attr', addAttribute);
// for core WP blocks
addFilter('blocks.getSaveContent.extraProps', 'themes/wisnet/add-props', addSaveProps);

/**
 * Wrap core blocks in Bootstrap container
 */
wp.hooks.addFilter('blocks.getSaveElement', 'themes/wisnet/bs-core-blocks', function (element, blockType, attributes) {
	
	// add the defaults to the attributes if they do not exist
	const defaults = getBlockConfig(blockType.name).attributes;
	
	for (let key in defaults) {
		if (defaults.hasOwnProperty(key) && typeof attributes[key] === 'undefined') {
			attributes[key] = defaults[key].default;
		}
	}
	
	let validBlock = isValidBlockType(blockType.name);
	let validElement = wp.element.isValidElement(element);
	
	if (isValidBlockType(blockType.name) && wp.element.isValidElement(element)) {
		let col;
		// we need to differentiate here to keep compatibility
		// with WP's built-in "Columns" block
		let bootstrapColumns = attributes.columns;
		
		if (blockType.name === 'core/columns') {
			bootstrapColumns = 0; // keep this one fluid
		}
		
		col = wp.element.createElement('div', assign({
			'class': ['col', (bootstrapColumns > 0 ? 'col-sm-' + bootstrapColumns : '')].join(' ')
		}, {}), element);
		
		const row = wp.element.createElement('div', assign({
			'class': ['row', attributes.equal_height_columns, attributes.alignment_vertical, attributes.alignment_horizontal].join(' ')
		}, {}), col);
		element = wp.element.createElement('div', assign({
			'class': ['wp-block-wrapper', attributes.gutters, (
				typeof element.props.className === 'string' && element.props.className.match(/(^|\s+)wp-block-/) ?
					element.props.className.replace(/wp-block-/, 'wp-block-wrapper-') :
					'wp-block-wrapper-' + blockType.name.replace(/\//, '-').replace(/^core-/, '')
			), attributes.container, attributes.className].join(' '),
			'data-type': blockType.name
		}, attributes), row);
		
		let content = (() => {
			const textContent = blockType.name === 'core/list' ? element.props.values : element.props.content;
			let elt = document.createElement('span');
			elt.textContent = textContent;
			return elt.innerHTML;
		})();
		
		if (blockType.name === 'core/list') {
			element.props.values = content;
		} else {
			element.props.content = content;
		}
	}
	
	
	return element;
}, 999);

export default this;
