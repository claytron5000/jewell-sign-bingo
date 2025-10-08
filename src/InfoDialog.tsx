import { Close, ArrowDropDown } from "@mui/icons-material";
import {
	Dialog,
	DialogTitle,
	IconButton,
	Accordion,
	AccordionSummary,
	Typography,
	AccordionDetails,
	Button,
	Box,
} from "@mui/material";
import { storageString } from "./constants";
import { useState } from "react";

function InfoDialog({
	open,
	setOpen,
}: {
	open: boolean;
	setOpen: (b: boolean) => void;
}) {
	const [openReset, setOpenReset] = useState(false);
	// this is for testing purposes only
	const [showAccordion, setShowAccordion] = useState(true);
	return (
		<Dialog
			open={open}
			className="info-dialog"
			maxWidth="md"
			// fullWidth={true}
			fullScreen={true}
		>
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
			<Box sx={{ p: 2 }}>
				{showAccordion ? (
					<Accordion>
						<AccordionSummary
							expandIcon={<ArrowDropDown />}
							aria-controls="panel1-content"
							id="panel1-header"
						>
							<Typography component="span">What's this?</Typography>
						</AccordionSummary>
						<AccordionDetails>
							<InfoContent />
						</AccordionDetails>
					</Accordion>
				) : (
					<InfoContent />
				)}

				<Typography>
					<a href="">Join our facebook group</a>
				</Typography>

				<Typography>
					This web app collects no information. All data is stored in your
					browser.
				</Typography>

				<Button
					variant="contained"
					onClick={() => {
						setOpenReset(true);
					}}
				>
					reset my game
				</Button>
				<Button onClick={() => setShowAccordion(!showAccordion)}>
					QA: Toggle Accordion
				</Button>
			</Box>
			<Dialog open={openReset}>
				<Typography>
					Are you sure you want to reset your bingo and lose all your progress?
				</Typography>
				<Button
					variant="contained"
					onClick={() => {
						localStorage.removeItem(storageString);
						location.reload();
					}}
				>
					Yes, reset
				</Button>
				<Button
					variant="contained"
					color="error"
					onClick={() => setOpenReset(false)}
				>
					Cancel
				</Button>
			</Dialog>
		</Dialog>
	);
}

function InfoContent() {
	return (
		<>
			<Typography>
				I’m running a zero-waste campaign: I’ve been listening to the young
				people in our community for years and hearing that one of their biggest
				concerns is climate change.
				<br />
				I don’t want to be a part of the problem and put campaign waste into the
				landfills. I will be a part of the solution.
				<br />
				We’ve collected old signs from basements and past campaigns and events
				and are repurposing those into new signs. We're getting creative and
				having fun!
				<br />
				So, you won’t see hundreds of signs with my name on it. But, you will
				see a few that were designed and painted by some of your neighbors and
				their kiddos.
				<br />
				See how many you can find. Find five in a row to win!!
			</Typography>
		</>
	);
}

export default InfoDialog;
