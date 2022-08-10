let url = "./../data/video_content.json";

document.addEventListener("DOMContentLoaded", function () {
	const mainTitle = localStorage.getItem("trigger_name");

	let titleBlock = document.querySelector("h1");
	let coursesContentList = document.querySelector(".table__column");

	titleBlock.innerHTML = mainTitle;

	const request = new XMLHttpRequest();
	// console.log(request);
	// request.open(method, url, async?, user?, password?) принимает в качестве аргументов метод, урл, тип запроса, логин и пароль.
	request.open("GET", url);
	request.setRequestHeader("Content-type", "application/json; charset=utf-8");
	request.send();

	// Функция-мейкер динамических блоков
	function addContent(elem, mainBlock) {
		let row = document.createElement("li"),
			link = document.createElement("a");
		linkBox = document.createElement("div");

		link.classList.add("link");
		row.classList.add("table__row");
		linkBox.classList.add("link__box");

		linkBox.innerHTML = elem;
		coursesContentList.append(row);
		link.append(linkBox);
		row.append(link);
	}

	// Видео мейкер
	function createVideo(target, Folder, VideoFile, subFolderName) {
		let videoParent = document.createElement("div"),
			videoWrapper = document.createElement("div");

		videoParent.classList.add("video-content");
		videoWrapper.classList.add("video-content-wrapper");

		if (subFolderName.nodeValue == "\n\t\t\t\t") {
			console.log("No subfolders");
			console.log("Main Folder: " + Folder);
			console.log("File Name: " + VideoFile);
			videoWrapper.innerHTML = `
				<video id="my-video" class="video-js" controls preload="auto" width="640" height="264" poster="" data-setup="{}">
					<source src="../data/Курсы/${Folder}/${VideoFile}" type="video/mp4" />
					<p class="vjs-no-js">
						To view this video please enable JavaScript, and consider upgrading to a
						web browser that
						<a href="https://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a>
					</p>
				</video>
			`;
		} else {
			console.log("Subfolders here");
			subFolderName = subFolderName.textContent;
			videoWrapper.innerHTML = `
				<video id="my-video" class="video-js" controls preload="auto" width="640" height="264" poster="" data-setup="{}">
					<source src="../data/Курсы/${Folder}/${subFolderName}/${VideoFile}" type="video/mp4" />
					<p class="vjs-no-js">
						To view this video please enable JavaScript, and consider upgrading to a
						web browser that
						<a href="https://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a>
					</p>
				</video>
			`;
		}

		videoParent.append(videoWrapper);
		target.parentNode.append(videoParent);
	}

	// Кастомизация высоты
	function getHeight(elm) {
		var elmStyle = getComputedStyle(elm);
		return parseInt(elmStyle.height) + parseInt(elmStyle.paddingTop) + parseInt(elmStyle.paddingBottom);
	}

	// Кастомизация переключений
	function toggle(elm) {
		var card = elm.parentNode,
			content = card.querySelector(".video-content"),
			contentWrapper = content.querySelector(".video-content-wrapper"),
			contentHeight = getHeight(contentWrapper);

		content.classList.toggle("open");

		if (content.classList.contains("open")) {
			content.style.maxHeight = contentHeight + "px";
		} else {
			content.style.maxHeight = 0;
		}
	}

	// Прокрутка до верха видеофайла
	function scrollTo(targetSelector) {
		const scrollTarget = document.querySelector(targetSelector);
		const topOffset = 80; // если не нужен отступ сверху
		const elementPosition = scrollTarget.getBoundingClientRect().top;
		const offsetPosition = elementPosition - topOffset;

		window.scrollBy({
			top: offsetPosition,
			behavior: "smooth",
		});
	}

	// Добавляем подпапки
	function addSubFolders(target, arr) {
		let subFoldersList = document.createElement("ul"),
			subFolderListTitle = document.createElement("h3");

		function createLink(item) {
			let subFolderItem = document.createElement("li"),
				subFolderLink = document.createElement("a");

			subFoldersList.classList.add("sub-folder__list");
			subFolderItem.classList.add("sub-folder__item");
			subFolderLink.classList.add("sub-folder__link");

			subFolderLink.innerHTML = item;
			subFolderItem.append(subFolderLink);
			subFoldersList.append(subFolderItem);
		}

		subFolderListTitle.innerText = "Содержание папки:";
		subFoldersList.append(subFolderListTitle);

		arr.forEach((item) => {
			createLink(item);
		});

		target.parentNode.append(subFoldersList);
	}

	// Открытие файла
	function openFile(target, Folder, subFolderName, FileName, subFoldersCount, subSubFolderName) {
		let str;

		// console.log(target);

		if (subFoldersCount <= 1) {
			if (subFolderName.nodeValue == "\n\t\t\t\t") {
				str = `../data/Курсы/${Folder}/${FileName}`;
				if (target.classList.contains("link__box")) {
					target.parentNode.setAttribute("href", str);
				}
				target.setAttribute("href", str);
				console.log("Путь к файлу: " + str);
			} else {
				subFolderName = subFolderName.textContent;
				str = `../data/Курсы/${Folder}/${subFolderName}/${FileName}`;
				target.setAttribute("href", str);
				console.log("Путь к файлу: " + str);
			}
		} else if (subFoldersCount >= 2) {
			if (subSubFolderName != undefined) {
				subFolderName = subFolderName.textContent;
				str = `../data/Курсы/${Folder}/${subSubFolderName}/${subFolderName}/${FileName}`;
				target.setAttribute("href", str);
				console.log("Путь к файлу: " + str);
			}
		}
	}

	// Убираем подпапки
	function removeSubFolders() {
		let subFoldersList = document.querySelectorAll(".sub-folder__list");

		subFoldersList.forEach((item) => {
			item.remove();
		});
	}

	// Добавляем активный класс к ссылке
	function addActiveClass(obj) {
		obj.classList.add("active");
	}

	// Сбрасываем активный класс с ссылок
	function removeAllActiveClass(Selector) {
		let links = document.querySelectorAll(Selector);

		links.forEach((item) => {
			item.classList.remove("active");
		});
	}

	// Убиваем активный видео-файл
	function removeVideo() {
		let videoParent = document.querySelectorAll(".video-content"),
			videoWrapper = document.querySelectorAll(".video-content-wrapper");

		videoParent.forEach((el) => {
			el.remove();
		});

		videoWrapper.forEach((el) => {
			el.remove();
		});
	}

	request.addEventListener("readystatechange", () => {
		if (request.readyState === 4 && request.status === 200) {
			const data = JSON.parse(request.response);

			data.forEach((obj) => {
				let courseTitle = obj["Название курса"],
					courseFolders = obj["Папки"],
					courseFiles = obj["Файлы"];

				// Показываем файлы в корне каталога
				if (obj["Папки"] == "" && obj["Название курса"] == mainTitle) {
					let values = courseFiles;
					// формируем динамически список файлов курса
					for (let i = 0; i < values.length; i++) {
						let el = values[i];
						addContent(el, coursesContentList);
					}
				} else if (obj["Файлы"] && obj["Название курса"] == mainTitle) {
					let values = courseFiles;

					for (let i = 0; i < values.length; i++) {
						let el = values[i];
						addContent(el, coursesContentList);
					}
				}

				// Показываем папки с уроками внутри курса
				if (obj["Название курса"] == mainTitle) {
					let values = courseFolders;
					// формируем динамически список файлов курса
					for (let i = 0; i < values.length; i++) {
						let el = values[i];

						addContent(el, coursesContentList);
					}

					// Вешаем обработчик событий
					coursesContentList.addEventListener("click", function (e) {
						let target = e.target,
							fileName = target.innerText,
							subFolder = e.target.parentNode.parentNode.parentNode.firstChild;

						let subFoldersCount = document.querySelectorAll(".sub-folder__list").length;
						//? Logger
						// console.log("Клик по:");
						// console.log(target);
						let subSubFolderName = document.querySelector(".link.active");
						if (subSubFolderName != null) {
							subSubFolderName = subSubFolderName.firstElementChild.innerText;
							console.log(subSubFolderName);
						}

						// console.log("Файл:");
						// console.log(fileName);

						// console.log("Объект:");
						// console.log(obj[fileName]);

						// console.log("Папки:");
						// console.log(courseFolders);

						//! Если клик по активной ссылке
						if (target.parentNode.classList.contains("link.active")) {
							e.preventDefault();

							//! Если клик по видео
						} else if (fileName.substr(-4) == ".mp4") {
							//* Toggle Classes
							if (!target.classList.contains("sub-folder__link")) {
								removeAllActiveClass(".link.active");
								removeAllActiveClass(".table__row.active");
								addActiveClass(target.parentNode);
								addActiveClass(target.parentNode.parentNode);
							}

							removeVideo();
							createVideo(target, courseTitle, fileName, subFolder);
							toggle(target);

							//* Scroll
							scrollTo(".video-content");

							//! Если клик по файлу
						} else if (
							fileName.substr(-3) == ".py" ||
							fileName.substr(-3) == ".gz" ||
							fileName.substr(-3) == ".js" ||
							fileName.substr(-4) == ".pdf" ||
							fileName.substr(-4) == ".txt" ||
							fileName.substr(-4) == ".rtf" ||
							fileName.substr(-4) == ".pkt" ||
							fileName.substr(-4) == ".svg" ||
							fileName.substr(-4) == ".sfk" ||
							fileName.substr(-4) == ".apk" ||
							fileName.substr(-4) == ".jar" ||
							fileName.substr(-4) == ".yml" ||
							fileName.substr(-4) == ".css" ||
							fileName.substr(-4) == ".csv" ||
							fileName.substr(-4) == ".gif" ||
							fileName.substr(-4) == ".TTF" ||
							fileName.substr(-4) == ".zip" ||
							fileName.substr(-4) == ".key" ||
							fileName.substr(-4) == ".ico" ||
							fileName.substr(-4) == ".png" ||
							fileName.substr(-4) == ".srt" ||
							fileName.substr(-4) == ".jpg" ||
							fileName.substr(-4) == ".url" ||
							fileName.substr(-5) == ".html" ||
							fileName.substr(-5) == ".webm" ||
							fileName.substr(-5) == ".xlsx" ||
							fileName.substr(-5) == ".json" ||
							fileName.substr(-5) == ".docx" ||
							fileName.substr(-5) == ".pptx" ||
							fileName.substr(-6) == ".cache" ||
							fileName.substr(-10) == "Dockerfile" ||
							fileName.substr(-13) == ".unitypackage"
						) {
							openFile(target, courseTitle, subFolder, fileName, subFoldersCount, subSubFolderName);
						} else {
							//! Если клик по подпапке
							if (!target.classList.contains("sub-folder__link")) {
								removeSubFolders();

								addSubFolders(target, obj[fileName]);

								//* Toggle Classes
								removeAllActiveClass(".link.active");
								removeAllActiveClass(".table__row.active");
								addActiveClass(target.parentNode);
								addActiveClass(target.parentNode.parentNode);

								//* Scroll
								let scrollTarget = ".link.active";

								scrollTo(scrollTarget);
							}

							if (target.classList.contains("sub-folder__link")) {
								e.preventDefault();

								addSubFolders(target, obj[fileName]);

								let scrollTarget = ".sub-folder__link";
								scrollTo(scrollTarget);
							}
						}
					});
				}
			});

			createIcons();
		}
	});

	function createIcons() {
		let allFiles = document.querySelectorAll(".link__box");

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
