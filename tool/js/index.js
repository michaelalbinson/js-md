'use strict';

(function() {
	let target, source;

	window.addEventListener('load', () => {
		const lexer = new js_md.MDLexer();

		console.log('ready');
		target = document.querySelector('#target');

		source = document.querySelector('#input');
		source.addEventListener('keyup', e => {
			target.innerHTML = lexer.lex(e.target.value);
		});

		target.innerHTML = lexer.lex(source.value);
	});
})();