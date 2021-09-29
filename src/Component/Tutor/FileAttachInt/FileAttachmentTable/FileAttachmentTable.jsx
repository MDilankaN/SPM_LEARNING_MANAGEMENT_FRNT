import React, {useEffect, useState} from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import {Button, IconButton} from "@material-ui/core";
import {sanitizeHtml} from "bootstrap/js/src/util/sanitizer";
import {CloudDownload} from "@material-ui/icons";
import axios from "axios";
import {Link} from "react-router-dom";
import Typography from "@material-ui/core/Typography";

//Custom Fonts


const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 400
    },
    tableContainer: {
        borderRadius: 30,
        margin: '5px 10px 10px 10px',
        maxWidth: "98%",
    },
    tableHeaderCell: {
        fontWeight: 'bold',
        backgroundColor: theme.palette.primary.dark, // Change the background color to pink.
        color: theme.palette.getContrastText(theme.palette.primary.dark),
        fontSize: 18,
        marginLeft: 10
    },
    name : {
        fontWeight: 'bold',
        color: theme.palette.secondary.dark
    },
    course: {
        fontWeight: 'bold',
        fontSize: '1.2rem',
        color: 'white',
        backgroundColor: 'grey',
        borderRadius: 10,
        padding: '3px 10px',
        display: 'inline-block',
    }
}))






export default function FileAttachmentTable({status}) {

    const [tableoptions, setTableOptions] = useState([]);

    useEffect(() => {
        getItems();
    },[status])
    async function getItems () {
        const response = await axios.get("http://localhost:8073/api/files");
        const data = response.data;
        const options = data.map(item => ({
            "name" : item.name,
            "uri" : item.uri,
            "type" : item.type,
            "size" : item.size,
            "price" : item.price,
            "description" : item.description,
            "course" : item.course,
            "userGivenName" : item.userGivenName,
        }))
        setTableOptions(options);
    }

    // File Download method.
    async function downloadFiles (imageName) {
        const response = await axios.get("http://localhost:8073/api/download/" + imageName);
        const data = response.data;
        return data;
    }

    const classes = useStyles();

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(20);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <TableContainer className={classes.tableContainer} component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell className={classes.tableHeaderCell}>File Name</TableCell>
                        <TableCell className={classes.tableHeaderCell}>User Given Name</TableCell>
                        <TableCell className={classes.tableHeaderCell}>type</TableCell>
                        <TableCell className={classes.tableHeaderCell}>Size</TableCell>
                        <TableCell className={classes.tableHeaderCell}>Price</TableCell>
                        <TableCell className={classes.tableHeaderCell}>Description</TableCell>
                        <TableCell className={classes.tableHeaderCell}>Course</TableCell>
                        <TableCell className={classes.tableHeaderCell}>URI</TableCell>

                    </TableRow>
                </TableHead>
                <TableBody>
                    {tableoptions?.map((row) => (
                        <TableRow key={row.name}>
                            <TableCell className={classes.name} component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell><Typography color="textSecondary" variant="subtitle1">{row.userGivenName}</Typography></TableCell>
                            <TableCell><Typography color="textSecondary" variant="subtitle1">{row.type}</Typography></TableCell>
                            <TableCell><Typography color="textSecondary" variant="subtitle1">{row.size}</Typography></TableCell>
                            <TableCell><Typography color="textSecondary" variant="subtitle1">{row.price}</Typography></TableCell>
                            <TableCell><Typography color="textSecondary" variant="subtitle1">{row.description}</Typography></TableCell>
                            <TableCell><Typography className={classes.course} style={
                                {
                                    backgroundColor: ((row.course === 'English' && 'green') || (row.course === 'Sinhala' && 'blue') || (row.course === 'Tamil' && 'yellow'))
                                }
                            } color="textSecondary" variant="subtitle1">{row.course}</Typography></TableCell>

                            <TableCell><Button style={{backgroundColor: "red", borderRadius: '10px'}} onClick={() => downloadFiles(`${row.name}`)} value="Download">Download</Button></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
