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
