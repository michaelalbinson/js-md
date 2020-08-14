'use strict';

const { describe, it } = require('mocha');
const { expect } = require('chai');
const RBlockQuoteLexer = require('../../src/block/RBlockQuoteLexer');

describe('RBlockQuoteLexer', () => {
	describe('#apply', () => {
		const assertOutput = (input, expected) => {
			const result = RBlockQuoteLexer.apply(input, text => text, text => text);
			expect(result).to.equal(expected);
		};

		it('should successfully add blockquote tags', () => {
			const input = '> simple\n';
			const output = '<blockquote>\nsimple\n</blockquote>\n\n';
			assertOutput(input, output);
		});

		it('should successfully only wrap the quoted text in a blockquote', () => {
			const input =
				`hello world

> this is a quote!

other text`;

			const output =
				`hello world

<blockquote>
this is a quote!
</blockquote>

other text`;
			assertOutput(input, output);
		});

		it('should successfully wrap more than one quote', () => {
			const input =
`> hello world

other text

> this is a quote!
`;

			const output =
`<blockquote>
hello world
</blockquote>

other text

<blockquote>
this is a quote!
</blockquote>

`;
			assertOutput(input, output);
		});

		it('should work across multiple lines', () => {
			const input =
`> hello 
> world
> there's a lot of text in this quote!
> which is neat
`;

			const output =
`<blockquote>
hello 
world
there's a lot of text in this quote!
which is neat
</blockquote>

`;
			assertOutput(input, output);
		});

		it('should work across multiple lines with surrounding text', () => {
			const input =
`Here's an excerpt of something:

> hello 
> world
> there's a lot of text in this quote!
> which is neat

Wasn't that good?`;

			const output =
`Here's an excerpt of something:

<blockquote>
hello 
world
there's a lot of text in this quote!
which is neat
</blockquote>

Wasn't that good?`;

			assertOutput(input, output);
		});

		it('should work across multiple lines with surrounding text with no carats', () => {
			const input =
`Here's an excerpt of something:

> hello 
world
there's a lot of text in this quote!
which is neat

Wasn't that good?`;

			const output =
`Here's an excerpt of something:

<blockquote>
hello 
world
there's a lot of text in this quote!
which is neat
</blockquote>

Wasn't that good?`;

			assertOutput(input, output);
		});
	});
});