$(document).ready(() => {
	const userIMG = $(".userIMG");
	const formListActions = $(".form-list-actions-user");

	userIMG.on("click", (event) => {
		event.stopPropagation();

		if (formListActions.is(":hidden")) {
			formListActions
				.stop(true, true)
				.slideDown(300)
				.animate({ opacity: 1 }, { queue: false, duration: 300 });
		} else {
			formListActions
				.stop(true, true)
				.animate({ opacity: 0 }, { duration: 300, queue: false })
				.slideUp(300);
		}
	});

	$(document).on("click", () => {
		formListActions
			.stop(true, true)
			.animate({ opacity: 0 }, { duration: 300, queue: false })
			.slideUp(300);
	});

	$("#logoutBtn").on("click", function () {
		window.location.href = "/forms/logout"; // Chuyển hướng đến route /forms/logout
	});
});
