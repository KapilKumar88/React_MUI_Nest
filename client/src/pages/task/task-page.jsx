import { Box, Button, Toolbar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import DataTable from "../../components/datatable";

export default function TaskPage() {
    const navigate = useNavigate();

    return (
        <Box>
            <Toolbar />
            <Toolbar />
            <Button variant="outlined" onClick={() => navigate("/add-task")}>Add Task</Button>
            <Toolbar />
            <DataTable />
        </Box>
    )
}
