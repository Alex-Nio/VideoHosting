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
