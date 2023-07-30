import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useEffect, useState } from 'react';
import { useDeleteTaskMutation, useTaskListQuery } from '../redux/services/task/task-service';
import moment from 'moment';
import { useSnackbar } from 'notistack';
import { Button } from '@mui/base';
import { useNavigate } from 'react-router-dom';

export default function DataTable() {
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [tableRows, setTableRows] = useState([]);
    const [DeleteTask] = useDeleteTaskMutation();
    const { data: taskList, error } = useTaskListQuery({
        limit: rowsPerPage,
        page_num: page
    });

    if (error) {
        console.log(error, '>>>>>>>>>>>.eorororro');
        enqueueSnackbar(error?.data?.message, {
            variant: "error"
        });
    }

    useEffect(() => {
        if (taskList?.data?.records?.length > 0) {
            setTableRows(taskList?.data?.records);
        }
    }, [taskList])

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(1);
    };

    const deleteTaskHandler = async (taskId) => {
        try {
            const result = await DeleteTask(taskId).unwrap();
            enqueueSnackbar(result?.message, {
                variant: "success"
            })
        } catch (error) {
            enqueueSnackbar(error?.message || "Something went wrong", {
                variant: "error"
            });
        }
    }

    const editTaskHandler = (data) => {
        navigate("/edit-task", { state: data });
        return;
    }

    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <TableContainer>
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                    >
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell align="right">Description</TableCell>
                                <TableCell align="right">Status</TableCell>
                                <TableCell align="right">Completed At</TableCell>
                                <TableCell align="right">Created At</TableCell>
                                <TableCell align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                tableRows.map(ele => {
                                    return (<TableRow key={ele?.taskId}>
                                        <TableCell>{ele?.taskName}</TableCell>
                                        <TableCell align="right">{ele?.taskDescription}</TableCell>
                                        <TableCell align="right">{ele?.status}</TableCell>
                                        <TableCell align="right">{ele?.completedDate === null ? "N/A" : moment(ele?.completedDate).format('YYYY-MM-DD')}</TableCell>
                                        <TableCell align="right">{moment(ele?.createdAt).format('YYYY-MM-DD')}</TableCell>
                                        <TableCell align="right">
                                            <Button onClick={() => deleteTaskHandler(ele?.taskId)}>
                                                <DeleteIcon />
                                            </Button>
                                            <Button onClick={() => editTaskHandler(ele)}>
                                                <EditIcon />
                                            </Button>
                                        </TableCell>
                                    </TableRow>);
                                })
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={taskList?.data?.totalCount}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </Box>
    );
}