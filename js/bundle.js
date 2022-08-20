/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./modules/addActiveClass.js":
/*!***********************************!*\
  !*** ./modules/addActiveClass.js ***!
  \***********************************/
/***/ ((module) => {

function addActiveClass(Selector) {
	console.log(Selector);

	let target = document.querySelector(Selector);
	target.classList.add("active");
}

module.exports = addActiveClass;


/***/ }),

/***/ "./modules/addSubFolders.js":
/*!**********************************!*\
  !*** ./modules/addSubFolders.js ***!
  \**********************************/
/***/ ((module) => {

// Добавляем подпапки
function addSubFolders(target, arr) {
	if (arr != undefined) {
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
}

module.exports = addSubFolders;


/***/ }),

/***/ "./modules/contentCreator.js":
/*!***********************************!*\
  !*** ./modules/contentCreator.js ***!
  \***********************************/
/***/ ((module) => {

let titleBlock = document.querySelector("h1");
let coursesContentList = document.querySelector(".table__column");
// Функция-мейкер динамических блоков
function contentCreator(elem, mainBlock) {
	let row = document.createElement("li"),
		link = document.createElement("a");
	linkBox = document.createElement("div");

	link.classList.add("link");
	row.classList.add("table__row");
	linkBox.classList.add("link__box");

	if (elem != undefined) {
		linkBox.innerHTML = elem;
		coursesContentList.append(row);
		link.append(linkBox);
		row.append(link);
	}
}

module.exports = contentCreator;


/***/ }),

/***/ "./modules/fileTypeChecker.js":
/*!************************************!*\
  !*** ./modules/fileTypeChecker.js ***!
  \************************************/
/***/ ((module) => {

function checkFileType(file) {
	let types = [
		".py",
		".gz",
		".js",
		".pdf",
		".txt",
		".rtf",
		".pkt",
		".svg",
		".sfk",
		".apk",
		".jar",
		".yml",
		".css",
		".csv",
		".gif",
		".TTF",
		".zip",
		".key",
		".ico",
		".png",
		".srt",
		".jpg",
		".url",
		".html",
		".webm",
		".xlsx",
		".json",
		".docx",
		".pptx",
		".cache",
		"Dockerfile",
		".unitypackage",
	];

	let x;

	types.forEach((type) => {
		if (file.substr(-type.length) == type) {
			x = "File";
		}
	});

	return x;
}

module.exports = checkFileType;


/***/ }),

/***/ "./modules/iconsCreator.js":
/*!*********************************!*\
  !*** ./modules/iconsCreator.js ***!
  \*********************************/
/***/ ((module) => {

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

module.exports = createIcons;


/***/ }),

/***/ "./modules/openFile.js":
/*!*****************************!*\
  !*** ./modules/openFile.js ***!
  \*****************************/
/***/ ((module) => {

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

module.exports = openFile;


/***/ }),

/***/ "./modules/removeAllSubFolders.js":
/*!****************************************!*\
  !*** ./modules/removeAllSubFolders.js ***!
  \****************************************/
/***/ ((module) => {

// Убираем подпапки
function removeAllSubFolders(Selector, targetedEl) {
	let subFoldersList = document.querySelectorAll(Selector);

	for (let i = 0; i < subFoldersList.length; i++) {
		let el = subFoldersList[i];

		if (el == targetedEl) {
		} else {
			el.remove();
		}
	}
}

module.exports = removeAllSubFolders;


/***/ }),

/***/ "./modules/removeSubFolders.js":
/*!*************************************!*\
  !*** ./modules/removeSubFolders.js ***!
  \*************************************/
/***/ ((module) => {

// Убираем подпапки
function removeSubFolders(Selector, targetedEl) {
	let subFoldersList = document.querySelectorAll(Selector);

	for (let i = 0; i < subFoldersList.length; i++) {
		let el = subFoldersList[i];

		if (el == targetedEl || el == subFoldersList[0]) {
		} else {
			el.remove();
		}
	}
}

module.exports = removeSubFolders;


/***/ }),

/***/ "./modules/scrollAnimation.js":
/*!************************************!*\
  !*** ./modules/scrollAnimation.js ***!
  \************************************/
/***/ ((module) => {

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

module.exports = scrollTo;


/***/ }),

/***/ "./modules/subFoldersActiveClassEditor.js":
/*!************************************************!*\
  !*** ./modules/subFoldersActiveClassEditor.js ***!
  \************************************************/
/***/ ((module) => {

// Добавляем активный класс к папке и подпапке
function addActiveClassToSubFolders(obj) {
	obj.classList.add("active");
}

module.exports = addActiveClassToSubFolders;


/***/ }),

/***/ "./modules/toggle.js":
/*!***************************!*\
  !*** ./modules/toggle.js ***!
  \***************************/
/***/ ((module) => {

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

module.exports = toggle;


/***/ }),

/***/ "./modules/videoCreator.js":
/*!*********************************!*\
  !*** ./modules/videoCreator.js ***!
  \*********************************/
/***/ ((module) => {

// Видео мейкер
function videoCreator(target, Folder, VideoFile, subFolderName, subFoldersCount, subSubFolderName) {
	let videoParent = document.createElement("div"),
		videoWrapper = document.createElement("div");

	videoParent.classList.add("video-content");
	videoWrapper.classList.add("video-content-wrapper");

	if (subFoldersCount <= 1) {
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

			subFolderName = subFolderName.innerText;

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
	} else if (subFoldersCount >= 2) {
		if (subSubFolderName != undefined) {
			subFolderName = subFolderName.textContent;
			videoWrapper.innerHTML = `
				<video id="my-video" class="video-js" controls preload="auto" width="640" height="264" poster="" data-setup="{}">
					<source src="../data/Курсы/${Folder}/${subSubFolderName}/${subFolderName}/${VideoFile}" type="video/mp4" />
					<p class="vjs-no-js">
						To view this video please enable JavaScript, and consider upgrading to a
						web browser that
						<a href="https://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a>
					</p>
				</video>
			`;
		}
	}

	videoParent.append(videoWrapper);
	target.parentNode.append(videoParent);
}

module.exports = videoCreator;


/***/ }),

/***/ "./modules/videoRemover.js":
/*!*********************************!*\
  !*** ./modules/videoRemover.js ***!
  \*********************************/
/***/ ((module) => {

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

module.exports = removeVideo;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*************************!*\
  !*** ./pages/script.js ***!
  \*************************/
//! Не забыть прописать в консоли Npx Webpack перед внесением изменений
const contentCreator = __webpack_require__(/*! ../modules/contentCreator */ "./modules/contentCreator.js");
const videoCreator = __webpack_require__(/*! ../modules/videoCreator */ "./modules/videoCreator.js");
const openFile = __webpack_require__(/*! ../modules/openFile.js */ "./modules/openFile.js");
const toggle = __webpack_require__(/*! ../modules/toggle */ "./modules/toggle.js");
const scrollTo = __webpack_require__(/*! ../modules/scrollAnimation */ "./modules/scrollAnimation.js");
const addSubFolders = __webpack_require__(/*! ../modules/addSubFolders */ "./modules/addSubFolders.js");
const removeSubFolders = __webpack_require__(/*! ../modules/removeSubFolders */ "./modules/removeSubFolders.js");
const removeAllSubFolders = __webpack_require__(/*! ../modules/removeAllSubFolders */ "./modules/removeAllSubFolders.js");
const removeVideo = __webpack_require__(/*! ../modules/videoRemover */ "./modules/videoRemover.js");
const addActiveClassToSubFolders = __webpack_require__(/*! ../modules/subFoldersActiveClassEditor.js */ "./modules/subFoldersActiveClassEditor.js");
const addActiveClass = __webpack_require__(/*! ../modules/addActiveClass.js */ "./modules/addActiveClass.js");
const checkFileType = __webpack_require__(/*! ../modules/fileTypeChecker.js */ "./modules/fileTypeChecker.js");
const createIcons = __webpack_require__(/*! ../modules/iconsCreator.js */ "./modules/iconsCreator.js");

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

	// Сбрасываем активный класс с ссылок
	function removeAllActiveClass(Selector) {
		let links = document.querySelectorAll(Selector);

		links.forEach((item) => {
			item.classList.remove("active");
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
						contentCreator(el, coursesContentList);
					}
				} else if (obj["Файлы"] && obj["Название курса"] == mainTitle) {
					let values = courseFiles;

					for (let i = 0; i < values.length; i++) {
						let el = values[i];
						contentCreator(el, coursesContentList);
					}
				}

				// Показываем папки с уроками внутри курса
				if (obj["Название курса"] == mainTitle) {
					let values = courseFolders;
					// формируем динамически список файлов курса
					for (let i = 0; i < values.length; i++) {
						let el = values[i];
						contentCreator(el, coursesContentList);
					}

					// Вешаем обработчик событий
					coursesContentList.addEventListener("click", function (e) {
						let target = e.target,
							fileName = target.innerText,
							subFolder = e.target.parentNode.parentNode.parentNode.firstChild;

						let subFoldersCount = document.querySelectorAll(".sub-folder__list").length,
							subSubFolderName = document.querySelector(".link.active");

						if (subSubFolderName != null) {
							subSubFolderName = subSubFolderName.firstElementChild.innerText;
						}

						//? Logger
						// console.log("Клик по:");
						// console.log(target);

						// console.log("Файл:");
						// console.log(fileName);

						// console.log("Объект:");
						// console.log(obj[fileName]);

						// console.log("Папки:");
						// console.log(courseFolders);

						//! Если простой мисклик
						if (target.classList.value == "") {
							e.preventDefault();
							//! Если клик по активной ссылке то ничего не делаем
						} else if (target.parentNode.classList.value == "link active") {
							e.preventDefault();
							removeAllActiveClass(".link.active");
							removeAllActiveClass(".table__row.active");
							removeAllSubFolders(".sub-folder__list", target);
							//! Если клик по видео
						} else if (fileName.substr(-4) == ".mp4") {
							// addActiveClass(target);
							removeVideo();
							videoCreator(target, courseTitle, fileName, subFolder, subFoldersCount, subSubFolderName);
							toggle(target);

							//* Scroll
							scrollTo(".video-content");

							//! Если клик по файлу
						} else if (checkFileType(fileName) == "File") {
							openFile(target, courseTitle, subFolder, fileName, subFoldersCount, subSubFolderName);
						} else {
							//! Если клик по подпапке
							if (!target.classList.contains("sub-folder__link")) {
								removeAllSubFolders(".sub-folder__list", target.nextElementSibling);
								addSubFolders(target, obj[fileName]);

								//* Toggle Classes
								removeAllActiveClass(".link.active");
								removeAllActiveClass(".table__row.active");
								addActiveClassToSubFolders(target.parentNode);
								addActiveClassToSubFolders(target.parentNode.parentNode);

								//* Scroll
								let scrollTarget = ".link.active";

								scrollTo(scrollTarget);
							}

							//! Если клик по папке в подпапке
							if (target.classList.contains("sub-folder__link")) {
								e.preventDefault();

								addSubFolders(target, obj[fileName]);
								let scrollTarget = ".sub-folder__link";
								scrollTo(scrollTarget);
							}
						}

						//! Подсветка активной подпапки
						if (
							target.classList.contains("sub-folder__link") &&
							target.nextElementSibling.classList.contains("sub-folder__list")
						) {
							removeAllActiveClass(".sub-folder__list.active");
							removeSubFolders(".sub-folder__list", target.nextElementSibling);
							addActiveClassToSubFolders(target.nextElementSibling);

							let scrollTarget = ".sub-folder__list.active";
							scrollTo(scrollTarget);
						}
					});
				}
			});

			createIcons();
		}
	});
});

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map