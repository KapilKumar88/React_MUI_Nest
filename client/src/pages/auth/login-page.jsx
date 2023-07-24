import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useSnackbar } from 'notistack';
import { Link, useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { useLoginMutation } from '../../redux/services/auth/auth-service';

export default function LoginPage() {
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const [Login] = useLoginMutation();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        try {
            const result = await Login({
                email: data.email,
                password: data.password
            }).unwrap();
            if (result?.success) {
                localStorage.setItem("user", JSON.stringify(result?.data));
                enqueueSnackbar(result?.message, {
                    variant: 'success'
                });
                navigate("/dashboard");
                return;
            }
        } catch (error) {
            console.log(error, '>>>>>>>>>>>>>>.erororro');
        }
    };

    return (
        <>
            <Typography component="h1" variant="h5">
                Login
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            {...register("email", {
                                required: "Email is required"
                            })}
                            error={!!errors.email}
                            helperText={errors.email?.message}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="new-password"
                            {...register("password", {
                                required: "Password is required"
                            })}
                            error={!!errors.password}
                            helperText={errors.password?.message}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControlLabel
                            control={<Checkbox value="allowExtraEmails" color="primary" />}
                            label="Remember Me"
                        />
                    </Grid>
                </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Login
                </Button>
                <Grid container justifyContent="space-between">
                    <Grid item>
                        <Link to={"/forgot-password"} variant="body2">
                            Forgot Password
                        </Link>
                    </Grid>
                    <Grid item>
                        <Link to={"/register"} variant="body2">
                            Don&apos;t have account?
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}
