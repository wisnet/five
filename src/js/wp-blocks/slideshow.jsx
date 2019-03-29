const {__} = wp.i18n;
const {PanelBody, RangeControl, ToggleControl} = wp.components;

export default (props, defaults) => {
	const {attributes, setAttributes} = props;
	
	return (
		<PanelBody title={__('Slideshow Settings')}
		           initialOpen={false}>
			<ToggleControl
				label={__('Autoplay')}
				help={attributes.autoplay == 'true' ? __('Slideshow will start playing automatically', 'five') : __('User will have to cycle slideshow manually', 'five')}
				checked={(attributes.autoplay || defaults.autoplay.default) == 'true'}
				onChange={(nextValue) => {
					setAttributes({
						autoplay: nextValue ? 'true' : 'false'
					});
				}} />
			<RangeControl
				label={__('Time between slides')}
				help={__('There will be ' + (attributes.interval / 1000) + ' seconds between slides', 'five')}
				value={attributes.interval}
				onChange={(interval) => setAttributes({interval})}
				min={1000}
				max={20000}
			/>
			<ToggleControl
				label={__('Controls')}
				help={attributes.controls == 'true' ? __('Arrows will be visible', 'five') : __('Arrows will be hidden', 'five')}
				checked={(attributes.controls || defaults.controls.default) == 'true'}
				onChange={(nextValue) => {
					setAttributes({
						controls: nextValue ? 'true' : 'false'
					});
				}} />
			<ToggleControl
				label={__('Indicators')}
				help={attributes.indicators == 'true' ? __('Arrows will be visible', 'five') : __('Arrows will be hidden', 'five')}
				checked={(attributes.indicators || defaults.indicators.default) == 'true'}
				onChange={(nextValue) => {
					setAttributes({
						indicators: nextValue ? 'true' : 'false'
					});
				}} />
			<ToggleControl
				label={__('Pause on hover')}
				help={attributes.pause_on_hover == 'true' ? __('Slideshow will pause when mouse is hovering', 'five') : __('Slideshow will continue when mouse is hovering', 'five')}
				checked={(attributes.pause_on_hover || defaults.pause_on_hover.default) == 'true'}
				onChange={(nextValue) => {
					setAttributes({
						pause_on_hover: nextValue ? 'true' : 'false'
					});
				}} />
			<ToggleControl
				label={__('Wrap')}
				help={attributes.wrap == 'true' ? __('Slide will start over after the last slide', 'five') : __('Slideshow will stop after the last slide', 'five')}
				checked={(attributes.wrap || defaults.wrap.default) == 'true'}
				onChange={(nextValue) => {
					setAttributes({
						wrap: nextValue ? 'true' : 'false'
					});
				}} />
			<RangeControl
				label={__('Slideshow Height')}
				help={attributes.height === 0 ? __('The height will be vary depending on the height of the image that is currently showing ', 'five') : __('The height will be fixed at ' + attributes.height + 'px', 'five')}
				value={(attributes.height || defaults.height.default)}
				onChange={(height) => setAttributes({height})}
				min={0}
				max={1000} />
		</PanelBody>
	);
}
