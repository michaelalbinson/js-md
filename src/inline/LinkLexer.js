'use strict';

const AInlineLexer = require('./AInlineLexer');


class LinkLexer extends AInlineLexer {
    /**
     *
     * @param text {string}
     * @param startIndex {number}
     * @param reLex {function}
     * @return {{ markup: string|null, continueIndex: number }}
     */
    static lex(text, startIndex, reLex) {
        let textMode = true;
        let linkText = '';
        let link = '';

        // start after the '['
        let idx = startIndex + 1;
        while (text[idx]) {
            let char = text[idx];
            if (textMode && char === LinkLexer.RIGHT_BRACE) {
                // if the next character isn't a parenthesis, bail because this isn't a link
                if (text[idx + 1] !== LinkLexer.LEFT_PARENTHESIS)
                    return { markup: '', continueIndex: startIndex + 1 };

                // skip over the '(' and start listening for the link itself
                idx += 2;
                textMode = false;
                continue;
            } else if (!textMode && char === LinkLexer.RIGHT_PARENTHESIS) {
                // we have a properly formed link!
                const linkMarkup = `<a href="${link}">${reLex(linkText)}</a>`;
                return { markup: linkMarkup, continueIndex: idx }
            }

            if (textMode)
                linkText += char;
            else
                link += char;

            idx++;
        }

        return { markup: '', continueIndex: startIndex };
    }

    /**
     *
     * @param char {string}
     * @param lookahead {string}
     * @return {boolean}
     */
    static isTrigger(char, lookahead) {
        return LinkLexer.LEFT_BRACE === char;
    }
}

LinkLexer.LEFT_BRACE = '[';
LinkLexer.RIGHT_BRACE = ']';
LinkLexer.LEFT_PARENTHESIS = '(';
LinkLexer.RIGHT_PARENTHESIS = ')';

module.exports = LinkLexer;
