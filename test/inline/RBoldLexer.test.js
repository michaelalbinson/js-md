'use strict';

const { describe, it } = require('mocha');
const { expect } = require('chai');
const RBoldLexer = require('../../src/inline/RBoldLexer');


describe('RBoldLexer', () => {
	describe('#apply', () => {
		const assertOutput = (input, expected) => {
			const result = RBoldLexer.apply(input);
			expect(result).to.equal(expected);
		};

		it('should pass a simple smoke tests', () => {
			assertOutput('**simple**', '<strong>simple</strong>');
			assertOutput('__simple__', '<strong>simple</strong>');
			assertOutput('simple', 'simple');
		});

		it('should parse out a more complex string', () => {
			const input = 'This is a bit more **complex** than a typical string';
			const expected = 'This is a bit more <strong>complex</strong> than a typical string';
			assertOutput(input, expected);
		});

		it('should properly handle strings with whitespaces', () => {
			const input = 'This **contains\nlots\tof\r\nweird whitespace** than a typical string';
			const expected = 'This <strong>contains\nlots\tof\r\nweird whitespace</strong> than a typical string';
			assertOutput(input, expected);
		});

		it('should handle strings with emoji', () => {
			const input = 'This **contains an emoji 🚀 is that not super cool?** than';
			const expected = 'This <strong>contains an emoji 🚀 is that not super cool?</strong> than';
			assertOutput(input, expected);
		});

		it('should handle strings with multiple matches', () => {
			const input = 'This **is one match** **this is another** a few more words **and another!** than';
			const expected = 'This <strong>is one match</strong> <strong>this is another</strong> a few more words <strong>and another!</strong> than';
			assertOutput(input, expected);
		});

		it('should not match any italic phrases', () => {
			const input = 'This *is italic* **it would be good** if only **this** is strong';
			const expected = 'This *is italic* <strong>it would be good</strong> if only <strong>this</strong> is strong';
			assertOutput(input, expected);
		});

		it('should match triple emphasized strings', () => {
			const input = 'This ***is extra emphasized*** **it would be good**';
			const expected = 'This <strong>*is extra emphasized*</strong> <strong>it would be good</strong>';
			assertOutput(input, expected);
		});

		it('should match mismatched starts and ends', () => {
			const input = 'This __is a clever** test';
			const expected = 'This <strong>is a clever</strong> test';
			assertOutput(input, expected);
		});

		it('should not match mismatched starts and ends I', () => {
			const input = 'This *is a clever** test';
			assertOutput(input, input);
		});

		it('should not match mismatched starts and ends II', () => {
			const input = 'This **is a clever* test';
			assertOutput(input, input);
		});
	});
});
