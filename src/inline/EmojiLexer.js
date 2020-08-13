'use strict';

const AInlineLexer = require('./AInlineLexer');
const emoji = require('./emoji');


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
            if (char === EmojiLexer.COLON) {
                // if the emoji name is empty, or the name is not present in the
                // map of emoji names, bail
                if (emojiName.length === 0 || !emoji[emojiName])
                    return { markup: '', continueIndex: startIndex };
                else
                    return { markup: emoji[emojiName], continueIndex: idx };
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
}

EmojiLexer.COLON = ':';

module.exports = EmojiLexer;
