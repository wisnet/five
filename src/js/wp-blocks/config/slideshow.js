// import panel from './../slideshow';

export const config = {
	// panel: panel,
	attributes: {
		container: {
			type: 'string',
			meta: 'container',
			default: 'container-fluid'
		},
		equal_height_columns: {
			type: 'string',
			meta: 'equal_height_columns',
			default: ''
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
			type: 'string',
			meta: 'fluid_items',
			default: 'true'
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
		},
		// autoplay: {
		// 	type: 'boolean',
		// 	meta: 'autoplay',
		// 	default: true
		// },
		// interval: {
		// 	type: 'string',
		// 	meta: 'interval',
		// 	default: 7000
		// },
		// controls: {
		// 	type: 'string',
		// 	meta: 'controls',
		// 	default: 'true'
		// },
		// indicators: {
		// 	type: 'string',
		// 	meta: 'indicators',
		// 	default: 'true'
		// },
		// pause_on_hover: {
		// 	type: 'string',
		// 	meta: 'pause_on_hover',
		// 	default: 'true'
		// },
		// wrap: {
		// 	type: 'string',
		// 	meta: 'wrap',
		// 	default: 'true'
		// },
		// height: {
		// 	type: 'number',
		// 	meta: 'height',
		// 	default: 0
		// }
	}
};

