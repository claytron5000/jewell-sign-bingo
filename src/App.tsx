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
		let found = true;
		const columns: boolean[][] = [[]];
		const rows: boolean[] = [];
		gridOfImage.forEach((item, index) => {
			const column = index % 5;
			if (!item.found) found = false; // negative track if row is all found
			if (!columns[column]) {
				columns[column] = [item.found];
			} else {
				columns[column].push(item.found);
			}
			// check win status as the end of each row
			if (column === 4) {
				rows.push(found);
			}
		});

		if (rows.every((s) => s)) setWon(true);

		let columnWin = false;
		columns.forEach((column) => {
			if (column.every((g) => g)) {
				columnWin = true;
			}
		});
		if (columnWin) setWon(true);
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
