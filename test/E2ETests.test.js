'use strict';

const { describe, it } = require('mocha');
const { expect } = require('chai');

const MDLexer = require('../src/MDLexer');


/**
 * Test class containing sample error cases that have been fixed
 */
describe('E2E Lexing Tests', () => {
	it('should lex sample properly', () => {
		const out =  new MDLexer().lex('## ~Goodbye~ Hello World!');
		expect(out).to.equal('<h2 id="--js-md--845732878"><del>Goodbye</del> Hello World!</h2>')
	});

	it('should correctly parse this snippet', () => {
		const input = `
## But it ~does~ not? ##

Hello ~there's a code block in here~
`;
		const output = `<h2 id="--js-md-1098432783">But it <del>does</del> not?</h2>

<p>Hello <del>there's a code block in here</del></p>`;

		const out = new MDLexer().lex(input);
		expect(out).to.equal(output);
	});

	it('it should properly parse nested block-quotes', () => {
		const input = `
> you go bud
> 
> > nested blocks
`;
		const output = `<blockquote>
<p>you go bud</p>

<blockquote>
<p>nested blocks</p>
</blockquote>
</blockquote>`;

		const out = new MDLexer().lex(input);
		expect(out).to.equal(output);
	});
});