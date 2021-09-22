import React from "react";
//import axios from "axios";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

export class ScoresList extends React.Component {

    state = {
        players: []
    }

    componentDidMount() {
    /*axios.get(
      "https://localhost:3000/api/scores"
    ).then(response => {
        console.log(response.data);
        console.log(response.status);
        console.log(response.statusText);
        console.log(response.headers);
        console.log(response.config);
    }).catch(function(error) {
        console.log(error)
    });*/
    }

    render() {
    return (
      <List>
        { this.state.players.map(player => <ListItem>{player}</ListItem>)}
      </List>
    )
    }
};