//! Не забыть прописать в консоли Npx Webpack перед внесением изменений
const contentCreator = require("../modules/contentCreator");
const videoCreator = require("../modules/videoCreator");
const openFile = require("../modules/openFile.js");
const toggle = require("../modules/toggle");
const scrollTo = require("../modules/scrollAnimation");
const addSubFolders = require("../modules/addSubFolders");
const removeSubFolders = require("../modules/removeSubFolders");
const removeAllSubFolders = require("../modules/removeAllSubFolders");
const removeVideo = require("../modules/videoRemover");
const addActiveClassToSubFolders = require("../modules/subFoldersActiveClassEditor.js");
const addActiveClass = require("../modules/addActiveClass.js");
const checkFileType = require("../modules/fileTypeChecker.js");
const createIcons = require("../modules/iconsCreator.js");
const { pop } = require("@jridgewell/set-array");

let url = "./../data/video_content.json";

document.addEventListener("DOMContentLoaded", function () {
	const mainTitle = localStorage.getItem("trigger_name");

	let titleBlock = document.querySelector("h1"),
		coursesContentList = document.querySelector(".table__column"),
		ogg = document.createElement("audio");

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

						if (fileName.substr(-4) == ".ogg") {
							let popupClose = document.createElement("div"),
								popup = document.createElement("div"),
								popupWrapper = document.createElement("div");

							function createAudio(targetedEl, fileNameText) {
								let folderToFind = `../data/Курсы/${mainTitle}/${targetedEl.firstChild.parentElement.firstChild.parentElement}/${targetedEl.firstChild.parentElement.firstChild.parentElement.parentElement.parentElement.parentElement.parentElement.previousElementSibling.textContent}/${targetedEl.parentElement.parentElement.previousElementSibling.textContent}/${fileNameText}`;

								ogg.setAttribute("controls", "true");

								ogg.innerHTML = `
										<source src="${folderToFind}" type="audio/ogg"> 
									`;
							}

							function createPopup(targetedEl, fileNameText) {
								popup.classList.add("popup"),
									popupClose.classList.add("popup-close"),
									popupWrapper.classList.add("popup-wrapper");

								document.querySelector("body").append(popup);
								popup.append(popupClose);
								popup.append(popupWrapper);

								ogg.load();
								createAudio(targetedEl, fileNameText);

								popupWrapper.append(ogg);
							}

							function destroy() {
								document.querySelectorAll(".popup").forEach((item) => {
									item.remove();
								});
							}

							destroy();
							createPopup(target, fileName);

							popupClose.addEventListener("click", function () {
								popup.remove();
							});
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
							target.nextElementSibling != null &&
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
