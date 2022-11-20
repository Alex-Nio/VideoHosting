let url = "./data/video_titles.json";

document.addEventListener("DOMContentLoaded", function () {
	let table = document.querySelector(".table");

	// Грузим данные в таблицу
	function createTableTitles(title) {
		let tableColumn = document.createElement("ul"),
			tableTitle = document.createElement("h3");

		tableColumn.classList.add("table__column");

		tableTitle.innerHTML = title;
		tableColumn.append(tableTitle);

		table.append(tableColumn);
	}

	function createTableRows(columns, values, i) {
		function createRow(col, vals) {
			for (let i = 0; i < vals.length; i++) {
				let val = vals[i],
					link = document.createElement("a"),
					row = document.createElement("li");

				row.classList.add("table__row");
				link.classList.add("table__link");
				link.setAttribute("href", "./pages/course.html");
				link.innerHTML = val;
				row.append(link);
				col.append(row);
			}
		}

		let count = i;

		while (count != 0) {
			count--;
			let vals = values[count],
				currentColumn = columns[count];

			createRow(currentColumn, vals);
		}
	}

	const request = new XMLHttpRequest();
	// console.log(request);
	// request.open(method, url, async?, user?, password?) принимает в качестве аргументов метод, урл, тип запроса, логин и пароль.
	request.open("GET", url);
	request.setRequestHeader("Content-type", "application/json; charset=utf-8");
	request.send();

	request.addEventListener("readystatechange", () => {
		if (request.readyState === 4 && request.status === 200) {
			const data = JSON.parse(request.response);

			var titles = Object.keys(data);
			var values = Object.values(data);

			for (let i = 0; i < titles.length; i++) {
				let title = titles[i];
				createTableTitles(title);
			}

			let columns = document.querySelectorAll(".table__column"),
				i = columns.length;

			createTableRows(columns, values, i);

			createIcons();
		}
	});

	table.addEventListener("click", function (e) {
		let target = e.target;
		console.log(localStorage.getItem("trigger_name"));

		if (target.classList != "table__column") {
			let trigger_name = target.textContent;

			localStorage.setItem("trigger_name", trigger_name);
		}
	});

	function createIcons() {
		let allFiles = document.querySelectorAll(".table__link");

		allFiles.forEach((file) => {
			let fileType = file.innerText,
				videoIcon = document.createElement("span"),
				folderIcon = document.createElement("span"),
				fileIcon = document.createElement("span");

			videoIcon.classList.add("video-icon");
			folderIcon.classList.add("folder-icon");
			fileIcon.classList.add("file-icon");

			if (
				fileType.substr(-3) == ".py" ||
				fileType.substr(-3) == ".gz" ||
				fileType.substr(-3) == ".js" ||
				fileType.substr(-4) == ".pdf" ||
				fileType.substr(-4) == ".txt" ||
				fileType.substr(-4) == ".rtf" ||
				fileType.substr(-4) == ".pkt" ||
				fileType.substr(-4) == ".svg" ||
				fileType.substr(-4) == ".sfk" ||
				fileType.substr(-4) == ".apk" ||
				fileType.substr(-4) == ".jar" ||
				fileType.substr(-4) == ".yml" ||
				fileType.substr(-4) == ".css" ||
				fileType.substr(-4) == ".csv" ||
				fileType.substr(-4) == ".gif" ||
				fileType.substr(-4) == ".TTF" ||
				fileType.substr(-4) == ".zip" ||
				fileType.substr(-4) == ".key" ||
				fileType.substr(-4) == ".ico" ||
				fileType.substr(-4) == ".png" ||
				fileType.substr(-4) == ".srt" ||
				fileType.substr(-4) == ".jpg" ||
				fileType.substr(-4) == ".url" ||
				fileType.substr(-5) == ".html" ||
				fileType.substr(-5) == ".webm" ||
				fileType.substr(-5) == ".xlsx" ||
				fileType.substr(-5) == ".json" ||
				fileType.substr(-5) == ".docx" ||
				fileType.substr(-5) == ".pptx" ||
				fileType.substr(-6) == ".cache" ||
				fileType.substr(-10) == "Dockerfile" ||
				fileType.substr(-13) == ".unitypackage"
			) {
				// console.log("Это какой-то файл");
				file.prepend(fileIcon);
			} else if (fileType.substr(-4) == ".mp4") {
				// console.log("Это Видео файл");
				file.prepend(videoIcon);
			} else {
				// console.log("Это Папка");
				file.prepend(folderIcon);
			}
		});
	}
});
