import { Box, Typography, Button } from "@mui/material";

function DialogContent({
	setOpenReset,
}: {
	setOpenReset: (b: boolean) => void;
}) {
	return (
		<Box sx={{ p: 2 }}>
			<InfoContent />

			<Typography className="center" sx={{ pb: 1 }}>
				<a href="https://linktr.ee/TiffanyJewellForOurSchools">
					All the information is here
				</a>
			</Typography>

			<Typography className="center" sx={{ pb: 1 }}>
				This web app collects no information. All data is stored in your
				browser.
			</Typography>
			<Box className="center" sx={{ pt: 1 }}>
				<Button
					variant="contained"
					onClick={() => {
						setOpenReset(true);
					}}
				>
					reset my game
				</Button>
			</Box>
		</Box>
	);
}

function InfoContent() {
	return (
		<Box>
			<Typography sx={{ pb: 1 }}>
				Click on each photo to get a bigger picture of the sign. You will be
				asked, “Did you find me?” Click “Yes” if you did and click “No” if you
				haven’t spotted it yet! Once you've found all the signs on your screen
				board, hit reset and start again!
			</Typography>

			<Typography sx={{ pb: 1 }}>
				I’m running a zero-waste campaign: I’ve been listening to the young
				people in our community for years and hearing that one of their biggest
				concerns is climate change.
			</Typography>

			<Typography sx={{ pb: 1 }}>
				I don’t want to be a part of the problem and put campaign waste into the
				landfills. I will be a part of the solution.
			</Typography>

			<Typography sx={{ pb: 1 }}>
				We’ve collected old signs from basements and past campaigns and events
				and are repurposing those into new signs. We're getting creative and
				having fun!
			</Typography>

			<Typography sx={{ pb: 1 }}>
				So, you won’t see hundreds of signs with my name on it. But, you will
				see a few that were designed and painted by some of your neighbors and
				their kiddos.
			</Typography>

			<Typography sx={{ pb: 1 }}>
				See how many you can find. Find five in a row to win!!
			</Typography>
		</Box>
	);
}

export default DialogContent;
