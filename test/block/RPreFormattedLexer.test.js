'use strict';

const { describe, it } = require('mocha');
const { expect } = require('chai');
const RPreFormattedLexer = require('../../src/block/RPreFormattedLexer');


describe('RPreFormattedLexer', () => {
	const assertOutput = (input, expected) => {
		const result = RPreFormattedLexer.apply(input);
		expect(result).to.equal(expected);
	};

	describe('#apply', () => {
		it('should successfully parse', () => {
			const input = '```hello\nworld```';
			const output = '<pre>hello&#10;world</pre>';
			assertOutput(input, output);
		});

		it('should parse out two code blocks', () => {
			const input = '```hello\nworld```\n\nthere is other text\n\n```console.log("test1");```';
			const output = '<pre>hello&#10;world</pre>\n\nthere is other text\n\n<pre>console.log(&quot;test1&quot;);</pre>';
			assertOutput(input, output);
		});

		it('should not parse single or double code ticked blocks', () => {
			const input = '``test`` `test2`';
			assertOutput(input, input);
		});
	});

	describe('4.5 Fenced code blocks (examples 89 - 117)', () => {
		it('example 89', () => {
			assertOutput(
				'```\n' +
				'<\n' +
				' >\n' +
				'```',

				'<pre><code>&lt;\n' +
				' &gt;\n' +
				'</code></pre>'
			);
		});
	});
});