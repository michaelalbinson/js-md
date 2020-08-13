'use strict';

const ARLexer = require('../ARLexer');


class RCustomEmojiLexer extends ARLexer {
    static apply(text) {
        return text.replace(/:([\w-]+?:)/gi, match => {
            return this._getEmojiImageMarkup(match.replace(/:/gi, ''));
        });
    }

    static _getEmojiImageMarkup(named) {
        let emojiRoot = '/assets/emoji/';
        if (ARLexer.SHARED_STATE && ARLexer.SHARED_STATE.emojiRoot)
            emojiRoot = ARLexer.SHARED_STATE.emojiRoot;

        return `<img src="${emojiRoot}${named}.png" alt="${named}" class="inline-emoji" title="${named}" />`;
    }
}

module.exports = RCustomEmojiLexer;
