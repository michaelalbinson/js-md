'use strict';

const { describe, it } = require('mocha');
const { expect } = require('chai');
const REmailAutoLinkLexer = require('../../src/inline/REmailAutoLinkLexer');

/**
 * Applies simple smoke cases as well as examples 629-631 in Section 6.9 of the GFM specification
 * we delegate the examples 621-628 to the RAutoLinkLexer and its associated tests
 */
describe('REmailAutoLinkLexer', () => {
    describe('#apply', () => {
        const assertOutput = (input, email, expectedRE) => {
            const result = REmailAutoLinkLexer.apply(input);

            // assert that the email being linked does not appear in cleartext
            expect(result.includes(SAMPLE_EMAIL)).to.equal(false);

            expect(result.match(expectedRE).length === 1).to.equal(true);
        };

        const SAMPLE_EMAIL = 'hello@world.com';

        it('should pass a simple smoke tests', () => {
            assertOutput(SAMPLE_EMAIL, SAMPLE_EMAIL, /<a href=".*">.*<\/a>/);
        });

        it('should work in the context of other text', () => {
            assertOutput('Hello there. This document has auto-linking enabled - take a look! hello@world.com', SAMPLE_EMAIL, /Hello there\. This document has auto-linking enabled - take a look! <a href=".+">.+<\/a>/);
        });

        it('should work with the following examples', () => {
            // example 629
            assertOutput('foo@bar.baz', 'foo@bar.baz', /<a href=".*">.*<\/a>/);

            // example 630
            assertOutput('hello@mail+xyz.example isn\'t valid, but hello+xyz@mail.example is.', /hello@mail\+xyz\.example isn't valid, but <a href=".*">.*<\/a> is\./);
        });

        it('should work for all cases in example 631', () => {
            // example 631
            // email should be recognized
            assertOutput('a.b-c_d@a.b', 'a.b-c_d@a.b', /<a href=".*">.*<\/a>/);

            // email should be recognized
            assertOutput('a.b-c_d@a.b.', 'a.b-c_d@a.b', /<a href=".*">.*<\/a>\./);

            // email should not be recognized
            assertOutput('a.b-c_d@a.b-', 'failure case', /a\.b-c_d@a\.b-/);

            // email should not be recognized
            assertOutput('a.b-c_d@a.b_', 'failure case', /a\.b-c_d@a\.b_/);
        });
    });
});
