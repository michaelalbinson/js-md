'use strict';

const { describe, it } = require('mocha');
const BoldLexer = require('../../src/inline/BoldLexer');


describe('BoldLexer', () => {
	describe('#apply', () => {
		const assertOutput = (input, expected) => {
			const result = BoldLexer.lex(input);
			if (result !== expected)
				throw new Error('failed, got: "' + result + '"\nExpected: "' + expected + '"');
		}

		it('should pass a simple smoke tests', () => {
			assertOutput('**simple**', '<bold>simple</bold>');
			assertOutput('__simple__', '<bold>simple</bold>');
			assertOutput('simple', 'simple');
		});

		it('should parse out a more complex string', () => {
			const input = 'This is a bit more **complex** than a typical string';
			const expected = 'This is a bit more <bold>complex</bold> than a typical string';
			assertOutput(input, expected);
		});

		it('should properly handle strings with whitespaces', () => {
			const input = 'This **contains\nlots\tof\r\nweird whitespace** than a typical string';
			const expected = 'This <bold>contains\nlots\tof\r\nweird whitespace</bold> than a typical string';
			assertOutput(input, expected);
		});

		it('should handle strings with emoji', () => {
			const input = 'This **contains an emoji 🚀 is that not super cool?** than';
			const expected = 'This <bold>contains an emoji 🚀 is that not super cool?</bold> than';
			assertOutput(input, expected);
		});

		it('should handle strings with multiple matches', () => {
			const input = 'This **is one match** **this is another** a few more words **and another!** than';
			const expected = 'This <bold>is one match</bold> <bold>this is another</bold> a few more words <bold>and another!</bold> than';
			assertOutput(input, expected);
		});

		it('should not match any italic phrases', () => {
			const input = 'This *is italic* **it would be good** if only **this** is bold';
			const expected = 'This *is italic* <bold>it would be good</bold> if only <bold>this</bold> is bold';
			assertOutput(input, expected);
		});
	});
});