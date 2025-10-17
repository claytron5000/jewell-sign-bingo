import { useState } from "react";
import InfoDialog from "./InfoDialog";

function Header({ hasWon }: { hasWon: boolean }) {
	const [open, setOpen] = useState(false);

	return (
		<header className="header">
			<img
				className="header-image"
				src="./source/IMG_1624.JPG"
				alt="Jewell for our schools template"
			/>
			<p className="subtitle">
				{!hasWon
					? "Can you find all the “Jewell for our Schools” signs around our city? No two signs are exactly the same! Have fun! And, remember to vote for Tiffany Jewell for the at-large school committee position on November 4th! (To reset the game, please click the “i” and scroll down and tap “reset my game.”)"
					: "Awesome! You found them! Hit reset and find even more!"}
				&nbsp;
				<span className="info-icon">
					<a href="#" onClick={() => setOpen(true)}>
						ⓘ
					</a>
				</span>
			</p>
			<InfoDialog open={open} setOpen={setOpen} />
		</header>
	);
}

export default Header;
