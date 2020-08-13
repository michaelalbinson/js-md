'use strict';

const { describe, it } = require('mocha');
const { expect } = require('chai');
const RStrikethroughLexer = require('../../../src/regexp/inline/RStrikethroughLexer');


describe('RStrikethroughLexer', () => {
	describe('#apply', () => {
		const assertOutput = (input, expected) => {
			const result = RStrikethroughLexer.apply(input);
			expect(result).to.equal(expected);
		};

		it('should pass a simple smoke tests', () => {
			assertOutput('~simple~', '<del>simple</del>');
			assertOutput('simple', 'simple');
		});

		it('should parse out a more complex string', () => {
			const input = 'This is a bit more ~complex~ than a typical string';
			const expected = 'This is a bit more <del>complex</del> than a typical string';
			assertOutput(input, expected);
		});

		it('should properly handle strings with whitespaces', () => {
			const input = 'This ~contains\nlots\tof\r\nweird whitespace~ than a typical string';
			const expected = 'This <del>contains\nlots\tof\r\nweird whitespace</del> than a typical string';
			assertOutput(input, expected);
		});

		it('should handle strings with emoji', () => {
			const input = 'This ~contains an emoji 🚀 is that not super cool?~ than';
			const expected = 'This <del>contains an emoji 🚀 is that not super cool?</del> than';
			assertOutput(input, expected);
		});

		it('should handle strings with multiple matches', () => {
			const input = 'This ~is one match~ ~this is another~ a few more words ~and another!~ than';
			const expected = 'This <del>is one match</del> <del>this is another</del> a few more words <del>and another!</del> than';
			assertOutput(input, expected);
		});
	});
});
