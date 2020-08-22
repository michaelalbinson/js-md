'use strict';

const { describe, it } = require('mocha');
const { expect } = require('chai');
const Safeguard = require('../src/Safeguard');


describe('Safeguard', () => {
	/**
	 *
	 * @param transform {function}
	 * @param tagList {object}
	 */
	const assertTagListCaught = (transform, tagList) => {
		Object.values(tagList).forEach(tagName => {
			expect(transform(`<${tagName}>test123</${tagName}>`))
				.to.equal(true);
		});
	};

	const assertTagListNotCaught = (transform, tagList) => {
		Object.values(tagList).forEach(tagName => {
			expect(transform(`<${tagName}>test123</${tagName}>`))
				.to.equal(false);
		});
	};

	describe('#defaultGuard', () => {
		it('should sanitize the given inputs', () => {
			assertTagListCaught(Safeguard.defaultGuard, Sanitizer.ILLEGAL_TAGS);
			assertTagListCaught(Safeguard.defaultGuard, Sanitizer.EXTENDED_ILLEGAL_TAGS);
		});

		it('should ignore non-illegal tags', () => {
			assertTagListNotCaught(Safeguard.defaultGuard, ['div', 'li', 'ul', 'ol', 'section', 'document', 'strong', 'em', 'del'])
		});
	});

	describe('#sanitizeBasic', () => {
		it('should sanitize the given inputs', () => {
			assertTagListCaught(Safeguard.containsExtendedIllegalTags, Sanitizer.ILLEGAL_TAGS);
		});

		it('should ignore non-illegal tags', () => {
			assertTagListNotCaught(Safeguard.sanitizeBasic, Sanitizer.EXTENDED_ILLEGAL_TAGS);
			assertTagListNotCaught(Safeguard.sanitizeBasic, ['div', 'li', 'ul', 'ol', 'section', 'document', 'strong', 'em', 'del'])
		});
	});

	describe('#sanitizeExtended', () => {
		it('should sanitize the given inputs', () => {
			assertTagListEscaped(Sanitizer.sanitizeExtended, Sanitizer.EXTENDED_ILLEGAL_TAGS);
		});

		it('should ignore non-illegal tags', () => {
			assertTagListNotCaught(Sanitizer.sanitizeExtended, Sanitizer.ILLEGAL_TAGS);
			assertTagListNotCaught(Sanitizer.sanitizeExtended, ['div', 'li', 'ul', 'ol', 'section', 'document', 'strong', 'em', 'del'])
		});
	});
});
