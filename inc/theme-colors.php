<?php
/**
 * File: theme-colors.php
 * Date: 2/11/21
 * Time: 7:40 AM
 *
 * @package wp-badger-liqour
 * @author Michael Dahlke <mdahlke@wisnet.com>
 */
function five_theme_colors()
{
    return [
        [
            'name' => esc_html__('Red', 'five'),
            'slug' => 'red',
            'color' => '#ff0000',
        ],
        [
            'name' => esc_html__('Green', 'five'),
            'slug' => 'green',
            'color' => '#00ff00',
        ],
        [
            'name' => esc_html__('Blue', 'five'),
            'slug' => 'blue',
            'color' => '#0000ff',
        ],
        [
            'name' => esc_html__('Black', 'five'),
            'slug' => 'black',
            'color' => '#171718',
        ],
        [
            'name' => esc_html__('Gray', 'five'),
            'slug' => 'gray',
            'color' => '#333',
        ],
        [
            'name' => esc_html__('White', 'five'),
            'slug' => 'white',
            'color' => '#fff',
        ],

    ];
}

function five_theme_color_codes()
{
    return array_map(function ($obj) {
        return $obj['color'];
    }, five_theme_colors());
}

function wpdc_add_custom_gutenberg_color_palette()
{
    add_theme_support('editor-color-palette', five_theme_colors());
}

add_action('after_setup_theme', 'wpdc_add_custom_gutenberg_color_palette');
function five_acf_input_admin_footer()
{ ?>

	<script type="text/javascript">
		acf.add_filter('color_picker_args', function (args, $field) {
			args.palettes = <?= json_encode(five_theme_color_codes()); ?>;

			return args;

		});
	</script>

<?php }

add_action('acf/input/admin_footer', 'five_acf_input_admin_footer');
