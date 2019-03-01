const {__} = wp.i18n;
const {Fragment} = wp.element;
const {PanelBody, SelectControl, ToggleControl, RangeControl} = wp.components;
const {InspectorControls} = wp.editor;
import {getBlockConfig} from './config/blocks';


export function panelContainer(props, defaults) {
	const {attributes, setAttributes} = props;
	console.log({attributes, defaults});
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
						{label: 'Fixed Container', value: 'container'},
						{label: 'Fluid Container', value: 'container-fluid'}
					]}
					onChange={(nextValue) => {
						setAttributes({
							container: nextValue
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
			vertical = <SelectControl
				label={__('Vertical Alignment')}
				help={__('Vertical alignment of the block relative to the container')}
				value={attributes.alignment_vertical || defaults.alignment_vertical.default}
				options={[
					{label: 'Top', value: 'align-items-start'},
					{label: 'Center', value: 'align-items-center'},
					{label: 'Bottom', value: 'align-items-end'}
				]}
				onChange={(nextValue) => {
					setAttributes({
						alignment_vertical: nextValue
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
		
		if (defaults.items_break_point || false) {
			breakPoint = <SelectControl
				label={__('Items Breakpoint')}
				help={__('Items will convert to full width after the specified breakpoint')}
				value={attributes.items_break_point || defaults.items_break_point.default}
				options={[
					{label: 'None', value: 'col'},
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
		if (defaults.fluid_items || false) {
			fluid = <ToggleControl
				label="Fluid items?"
				help="If 'True' items will align themselves on the same row with equal width"
				checked={attributes.fluid_items || defaults.fluid_items.default}
				onChange={(val) => {
					setAttributes({
						fluid_items: val
					});
				}}
			/>;
		}
		if (defaults.columns || false) {
			columns =
				<RangeControl
					label="Column Width"
					value={attributes.columns || defaults.columns.default}
					min={0}
					max={12}
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
				{breakPoint}
				{fluid}
				{columns}
			</PanelBody>
		);
	}
}

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

