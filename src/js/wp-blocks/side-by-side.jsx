const {__} = wp.i18n;
const {PanelBody, SelectControl} = wp.components;


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
