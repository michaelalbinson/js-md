'use strict';

const ARLexer = require('../ARLexer');


/**
 * Turns links:
 * www.michael.albinson.ca
 * or
 * http://www.michael.albinson.ca
 * or
 * https://www.michael.albinson.ca
 *
 * into link markup:
 * <a href="http://michael.albinson.ca">http://michael.albinson.ca</a>
 * or
 * <a href="http://michael.albinson.ca">http://michael.albinson.ca</a>
 * or
 * <a href="https://michael.albinson.ca">https://michael.albinson.ca</a>
 */
class RAutoLinkLexer extends ARLexer{
    static apply(text) {
        // capture links starting with http:// or https://
        text = text.replace(/(http[s]?:\/\/)([a-zA-Z0-9_]+\.)+([a-zA-Z0-9_]+)(\/[a-zA-Z0-9_?!.:*~+=()]+)*[^[?!.:*_~]]?/gi, match => {
            // handle special cases (e.g. link ending in ')' or ';') - if the special cases return null, use the default
            // behavior
            const specialCaseLink = RAutoLinkLexer._handleSpecialCases(match);
            if (specialCaseLink)
                return specialCaseLink;

            return `<a href="${match}">${match}</a>`;
        });

        // capture links beginning with www.<valid.url>
        return text.replace(/(www\.)([a-zA-Z0-9]+\.)+([a-zA-Z0-9_]+)(\/[a-zA-Z0-9_?!.:*~+=()&;]*)*[^[?!.:*_~< ]]?/gi, match => {
            // handle special cases (e.g. link ending in ')' or ';') - if the special cases return null, use the default
            // behavior
            const specialCaseLink = RAutoLinkLexer._handleSpecialCases(match);
            if (specialCaseLink)
                return specialCaseLink;

            return `<a href="${'http://' + match}">${match}</a>`;
        });
    }

    /**
     * Handle special cases (e.g. link ending in ')' or ';') - returns null if no special case is detected
     * @param match {string}
     * @return {string|null}
     * @private
     */
    static _handleSpecialCases(match) {
        if (match.endsWith(')')) {
            const handled = RAutoLinkLexer._parentheticalHandling(match);
            if (handled)
                return handled;

            // if _parentheticalHandling returns null just use the default behavior
        }

        if (match.endsWith(';')) {
            const handled = RAutoLinkLexer._semiColonHandling(match);
            if (handled)
                return handled

            // if _semiColonHandling returns null just use the default behavior
        }

        return null;
    }

    /**
     * From the GFM spec:
     * > When an autolink ends in ), we scan the entire autolink for the total number of parentheses.
     * > If there is a greater number of closing parentheses than opening ones, we don’t consider the unmatched
     * > trailing parentheses part of the autolink, in order to facilitate including an autolink inside a
     * > parenthesis:
     * @param maybeLink {string}
     * @return {string|null}
     */
    static _parentheticalHandling(maybeLink) {
        const openingMatches = maybeLink.match(/\(/g);
        const closingMatches = maybeLink.match(/\)/g);
        const numOpening = openingMatches ? openingMatches.length : 0;
        const numClosing = closingMatches ? closingMatches.length : 0;
        if (numClosing > numOpening) {
            let closing = maybeLink.slice(0 - (numClosing - numOpening));
            let link = maybeLink.slice(0, 0 - (numClosing - numOpening));
            let linkText = link;
            if (!link.startsWith('http'))
                link = 'http://' + link;

            return `<a href="${link}">${linkText}</a>${closing}`;
        }

        // if numClosing >= numOpening just allow the default behavior to build the link
        return null;
    }

    /**
     * From the GFM spec:
     * > If an autolink ends in a semicolon (;), we check to see if it appears to resemble an entity reference;
     * > if the preceding text is & followed by one or more alphanumeric characters. If so, it is excluded
     * > from the autolink
     *
     * @param maybeLink {string}
     * @return {string|null}
     * @private
     */
    static _semiColonHandling(maybeLink) {
        // search for an HTML entity at the end of a string - we don't really care if it's a real one or not
        const hasMatch = maybeLink.match(/&#?[a-zA-Z0-9]+;$/gi);
        if (hasMatch && hasMatch.length > 0) {
            // replace the last match found
            const lastMatch = hasMatch[hasMatch.length - 1];
            let link = maybeLink.replace(lastMatch, '');

            // then add http:// if the link doesn't already start with it
            const linkText = link;
            if (!link.startsWith('http'))
                link = 'http://' + link;

            // finally
            return `<a href="${link}">${linkText}</a>${lastMatch}`;
        }

        // if we don't find a well-formed HTML entity, bail
        return null;
    }
}

module.exports = RAutoLinkLexer;
