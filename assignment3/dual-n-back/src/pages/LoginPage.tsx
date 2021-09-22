import React, { Component, useState } from "react";
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';
import { makeStyles, Paper, Snackbar } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import LockIcon from '@material-ui/icons/Lock';
import { authService } from "../services/authService";
import { Link as RouterLink, RouteChildrenProps, LinkProps as RouterLinkProps } from "react-router-dom";

const useStyles = makeStyles({
    root: {
        flexGrow: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
    },
    paper: {
        padding: 20,
    },
    form: {
        '& .MuiTextField-root': {
            margin: 10,
            width: 200,
        },
        flexGrow: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
    },
    field:{
        flexGrow: 1
    },
    headline: {
        fontSize: 36,
        textAlign: "center",
    },
    registerDiv: {
        textAlign: "center",
    },
});

export const LoginPage = (props: RouteChildrenProps) => {
    const [name, setName] = useState<string>();
    const [password, setPassword] = useState<string>();
    const [errOpen, setErrOpen] = useState(false);

    const classes = useStyles();
    const onSubmit = (e: any) => {
        e.preventDefault();
        if (!name || !password) {
            return;
        }
        authService.login(name, password).then(() => props.history.push("/")).catch(() => setErrOpen(true));

    };

    const handleClose = (event: React.SyntheticEvent | React.MouseEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setErrOpen(false);
    };


    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <h1 className={classes.headline}>Login</h1>
                <form className={classes.form} noValidate autoComplete="off" onSubmit={onSubmit}>
                    <TextField className={classes.field} id="name" label="Username" variant="outlined" value={name} onChange={e => setName(e.target.value)} required />
                    <TextField className={classes.field} id="password" label="Password" variant="outlined" value={password} onChange={e => setPassword(e.target.value)} type="password" required />
                    <Button variant="contained" size="large" color="primary" type="submit" startIcon={<LockIcon />}>Login</Button>
                </form>
                <br /><br />
                <div className={classes.registerDiv}>
                    <p>Haven't got an account yet?</p>

                    <Button color="primary" component={RouterLink} to="/register">Register</Button>
                </div>
            </Paper>

            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                open={errOpen}
                onClose={handleClose}
                autoHideDuration={2000}
                message="Login unsuccessful" />
        </div>
    )
}

