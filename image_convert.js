import { exec } from "node:child_process";
import fs from "fs";
import path from "path";

const directory = "./public";
const subDir = "resized";

const sizes = [
	{ cropSquare: true, name: "320", sizeString: "320x320" },
	{ cropSquare: false, name: "1200", sizeString: "1200x500" },
];

function main() {
	fs.readdir(directory, (err, files) => {
		if (err) {
			console.error("Error reading directory:", err);
			return;
		}

		const jpgFiles = files.filter((file) => {
			const fileExtension = path.extname(file).toLowerCase();
			return fileExtension === ".jpg" || fileExtension === ".jpeg";
		});

		jpgFiles.forEach(processFile);

		// console.log("JPG files found:", jpgFiles);
	});
}

function processFile(file) {
	sizes.forEach(processBySize);

	function processBySize(size) {
		const outPut = ` ${directory}/${subDir}/${size.name}px-${file}`;
		let execString = `magick ${directory}/${file} -resize ${size.sizeString}`;
		if (size.cropSquare)
			execString += ` -gravity center -extent "%[fx:h<w?h:w]x%[fx:h<w?h:w]"`;
		execString = execString + outPut;
		exec(execString, console.log, console.error);
	}
}

main();
