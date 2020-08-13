'use strict';

const { describe, it } = require('mocha');
const { expect } = require('chai');
const RImageLexer = require('../../../src/regexp/inline/RImageLexer');


describe('RImageLexer', () => {
	describe('#apply', () => {
		const assertOutput = (input, expected) => {
			const result = RImageLexer.apply(input);
			expect(result).to.equal(expected);
		};

		it('should generate an image', () => {
			const input = '![simple link](https://cool.beans)';
			const expected = '<img src="https://cool.beans" alt="simple link" title="simple link" />';
			assertOutput(input, expected);
		});

		it('should not parse a link', () => {
			const input = '[simple link](https://cool.beans)';
			assertOutput(input, input);
		});

		it('should generate an image surrounded by words', () => {
			const input = 'hello there ![simple link](https://cool.beans) general kenobi';
			const expected = 'hello there <img src="https://cool.beans" alt="simple link" title="simple link" /> general kenobi';
			assertOutput(input, expected);
		});

		it('should generate multiple images', () => {
			const input = 'hello there ![simple link](https://cool.beans) general kenobi ![simple link](https://cool.beans)';
			const expected = 'hello there <img src="https://cool.beans" alt="simple link" title="simple link" /> general kenobi <img src="https://cool.beans" alt="simple link" title="simple link" />';
			assertOutput(input, expected);
		});
	});
});