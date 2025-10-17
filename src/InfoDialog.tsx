import { Close } from "@mui/icons-material";
import {
	Dialog,
	DialogTitle,
	IconButton,
	Typography,
	Button,
	Box,
	Stack,
} from "@mui/material";
import { useState } from "react";
import DialogContent from "./DialogContent";
import ResetButton from "./ResetButton";

function InfoDialog({
	open,
	setOpen,
}: {
	open: boolean;
	setOpen: (b: boolean) => void;
}) {
	const [openReset, setOpenReset] = useState(false);
	return (
		<Dialog open={open} className="info-dialog" maxWidth="md" fullScreen={true}>
			<DialogTitle textAlign="center">
				Tiffany Jewell for At-Large School Committee
			</DialogTitle>
			<IconButton
				aria-label="close"
				onClick={() => setOpen(false)}
				sx={(theme) => ({
					position: "absolute",
					right: 0,
					top: 0,
					color: theme.palette.grey[500],
				})}
			>
				<Close />
			</IconButton>
			<DialogContent setOpenReset={setOpenReset} />
			<Dialog open={openReset}>
				<Box sx={{ p: 1 }}>
					<Typography>
						Are you sure you want to reset your bingo and lose all your
						progress?
					</Typography>
				</Box>
				<Box sx={{ p: 2 }}>
					<Stack spacing={2} direction="column">
						<ResetButton text="yes, reset" />
						<Button
							variant="contained"
							color="error"
							onClick={() => setOpenReset(false)}
						>
							Cancel
						</Button>
					</Stack>
				</Box>
			</Dialog>
		</Dialog>
	);
}

export default InfoDialog;
