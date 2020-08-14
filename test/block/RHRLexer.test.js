'use strict';

const { describe, it } = require('mocha');
const { expect } = require('chai');
const RHRLexer = require('../../src/block/RHRLexer');


describe('RHRLexer', () => {
	describe('#apply', () => {
		const assertOutput = (input, expected) => {
			const result = RHRLexer.apply(input, text => text);
			expect(result).to.equal(expected);
		};

		it('should parse equals sign Setext headers', () => {
			const input = '===';
			const expected = '<hr />';
			assertOutput(input, expected);
		});

		it('should parse dashed lines', () => {
			const input = '---';
			const expected = '<hr />';
			assertOutput(input, expected);
		});

		it('should allow more than three dashes and still resolve properly', () => {
			const input = '---------------';
			const expected = '<hr />';
			assertOutput(input, expected);
		});

		it('should work with other text present', () => {
			const input = 'Hello there!\n\n---\n\nNice';
			const expected = 'Hello there!\n\n<hr />\n\nNice';
			assertOutput(input, expected);
		});
	});
});