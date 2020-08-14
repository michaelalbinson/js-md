'use strict';

const ARLexer = require('../ARLexer');


class RLinkLexer extends ARLexer {
    static apply(text) {
        return text.replace(/\[(.*?)][ ]?\(.*?\)/gi, match => {
            const text = match.slice(1, match.indexOf(']'));
            const link = match.slice(match.indexOf('(') + 1, -1);
            return RLinkLexer.getMarkup(text, link);
        });
    }

    /**
     *
     * @param text
     * @param link
     * @return {string}
     */
    static getMarkup(text, link) {
        // we'll catch both mailto:hello@example.domain and hello@example.domain here
        // and scramble them so that they can't be as easily found by scrapers
        if (link.match(/^(?:mailto:)?([-.\w]+@[-a-z0-9]+(\.[-a-z0-9]+)*\.[a-z]+)$/i))
            link = RLinkLexer.scrambleEmail(link);

        // if the text is exactly an email address, scramble it too
        if (text.match(/^(?:mailto:)?([-.\w]+@[-a-z0-9]+(\.[-a-z0-9]+)*\.[a-z]+)$/i))
            text = RLinkLexer.scrambleEmail(text);

        return `<a href="${link}">${text}</a>`
    }

    /**
     * Input: an email address, e.g. "foo@example.com"
     *
     * Output: the email address as a mailto link, with each character
     * of the address encoded as either a decimal or hex entity, in
     * the hopes of foiling most address harvesting spam bots. E.g.:
     *
     * <a href="&#x6D;&#97;&#105;&#108;&#x74;&#111;:&#102;&#111;&#111;&#64;&#101;
     * x&#x61;&#109;&#x70;&#108;&#x65;&#x2E;&#99;&#111;&#109;">&#102;&#111;&#111;
     * &#64;&#101;x&#x61;&#109;&#x70;&#108;&#x65;&#x2E;&#99;&#111;&#109;</a>
     *
     * Based on a filter by Matthew Wickline, posted to the BBEdit-Talk
     * mailing list: <http://tinyurl.com/yu7ue>
     * @param email {string}
     * @return {string}
     */
    static scrambleEmail(email) {
        if (!email.includes('mailto:'))
            email = 'mailto:' + email;

        let final = '';
        for (let char of email) {
            // encode @, the original author insists
            if (char === '@')
                final += RLinkLexer._encode(char);
            else if (char === ':') // leave ':' alone (to spot mailto: later)
                final += char;
            else
                final += RLinkLexer._encode(char);
        }

        return final;
    }

    static _encode(char) {
        // roughly 10% raw, 45% hex, 45% dec
        let chance = Math.random();
        if (chance > .9)
            return char;
        else if (chance < .45)
            return '&#' + char.charCodeAt(0) + ';';
        else
            return '&#x' + char.charCodeAt(0).toString(16) + ';';
    }
}

module.exports = RLinkLexer;
