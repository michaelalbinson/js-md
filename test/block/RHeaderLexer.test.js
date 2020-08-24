'use strict';

const { describe, it, beforeEach } = require('mocha');
const { expect } = require('chai');
const RHeaderLexer = require('../../src/block/RHeaderLexer');
const MODES = require('../../src/Modes');


/**
 * Applies the test cases outlined in the CommonMark Specification section 4.2-4.3 (examples 32-76) as well as assorted
 * smoke test cases
 */
describe('RHeaderLexer', () => {
    const assertOutput = (input, expected) => {
        const result = RHeaderLexer.apply(input,  text => text, text => text);
        expect(result).to.equal(expected);
    };

    describe('#apply', () => {
        beforeEach(() => {
            RHeaderLexer.resetSharedState({ mode: MODES.JS_MD });
        });

        it('should parse equals sign Setext headers', () => {
            const input = 'Test 123\n===\n';
            const expected = '<h1 id="--js-md--1083745852">Test 123</h1>\n';
            assertOutput(input, expected);
        });

        it('should parse dashed Setext headers', () => {
            const input = 'Test 123\n---\n';
            const expected = '<h2 id="--js-md--1083745852">Test 123</h2>\n';
            assertOutput(input, expected);
        });

        it('should allow more than 3 dashes and still parse header headers', () => {
            const input = 'Test 123\n-----------------\n';
            const expected = '<h2 id="--js-md--1083745852">Test 123</h2>\n';
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
                const expected = '<h2 id="--js-md--1083745852">Test 123</h2>\n';
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

    // examples 32-49
    describe('ATX Headings Specification', () => {
        beforeEach(() => {
            // execute all examples in common mark compatibility mode, as common mark doesn't allow adding hashes to
            // its headers
            RHeaderLexer.resetSharedState({ mode: MODES.COMMON_MARK });
        });

        it('example 32', () => {
            const input = '# foo\n' +
                '## foo\n' +
                '### foo\n' +
                '#### foo\n' +
                '##### foo\n' +
                '###### foo\n';

            const output = '<h1>foo</h1>\n' +
                '<h2>foo</h2>\n' +
                '<h3>foo</h3>\n' +
                '<h4>foo</h4>\n' +
                '<h5>foo</h5>\n' +
                '<h6>foo</h6>\n';

            assertOutput(input, output);
        });

        it('example 33', () => {
            assertOutput('####### foo', '####### foo');
        });

        it('example 34', () => {
            assertOutput('#5 bolt\n' +
                '\n' +
                '#hashtag',
                '#5 bolt\n' +
                '\n' +
                '#hashtag' )
        });

        it('example 35', () => {
            assertOutput('\\## foo', '\\## foo');
        });

        it('example 36', () => {
            assertOutput('# foo *bar* \*baz\*', '<h1>foo *bar* *baz*</h1>\n');
        });

        it('example 37', () => {
            assertOutput('#                  foo                     ', '<h1>foo</h1>\n')
        });

        it('example 38', () => {
            assertOutput(
                ' ### foo\n' +
                '  ## foo\n' +
                '   # foo',
                '<h3>foo</h3>\n' +
                '<h2>foo</h2>\n' +
                '<h1>foo</h1>\n')
        });

        it('example 39', () => {
            assertOutput('    # foo', '    # foo');
        });

        it('example 40', () => {
            assertOutput('foo\n' +
                '    # bar',
                'foo\n' +
                '    # bar')
        });

        it('example 41', () => {
            assertOutput('## foo ##\n' +
                '  ###   bar    ###',
                '<h2>foo</h2>\n' +
                '<h3>bar</h3>\n');
        });

        it('example 42', () => {
            assertOutput('# foo ##################################\n' +
                '##### foo ##',
                '<h1>foo</h1>\n' +
                '<h5>foo</h5>\n')
        });

        it('example 43', () => {
            assertOutput('### foo ###     ', '<h3>foo</h3>\n')
        });

        it('example 44', () => {
            assertOutput('### foo ### b', '<h3>foo ### b</h3>\n');
        });

        it('example 45', () => {
            assertOutput('# foo#', '<h1>foo#</h1>\n');
        });

        it('example 46', () => {
            assertOutput('### foo \\###\n' +
                '## foo #\\##\n' +
                '# foo \\#',
                '<h3>foo \\###</h3>\n' +
                '<h2>foo #\\##</h2>\n' +
                '<h1>foo \\#</h1>\n')
        });

        it('example 47', () => {
            assertOutput('****\n' +
                '## foo\n' +
                '****',
                '****\n' +
                '<h2>foo</h2>\n' +
                '****');
        });

        it('should 48', () => {
            assertOutput('Foo bar\n' +
                '# baz\n' +
                'Bar foo',
                'Foo bar\n' +
                '<h1>baz</h1>\n' +
                'Bar foo')
        });

        it('example 49', () => {
            assertOutput('## \n' +
                '#\n' +
                '### ###',
                '<h2></h2>\n' +
                '<h1></h1>\n' +
                '<h3></h3>\n')
        });
    });

    // examples 50-76
    describe('Setext Heading Specification', () => {
        beforeEach(() => {
            // execute all examples in common mark compatibility mode, as common mark doesn't allow adding hashes to
            // its headers
            RHeaderLexer.resetSharedState({ mode: MODES.COMMON_MARK });
        });

        it('example 50', () => {
            assertOutput('Foo *bar*\n' +
                '=========\n' +
                '\n' +
                'Foo *bar*\n' +
                '---------',
                '<h1>Foo *bar*</h1>\n\n' +
                '<h2>Foo *bar*</h2>\n');
        });

        it('example 51', () => {
            assertOutput('Foo *bar\n' +
                'baz*\n' +
                '====',
                '<h1>Foo *bar\n' +
                'baz*</h1>\n')
        });

        it('example 51 - dashed variation', () => [
            assertOutput('Foo *bar\n' +
                'baz*\n' +
                '---',
                '<h2>Foo *bar\n' +
                'baz*</h2>\n')
        ]);

        it('example 52', () => {
            assertOutput('  Foo *bar\n' +
                'baz*\t\n' +
                '====',
                '<h1>Foo *bar\n' +
                'baz*</h1>\n');
        });

        it('example 53', () => {
            assertOutput('Foo\n' +
                '-------------------------\n' +
                '\n' +
                'Foo\n' +
                '=',
                '<h2>Foo</h2>\n\n' +
                '<h1>Foo</h1>\n');
        });

        it('example 54', () => {
            assertOutput('   Foo\n' +
                '---\n' +
                '\n' +
                '  Foo\n' +
                '-----\n' +
                '\n' +
                '  Foo\n' +
                '  ===',
                '<h2>Foo</h2>\n\n' +
                '<h2>Foo</h2>\n\n' +
                '<h1>Foo</h1>\n');
        });

        it('example 55', () => {
            assertOutput('    Foo\n' +
                '    ---\n' +
                '\n' +
                '    Foo\n' +
                '---',
                '    Foo\n' +
                '    ---\n' +
                '\n' +
                '    Foo\n' +
                '---');
        });

        it('example 56', () => {
            assertOutput('Foo\n' +
                '   ----      ',
                '<h2>Foo</h2>\n');
        });

        it('example 57', () => {
            assertOutput('Foo\n' +
                '    ---',
                'Foo\n' +
                '    ---')
        });

        it('example 58', () => {
            assertOutput('Foo\n' +
                '= =\n' +
                '\n' +
                'Foo\n' +
                '--- -\n',
                'Foo\n' +
                '= =\n' +
                '\n' +
                'Foo\n' +
                '--- -\n');
        });

        it('example 59', () => {
            assertOutput('Foo  \n' +
                '-----',
                '<h2>Foo</h2>\n');
        });

        it('example 60', () => {
            assertOutput('Foo\\\n' +
                '----',
                '<h2>Foo\\</h2>\n');
        });

        it('example 61', () => {
            assertOutput('`Foo\n' +
                '----\n' +
                '`\n' +
                '\n' +
                '<a title="a lot\n' +
                '---\n' +
                'of dashes"/>',

                '<h2>`Foo</h2>\n' +
                '`\n\n' +
                '<h2><a title="a lot</h2>\n' +
                'of dashes"/>');
        });

        // omitting example 62 as it requires blockquote precedence

        // omitting example 63 as it requires blockquote precedence

        // omitting example 64 as it requires list precedence

        it('example 65', () => {
            assertOutput(
                'Foo\n' +
                'Bar\n' +
                '---',

                '<h2>Foo\n' +
                'Bar</h2>\n')
        });

        it('example 66', () => {
            assertOutput('---\n' +
                'Foo\n' +
                '---\n' +
                'Bar\n' +
                '---\n' +
                'Baz',

                '---\n' +
                '<h2>Foo</h2>\n' +
                '<h2>Bar</h2>\n' +
                'Baz')
        });

        it('example 67', () => {
            assertOutput(
                '\n====\n',
                '\n====\n');
        });

        it('example 68', () => {
            assertOutput(
                '---\n' +
                '---',

                '---\n' +
                '---');
        });

        // omitting example 69 as it requires list precedence

        it('example 70', () => {
            assertOutput('    foo\n' +
                '---',
                '    foo\n' +
                '---');
        });

        // omitting example 71 as it requires blockquote precedence

        it('example 72', () => {
            assertOutput('\\> foo\n' +
                '------',
                '<h2>\\> foo</h2>\n')
        });

        it('example 73', () => {
            assertOutput('Foo\n' +
                '\n' +
                'bar\n' +
                '---\n' +
                'baz',
                'Foo\n\n' +
                '<h2>bar</h2>\n' +
                'baz')
        });

        it('example 74', () => {
            assertOutput('Foo\n' +
                'bar\n' +
                '\n' +
                '---\n' +
                '\n' +
                'baz',
                'Foo\n' +
                'bar\n\n' +
                '---\n\n' +
                'baz');
        });

        it('example 75', () => {
            assertOutput('Foo\n' +
                'bar\n' +
                '* * *\n' +
                'baz',
                'Foo\n' +
                'bar\n' +
                '* * *\n' +
                'baz');
        });

        it('example 76', () => {
            assertOutput('Foo\n' +
                'bar\n' +
                '\\---\n' +
                'baz',
                'Foo\n' +
                'bar\n' +
                '\\---\n' +
                'baz');
        });
    });
});
