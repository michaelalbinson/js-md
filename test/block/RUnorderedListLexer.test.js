'use strict';

const { describe, it } = require('mocha');
const { expect } = require('chai');
const RUnorderedListLexer = require('../../src/block/RUnorderedListLexer');


describe('RUnorderedListLexer', () => {
    describe('#apply', () => {
        const assertOutput = (input, expected) => {
            const result = RUnorderedListLexer.apply(input, text => text, text => text);
            expect(result).to.equal(expected);
        };

        it('should parse a single list item', () => {
            const input = '- test 123\n\n';
            const expected = `<ul>
<li>test 123</li>


</ul>
`;
            assertOutput(input, expected);
        });

        it('should parse a multiple line list item', () => {
            const input = '- test 123\nthis is a line continuation\nbecause I have lots of things to say\n';
            const expected = `<ul>
<li>test 123
this is a line continuation
because I have lots of things to say</li>
</ul>
`;
            assertOutput(input, expected);
        });

        it('should parse a multiple list items with mixed markers', () => {
            const input = `- test 123
* hello
`;

            const expected = `<ul>
<li>test 123</li>

<li>hello</li>
</ul>
`;
            assertOutput(input, expected);
        });

        it('should allow multiline and single line list items', () => {
            const input =
`- test 123
Cool! maybe this will work!
* hello
`;

            const output = `<ul>
<li>test 123
Cool! maybe this will work!</li>

<li>hello</li>
</ul>
`;

            assertOutput(input, output);
        });

        it('should ignore text preceeding and proceeding the list', () => {
            const input =
`
There is a paragraph before the list
it's pretty long!

- test 123
Cool! maybe this will work!


There's also a paragraph following the list!
It also has more than
one line!
`;

            const output =
`
There is a paragraph before the list
it's pretty long!

<ul>
<li>test 123
Cool! maybe this will work!</li>


</ul>

There's also a paragraph following the list!
It also has more than
one line!
`;

            assertOutput(input, output);
        });

        it('should allow sub-markdown', () => {
            const input =
`
There is a paragraph before the list
it's pretty long!

- test 123
Cool! maybe this will work! **There's other markdown in here! It could be - interpreted as a list!**


There's also a paragraph following the list!
It also has more than
one line!
`;

            const output =
`
There is a paragraph before the list
it's pretty long!

<ul>
<li>test 123
Cool! maybe this will work! **There's other markdown in here! It could be - interpreted as a list!**</li>


</ul>

There's also a paragraph following the list!
It also has more than
one line!
`;

            assertOutput(input, output);
        });

        it('should not consume hr/setext header triggers', () => {
            const input = '---';
            const output = '---';
            assertOutput(input, output);
        });

        it('should allow a list continuation', () => {
            const input = `
- Interesting
unfortunately this ends the list?

- test 2
`;

            const output = `
<ul>
<li>Interesting
unfortunately this ends the list?</li>


<li>test 2</li>
</ul>
`;

            assertOutput(input, output);
        });
    });
});
