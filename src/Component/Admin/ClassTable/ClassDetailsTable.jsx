import React, {useEffect} from 'react'
import { withStyles, Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import {green} from "@material-ui/core/colors";
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import {useDispatch, useSelector} from "react-redux";
import {getClasses} from "../../../Action/Class";

const StyledTableCell = withStyles((theme: Theme) =>
    createStyles({
        head: {
            backgroundColor: theme.palette.info.dark,
            color: theme.palette.common.white,
        },
        body: {
            fontSize: 14,
        },
    }),
)(TableCell);

const StyledTableRow = withStyles((theme: Theme) =>
    createStyles({
        root: {
            '&:nth-of-type(odd)': {
                backgroundColor: theme.palette.action.hover,
            },
        },
    }),
)(TableRow);

const rows = [
    // { id: 1, name: 'Grade 11', description: 'This is a grade 11 class', teacher: 'Mr.Dissanayka',image: 'Class_Image' },
    // { id: 2, name: 'Grade 11', description: 'This is a grade 11 class', teacher: 'Mr.Dissanayka',image: 'Class_Image' },
    // { id: 3, name: 'Grade 11', description: 'This is a grade 11 class', teacher: 'Mr.Dissanayka',image: 'Class_Image' },
    // { id: 4, name: 'Grade 11', description: 'This is a grade 11 class', teacher: 'Mr.Dissanayka',image: 'Class_Image' },
    // { id: 5, name: 'Grade 11', description: 'This is a grade 11 class', teacher: 'Mr.Dissanayka',image: 'Class_Image' },
    // { id: 6, name: 'Grade 11', description: 'This is a grade 11 class', teacher: 'Mr.Dissanayka',image: 'Class_Image' },
    // { id: 7, name: 'Grade 11', description: 'This is a grade 11 class', teacher: 'Mr.Dissanayka',image: 'Class_Image' },
    // { id: 8, name: 'Grade 11', description: 'This is a grade 11 class', teacher: 'Mr.Dissanayka',image: 'Class_Image' },
    // { id: 9, name: 'Grade 11', description: 'This is a grade 11 class', teacher: 'Mr.Dissanayka',image: 'Class_Image' },
    // { id: 10, name: 'Grade 11', description: 'This is a grade 11 class', teacher: 'Mr.Dissanayka',image: 'Class_Image' },
    // { id: 11, name: 'Grade 11', description: 'This is a grade 11 class', teacher: 'Mr.Dissanayka',image: 'Class_Image' },
    // { id: 12, name: 'Grade 11', description: 'This is a grade 11 class', teacher: 'Mr.Dissanayka',image: 'Class_Image' },
    // { id: 13, name: 'Grade 11', description: 'This is a grade 11 class', teacher: 'Mr.Dissanayka',image: 'Class_Image' },
    // { id: 14, name: 'Grade 11', description: 'This is a grade 11 class', teacher: 'Mr.Dissanayka',image: 'Class_Image' },
    // { id: 15, name: 'Grade 11', description: 'This is a grade 11 class', teacher: 'Mr.Dissanayka',image: 'Class_Image' },

];

const useStyles = makeStyles({
    table: {
        minWidth: 1350,
        borderRadius: 50
    },
    editorContent: {
        borderRadius: 30
    },
});

function ClassDetailsTable() {

    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
    const dispatch = useDispatch();

    const classDetails = useSelector((state) => state.classes.classRecords.records);
    console.log('CLASS DETAIL', classDetails);

    React.useEffect(() => {
        // setIsLoading(dataLoading);
        dispatch(getClasses());
    }, []);


    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <React.Fragment>
            {/*<div className="class-table-component">*/}
            {/*    <div className="input-table-container">*/}
                    <TableContainer component={Paper} className={classes.editorContent}>
                        <Table className={classes.table} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center" >Class name</TableCell>
                                    <TableCell align="center" >Description</TableCell>
                                    <TableCell align="center" >Teacher name</TableCell>
                                    <TableCell align="center" >Image</TableCell>
                                    <TableCell align="center" >Delete</TableCell>
                                    <TableCell align="center" >Update</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row) => (
                                    <StyledTableRow key={row.id}>
                                        {/*<StyledTableCell component="th" scope="row">{row.id}</StyledTableCell>*/}
                                        <StyledTableCell align="center">{row.name}</StyledTableCell>
                                        <StyledTableCell align="center">{row.description}</StyledTableCell>
                                        <StyledTableCell align="center">{row.teacher}</StyledTableCell>
                                        <StyledTableCell align="center">{row.image}</StyledTableCell>
                                        <TableCell align="center">
                                            <DeleteIcon color="primary" style={{fontSize: 40 }}/>
                                        </TableCell>
                                        <TableCell align="center">
                                            <EditIcon style={{ color: green[500], fontSize: 40 }}/>
                                        </TableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    <TablePagination
                                        rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                        colSpan={3}
                                        count={rows.length}
                                        rowsPerPage={rowsPerPage}
                                        page={page}
                                        SelectProps={{
                                            inputProps: { 'aria-label': 'rows per page' },
                                            native: true,
                                        }}
                                        onPageChange={handleChangePage}
                                        onRowsPerPageChange={handleChangeRowsPerPage}
                                        // ActionsComponent={TablePaginationActions}
                                    />
                                </TableRow>
                            </TableFooter>
                        </Table>
                    </TableContainer>
            {/*    </div>*/}
            {/*</div>*/}
        </React.Fragment>

    )
}

export default ClassDetailsTable;