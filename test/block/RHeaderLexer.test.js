'use strict';

const { describe, it, beforeEach } = require('mocha');
const { expect } = require('chai');
const RHeaderLexer = require('../../src/block/RHeaderLexer');

describe('RHeaderLexer', () => {
    describe('#apply', () => {
        const assertOutput = (input, expected) => {
            const result = RHeaderLexer.apply(input,  text => text);
            expect(result).to.equal(expected);
        };

        beforeEach(() => {
            RHeaderLexer.resetSharedState();
        });

        it('should parse equals sign Setext headers', () => {
            const input = 'Test 123\n===\n';
            const expected = '<h1 id="--js-md--1083745852">Test 123</h1>';
            assertOutput(input, expected);
        });

        it('should parse dashed Setext headers', () => {
            const input = 'Test 123\n---\n';
            const expected = '<h2 id="--js-md--1083745852">Test 123</h2>';
            assertOutput(input, expected);
        });

        it('should allow more than 3 dashes and still parse header headers', () => {
            const input = 'Test 123\n-----------------\n';
            const expected = '<h2 id="--js-md--1083745852">Test 123</h2>';
            assertOutput(input, expected);
        });

        it('should parse atx-style headers', () => {
            const assertProperOutput = test => {
                RHeaderLexer.resetSharedState();
                const expected = '<h2 id="--js-md--1083745852">Test 123</h2>';
                assertOutput(test, expected);
            };

            assertProperOutput('## Test 123\n');
            assertProperOutput('## Test 123 ##\n');
            assertProperOutput('## Test 123             \n');
            assertProperOutput('## Test 123\t\t\t\t\t  \n');
            assertProperOutput('## Test 123  \n');
            assertProperOutput('## Test 123 ############\n');
        });

        it('should work on multiple headers across multiple lines', () => {
            const input = `# Test 1

Test 2
------
`;
            const output = `<h1 id="--js-md--1793304509">Test 1</h1>
<h2 id="--js-md--1793304508">Test 2</h2>
`;

            assertOutput(input, output);
        });
    });
});
