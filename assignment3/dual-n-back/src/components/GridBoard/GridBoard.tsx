import { fade, Grid, GridSize, Paper } from "@material-ui/core";
import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core";

const GRID_SIZE = 3;

const size = 200;
const containerWidth = size * 3;
const gap = 16

const sizeLg = 125;
const containerWidthLg= sizeLg * 3;
const gapLg = 10;

const sizeMd = 150;
const containerWidthMd = sizeMd * 3;
const gapMd = 12;

const sizeSm = 100;
const containerWidthSm = sizeSm * 3;
const gapSm = 8;

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      maxWidth: containerWidthSm,
      maxHeight: containerWidthSm,
      gap: gapSm,
     
      [theme.breakpoints.up('sm')]: {
        maxWidth: containerWidthMd,
        maxHeight: containerWidthMd,
        gap: gap,
      },
      [theme.breakpoints.up('md')]: {
        maxWidth: containerWidthLg,
        maxHeight: containerWidthLg,
        gap: gapLg,
      },
      [theme.breakpoints.up('lg')]: {
        maxWidth: containerWidth,
        maxHeight: containerWidth,
        gap: gap,
      },
      display: "flex",
      
      flexDirection: "column",
    },
    fxHorizontal: {
      display: "flex",
      flexDirection: "row",
      flex: 1,
      gap: gapSm,
      [theme.breakpoints.up('sm')]: {
        gap: gapMd
      },
      [theme.breakpoints.up('md')]: {
        gap: gapLg
      },
      [theme.breakpoints.up('lg')]: {
        gap: gap
      },
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      width: sizeSm,
      height: sizeSm - gapSm,
    
      [theme.breakpoints.up('sm')]: {
        width: sizeMd,
        height: sizeMd - gapMd
      },
      [theme.breakpoints.up('md')]: {
        width: sizeLg,
        height: sizeLg - gapLg
      },
      [theme.breakpoints.up('lg')]: {
        width: size,
        height: size - gap
      },
      color: theme.palette.text.secondary,
      WebkitTransition: "background-color 0.3s; /* For Safari 3.1 to 6.0 */",
      transition: "background-color 0.3s",
    },
    selectedPaper: {
      background: theme.palette.primary.main,
    },
    disabledPaper: {
      background: fade(theme.palette.primary.main, 0.2),
    }
  
  })
);


interface Props {
  selectedTile: number;
}
const GRID_CENTER= Math.floor((GRID_SIZE - 1) / 2);
export const GridBoard: React.FC<Props> = ({ selectedTile }) => {
  const classes = useStyles();
  const isSelected = (i: number, j: number): boolean => {
    const center = (GRID_SIZE * GRID_SIZE -1)/2;
    if (selectedTile < center) {
      //Before the center (which is missing)
      return i*GRID_SIZE + j === selectedTile;
    }
    else if(i*GRID_SIZE +j === center){
      return false;
    }
    else {
      return i*GRID_SIZE + j -1 === selectedTile;
    }
  }
  return (
    <div className={classes.root}>
      {[...Array(GRID_SIZE)].map((x, i) => (
        <div className={classes.fxHorizontal} key={i}>
          {[...Array(GRID_SIZE)].map((y, j) => (
            <Paper key={j} className={[
              classes.paper,
              ...i === GRID_CENTER && j === GRID_CENTER ? [classes.disabledPaper] : [],
              ...isSelected(i, j) ? [classes.selectedPaper] : []].join(" ")}></Paper>
          )
          )}
        </div>
      ))}
    </div>
  )
};