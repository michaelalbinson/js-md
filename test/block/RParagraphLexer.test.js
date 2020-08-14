'use strict';

const { describe, it } = require('mocha');
const { expect } = require('chai');
const RParagraphLexer = require('../../src/block/RParagraphLexer');

describe('RParagraphLexer', () => {
	describe('#apply', () => {
		const assertOutput = (input, expected) => {
			const result = RParagraphLexer.apply(input, text => text);
			expect(result).to.equal(expected);
		};

		it('should wrap the text in a p tag', () => {
			const input = 'simple test';
			const expected = '<p>simple test</p>'
			assertOutput(input, expected);
		});

		it('should NOT wrap the text already in an html tag', () => {
			const input = '<h1>simple test</h1>';
			assertOutput(input, input);
		});

		it('should work successfully wrap multiple paragraphs', () => {
			const input =
`simple test

simple test 2`;

			const expected =
`<p>simple test</p>

<p>simple test 2</p>`;

			assertOutput(input, expected);
		});

		it('should work with mixed html', () => {
			const input =
`simple test

<h1>nice</h1>

simple test 2

it'd be cool if this **just worked**`;

			const expected =
`<p>simple test</p>

<h1>nice</h1>

<p>simple test 2</p>

<p>it'd be cool if this **just worked**</p>`;

			assertOutput(input, expected);
		});
	});
});