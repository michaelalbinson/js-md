'use strict';

const AInlineLexer = require('./AInlineLexer');


class EmojiLexer extends AInlineLexer {
    /**
     *
     * @param text {string}
     * @param startIndex {number}
     * @param reLex {function}
     * @return {{ markup: string|null, continueIndex: number }}
     */
    static lex(text, startIndex, reLex) {
        let emojiName = '';
        let idx = startIndex + 1;
        while (text[idx]) {
            let char = text[idx];
            // hunt for the next colon
            if (char === MDLexer.COLON) {
                // if the
                if (emojiName.length === 0)
                    return { markup: '', continueIndex: startIndex };
                else
                    return { markup: EmojiLexer._getEmojiImageMarkup(emojiName), continueIndex: idx };
            } else if (char === ' ' || char === '\n' || char === '\t' || char === '\r')
                return { markup: '', continueIndex: startIndex };

            emojiName += char;
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
        return EmojiLexer.COLON === char;
    }

    static _getEmojiImageMarkup(named) {
        return `<img src="/assets/emoji/${named}.png" alt="${named}" class="inline-emoji" title="${named}" />`;
    }
}

EmojiLexer.COLON = ':';

module.exports = EmojiLexer;
