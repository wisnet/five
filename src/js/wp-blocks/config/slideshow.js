export const config = {
	hasExtraPanel: false,
	attributes: {
		container: {
			type: 'string',
			meta: 'container',
			default: 'container-fluid'
		},
		gutters: {
			type: 'string',
			meta: 'gutters',
			default: 'no-gutters'
		},
		alignment_horizontal: {
			type: 'string',
			meta: 'alignment_horizontal',
			default: 'justify-content-left'
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
	}
};

