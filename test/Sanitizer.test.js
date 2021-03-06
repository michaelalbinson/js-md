'use strict';

const { describe, it } = require('mocha');
const { expect } = require('chai');
const Sanitizer = require('../src/Sanitizer');


describe('Sanitizer', () => {
	/**
	 * Take a transform and assert that it escapes the leading "<"
	 * @param transform {function}
	 * @param tagList {object}
	 */
	const assertTagListEscaped = (transform, tagList) => {
		Object.values(tagList).forEach(tagName => {
			expect(transform(`<${tagName}>test123</${tagName}>`))
				.to.equal(`&lt;${tagName}>test123</${tagName}>`)
		});
	};

	/**
	 * Take a transform and assert that it does not escape the leading "<"
	 * @param transform {function}
	 * @param tagList {object}
	 */
	const assertTagListNotEscaped = (transform, tagList) => {
		Object.values(tagList).forEach(tagName => {
			expect(transform(`<${tagName}>test123</${tagName}>`))
				.to.equal(`<${tagName}>test123</${tagName}>`)
		});
	};

	describe('#sanitizeAll', () => {
		it('should sanitize the given inputs', () => {
			assertTagListEscaped(Sanitizer.sanitizeAll, Sanitizer.ILLEGAL_TAGS);
			assertTagListEscaped(Sanitizer.sanitizeAll, Sanitizer.EXTENDED_ILLEGAL_TAGS);
		});

		it('should ignore non-illegal tags', () => {
			assertTagListNotEscaped(Sanitizer.sanitizeAll, ['div', 'li', 'ul', 'ol', 'section', 'document', 'strong', 'em', 'del'])
		});
	});

	describe('#sanitizeBasic', () => {
		it('should sanitize the given inputs', () => {
			assertTagListEscaped(Sanitizer.sanitizeBasic, Sanitizer.ILLEGAL_TAGS);
		});

		it('should ignore non-illegal tags', () => {
			assertTagListNotEscaped(Sanitizer.sanitizeBasic, Sanitizer.EXTENDED_ILLEGAL_TAGS);
			assertTagListNotEscaped(Sanitizer.sanitizeBasic, ['div', 'li', 'ul', 'ol', 'section', 'document', 'strong', 'em', 'del'])
		});
	});

	describe('#sanitizeExtended', () => {
		it('should sanitize the given inputs', () => {
			assertTagListEscaped(Sanitizer.sanitizeExtended, Sanitizer.EXTENDED_ILLEGAL_TAGS);
		});

		it('should ignore non-illegal tags', () => {
			assertTagListNotEscaped(Sanitizer.sanitizeExtended, Sanitizer.ILLEGAL_TAGS);
			assertTagListNotEscaped(Sanitizer.sanitizeExtended, ['div', 'li', 'ul', 'ol', 'section', 'document', 'strong', 'em', 'del'])
		});
	});

	describe('#sanitizeInlineJavascript', () => {
		it('should sanitize the following', () => {
			expect(Sanitizer.sanitizeInlineJavascript('<a href="javascript:alert(1)">Interior javascript text</a>'))
				.to.equal('<a href="alert(1)">Interior javascript text</a>');

			expect(Sanitizer.sanitizeInlineJavascript('<iframe src="javascript:alert(1)" />'))
				.to.equal('<iframe src="alert(1)" />');
		});

		it('should ignore the following javascript mentions', () => {
			const in1 = "Javascript: it's a cool tool!";
			expect(Sanitizer.sanitizeInlineJavascript(in1)).to.equal(in1);

			const in2 = "evil=javascript: trust me";
			expect(Sanitizer.sanitizeInlineJavascript(in2)).to.equal(in2);
		})
	});
});
