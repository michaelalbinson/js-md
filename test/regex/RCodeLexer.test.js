'use strict';

const { describe, it } = require('mocha');
const RCodeLexer = require('../../src/regexp/inline/RCodeLexer');


describe('RCodeLexer', () => {
	describe('#apply', () => {
		const assertOutput = (input, expected) => {
			const result = RCodeLexer.apply(input);
			if (result !== expected)
				throw new Error('failed, got: "' + result + '"\nExpected: "' + expected + '"');
		}

		it('should pass a simple smoke tests', () => {
			assertOutput('`simple`', '<code>simple</code>');
			assertOutput('simple', 'simple');
		});

		it('should parse out a more complex string', () => {
			const input = 'This is a bit more `complex` than a typical string';
			const expected = 'This is a bit more <code>complex</code> than a typical string';
			assertOutput(input, expected);
		});

		it('should properly handle strings with whitespaces', () => {
			const input = 'This `contains\nlots\tof\r\nweird whitespace` than a typical string';
			const expected = 'This <code>contains\nlots\tof\r\nweird whitespace</code> than a typical string';
			assertOutput(input, expected);
		});

		it('should handle strings with emoji', () => {
			const input = 'This `contains an emoji 🚀 is that not super cool?` than';
			const expected = 'This <code>contains an emoji 🚀 is that not super cool?</code> than';
			assertOutput(input, expected);
		});

		it('should handle strings with multiple matches', () => {
			const input = 'This `is one match` `this is another` a few more words `and another!` than';
			const expected = 'This <code>is one match</code> <code>this is another</code> a few more words <code>and another!</code> than';
			assertOutput(input, expected);
		});
	});
});