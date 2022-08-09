let url = "./data/videos.json";

fetch(url)
	.then((res) => res.json())
	.then((out) => console.log(out));

document.addEventListener("DOMContentLoaded", function () {
	let table = document.querySelector(".table");

	table.addEventListener("click", function (e) {
		let target = e.target;
		console.log(localStorage.getItem("trigger_name"));
		// e.preventDefault();

		if (target.classList != "table__column") {
			let trigger_name = target.textContent;

			localStorage.setItem("trigger_name", trigger_name);
		}
	});
});
