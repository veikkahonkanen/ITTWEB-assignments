import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@material-ui/core"
import React from "react"
import { INVALID_SCORE, MOVES_PER_LEVEL, MIN_AVG } from "../BoardEngine";

export interface StartGameDialogProps {
    open: boolean;
    level: number;
    score: number;
    onClose: () => void;
}
export const StartGameDialog = (props: StartGameDialogProps) => {
    const { onClose, level, open, score } = props;

    const handleClose = () => {
        onClose();
    };
    const textScore = `Congratulations, you got to level ${level} and your score is ${score}`;
    return (
        <Dialog
            disableBackdropClick
            disableEscapeKeyDown
            open={open}
            container={() => document.getElementById("main-game-container")}
            BackdropProps={{style: {position: "absolute"}}}
            style={{position: 'absolute'}}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {"Start a new Game"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {score === INVALID_SCORE ? `Start new game. Every session is composed of ${MOVES_PER_LEVEL} rounds
                    and you have to make ${MIN_AVG*100}% of correct guesses to go to the next level` : textScore }
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary" autoFocus>
                    Start New Game
            </Button>
            </DialogActions>
        </Dialog>
    );
}