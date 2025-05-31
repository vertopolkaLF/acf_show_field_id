<?php

/**
 * Plugin Name: ACF Show Field ID
 * Description: Shows ACF field names in both Classic and Gutenberg editors
 * Version: 1.0.0
 * Author: vertopolkaLF
 * Author URI: https://vertopolkalf.ru
 * Text Domain: acf-show-field-id
 * License: GPL v2 or later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Requires at least: 5.0
 * Tested up to: 6.4
 * Network: false
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

// Define plugin version
if (!defined('ACFSFID_VERSION')) {
    define('ACFSFID_VERSION', '1.0.0');
}

if (!defined('ACFSFID_PLUGIN_URL')) {
    define('ACFSFID_PLUGIN_URL', plugin_dir_url(__FILE__));
}

class ACFSFID_Show_Field_ID
{

    public function __construct()
    {
        add_action('admin_enqueue_scripts', array($this, 'enqueue_scripts'));
        add_action('enqueue_block_editor_assets', array($this, 'enqueue_block_editor_assets'));
    }

    /**
     * Enqueue admin scripts and styles for classic editor
     */
    public function enqueue_scripts($hook)
    {
        // Load on ACF pages and post editing pages
        if (strpos($hook, 'acf') !== false || $hook === 'post.php' || $hook === 'post-new.php') {
            // Universal script that works in both editors
            wp_enqueue_script(
                'acf-show-field-id-universal',
                ACFSFID_PLUGIN_URL . 'assets/acf-show-field-id.js',
                array('jquery'),
                ACFSFID_VERSION,
                true
            );

            wp_enqueue_style(
                'acf-show-field-id',
                ACFSFID_PLUGIN_URL . 'assets/acf-show-field-id.css',
                array(),
                ACFSFID_VERSION
            );
        }
    }

    /**
     * Enqueue block editor specific assets
     */
    public function enqueue_block_editor_assets()
    {
        // Same universal script for Gutenberg
        wp_enqueue_script(
            'acf-show-field-id-universal',
            ACFSFID_PLUGIN_URL . 'assets/acf-show-field-id.js',
            array('wp-dom-ready', 'wp-blocks', 'wp-element'),
            ACFSFID_VERSION,
            true
        );

        wp_enqueue_style(
            'acf-show-field-id',
            ACFSFID_PLUGIN_URL . 'assets/acf-show-field-id.css',
            array(),
            ACFSFID_VERSION
        );
    }
}

// Initialize the plugin only if ACF is active
function acfsfid_show_field_id_init()
{
    if (class_exists('ACF')) {
        new ACFSFID_Show_Field_ID();
    } else {
        add_action('admin_notices', 'acfsfid_show_field_id_acf_missing_notice');
    }
}

// Notice if ACF is not active
function acfsfid_show_field_id_acf_missing_notice()
{
    $message = esc_html__('ACF Show Field ID: This plugin requires Advanced Custom Fields to be installed and activated.', 'acf-show-field-id');
    printf('<div class="notice notice-error"><p><strong>%s</strong></p></div>', $message);
}

add_action('plugins_loaded', 'acfsfid_show_field_id_init');
