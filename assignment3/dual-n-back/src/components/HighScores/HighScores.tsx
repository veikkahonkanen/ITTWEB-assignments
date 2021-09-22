import { Avatar, createStyles, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, makeStyles, Paper, Typography } from "@material-ui/core";
import { EmojiEvents } from "@material-ui/icons";
import React from "react";
import FlipMove from "react-flip-move";

const useStyles = makeStyles(theme =>
    createStyles({
        paper: {
            padding: theme.spacing(3),
            width: 250
        },

        gold: {
            background: "#ffc107"
        },
        platinum: {
            background: "#c1d5e0"
        },
        bronze: {
            background: "#a30000"
        }
    }));

    export interface Score { username: string; score: number, uid: string };
export const HighScores: React.FC<{ scores: Score[] }> = ({ scores }) => {
    const classes= useStyles();

    return (
        <Paper className={classes.paper}>
            <Typography variant="h5">
                High Scores
            </Typography>
            <List>
                <FlipMove>
                {scores.map(({ uid, username, score }, i) => (
                    <ListItem key={uid}>
                        {
                            i < 3 ? (
                                <ListItemAvatar>
                                    <Avatar className={[...i === 0 ? [classes.gold] : [],...i === 1 ? [classes.platinum] : [],...i === 2 ? [classes.bronze] : []].join(" ")}>
                                        <EmojiEvents/>
                                    </Avatar>
                                </ListItemAvatar>
                            ) : (
                                <ListItemAvatar>
                                    <Avatar>
                                    </Avatar>
                                </ListItemAvatar>
                            )
                        }
                        <ListItemText>{username}</ListItemText>
                        <ListItemSecondaryAction>
                            {score}
                        </ListItemSecondaryAction>

                    </ListItem>
                ))}
</FlipMove>
            </List>
        </Paper>

    );
}