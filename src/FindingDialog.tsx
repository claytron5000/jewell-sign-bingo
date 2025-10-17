import { Dialog, DialogTitle, Button, Stack, Box } from "@mui/material";
import type { ImageBoxData } from "./App";

function FindingDialog({
	selectedIndex,
	setDialogClosed,
	gridOfImage,
	setSelectedIndex,
	toggleFound,
}: {
	selectedIndex: number;
	setDialogClosed: (b: boolean) => void;
	gridOfImage: ImageBoxData[];
	setSelectedIndex: (i: number) => void;
	toggleFound: (i: number) => void;
}) {
	return (
		<Dialog open={selectedIndex > -1} onClose={() => setDialogClosed(true)}>
			<DialogTitle>
				{selectedIndex > -1 && gridOfImage[selectedIndex].found
					? "Oh wait, I didn't see this one"
					: "Did you find me?"}
			</DialogTitle>

			{selectedIndex > -1 && (
				<img src={`./resized/1200/${gridOfImage[selectedIndex].fileName}`} />
			)}
			<Box sx={{ p: 2 }}>
				<Stack spacing={2} direction="column">
					<Button
						size="large"
						className="sign-find-button"
						variant="contained"
						onClick={() => {
							setSelectedIndex(-1);
							toggleFound(selectedIndex);
						}}
					>
						Yes
					</Button>
					<Button
						size="large"
						className="sign-find-button"
						variant="contained"
						onClick={() => {
							setSelectedIndex(-1);
						}}
					>
						No
					</Button>
				</Stack>
			</Box>
		</Dialog>
	);
}

export default FindingDialog;
