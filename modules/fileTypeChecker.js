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

	console.log(x);
	return x;
}

module.exports = checkFileType;
