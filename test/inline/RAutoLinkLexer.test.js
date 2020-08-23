'use strict';

const { describe, it } = require('mocha');
const { expect } = require('chai');
const RAutoLinkLexer = require('../../src/inline/RAutoLinkLexer');

/**
 * Applies simple smoke cases as well as examples 621-628 in Section 6.9 of the GFM specification
 * we delegate the examples 629-631 to the REmailAutoLinkLexer and its associated tests
 */
describe('RAutoLinkLexer', () => {
    describe('#apply', () => {
        const assertOutput = (input, expected) => {
            const result = RAutoLinkLexer.apply(input);
            expect(result).to.equal(expected);
        };

        it('should pass a simple smoke tests', () => {
            assertOutput('www.test.url', '<a href="http://www.test.url">www.test.url</a>');
            assertOutput('http://hello.world.com/this/link', '<a href="http://hello.world.com/this/link">http://hello.world.com/this/link</a>');
            assertOutput('https://hello.world.com/this/link', '<a href="https://hello.world.com/this/link">https://hello.world.com/this/link</a>');
        });

        it('should work in the context of other text', () => {
            assertOutput('Hello there. This document has auto-linking enabled - take a look! www.test.url', 'Hello there. This document has auto-linking enabled - take a look! <a href="http://www.test.url">www.test.url</a>');
        });

        it('should work with the following examples', () => {
            // example 621
            assertOutput('www.commonmark.org', '<a href="http://www.commonmark.org">www.commonmark.org</a>');

            // example 622
            assertOutput('Visit www.commonmark.org/help for more information.', 'Visit <a href="http://www.commonmark.org/help">www.commonmark.org/help</a> for more information.');

            // example 623
            assertOutput('Visit www.commonmark.org.', 'Visit <a href="http://www.commonmark.org">www.commonmark.org</a>.');
            assertOutput('Visit www.commonmark.org/a.b.', 'Visit <a href="http://www.commonmark.org/a.b">www.commonmark.org/a.b</a>.');
        });

        it('should follow the special rules when the link ends in a parenthesis', () => {
            // example 624
            assertOutput('www.google.com/search?q=Markup+(business)', '<a href="http://www.google.com/search?q=Markup+(business)">www.google.com/search?q=Markup+(business)</a>');
            assertOutput('www.google.com/search?q=Markup+(business)))', '<a href="http://www.google.com/search?q=Markup+(business)">www.google.com/search?q=Markup+(business)</a>))');
            assertOutput('(www.google.com/search?q=Markup+(business))', '(<a href="http://www.google.com/search?q=Markup+(business)">www.google.com/search?q=Markup+(business)</a>)');
            assertOutput('(www.google.com/search?q=Markup+(business)', '(<a href="http://www.google.com/search?q=Markup+(business)">www.google.com/search?q=Markup+(business)</a>');

            // example 625
            assertOutput('www.google.com/search?q=(business))+ok', '<a href="http://www.google.com/search?q=(business))+ok">www.google.com/search?q=(business))+ok</a>');
        });

        it('should follow the special handling rules for links ending in semicolons', () => {
            // example 626
            assertOutput('www.google.com/search?q=commonmark&hl=en', '<a href="http://www.google.com/search?q=commonmark&hl=en">www.google.com/search?q=commonmark&hl=en</a>');
            assertOutput('www.google.com/search?q=commonmark&hl;', '<a href="http://www.google.com/search?q=commonmark">www.google.com/search?q=commonmark</a>&hl;');
        });

        it('should follow the special handling rules for <', () => {
            // example 627
            assertOutput('www.commonmark.org/he<lp', '<a href="http://www.commonmark.org/he">www.commonmark.org/he</a><lp')
        });

        it('should also work for http:// or https:// prefixed links', () => {
            // example 628
            assertOutput('http://commonmark.org', '<a href="http://commonmark.org">http://commonmark.org</a>');
            assertOutput('(Visit https://encrypted.google.com/search?q=Markup+(business))', '(Visit <a href="https://encrypted.google.com/search?q=Markup+(business)">https://encrypted.google.com/search?q=Markup+(business)</a>)');
        })
    });
});
