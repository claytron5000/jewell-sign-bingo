import { useEffect, useState } from "react";

import "./App.css";
type ImageBoxData = {
	src: string;
	found: boolean;
};

function App() {
	const initial = [
		{ src: "./public/one.PNG", found: false },
		{ src: "./public/two.PNG", found: false },
		{ src: "./public/three.PNG", found: false },
		{ src: "./public/four.JPG", found: false },
		{ src: "./public/five.JPG", found: false },
	];
	const [gridOfImage, setGridOfImages] = useState<ImageBoxData[]>(
		[initial, initial, initial, initial, initial].flat()
	);
	useEffect(() => {
		console.log("hello");
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
		<div className={`grid-container`}>
			{gridOfImage.map((data, index) => (
				<ImageBox
					key={data.src + index}
					data={data}
					callBack={() => cb(index)}
				/>
			))}
		</div>
	);
}

export function AppT() {
	return (
		<>
			<div className="grid-container">
				<div className="grid-item">
					<img src="https://picsum.photos/400/400?random=1" alt="Image 1" />
				</div>
				<div className="grid-item">
					<img src="https://picsum.photos/400/400?random=2" alt="Image 2" />
				</div>
				<div className="grid-item">
					<img src="https://picsum.photos/400/400?random=3" alt="Image 3" />
				</div>
				<div className="grid-item">
					<img src="https://picsum.photos/400/400?random=4" alt="Image 4" />
				</div>
				<div className="grid-item">
					<img src="https://picsum.photos/400/400?random=5" alt="Image 5" />
				</div>

				<div className="grid-item">
					<img src="https://picsum.photos/400/400?random=6" alt="Image 6" />
				</div>
				<div className="grid-item">
					<img src="https://picsum.photos/400/400?random=7" alt="Image 7" />
				</div>
				<div className="grid-item">
					<img src="https://picsum.photos/400/400?random=8" alt="Image 8" />
				</div>
				<div className="grid-item">
					<img src="https://picsum.photos/400/400?random=9" alt="Image 9" />
				</div>
				<div className="grid-item">
					<img src="https://picsum.photos/400/400?random=10" alt="Image 10" />
				</div>

				<div className="grid-item">
					<img src="https://picsum.photos/400/400?random=11" alt="Image 11" />
				</div>
				<div className="grid-item">
					<img src="https://picsum.photos/400/400?random=12" alt="Image 12" />
				</div>
				<div className="grid-item">
					<img src="https://picsum.photos/400/400?random=13" alt="Image 13" />
				</div>
				<div className="grid-item">
					<img src="https://picsum.photos/400/400?random=14" alt="Image 14" />
				</div>
				<div className="grid-item">
					<img src="https://picsum.photos/400/400?random=15" alt="Image 15" />
				</div>

				<div className="grid-item">
					<img src="https://picsum.photos/400/400?random=16" alt="Image 16" />
				</div>
				<div className="grid-item">
					<img src="https://picsum.photos/400/400?random=17" alt="Image 17" />
				</div>
				<div className="grid-item">
					<img src="https://picsum.photos/400/400?random=18" alt="Image 18" />
				</div>
				<div className="grid-item">
					<img src="https://picsum.photos/400/400?random=19" alt="Image 19" />
				</div>
				<div className="grid-item">
					<img src="https://picsum.photos/400/400?random=20" alt="Image 20" />
				</div>

				<div className="grid-item">
					<img src="https://picsum.photos/400/400?random=21" alt="Image 21" />
				</div>
				<div className="grid-item">
					<img src="https://picsum.photos/400/400?random=22" alt="Image 22" />
				</div>
				<div className="grid-item">
					<img src="https://picsum.photos/400/400?random=23" alt="Image 23" />
				</div>
				<div className="grid-item">
					<img src="https://picsum.photos/400/400?random=24" alt="Image 24" />
				</div>
				<div className="grid-item">
					<img src="https://picsum.photos/400/400?random=25" alt="Image 25" />
				</div>
			</div>
		</>
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
