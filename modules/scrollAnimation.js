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
