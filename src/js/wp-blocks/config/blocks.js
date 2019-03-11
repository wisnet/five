import {config as slideshowAttributes} from './slideshow';
import {config as sideBySideAttributes} from './side-by-side';

export const registeredAcfBlocks = [
	'acf/slideshow',
	'acf/recent-posts',
	'acf/side-by-side',
	'acf/hours',
	'acf/heading'
];
/**
 * Core WP blocks that the Bootstrap container can wrap
 * @type {string[]}
 */
export const coreAllowedContainer = [
	'core/image',
	'core/heading',
	'core/quote',
	'core/table',
	'core/paragraph',
	'core/columns'
];


export const layoutAttributes = {
	container: {
		type: 'string',
		meta: 'container',
		default: 'container'
	},
	gutters: {
		type: 'string',
		meta: 'gutters',
		default: 'md-gutters'
	},
	alignment_horizontal: {
		type: 'string',
		meta: 'alignment_horizontal',
		default: 'justify-content-start'
	},
	alignment_vertical: {
		type: 'string',
		meta: 'alignment_vertical',
		default: 'align-items-start'
	},
	fluid_items: {
		type: 'boolean',
		meta: 'fluid_items',
		default: true
	},
	columns: {
		type: 'number',
		meta: 'columns',
		default: 0
	},
	items_break_point: {
		type: 'string',
		meta: 'items_break_point',
		default: 'col-sm'
	}
};

/**
 * Default attributes for specified blocks
 * @type {{slideshow: {container, alignment_vertical, items_break_point, columns, gutters, alignment_horizontal, fluid_items}}}
 */
const blockAttributes = {
	'acf/slideshow': slideshowAttributes,
	'acf/side-by-side': sideBySideAttributes
};

/**
 * Retrieve the attributes for given block
 * If there is not a block specified or the
 * key does not exist in the `blockAttributes`
 * object then the default attributes are returned
 *
 * @param block
 * @returns {*}
 */
export function getBlockConfig(block = null) {
	/**
	 *  if the block name is empty OR there are not custom attributes
	 *  return the default attributes
	 */
	if (!block || !(block in blockAttributes)) {
		return {
			hasExtraPanel: false,
			attributes: layoutAttributes
		};
	}
	return blockAttributes[block];
}
