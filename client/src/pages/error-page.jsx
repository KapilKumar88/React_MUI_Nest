import { Link, useRouteError } from "react-router-dom";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function ErrorPage() {
    const error = useRouteError();
    console.error(error);

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h5">
                    Unauthorized
                </Typography>
                <p>Go to <Link to={"/login"}>Login</Link></p>
            </Box>
        </Container>
    );
}