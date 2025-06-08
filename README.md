# Show Field ID for ACF Plugin

A WordPress plugin that displays ACF (Advanced Custom Fields) field names directly in the admin editor interface. **Now with full Gutenberg Block Editor support!**

## Features

- 📝 **Field Name Display**: Shows ACF field names next to their labels
- 📋 **Copy to Clipboard**: Click on any field name to copy it
- 🎨 **Beautiful UI**: Modern, clean design that integrates seamlessly with WordPress admin
- ⚡ **Performance Optimized**: Only loads on relevant admin pages
- 🧩 **Gutenberg Support**: Works perfectly with the new Block Editor
- 📱 **Responsive Design**: Looks great on all screen sizes

## Installation

1. Upload the plugin folder to `/wp-content/plugins/`
2. Activate the plugin through the 'Plugins' menu in WordPress
3. Make sure Advanced Custom Fields plugin is installed and activated

## Usage

### Classic Editor
1. Go to any post or page with ACF fields in your WordPress admin
2. ACF field names will automatically appear next to each field label
3. Click on any field name to copy it to your clipboard

### Gutenberg Block Editor
1. Open any post or page in the Gutenberg editor
2. ACF field names will automatically appear next to each field label
3. Click on any field name to copy it to your clipboard
4. Fields are detected automatically as you add or modify content

## Requirements

- WordPress 5.0 or higher (for Gutenberg support)
- Advanced Custom Fields (ACF) plugin
- PHP 7.0 or higher

## File Structure

```
acf-show-field-id/
├── acf-show-field-id.php            # Main plugin file
├── assets/
│   ├── acf-show-field-id.css        # Styling
│   └── acf-show-field-id.js         # Universal JS (works in both editors)
└── README.md                         # This file
```

## What's New in v1.0.0

- ✅ **Full Gutenberg Support**: Field names now display in the Block Editor
- ✅ **Copy Functionality**: Click to copy field names to clipboard
- ✅ **Modern Styling**: Clean design with hover effects
- ✅ **Responsive Design**: Works on all screen sizes
- ✅ **Universal Script**: Single JavaScript file works in both editors

## Browser Support

- Chrome 63+
- Firefox 53+
- Safari 13.1+
- Edge 79+

## Troubleshooting

### Field names not showing in Gutenberg?
- Make sure you're using ACF 5.8+ for best Gutenberg compatibility
- Check that your ACF fields are properly configured for block editor display
- Clear any caching plugins and refresh the page

### Copy to clipboard not working?
- The plugin includes fallback methods for older browsers
- Make sure your site is served over HTTPS for modern clipboard API support

## Development

The plugin is built with:
- PHP for WordPress hooks and functionality
- JavaScript (jQuery + Vanilla JS) for interactive features
- CSS with modern features and responsive design

## License

This plugin is open source and available under the GPL v2 license.

## Support

For bug reports and feature requests, please create an issue on the project repository. 