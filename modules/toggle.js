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
