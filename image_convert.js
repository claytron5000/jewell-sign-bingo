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
	fs.readdir(
		directory + "/public/originals/ready-for-process",
		(err, files) => {
			if (err) {
				console.error("Error reading directory:", err);
				return;
			}

			const imgFiles = files.filter((file) => {
				const fileExtension = path.extname(file).toLowerCase();
				return (
					fileExtension === ".jpg" ||
					fileExtension === ".jpeg" ||
					fileExtension === ".png"
				);
			});

			imgFiles.forEach(processFile);
			fs.writeFile("./src/images.json", JSON.stringify(imgFiles), (err) => {
				console.error(err);
			});
		}
	);
}

function processFile(file) {
	sizes.forEach(processBySize);

	function processBySize(size) {
		// const fileName =file.split(".")[0] + "-" + size.name + "px" + file.split(".")[1];
		const outPut = ` ${directory}/${subDir}/${size.name}/${file}`;
		let execString = `magick ${directory}/${file} -resize ${size.sizeString} -strip`;
		if (size.cropSquare)
			execString += ` -gravity center -extent "%[fx:h<w?h:w]x%[fx:h<w?h:w]"`;
		execString = execString + outPut;
		exec(execString, console.log, console.error);
	}
}

main();
