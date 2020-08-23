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
			const input = '___';
			const expected = '<hr />';
			assertOutput(input, expected);
		});

		it('should parse dashed lines', () => {
			const input = '---';
			const expected = '<hr />';
			assertOutput(input, expected);
		});

		it('should parse three or more asterisks', () => {
			const input = '***';
			const expected = '<hr />';
			assertOutput(input, expected);
			assertOutput("*****************", expected);
		});

		it('should ignore asterisks that would otherwise be emphasis markers', () => {
			assertOutput("This is ***bold with emphasis***", "This is ***bold with emphasis***");
			assertOutput("***This is also bold with emphasis***", "***This is also bold with emphasis***");
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

		it('should allow spaces', () => {
			assertOutput(' - ---- ------ --- -', '<hr />');
			assertOutput(' *  *** ** **** ', '<hr />');
			assertOutput('  __ ____ ____ _ ', '<hr />');

			// example 21
			assertOutput(' - - -', '<hr />');

			// example 22
			assertOutput(' **  * ** * ** * **', '<hr />');

			// example 23
			assertOutput('-     -      -      -', '<hr />');

			// example 24
			assertOutput('- - - -    ', '<hr />');
		});

		it('should ignore the line if any other characters are present', () => {
			// example 25
			assertOutput('_ _ _ _ a', '_ _ _ _ a');
			assertOutput('a------', 'a------');
			assertOutput('---a---', '---a---');
		});

		it('should ignore non-matched whitespace characters', () => {
			// example 26
			assertOutput(' *-*', ' *-*');
		})
	});
});
