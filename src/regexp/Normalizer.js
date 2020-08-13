'use strict';


class Normalizer {
	/**
	 * Normalize line endings between macs, windows, unix etc
	 * @param text {string}
	 * @return {string}
	 */
	static normalize(text) {
		// normalize line endings between macs, windows, unix etc
		text = text.replace(/\n\r/gi, '\n');
		text = text.replace(/\r/gi, '\n');

		// pad the ending with a few extra newlines
		text += "\n\n";

		// clean up any lines that are only spaces and tabs
		text.replace(/^[ \t]+$/gi, "");
		return text;
	}
}

module.exports = Normalizer;
