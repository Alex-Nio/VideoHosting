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
