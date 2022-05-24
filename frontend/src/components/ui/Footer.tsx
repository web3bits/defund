import { Box, Container } from "@mui/material";
import Typography from "@mui/material/Typography";


export const Footer = () => {

    return (
        <footer>
            <Box sx={{ width: '100%', height: "66px", bgcolor: "primary.dark", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
                <Container>
                    <Typography component="div" variant="subtitle1" color="primary.light" gutterBottom>
                        ©2022 DeFund. All rights reserved
                    </Typography>
                </Container>
            </Box>
        </footer>
    );
};