const {__} = wp.i18n;
const {Fragment} = wp.element;
const {PanelBody, SelectControl, ToggleControl, RangeControl} = wp.components;
const {InspectorControls} = wp.editor;
const {withSelect} = wp.data;

import {getBlockConfig} from './config/blocks';


export function panelContainer(props, defaults) {
	const {attributes, setAttributes} = props;
	if (defaults.container || false) {
		return (
			<PanelBody title={__('Layout')}
			           initialOpen={false}>
				<SelectControl
					label={__('Container Width')}
					help={__('Width of the block')}
					value={attributes.container || defaults.container.default}
					options={[
						{label: 'None (parent element has container)', value: 'container-none'},
						{label: 'Small', value: 'container-sm'},
						{label: 'Normal', value: 'container'},
						{label: 'Large', value: 'container-lg'},
						{label: 'Full Width', value: 'container-fluid'}
					]}
					onChange={(nextValue) => {
						setAttributes({
							container: nextValue
						});
					}} />
				<SelectControl
					label={__('Equal Height Columns')}
					help={__(
						attributes.equal_height_columns === '' ?
							'Height will be relative to each element\'s content' :
							'Each element in the row will have the same height ' + '\n\r' + 'NOTE: this changes the `Vertical Alignment` to `Default`'
					)}
					value={attributes.equal_height_columns || defaults.equal_height_columns.default}
					options={[
						{label: 'No', value: ''},
						{label: 'Yes', value: 'row-eq-height'}
					]}
					onChange={(nextValue) => {
						setAttributes({
							equal_height_columns: nextValue,
							alignment_vertical: ''
						});
					}} />
			</PanelBody>
		);
	}
}

function panelSpacingAndPositioning(props, defaults) {
	const {attributes, setAttributes} = props;
	if (
		defaults.gutters ||
		defaults.alignment_vertical ||
		defaults.alignment_horizontal ||
		false
	) {
		let gutters,
			vertical,
			horizontal;
		if (defaults.gutters || false) {
			gutters = <SelectControl
				label={__('Gutter Width')}
				help={__('Amount of space between the blocks')}
				value={attributes.gutters || defaults.gutters.default}
				options={[
					{label: 'None', value: 'no-gutters'},
					{label: 'Extra Small', value: 'xs-gutters'},
					{label: 'Small', value: 'sm-gutters'},
					{label: 'Medium', value: 'md-gutters'},
					{label: 'Large', value: 'lg-gutters'},
					{label: 'Extra Large', value: 'xl-gutters'}
				]}
				onChange={(nextValue) => {
					setAttributes({
						gutters: nextValue
					});
				}} />;
		}
		if (defaults.alignment_vertical || false) {
			let val = defaults.equal_height_columns === ''
			vertical = <SelectControl
				label={__('Vertical Alignment')}
				help={__('Vertical alignment of the block relative to the container')}
				value={attributes.alignment_vertical || (attributes.alignment_vertical === '' ? '' : defaults.alignment_vertical.default)}
				options={[
					{label: 'Default', value: ''},
					{label: 'Top', value: 'align-items-start'},
					{label: 'Center', value: 'align-items-center'},
					{label: 'Bottom', value: 'align-items-end'}
				]}
				onChange={(nextValue) => {
					setAttributes({
						alignment_vertical: nextValue,
						equal_height_columns: ''
					});
				}} />;
		}
		if (defaults.alignment_horizontal || false) {
			horizontal = <SelectControl
				label={__('Horizontal Alignment')}
				help={__('Horizontal alignment of the block relative to the container')}
				value={attributes.alignment_horizontal || defaults.alignment_horizontal.default}
				options={[
					{label: 'Left', value: 'justify-content-start'},
					{label: 'Center', value: 'justify-content-center'},
					{label: 'Right', value: 'justify-content-end'},
					{label: 'Space Around', value: 'justify-content-around'},
					{label: 'Space Between', value: 'justify-content-between'}
				]}
				onChange={(nextValue) => {
					setAttributes({
						alignment_horizontal: nextValue
					});
				}} />;
		}
		return (
			<PanelBody title={__('Spacing & Positioning')}
			           initialOpen={false}>
				{gutters}
				{vertical}
				{horizontal}
			</PanelBody>
		);
	}
}

function panelResponsiveness(props, defaults) {
	const {attributes, setAttributes} = props;
	if (
		defaults.items_break_point ||
		defaults.fluid_items ||
		defaults.columns ||
		false
	) {
		let breakPoint,
			fluid,
			columns;
		
		if (defaults.fluid_items || false) {
			fluid = <ToggleControl
				label="Fluid items?"
				help="If 'True' items will align themselves on the same row with equal width"
				checked={(attributes.fluid_items || defaults.fluid_items.default) === 'true'}
				onChange={(val) => {
					setAttributes({
						fluid_items: val ? 'true' : 'false'
					});
					
					if (val) {
						jQuery('#fluid_items').closest('.components-base-control').addClass('disabled');
						document.getElementById('fluid_items').classList.add('disabled');
					} else {
						jQuery('#fluid_items').closest('.components-base-control').removeClass('disabled');
						document.getElementById('fluid_items').classList.remove('disabled');
					}
				}}
			/>;
		}
		if (defaults.items_break_point || false) {
			const breakPointHelp = {
				'col-fluid': '',
				'col': '',
				'col-sm': '≤565px',
				'col-md': '≤767px',
				'col-lg': '≤991px',
				'col-xl': '≤1199px'
			};
			breakPoint = <SelectControl
				label={__('Items Breakpoint')}
				help={__(
					attributes.items_break_point === 'col-fluid' ?
						'Items will always be fluid' :
						attributes.items_break_point === 'col-xl' ?
							'Items will always be full width' :
							'Items will convert to full width on screens ' + breakPointHelp[attributes.items_break_point])
				}
				value={attributes.items_break_point || defaults.items_break_point.default}
				options={[
					{label: 'None', value: 'col-fluid'},
					{label: 'Extra Small', value: 'col'},
					{label: 'Small', value: 'col-sm'},
					{label: 'Medium', value: 'col-md'},
					{label: 'Large', value: 'col-lg'},
					{label: 'Extra Large', value: 'col-xl'}
				]}
				onChange={(nextValue) => {
					setAttributes({
						items_break_point: nextValue
					});
				}} />;
		}
		if (defaults.columns || false) {
			const columnsHelp = {
				0: 'Columns width will be calculated',
				1: '1/12',
				2: '1/8',
				3: '1/4',
				4: '1/3',
				5: '5/12',
				6: 'half',
				7: '7/12',
				8: '3/4',
				9: '2/3',
				10: '11/12',
				11: 'the full width'
			};
			columns = <RangeControl
				id={'fluid_items'}
				label="Column Width"
				help={__(
					attributes.columns == 0 ?
						columnsHelp[0] :
						'Columns with be ' + columnsHelp[attributes.columns] + ' of the container space'
				)}
				value={attributes.columns || defaults.columns.default}
				className={attributes.column_width_disabled}
				min={0}
				max={12}
				step={1}
				onChange={(nextValue) => {
					setAttributes({
						columns: nextValue
					});
				}}
			/>;
		}
		
		return (
			<PanelBody title={__('Responsiveness')}
			           initialOpen={false}>
				{/*{fluid}*/}
				{breakPoint}
				{columns}
			</PanelBody>
		);
	}
}

const applyWithSelect = withSelect((select) => {
	console.log({select});
	
	return {
		column_width_disabled: false
	};
});

export default function editForm(props = {}, BlockEdit = false) {
	const {panel, attributes} = getBlockConfig(props.name);
	let extraPanel = '';
	
	if (panel || false) {
		extraPanel = panel(props, attributes);
	}
	
	return (
		<Fragment>
			{BlockEdit != false ? <BlockEdit {...props} /> : ''}
			<InspectorControls>
				{panelContainer(props, attributes)}
				{panelSpacingAndPositioning(props, attributes)}
				{panelResponsiveness(props, attributes)}
				{extraPanel}
			</InspectorControls>
		</Fragment>
	);
	// });
};

