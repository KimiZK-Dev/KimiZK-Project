$(function () {
	const e = {
		clear: $(".btnClear"),
		paste: $(".btnPaste"),
		input: $("#url"),
	};

	const toggleButtons = (showPaste) => {
		e.paste.toggle(showPaste);
		e.clear.toggle(!showPaste);
	};

	const handleError = (err) => console.error(err);

	e.paste.on("click", async () => {
		try {
			toggleButtons(false);
			e.input.val(await navigator.clipboard.readText());
		} catch (err) {
			handleError(err);
		}
	});

	e.clear.on("click", () => {
		try {
			toggleButtons(true);
			e.input.val("");
		} catch (err) {
			handleError(err);
		}
	});

	document.getElementById("formDT").addEventListener("submit", function (e) {
		this.action = `success?url=${encodeURIComponent(
			document.getElementById("url").value
		)}`;
	});
});
