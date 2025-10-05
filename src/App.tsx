import { useEffect, useState } from "react";

import "./App.css";
type ImageBoxData = {
	src: string;
	found: boolean;
};

function App() {
	let initial = [
		{ src: "./public/one.PNG", found: false },
		{ src: "./public/two.PNG", found: false },
		{ src: "./public/three.PNG", found: false },
		{ src: "./public/four.JPG", found: false },
		{ src: "./public/five.JPG", found: false },
	];
	initial = [initial, initial, initial, initial, initial].flat();
	const stored = localStorage.getItem("sign-pictures");

	if (stored) initial = JSON.parse(stored);

	const [gridOfImage, setGridOfImages] = useState<ImageBoxData[]>(initial);
	const [won, setWon] = useState(false);

	// get set local storage
	useEffect(() => {
		localStorage.setItem("sign-pictures", JSON.stringify(gridOfImage));
	}, [gridOfImage]);

	// check if winner
	useEffect(() => {
		const columns: boolean[][] = [];
		const currentRow: boolean[] = [];
		for (let i = 0; i < gridOfImage.length; i++) {
			const item = gridOfImage[i];
			const gridWidth = 5;
			const col = i % gridWidth;
			// const row = Math.floor(i / gridWidth);
			currentRow[col] = item.found;
			// check if current row is all true
			if (col === gridWidth - 1) {
				if (currentRow.every((b) => b)) {
					setWon(true);
					break;
				} else {
					setWon(false);
				}
			}
			// construct columns
			if (!columns[col]) {
				columns[col] = [item.found];
			} else {
				columns[col].push(item.found);
			}
			if (columns.find((col) => col.every((b) => b))) {
				setWon(true);
			} else {
				console.log("set not won");
			}
		}
		// if (rows.find((b) => b) || columns.find((b) => b)) {
		// 	setWon(true);
		// } else {
		// 	setWon(false);
		// }
	}, [gridOfImage]);

	const cb = (index: number) => {
		setGridOfImages(
			gridOfImage.map((v, i) => ({
				...v,
				found: i === index ? !v.found : v.found,
			}))
		);
	};

	return (
		<div>
			<h2>{won ? "You won" : "You haven't won yet"}</h2>
			<div className={`grid-container`}>
				{gridOfImage.map((data, index) => (
					<ImageBox
						key={data.src + index}
						data={data}
						callBack={() => cb(index)}
					/>
				))}
			</div>
		</div>
	);
}

function ImageBox({
	data,
	callBack,
}: {
	data: ImageBoxData;
	callBack: () => void;
}) {
	return (
		<div className={`${data.found && "found"} grid-item`} onClick={callBack}>
			<img src={data.src} />
		</div>
	);
}

export default App;
