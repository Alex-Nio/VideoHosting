let url = "./../data/videos.json";

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
		link.classList.add("link");
		row.classList.add("table__row");
		link.innerHTML = elem;
		coursesContentList.append(row);
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
		target.append(videoParent);
	}

	// Кастомизация высоты
	function getHeight(elm) {
		var elmStyle = getComputedStyle(elm);
		return (
			parseInt(elmStyle.height) +
			parseInt(elmStyle.paddingTop) +
			parseInt(elmStyle.paddingBottom)
		);
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
		const topOffset = 100; // если не нужен отступ сверху
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

		target.append(subFoldersList);
	}

	// Открытие файла
	function openFile(target, Folder, FileName, subFolderName) {
		let str;
		if (subFolderName.nodeValue == "\n\t\t\t\t") {
			str = `../data/Курсы/${Folder}/${FileName}`;
			target.setAttribute("href", str);
		} else {
			subFolderName = subFolderName.textContent;
			str = `../data/Курсы/${Folder}/${subFolderName}/${FileName}`;
			target.setAttribute("href", str);
		}
	}

	// Убираем подпапки
	function removeSubFolders() {
		let subFoldersList = document.querySelectorAll(".sub-folder__list");

		subFoldersList.forEach((item) => {
			item.remove();
		});
	}

	// Сбрасываем активный класс с ссылок
	function removeAllActiveClass() {
		let links = document.querySelectorAll(".link.active");

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
							fileName = target.innerText;

						let subFolder =
							e.target.parentNode.parentNode.parentNode
								.firstChild;

						//? Logger
						// console.log("Клик по:");
						// console.log(target);

						// console.log("Файл:");
						// console.log(fileName);

						// console.log("Объект:");
						// console.log(obj[fileName]);

						// console.log("Папки:");
						// console.log(courseFolders);

						//! Если линк уже активный
						if (target.classList == "link active") {
							e.preventDefault();
							//! Для видео
						} else if (fileName.substr(-4) == ".mp4") {
							removeAllActiveClass();
							target.classList.add("active");
							removeVideo();
							createVideo(
								target,
								courseTitle,
								fileName,
								subFolder
							);
							toggle(target);
							scrollTo(".video-content");
							//! Для файлов
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
							openFile(target, courseTitle, fileName, subFolder);
						} else {
							//! Для подпапки
							removeSubFolders();
							removeAllActiveClass();
							target.classList.add("active");
							let scrollTarget = "a.link.active";
							scrollTo(scrollTarget);
							addSubFolders(target, obj[fileName]);
						}
					});
				}
			});
		}
	});
});
