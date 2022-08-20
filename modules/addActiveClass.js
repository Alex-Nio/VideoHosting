function addActiveClass(Selector) {
	console.log(Selector);

	let target = document.querySelector(Selector);
	target.classList.add("active");
}

module.exports = addActiveClass;
