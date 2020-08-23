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
            const expected = '<h1 id="--js-md--1083745852">Test 123</h1>\n\n';
            assertOutput(input, expected);
        });

        it('should parse dashed Setext headers', () => {
            const input = 'Test 123\n---\n';
            const expected = '<h2 id="--js-md--1083745852">Test 123</h2>\n\n';
            assertOutput(input, expected);
        });

        it('should allow more than 3 dashes and still parse header headers', () => {
            const input = 'Test 123\n-----------------\n';
            const expected = '<h2 id="--js-md--1083745852">Test 123</h2>\n\n';
            assertOutput(input, expected);
        });

        it('should parse two headers at the same time', () => {
            const input = 'test\n======\n\nMuch better\n---\n\n';
            const expected = "<h1 id=\"--js-md-3556498\">test</h1>\n\n<h2 id=\"--js-md-1108587843\">Much better</h2>\n\n";
            assertOutput(input, expected);
        });

        it('should parse atx-style headers', () => {
            const assertProperOutput = test => {
                RHeaderLexer.resetSharedState();
                const expected = '<h2 id="--js-md--1083745852">Test 123</h2>\n\n';
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

        it('should parse ATX headers as in the examples:', () => {
            // example 32
            const input = '# foo\n' +
                '## foo\n' +
                '### foo\n' +
                '#### foo\n' +
                '##### foo\n' +
                '###### foo\n';

            const output = '<h1 id="--js-md-101574">foo</h1>\n' +
                '\n' +
                '<h2 id="--js-md-101574i">foo</h2>\n' +
                '\n' +
                '<h3 id="--js-md-101574i">foo</h3>\n' +
                '\n' +
                '<h4 id="--js-md-101574i">foo</h4>\n' +
                '\n' +
                '<h5 id="--js-md-101574i">foo</h5>\n' +
                '\n' +
                '<h6 id="--js-md-101574i">foo</h6>\n' +
                '\n';

            assertOutput(input, output);
        });
    });
});
