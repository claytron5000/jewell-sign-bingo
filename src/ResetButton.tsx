import { Button } from "@mui/material";
import { storageString } from "./constants";

function ResetButton({ text }: { text: string }) {
	return (
		<Button
			variant="contained"
			onClick={() => {
				localStorage.removeItem(storageString);
				location.reload();
			}}
		>
			{text}
		</Button>
	);
}

export default ResetButton;
