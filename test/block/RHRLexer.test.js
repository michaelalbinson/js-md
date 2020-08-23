'use strict';

const { describe, it } = require('mocha');
const { expect } = require('chai');
const RHRLexer = require('../../src/block/RHRLexer');


/**
 * Applies the test cases outlined in the CommonMark Specification section 4.1 (examples 13-31) as well as assorted
 * smoke test cases
 */
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

		it('should follow the CommonMark specification examples', () => {
			// example 13
			assertOutput('***', '<hr />');
			assertOutput('---', '<hr />');
			assertOutput('___', '<hr />');

			// example 14
			assertOutput('+++', '+++');

			//example 15
			assertOutput('===', '===');

			// example 16
			assertOutput('--', '--');
			assertOutput('**', '**');
			assertOutput('__', '__');

			// example 17
			assertOutput(' ***', '<hr />');
			assertOutput('  ***', '<hr />');
			assertOutput('   ***', '<hr />');

			// example 18
			assertOutput('    ***', '    ***');

			// custom example inspired by example 18
			assertOutput('\t***', '\t***');

			// example 19
			assertOutput('Foo\n' +
				'    ***', 'Foo\n' +
				'    ***');


			// example 20
			assertOutput('_____________________________________', '<hr />');
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
		});

		it('should follow examples 27-31', () => {
			// example 27
			assertOutput(
				'- foo\n' +
				'***\n' +
				'- bar',
				'- foo\n' +
				'<hr />\n' +
				'- bar')

			// example 28
			assertOutput('Foo\n' +
				'***\n' +
				'bar',
				'Foo\n' +
				'<hr />\n' +
				'bar');

			// example 29 omitted as it shows the precedence of the heading lexer over the hr lexer... nothing to see in unit testing

			// example 30
			assertOutput('* Foo\n' +
				'* * *\n' +
				'* Bar',
				'* Foo\n' +
				'<hr />\n' +
				'* Bar');

			// example 31 modified as it also demonstrates the re-lex cycle as part of list parsing
			assertOutput('- Foo\n' +
				'- * * *',
				'- Foo\n' +
				'- * * *');
		});
	});
});
