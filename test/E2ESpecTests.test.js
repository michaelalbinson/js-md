'use strict';

const { describe, it } = require('mocha');
const { expect } = require('chai');

const MDLexer = require('../src/MDLexer');


/**
 * Test class containing overflow precedence tests from the specifications that can't be properly enforced in unit testing
 * classes
 */
describe('E2E Lexing Tests', () => {
    const assertOutput = (inText, outText) => {
        expect(new MDLexer().lex(inText)).to.equal(outText);
    };

    describe('overflow spec tests for the HRLexer should pass', () => {
        it('example 27', () => {
            assertOutput(
                '- foo\n' +
                '***\n' +
                '- bar',
                '<ul>\n' +
                '<li><p>foo</p></li>\n' +
                '</ul>\n' +
                '<hr />\n' +
                '<ul>\n' +
                '<li><p>bar</p></li>\n' +
                '</ul>\n');
        });

        it('example 28', () => {
            assertOutput('Foo\n' +
                '***\n' +
                'bar',
                '<p>Foo</p>\n' +
                '<hr />\n' +
                '<p>bar</p>');
        });

        it('example 29', () => [
            assertOutput('Foo\n' +
                '---\n' +
                'bar',
                '<h2 id="--js-md-70822">Foo</h2>\n' +
                '<p>bar</p>')
        ]);

        it('example 30', () => {
            assertOutput('* Foo\n' +
                '* * *\n' +
                '* Bar',
                '<ul>\n' +
                '<li>Foo</li>\n' +
                '</ul>\n' +
                '<hr />\n' +
                '<ul>\n' +
                '<li>Bar</li>\n' +
                '</ul>')
        });

        it('example 31', () => {
            assertOutput('- Foo\n' +
                '- * * *',
                '<ul>\n' +
                '<li>Foo</li>\n' +
                '<li>\n' +
                '<hr />\n' +
                '</li>\n' +
                '</ul>')
        })
    });
});
