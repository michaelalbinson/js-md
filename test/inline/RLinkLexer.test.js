'use strict';

const { describe, it } = require('mocha');
const { expect } = require('chai');
const RLinkLexer = require('../../src/inline/RLinkLexer');


describe('RLinkLexer', () => {
	describe('#apply', () => {
		const assertOutput = (input, expected) => {
			const result = RLinkLexer.apply(input);
			expect(result).to.equal(expected);
		};

		it('should parse out the link and format it appropriately', () => {
			const input = '[simple link](https://cool.beans)';
			const expected = '<a href="https://cool.beans">simple link</a>';
			assertOutput(input, expected);
		});

		it('should parse out the link even if there is other text present', () => {
			const input = 'there is some text before this [simple link](https://cool.beans) and after!';
			const expected = 'there is some text before this <a href="https://cool.beans">simple link</a> and after!';
			assertOutput(input, expected);
		});

		it('should parse multiple links in a block', () => {
			const input = '[simple link 1](https://cool.beans) [simple link 2](http://another.link)';
			const expected = '<a href="https://cool.beans">simple link 1</a> <a href="http://another.link">simple link 2</a>';
			assertOutput(input, expected);
		});

		it('should not match image magic tags', () => {
			const input = '![simple image](https://cool.beans)';
			const expected = '![simple image](https://cool.beans)';
			assertOutput(input, expected);
		});

		it('should properly obfuscate email addresses in links', () => {
			const FRAGGED_EMAIL_LINK_REGEX = /^<a href="((&#x\d+;)|(&#\d+;)|[a-z])+:(&#x\d+;)|((&#x\d+;)|(&#\d+;)|.)+">simple email address<\/a>$/gi;
			const input = '[simple email address](test@cool.beans)';
			const result = RLinkLexer.apply(input);
			expect(result.match(FRAGGED_EMAIL_LINK_REGEX).length).to.not.equal(0);
			expect(result.includes('test@cool.beans')).to.equal(false);
		});

		it('should properly obfuscate email addresses in link text', () => {
			const FRAGGED_EMAIL_LINK_REGEX = /^<a href="((&#x\d+;)|(&#\d+;)|[a-z])+:(&#x\d+;)|((&#x\d+;)|(&#\d+;)|.)+">((&#x\d+;)|(&#\d+;)|[a-z])+:(&#x\d+;)|((&#x\d+;)|(&#\d+;)|.)+<\/a>$/gi;
			const input = '[test@cool.beans](test@cool.beans)';
			const result = RLinkLexer.apply(input);
			expect(result.includes('test@cool.beans')).to.equal(false);
		});
	});

	describe('#scrambleEmail', () => {
		const assertOutput = (input, expected) => {
			const FRAGGED_EMAIL_REGEX = /((&#x\d+;)|(&#\d+;)|[a-z])+:(&#x\d+;)|((&#x\d+;)|(&#\d+;)|.)+/gi;
			const result = RLinkLexer.scrambleEmail(input);
			expect(result).to.not.equal(expected);
			expect(result.match(FRAGGED_EMAIL_REGEX).length).to.not.equal(0);
		};

		it('should scramble the email', () => {
			const input = 'mailto:hello@world.com';
			const expected = 'mailto:hello@world.com';
			assertOutput(input, expected);
		});

		it('should append mailto: if not already present', () => {
			const input = 'hello@world.com';
			const expected = 'mailto:hello@world.com';
			assertOutput(input, expected);
		});
	});
});