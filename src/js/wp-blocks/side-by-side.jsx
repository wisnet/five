const {__} = wp.i18n;
const {Fragment} = wp.element;
const {PanelBody, SelectControl, ToggleControl, RangeControl} = wp.components;
const {InspectorControls} = wp.editor;
import {createHooks} from '@wordpress/hooks';

createHooks().addFilter('five.extra_props', 'themes/wisnet/blah', (props) => {
	props.content_alignment = 'align-self-start';
	
	return props;
});

export default (props, defaults) => {
	const {attributes, setAttributes} = props;
	return (
		<PanelBody title={__('Extras')}
		           initialOpen={false}>
			<SelectControl
				label={__('Content Alignment')}
				help={__('Width of the block')}
				value={attributes.content_alignment || defaults.content_alignment.default}
				options={[
					{label: 'Top', value: 'align-self-start'},
					{label: 'Middle', value: 'align-self-center'},
					{label: 'Bottom', value: 'align-self-end'}
				]}
				onChange={(nextValue) => {
					setAttributes({
						content_alignment: nextValue
					});
				}} />
		</PanelBody>
	);
}
