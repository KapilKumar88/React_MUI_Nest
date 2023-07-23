import Button from '@mui/material/Button';
import { useSnackbar } from 'notistack';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from '../../redux/services/auth/auth-service';

export default function RegisterPage() {
    const { enqueueSnackbar } = useSnackbar();
    const [Register] = useRegisterMutation();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        try {
            const result = await Register({
                email: data.email,
                name: `${data.firstName} ${data.lastName}`,
                password: data.password,
            }).unwrap();
            if (result?.success) {
                enqueueSnackbar(result?.message, {
                    variant: 'success'
                });
                navigate("/login");
                return;
            }
        } catch (error) {
            console.log(error, '>>>>>>>>>>error>>>>>>>>>>>>');
        }
    };

    return (
        <>
            <Typography component="h1" variant="h5">
                Register
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            autoComplete="given-name"
                            name="firstName"
                            required
                            fullWidth
                            id="firstName"
                            label="First Name"
                            autoFocus
                            {...register("firstName", {
                                required: "First Name is required"
                            })}
                            error={!!errors.firstName}
                            helperText={errors.firstName?.message}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            fullWidth
                            id="lastName"
                            label="Last Name"
                            name="lastName"
                            {...register("lastName", {
                                required: "Last Name is required"
                            })}
                            error={!!errors.lastName}
                            helperText={errors.lastName?.message}
                        />
                    </Grid>
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
                            {...register("password", {
                                required: "Password is required"
                            })}
                            error={!!errors.password}
                            helperText={errors.password?.message}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            name="confirmPassword"
                            label="Confirm Password"
                            type="password"
                            id="confirmPassword"
                            {...register("confirmPassword", {
                                required: "Confirm Password is required"
                            })}
                            error={!!errors.confirmPassword}
                            helperText={errors.confirmPassword?.message}
                        />
                    </Grid>
                </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Register
                </Button>
                <Grid container justifyContent="flex-end">
                    <Grid item>
                        <Link to="/login" variant="body2">
                            Already have an account? Sign in
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}
