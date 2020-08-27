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
        const lexer = new MDLexer();
        lexer.setMode(MDLexer.MODES.COMMON_MARK);
        expect(lexer.lex(inText)).to.equal(outText);
    };

    describe('Section 2.2 - Tabs (examples 1-11)', () => {
        it('example 1', () => {
            assertOutput(
                '\tfoo\tbaz\t\tbim',

                '<pre><code>foo\tbaz\t\tbim\n' +
				'</code></pre>'
            );
        });

        it('example 2', () => {
			assertOutput(
			    '  \tfoo\tbaz\t\tbim',

                '<pre><code>foo\tbaz\t\tbim\n' +
                '</code></pre>',
			);
        });

        it('example 3', () => {
            assertOutput(
                '    a\ta\n' +
                '    ὐ\ta',

                '<pre><code>a\ta\n' +
                'ὐ\ta\n' +
                '</code></pre>'
            );
        });

        it('example 4', () => {
            assertOutput(
                '  - foo\n' +
                '\n' +
                '\tbar',

                '<ul>\n' +
                '<li>\n' +
                '<p>foo</p>\n' +
                '<p>bar</p>\n' +
                '</li>\n' +
                '</ul>\n'
            );
        });

        it('example 5', () => {
            assertOutput(
                '- foo\n' +
                '\n' +
                '\t\tbar',

                '<ul>\n' +
                '<li>\n' +
                '<p>foo</p>\n' +
                '<pre><code>  bar\n' +
                '</code></pre>\n' +
                '</li>\n' +
                '</ul>'
            );
        });

        it('example 6', () => {
            assertOutput(
                '>\t\tfoo',

                '<blockquote>\n' +
                '<pre><code>  foo\n' +
                '</code></pre>\n' +
                '</blockquote>'
            );
        });

        it('example 7', () => {
            assertOutput(
                '-\t\tfoo',

                ''
            )
        })

        it('example 8', () => {
            assertOutput(
                '    foo\n' +
                '\tbar',

                '<pre><code>foo\n' +
                'bar\n' +
                '</code></pre>'
            );
        });

        it('example 9', () => {
            assertOutput(
                ' - foo\n' +
                '   - bar\n' +
                '\t - baz',

                '<ul>\n' +
                '<li>foo\n' +
                '<ul>\n' +
                '<li>bar\n' +
                '<ul>\n' +
                '<li>baz</li>\n' +
                '</ul>\n' +
                '</li>\n' +
                '</ul>\n' +
                '</li>\n' +
                '</ul>'
            );
        });

        it('example 10', () => {
            assertOutput(
                '#\tFoo',

                '<h1>Foo</h1>'
            );
        });

        it('example 11', () => {
            assertOutput(
                '*\t*\t*\t',

                '<hr />'
            );
        });
    });

    describe('overflow spec tests for the HRLexer should pass', () => {
        it('example 27', () => {
            // assertOutput(
            //     '- foo\n' +
            //     '***\n' +
            //     '- bar',
            //
            //     '<ul>\n' +
            //     '<li><p>foo</p></li>\n' +
            //     '</ul>\n' +
            //     '<hr />\n' +
            //     '<ul>\n' +
            //     '<li><p>bar</p></li>\n' +
            //     '</ul>\n');
        });

        it('example 28', () => {
            assertOutput('Foo\n' +
                '***\n' +
                'bar',

                '<p>Foo</p>\n' +
                '<hr />\n' +
                '<p>bar</p>');
        });

        it('example 29', () => {
            assertOutput('Foo\n' +
                '---\n' +
                'bar',

                '<h2>Foo</h2>\n' +
                '<p>bar</p>');
        });

        it('example 30', () => {
            // assertOutput('* Foo\n' +
            //     '* * *\n' +
            //     '* Bar',
            //
            //     '<ul>\n' +
            //     '<li>Foo</li>\n' +
            //     '</ul>\n' +
            //     '<hr />\n' +
            //     '<ul>\n' +
            //     '<li>Bar</li>\n' +
            //     '</ul>');
        });

        it('example 31', () => {
            assertOutput('- Foo\n' +
                '- * * *',

                '<ul>\n' +
                '<li><p>Foo</p></li>\n' +
                '<li><hr /></li>\n' +
                '</ul>');
        });
    });
});
