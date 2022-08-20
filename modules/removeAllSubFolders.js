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
