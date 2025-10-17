import { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import images from "./images.json";
import "./App.css";
import { colors, storageString } from "./constants";
import { ErrorBoundary } from "react-error-boundary";
import ResetButton from "./ResetButton";
import FindingDialog from "./FindingDialog";
import Header from "./Header";

export type ImageBoxData = {
	fileName: string;
	found: boolean;
};

function App() {
	return (
		<ErrorBoundary
			fallback={
				<div className="error-container">
					<p>There was an error. Try resetting the game.</p>
					<ResetButton text="reset" />
				</div>
			}
		>
			<InnerApp />
		</ErrorBoundary>
	);
}

function InnerApp() {
	const stored = localStorage.getItem(storageString);
	let initial;

	if (stored) {
		initial = JSON.parse(stored);
	} else {
		// map to shape, then sort randomly
		initial = images
			.map((img) => ({ fileName: img, found: false }))
			.sort(() => (Math.random() > Math.random() ? -1 : 1));
	}
	initial.length = 25;

	const [gridOfImage, setGridOfImages] = useState<ImageBoxData[]>(initial);
	const [won, setWon] = useState(false);
	const [selectedIndex, setSelectedIndex] = useState<number>(-1);
	const [dialogClosed, setDialogClosed] = useState(true);

	// get set local storage
	useEffect(() => {
		localStorage.setItem(storageString, JSON.stringify(gridOfImage));
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

	useEffect(() => {
		if (won && dialogClosed) {
			const config = { particleCount: 150, colors: colors };
			setTimeout(() => {
				confetti(config);
				setTimeout(() => {
					confetti(config);
					setTimeout(() => {
						confetti(config);
					}, 500);
				}, 500);
			}, 500);
		}
	}, [won, dialogClosed]);

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
						key={`${data.fileName}-${index}`}
						data={data}
						callBack={() => {
							setSelectedIndex(index);
						}}
					/>
				))}
			</div>
			<FindingDialog
				selectedIndex={selectedIndex}
				setDialogClosed={setDialogClosed}
				gridOfImage={gridOfImage}
				setSelectedIndex={setSelectedIndex}
				toggleFound={toggleFound}
			/>
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
			<img src={`resized/320/${data.fileName}`} />
		</div>
	);
}

export default App;
