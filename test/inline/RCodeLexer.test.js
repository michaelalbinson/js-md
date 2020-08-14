'use strict';

const { describe, it } = require('mocha');
const { expect } = require('chai');
const RCodeLexer = require('../../src/inline/RCodeLexer');


describe('RCodeLexer', () => {
	describe('#apply', () => {
		const assertOutput = (input, expected) => {
			const result = RCodeLexer.apply(input);
			expect(result).to.equal(expected);
		};

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
			const expected = 'This <code>contains&#10;lots\tof\r&#10;weird whitespace</code> than a typical string';
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

		it('should properly escape html entities and tags', () => {
			const input = 'This code snippet contains html! `<span>hello world & welcome!</span>`';
			const expected = 'This code snippet contains html! <code>&lt;span&gt;hello world &amp; welcome!&lt;/span&gt;</code>';
			assertOutput(input, expected);
		});

		it('should escape markdown magic characters so they aren\'t double parsed', () => {
			const input = 'This code snippet contains markdown! `<span>* ![there\'s markdown magic afoot!](https://nice.com)</span>`';
			const expected = 'This code snippet contains markdown! <code>&lt;span&gt;&#42; !&#91;there&apos;s markdown magic afoot!&#93;(https://nice.com)&lt;/span&gt;</code>';
			assertOutput(input, expected);
		});
	});
});
