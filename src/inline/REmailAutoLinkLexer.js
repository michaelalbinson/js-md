'use strict';

const RLinkLexer = require('./RLinkLexer');


/**
 * Turns email addresses:
 * michael@example.com
 * michael.cool@some.domain.test
 *
 * into:
 * <a href="mailto:fragged@email.address">michael@example.com</a>
 * etc.
 *
 * We extend the LinkLexer to grab its getMarkup function, which will let us obfuscate emails as we normally do for emails
 */
class REmailAutoLinkLexer extends RLinkLexer {
    static apply(text) {
        // GFM Section 6.9:
        // Email addresses are recognised according to the following rules:
        // 1. One ore more characters which are alphanumeric, or ., -, _, or +
        // 2. An @ symbol
        // 3. One or more characters which are alphanumeric, or - or _, separated by periods (.).
        //    There must be at least one period. The last character must not be one of - or _
        //
        // GFM is odd in that it permits "."s to be allowed directly after email addresses, but not "-" or "_"
        // so we need a special lookahead for those two
        return text.replace(/([a-zA-Z0-9_.\-+]+)+@([a-zA-Z0-9_\-]+\.)+[a-zA-Z0-9](?![\-_])/gi, match => {
            return this.getMarkup(match, 'mailto:' + match);
        });
    }
}

module.exports = REmailAutoLinkLexer;
