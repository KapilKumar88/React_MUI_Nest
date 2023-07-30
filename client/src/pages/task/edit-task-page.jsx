import {
    Box,
    Button,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Toolbar,
    Typography
} from "@mui/material";
import { useSnackbar } from "notistack";
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from "react-router-dom";
import { useEditTaskMutation } from "../../redux/services/task/task-service";

export default function EditTaskPage() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const { state } = useLocation();
    const [EditTask] = useEditTaskMutation();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const onSubmit = async (data) => {
        try {
            const result = await EditTask({
                "taskId": state?.taskId,
                "taskName": data?.name,
                "taskDescription": data?.description,
                "status": data?.status
            }).unwrap();
            enqueueSnackbar(result?.message, {
                variant: "success"
            });
            navigate("/task");
            return;
        } catch (error) {
            if (Array.isArray(error?.data?.message)) {
                error?.data?.message.forEach(element => {
                    enqueueSnackbar(element, {
                        variant: "error"
                    });
                });
            } else {
                enqueueSnackbar(error?.data?.message || "Something went wrong", {
                    variant: "error"
                });
            }
        }
    }

    return (
        <Box>
            <Toolbar />
            <Typography component="h1" variant="h5">
                Edit Task
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            id="name"
                            label="Task Name"
                            name="name"
                            autoComplete="name"
                            {...register("name", {
                                required: "Task name is required"
                            })}
                            defaultValue={state?.taskName}
                            error={!!errors.name}
                            helperText={errors.name?.message}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            name="description"
                            label="Task Description"
                            type="text"
                            id="description"
                            autoComplete="description"
                            {...register("description", {
                                required: "Task description is required"
                            })}
                            defaultValue={state?.taskDescription}
                            error={!!errors.description}
                            helperText={errors.description?.message}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl required sx={{ m: 1, minWidth: 120 }}>
                            <InputLabel id="status">Status</InputLabel>
                            <Select
                                required
                                labelId="status"
                                id="status"
                                label="status"
                                {...register("status")}
                                error={!!errors.status}
                                helperText={errors.status?.message}
                                defaultValue={state?.status}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={"todo"}>To Do</MenuItem>
                                <MenuItem value={"in_progress"}>InProgress</MenuItem>
                                <MenuItem value={"done"}>Done</MenuItem>
                            </Select>
                            {/* <FormHelperText>Required</FormHelperText> */}
                        </FormControl>
                    </Grid>
                </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Edit Task
                </Button>
            </Box>
        </Box>
    )
}
