'use strict';

const { describe, it } = require('mocha');
const { expect } = require('chai');
const RItalicLexer = require('../../../src/regexp/inline/RItalicLexer');


describe('RItalicLexer', () => {
	describe('#apply', () => {
		const assertOutput = (input, expected) => {
			const result = RItalicLexer.apply(input);
			expect(result).to.equal(expected);
		};

		it('should pass a simple smoke tests', () => {
			assertOutput('*simple*', '<em>simple</em>');
			assertOutput('_simple_', '<em>simple</em>');
			assertOutput('*simple**', '<em>simple</em>*');
			assertOutput('_simple__', '<em>simple</em>_');
			assertOutput('simple', 'simple');
		});

		it('should parse out a more complex string', () => {
			const input = 'This is a bit more *complex* than a typical string';
			const expected = 'This is a bit more <em>complex</em> than a typical string';
			assertOutput(input, expected);
		});

		it('should properly handle strings with whitespaces', () => {
			const input = 'This **contains\nlots\tof\r\nweird whitespace* than a typical string';
			const expected = 'This <em>contains\nlots\tof\r\nweird whitespace</em> than a typical string';
			assertOutput(input, expected);
		});

		it('should handle strings with emoji', () => {
			const input = 'This *contains an emoji 🚀 is that not super cool?* than';
			const expected = 'This <em>contains an emoji 🚀 is that not super cool?</em> than';
			assertOutput(input, expected);
		});

		it('should handle strings with multiple matches', () => {
			const input = 'This *is one match* *this is another* a few more words *and another!* than';
			const expected = 'This <em>is one match</em> <em>this is another</em> a few more words <em>and another!</em> than';
			assertOutput(input, expected);
		});
	});
});
