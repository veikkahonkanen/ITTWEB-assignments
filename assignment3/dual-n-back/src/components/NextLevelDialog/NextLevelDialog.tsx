import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@material-ui/core"
import React from "react"

export interface NextLevelDialogProps {
    open: boolean;
    level: number;
    onClose: () => void;
}
export const NextLevelDialog = (props: NextLevelDialogProps) => {
    const { onClose, level, open } = props;

    const handleClose = () => {
        onClose();
    };
    return (
        <Dialog
            disableBackdropClick
            disableEscapeKeyDown
            container={() => document.getElementById("main-game-container")}
            BackdropProps={{style: {position: "absolute"}}}
            style={{position: 'absolute'}}
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {"Level UP!!!"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Congratulations! You've reached LEVEL {level}. When you're ready, press start!
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary" autoFocus>
                    Start
            </Button>
            </DialogActions>
        </Dialog>
    );
}