import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllTodoList } from '../../features/Slice/Todo/todoSlice';
import { IconButton, InputAdornment, Table, TableCell, TableRow, TextField, Typography, CircularProgress, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import _ from "lodash";

const TodoHistory = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredItems, setFilteredItems] = useState([]);
    const todoItems = useSelector(state => state.todo.todo?.data);
    const loading = useSelector(state => state.todo.loading);
    const error = useSelector(state => state.todo.error);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAllTodoList());
    }, [dispatch]);

    useEffect(() => {
        filterItems(searchTerm);
    }, [searchTerm, todoItems]);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filterItems = (term) => {
        if (term.trim() === "") {
            setFilteredItems(todoItems); // If search term is empty, show all items
        } else {
            const filteredResults = todoItems?.filter(item =>
                item.title.toLowerCase().includes(term.toLowerCase())
            );
            setFilteredItems(filteredResults);
        }
    };

    return (
        <div style={{ margin: "50px 150px 0 150px" }}>
            <Typography variant="h4" component="h5" sx={{ display: "flex", justifyContent: "center", margin: "20px 0" }}>
                Todo History
            </Typography>

            <TextField
                variant="outlined"
                fullWidth
                size="small"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearch}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="start">
                            <IconButton edge="start" aria-label="search">
                                <SearchIcon style={{ color: 'black' }} />
                            </IconButton>
                        </InputAdornment>
                    ),
                    sx: {
                        borderRadius: '10px',
                        backgroundColor: 'rgba(169, 169, 169, 0.5)',
                        width: '100%',
                        color: 'black',
                        '& input::placeholder': {
                            color: 'black',
                            opacity: 0.8,
                        },
                    },
                }}
            />

            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                    <CircularProgress />
                </Box>
            ) : error ? (
                <Typography variant="body1" color="error" sx={{ textAlign: 'center', marginTop: '20px' }}>
                    {error}
                </Typography>
            ) : (
                <Table className="createtable">
                    <TableRow>
                        <TableCell>
                            <Typography variant="h5" component="h6">
                                No.
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant="h5" component="h6">
                                Title
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant="h5" component="h6">
                                Description
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant="h5" component="h6">
                                Done
                            </Typography>
                        </TableCell>
                    </TableRow>

                    {filteredItems?.length > 0 ? (
                        filteredItems.map((todo, index) => (
                            <TableRow key={todo._id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{todo.title}</TableCell>
                                <TableCell>{todo.description}</TableCell>
                                <TableCell>{todo.isDelete ? "Yes" : "No"}</TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={3}>
                                <Typography variant="body1" component="p">
                                    No Data Found
                                </Typography>
                            </TableCell>
                        </TableRow>
                    )}
                </Table>
            )}
        </div>
    );
};

export default TodoHistory;
