import panel from './../side-by-side';

export const config = {
	panel: panel,
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
		items_break_point: {
			type: 'string',
			meta: 'items_break_point',
			default: 'col-sm'
		},
		content_alignment: {
			type: 'string',
			meta: 'content_alignment',
			default: 'self-align-start'
		}
	}
};
