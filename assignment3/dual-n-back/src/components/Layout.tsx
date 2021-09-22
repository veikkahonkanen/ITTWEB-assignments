import { AppBar, Button, createStyles, CssBaseline, Divider, Drawer, Hidden, IconButton, List, ListItem, ListItemIcon, ListItemText, makeStyles, Theme, Toolbar, Typography, useTheme } from "@material-ui/core";
import { Inbox, Mail, Menu } from "@material-ui/icons";
import React, { ReactChild, ReactChildren } from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { navigation } from "../navigation";
import { authService } from "../services/authService";
import { WithChildren } from "../utils/WithChildren";




const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            flex: 1
        },
        drawer: {
            [theme.breakpoints.up('md')]: {
                width: drawerWidth,
                flexShrink: 0,
            },
        },
        appBar: {
            [theme.breakpoints.up('md')]: {
                width: `calc(100% - ${drawerWidth}px)`,
                marginLeft: drawerWidth,
            },
        },
        menuButton: {
            marginRight: theme.spacing(2),
            [theme.breakpoints.up('md')]: {
                display: 'none',
            },
        },
        // necessary for content to be below app bar
        toolbar: theme.mixins.toolbar,
        drawerPaper: {
            width: drawerWidth,
        },
        content: {
            flexGrow: 1,
            flexDirection: "column",
            display: "flex",
            background: "#f5f5f5",
            padding: theme.spacing(3),
        },
    }),
);

// Based on https://material-ui.com/components/drawers/
export const Layout: React.FC<WithChildren<RouteComponentProps>> = (props) => {
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const logout = () => {
        authService.logout();
        props.history.push("/login");
    }
    const drawer = (
        <div>
            <div className={classes.toolbar} />
            <Divider />
            <List>
                {navigation.map(({ name, url, icon }) =>
                (
                    <ListItem button key={name} component={Link} to={url}>
                        <ListItemIcon>{React.createElement(icon, { key: name })}</ListItemIcon>
                        <ListItemText primary={name} />
                    </ListItem>
                )
                )}
            </List>
            <Divider />
        </div>
    );



    return (
        <div className={classes.root}>
            <CssBaseline />
            { !!authService.currentUserValue ?
                <>
                    <AppBar position="fixed" className={classes.appBar}>
                        <Toolbar>
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                edge="start"
                                onClick={handleDrawerToggle}
                                className={classes.menuButton}
                            >
                                <Menu />
                            </IconButton>
                            <Typography variant="h6" noWrap style={{ flexGrow: 1 }}>
                                Dual-N-Back
                </Typography>
                            <Button color="inherit" onClick={logout}>Logout</Button>
                        </Toolbar>
                    </AppBar>
                    <nav className={classes.drawer} aria-label="mailbox folders">
                        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                        <Hidden mdUp implementation="css">
                            <Drawer
                                variant="temporary"
                                anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                                open={mobileOpen}
                                onClose={handleDrawerToggle}
                                classes={{
                                    paper: classes.drawerPaper,
                                }}
                                ModalProps={{
                                    keepMounted: true, // Better open performance on mobile.
                                }}
                            >
                                {drawer}
                            </Drawer>
                        </Hidden>
                        <Hidden smDown implementation="css">
                            <Drawer
                                classes={{
                                    paper: classes.drawerPaper,
                                }}
                                variant="permanent"
                                open
                            >
                                {drawer}
                            </Drawer>
                        </Hidden>
                    </nav>
                    <main className={classes.content}>
                        <div className={classes.toolbar} />
                        {props.children}
                    </main>
                </> :
                props.children}

        </div>
    )
};