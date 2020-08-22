'use strict';

const { describe, it } = require('mocha');
const { expect } = require('chai');
const Safeguard = require('../src/Safeguard');

const SAMPLE_SAFE_TAGS = ['div', 'li', 'ul', 'ol', 'section', 'document', 'strong', 'em', 'del'];


describe('Safeguard', () => {
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
		it('should return true for the given input', () => {
			assertTagListCaught(Safeguard.defaultGuard, Safeguard.ILLEGAL_TAGS);
			assertTagListCaught(Safeguard.defaultGuard, Safeguard.EXTENDED_ILLEGAL_TAGS);
			assertTagListCaught(Safeguard.defaultGuard, ['a href="javascript:alert(1)"', 'iframe src="javascript:alert(1)"']);
		});

		it('should ignore non-illegal tags', () => {
			assertTagListNotCaught(Safeguard.defaultGuard, SAMPLE_SAFE_TAGS);
		});
	});

	describe('#containsIllegalTags', () => {
		it('should return true for the given input', () => {
			assertTagListCaught(Safeguard.containsIllegalTags, Safeguard.ILLEGAL_TAGS);
		});

		it('should ignore non-illegal tags', () => {
			assertTagListNotCaught(Safeguard.containsIllegalTags, Safeguard.EXTENDED_ILLEGAL_TAGS);
			assertTagListNotCaught(Safeguard.containsIllegalTags, SAMPLE_SAFE_TAGS);
		});
	});

	describe('#containsExtendedIllegalTags', () => {
		it('should return true for the given inputs', () => {
			assertTagListCaught(Safeguard.containsExtendedIllegalTags, Safeguard.EXTENDED_ILLEGAL_TAGS);
		});

		it('should return false for tests with non-illegal tags', () => {
			assertTagListNotCaught(Safeguard.containsExtendedIllegalTags, Safeguard.ILLEGAL_TAGS);
			assertTagListNotCaught(Safeguard.containsExtendedIllegalTags, SAMPLE_SAFE_TAGS);
		});
	});

	describe('#containsInlineJavascript', () => {
		it('should return true if text contains inline javascript', () => {
			it('should return true for the given inputs', () => {
				assertTagListCaught(Safeguard.containsInlineJavascript, ['a href="javascript:alert(1)"', 'iframe src="javascript:alert(1)"']);
				expect(Safeguard.containsInlineJavascript("Hello world <a href='javascript:alert(\"Nice\")'>Test javascript</a> Some other text")).to.equal(true);
				expect(Safeguard.containsInlineJavascript("<em>Hello world</em> <iframe src='javascript:alert(\"Nice\")' /> <p>This is some other text</p>")).to.equal(true);
			});

			it('should return false for tests with non-illegal tags', () => {
				assertTagListNotCaught(Safeguard.containsInlineJavascript, Safeguard.ILLEGAL_TAGS);
				assertTagListNotCaught(Safeguard.containsInlineJavascript, Safeguard.EXTENDED_ILLEGAL_TAGS);
				assertTagListNotCaught(Safeguard.containsInlineJavascript, SAMPLE_SAFE_TAGS);

				expect(Safeguard.containsInlineJavascript("Hello world javascript: a terrible time")).to.equal(false);
			});
		});
	});
});
