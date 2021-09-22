import { Button, createStyles, makeStyles, Theme, Typography } from "@material-ui/core";
import { Hearing, Visibility } from "@material-ui/icons";
import React, { useEffect, useReducer, useRef, useState } from "react";
import { FlashModel, gameReducer, INIT_GAME_STATE, INVALID_SCORE, LETTERS_N_BACK } from "../../components/BoardEngine";
import { GridBoard } from "../../components/GridBoard/GridBoard";
import { HighScores, Score } from "../../components/HighScores/HighScores";
import { NextLevelDialog } from "../../components/NextLevelDialog/NextLevelDialog";
import { StartGameDialog } from "../../components/StartGameDialog/StartGameDialog";
import { TextSound } from "../../components/TextSound";
import { useJSONWebSocket } from "../../hooks/useWebSocket";
import { scoreService } from "../../services/ScoreService";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            position: "relative",
            flex: 1,
            flexDirection: "column",
            [theme.breakpoints.up('md')]: {
                flexDirection: "row"
            },
            display: "flex",
            justifyContent: "center"
        },
        scores: {
            display: "flex",
            justifyContent: "center",
            [theme.breakpoints.down('md')]: {
                marginTop: theme.spacing(3)
            },
        },
        title: {
            marginBottom: theme.spacing(2)
        },
        button: {
            margin: theme.spacing(1)
        },
        buttonContainer: {
            flexDirection: "row",
            marginTop: theme.spacing(3)
        },
        gameContainer: { flexGrow: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }
    }),
);


export const PlayPage = () => {
    const classes = useStyles();
    const [state, dispatch] = useReducer(gameReducer, INIT_GAME_STATE);

    const lastItem: FlashModel | null = state.history.length > 0 ? state.history[state.history.length - 1] : null;
    const lastItemPos: number = lastItem?.position ?? -1;
    const lasttext: TextSound = !!lastItem?.sound || lastItem?.sound === 0 ?
        LETTERS_N_BACK.charAt(lastItem.sound).toString() as TextSound : null;
    const [lastScores, sendScore] = useJSONWebSocket<Score[]>(process.env.REACT_APP_HIGH_WEBSOCKET || "ws://localhost:3000");

    const scores: Score[] = [
        { username: "David", score: 10, uid: "1" },
        { username: "Lies", score: 50, uid: "2" },
        { username: "Ondrej", score: 20, uid: "3" },
        { username: "Veikka", score: 40, uid: "5" }

    ];
    // useEffect(() => dispatch({ type: "startGame" }), [])
    useEffect(() => {
        if (state.running) {
            const interval = setInterval(() => dispatch({ type: "nextTurn" }), 3000);

            return () => clearInterval(interval);
        }

    }, [state.running]);

    return (
        <div className={classes.root} id="main-game-container">
            <TextSound text={lasttext} id={state.round} />
            <div className={classes.gameContainer}>
                <Typography variant="h2" className={classes.title}>
                    Score: {state.score === INVALID_SCORE ? 0 : state.score}
                </Typography>
                <Typography variant="subtitle1">
                    Level: {state.level}, Dual {state.level + 1}-N-Back
                </Typography>

                <GridBoard selectedTile={lastItemPos} />
                <div className={classes.buttonContainer}>
                    <Button
                        variant="contained"
                        color="secondary"
                        className={classes.button}
                        startIcon={<Visibility />}
                        onClick={() => dispatch({ type: "samePosition" })}
                    >
                        Visual
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        className={classes.button}
                        startIcon={<Hearing />}
                        onClick={() => dispatch({ type: "sameSound" })}
                    >
                        Audio
                    </Button>
                </div>
            </div>
            <div className={classes.scores}>
                <HighScores scores={lastScores || []} ></HighScores>
            </div>
            <NextLevelDialog open={state.waitForNextLevel} onClose={() => dispatch({ type: "startNextLevel" })} level={state.level + 1} />
            <StartGameDialog open={!state.running && !state.waitForNextLevel} onClose={() => dispatch({ type: "startGame" })} level={state.level} score={state.score} />
        </div>

    )
};
