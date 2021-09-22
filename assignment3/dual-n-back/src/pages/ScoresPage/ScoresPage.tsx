import React, { useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Paper } from "@material-ui/core";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import { scoreService } from "../../services/ScoreService";

interface ScoreItem {
    username: string;
    value: number;
    timestamp: Date;
}

const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
});

// inspired by https://material-ui.com/components/tables/ and
// https://www.pluralsight.com/guides/access-data-from-an-external-api-into-a-react-component
// and https://stackoverflow.com/questions/64334134/material-ui-react-table-pagination
export const ScoresPage = () => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [scores, setScores] = React.useState<[ScoreItem]>();
    const [total, setTotal] = React.useState(0);

    const classes = useStyles();

    useEffect(() => {
        getScores();
    }, []);

    const getScores = () => {
        scoreService.getScores().then(async (res) => {
            if (res?.status === 200) {
                const data = await res?.json();
                setScores(data);
                setTotal(data.length);
            }
        });
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
      };
    
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, total - page * rowsPerPage);

    return (
        <div>
            <h1>High scores</h1>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Username</TableCell>
                            <TableCell align="right">Score</TableCell>
                            <TableCell align="right">Timestamp</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {scores?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => (
                                <TableRow key={`${row.username}_${row.timestamp}`}>
                                    <TableCell component="th" scope="row">
                                        {row.username}
                                    </TableCell>
                                    <TableCell align="right">{row.value}</TableCell>
                                    <TableCell align="right">{row.timestamp.toLocaleString()}</TableCell>
                                </TableRow>
                        ))}
                        { emptyRows > 0 && (
                            <TableRow style={{ height: 53 * emptyRows }}>
                                <TableCell colSpan={6} />
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10]}
                component="div"
                count={total}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </div>
        
      );
}