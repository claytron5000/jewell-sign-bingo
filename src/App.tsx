import { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";

import "./App.css";
type ImageBoxData = {
	src: string;
	found: boolean;
};

function App() {
	let initial = [
		{ src: "./public/IMG_8813.JPG", found: false },
		{ src: "./public/IMG_8814.JPG", found: false },
		{ src: "./public/IMG_8815.JPG", found: false },
		{ src: "./public/IMG_8816.JPG", found: false },
		{ src: "./public/IMG_8817.JPG", found: false },
		{ src: "./public/IMG_8818.JPG", found: false },
		{ src: "./public/IMG_8819.JPG", found: false },
		{ src: "./public/IMG_8820.JPG", found: false },
		{ src: "./public/IMG_8821.JPG", found: false },
		{ src: "./public/IMG_8822.JPG", found: false },
		{ src: "./public/IMG_8823.JPG", found: false },
		{ src: "./public/IMG_8824.JPG", found: false },
		{ src: "./public/IMG_8825.JPG", found: false },
		{ src: "./public/IMG_8815.JPG", found: false },
		{ src: "./public/IMG_8818.JPG", found: false },
		{ src: "./public/IMG_8819.JPG", found: false },
		{ src: "./public/IMG_8820.JPG", found: false },
		{ src: "./public/IMG_8821.JPG", found: false },
		{ src: "./public/IMG_8822.JPG", found: false },
		{ src: "./public/IMG_8823.JPG", found: false },
		{ src: "./public/IMG_8825.JPG", found: false },
		{ src: "./public/IMG_8818.JPG", found: false },
		{ src: "./public/IMG_8819.JPG", found: false },
		{ src: "./public/IMG_8820.JPG", found: false },
		{ src: "./public/IMG_8821.JPG", found: false },
	];

	const stored = localStorage.getItem("sign-pictures");

	if (stored) initial = JSON.parse(stored);

	const [gridOfImage, setGridOfImages] = useState<ImageBoxData[]>(initial);
	const [won, setWon] = useState(false);
	const [selectedIndex, setSelectedIndex] = useState<number>(-1);

	// get set local storage
	useEffect(() => {
		localStorage.setItem("sign-pictures", JSON.stringify(gridOfImage));
	}, [gridOfImage]);

	// check if winner
	useEffect(() => {
		const columns: boolean[][] = [];
		const currentRow: boolean[] = [];
		let winnerInColumns = false;
		let winnerInRows = false;
		let winnerInDiagonals = false;
		for (let i = 0; i < gridOfImage.length; i++) {
			const item = gridOfImage[i];
			const gridWidth = 5;
			const col = i % gridWidth;
			// const row = Math.floor(i / gridWidth);
			currentRow[col] = item.found;
			// check if current row is all true
			if (col === gridWidth - 1) {
				if (currentRow.every((b) => b)) {
					winnerInRows = true;
					break; // break early
				}
			}
			// construct columns
			if (!columns[col]) {
				columns[col] = [item.found];
			} else {
				columns[col].push(item.found);
			}
		}
		if (columns.find((col) => col.every((b) => b))) {
			winnerInColumns = true;
		}
		// diagonals there's a way to do this with math
		const topLeftBottomRight = [
			gridOfImage[0].found,
			gridOfImage[6].found,
			gridOfImage[12].found,
			gridOfImage[18].found,
			gridOfImage[24].found,
		];
		const topRightBottomLeft = [
			gridOfImage[4].found,
			gridOfImage[8].found,
			gridOfImage[12].found,
			gridOfImage[16].found,
			gridOfImage[20].found,
		];
		if (
			topLeftBottomRight.every((b) => b) ||
			topRightBottomLeft.every((b) => b)
		) {
			winnerInDiagonals = true;
		}
		setWon(winnerInColumns || winnerInDiagonals || winnerInRows);
	}, [gridOfImage]);

	const toggleFound = (index: number) => {
		setGridOfImages(
			gridOfImage.map((v, i) => ({
				...v,
				found: i === index ? !v.found : v.found,
			}))
		);
	};

	return (
		<div className="app-container">
			<Header hasWon={won} />
			<div className={`grid-container`}>
				{gridOfImage.map((data, index) => (
					<ImageBox
						key={data.src + index}
						data={data}
						callBack={() => {
							setSelectedIndex(index);
						}}
					/>
				))}
			</div>
			<Dialog open={selectedIndex > -1}>
				<DialogTitle>
					{selectedIndex > -1 && gridOfImage[selectedIndex].found
						? "uncheck?"
						: "Did you find me?"}
				</DialogTitle>

				{selectedIndex > -1 && (
					<img width="400px" src={gridOfImage[selectedIndex].src} />
				)}
				<button
					onClick={() => {
						setSelectedIndex(-1);
						toggleFound(selectedIndex);
					}}
				>
					Yes
				</button>
				<button
					onClick={() => {
						setSelectedIndex(-1);
					}}
				>
					No
				</button>
			</Dialog>
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

function Header({ hasWon }: { hasWon: boolean }) {
	return (
		<header className="header">
			<img
				className="header-image"
				src="./public/IMG_1624.JPG"
				alt="Jewell for our schools template"
			/>
			<h1>Tiffany Jewell for School Committee</h1>
			{!hasWon ? <p>Find enough signs around town to win!</p> : <p>you won!</p>}
		</header>
	);
}

export default App;
