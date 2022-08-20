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
