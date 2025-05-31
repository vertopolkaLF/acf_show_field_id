/**
 * ACF Show Field ID - Universal Script
 * Works in both Classic and Gutenberg editors
 * 
 * @package ACF_Show_Field_ID
 * @version 1.0.0
 */

// Universal script for ACF Show Field ID - works in both Classic and Gutenberg editors
(function () {
    'use strict';

    // Get translated strings from WordPress
    const translations = window.acfShowFieldIdData || {
        clickToCopy: 'Click to copy',
        copied: 'Copied!',
        copyFieldName: 'Click to copy field name'
    };

    // Set CSS custom properties for tooltips
    function setCSSVariables() {
        document.documentElement.style.setProperty('--acf-tooltip-click', `"${translations.clickToCopy}"`);
        document.documentElement.style.setProperty('--acf-tooltip-copied', `"${translations.copied}"`);
    }

    // Function to detect if we're in Gutenberg
    function isGutenberg() {
        return document.body.classList.contains('block-editor-page') ||
            document.querySelector('.block-editor') !== null ||
            (typeof wp !== 'undefined' && wp.blocks);
    }

    // Function to check if we're on ACF field group editing page
    function isACFFieldGroupPage() {
        // Check URL parameters
        const urlParams = new URLSearchParams(window.location.search);

        // Check if we're editing field groups
        if (urlParams.get('post_type') === 'acf-field-group') {
            return true;
        }

        // Check if we're on field group edit page
        if (urlParams.get('page') === 'acf-field-group') {
            return true;
        }

        // Check body classes
        if (document.body.classList.contains('post-type-acf-field-group')) {
            return true;
        }

        // Check if current page is ACF field group edit
        if (window.location.href.includes('post_type=acf-field-group') ||
            window.location.href.includes('page=acf-field-group')) {
            return true;
        }

        return false;
    }

    // Main function to add field names to ACF labels
    function addFieldNames() {
        const acfFields = document.querySelectorAll('.postbox .acf-field:not(.acf-field-name-processed)');

        acfFields.forEach(function (field) {
            field.classList.add('acf-field-name-processed');

            let fieldName = getFieldName(field);

            if (fieldName) {
                addFieldNameToLabel(field, fieldName);
            }
        });
    }

    // Universal function to extract field name
    function getFieldName(field) {
        let fieldName = null;

        // Method 1: Check for data attributes
        fieldName = field.dataset.name || field.getAttribute('data-name');

        // Method 2: Check input name attribute
        if (!fieldName) {
            const input = field.querySelector('input, select, textarea, .acf-input');
            if (input) {
                const name = input.name || input.id;
                if (name && name.includes('acf[')) {
                    const nameMatch = name.match(/acf\[([^\]]+)\]/);
                    fieldName = nameMatch ? nameMatch[1] : null;
                }
            }
        }

        // Method 3: Check for field key and try to extract name
        if (!fieldName) {
            let fieldKey = field.dataset.key;
            if (!fieldKey && field.querySelector('[data-key]')) {
                fieldKey = field.querySelector('[data-key]').getAttribute('data-key');
            }

            if (fieldKey) {
                const input = field.querySelector(`[name*="${fieldKey}"]`);
                if (input && input.name) {
                    const match = input.name.match(/\[([^\]]+)\]$/);
                    if (match) {
                        fieldName = match[1];
                    }
                }
            }
        }

        return fieldName;
    }

    // Function to add field name to label
    function addFieldNameToLabel(fieldContainer, fieldName) {
        const label = fieldContainer.querySelector('.acf-label');

        if (label && !label.querySelector('.acf-field-name-tag')) {
            const nameTag = createFieldNameTag(fieldName);

            // Add classic editor class if not in Gutenberg
            if (!isGutenberg()) {
                nameTag.classList.add('acf-field-name-tag-classic');
            }

            label.appendChild(nameTag);
        }
    }

    // Function to create field name tag
    function createFieldNameTag(fieldName) {
        const nameTag = document.createElement('span');
        nameTag.className = 'acf-field-name-tag';
        nameTag.textContent = fieldName;
        nameTag.title = translations.copyFieldName;

        // Add click handler for copying
        nameTag.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            copyToClipboard(fieldName, nameTag);
        });

        return nameTag;
    }

    // Copy to clipboard function
    function copyToClipboard(text, element) {
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(text).then(function () {
                showCopySuccess(element);
            }).catch(function () {
                fallbackCopyToClipboard(text, element);
            });
        } else {
            fallbackCopyToClipboard(text, element);
        }
    }

    // Fallback copy method
    function fallbackCopyToClipboard(text, element) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.top = '0';
        textArea.style.left = '0';
        textArea.style.opacity = '0';

        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        try {
            const successful = document.execCommand('copy');
            if (successful) {
                showCopySuccess(element);
            }
        } catch (err) {
            console.log('ACF Show Field ID: Copy failed');
        }

        document.body.removeChild(textArea);
    }

    // Show copy success
    function showCopySuccess(element) {
        element.classList.add('acf-field-name-tag-copied');

        setTimeout(function () {
            element.classList.remove('acf-field-name-tag-copied');
        }, 1500);
    }

    // Initialize the plugin
    function init() {
        console.log('ACF Field Names: Initialized for', isGutenberg() ? 'Gutenberg' : 'Classic editor');

        // Set CSS variables for tooltips
        setCSSVariables();

        // Initial run
        setTimeout(addFieldNames, isGutenberg() ? 1000 : 500);

        // Watch for changes
        const observer = new MutationObserver(function () {
            setTimeout(addFieldNames, 300);
        });

        const target = isGutenberg() ? document.body : (document.querySelector('#post-body, .acf-fields') || document.body);
        observer.observe(target, {
            childList: true,
            subtree: true
        });

        // ACF events
        if (typeof acf !== 'undefined' && acf.addAction) {
            acf.addAction('new_field', function () {
                setTimeout(addFieldNames, 100);
            });
        }
    }

    // Initialize when appropriate
    if (typeof wp !== 'undefined' && wp.domReady) {
        // Gutenberg environment
        wp.domReady(function () {
            if (!isACFFieldGroupPage()) {
                init();
            }
        });
    } else {
        // Classic editor environment
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', function () {
                if (!isACFFieldGroupPage()) {
                    init();
                }
            });
        } else {
            if (!isACFFieldGroupPage()) {
                init();
            }
        }
    }

})(); 