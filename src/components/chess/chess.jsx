import React from "react";
import "../../css/chess/main.css";
import Chessjs from "../../js/chess/chess.js";
import Board from "./board";
import Win from "./win";
import DrawOffer from "./drawoffer";




class Chess extends React.Component {

    constructor () {
        super();
        this.chessJs = new Chessjs();
        this.state = {
            winner:null,
        }
    }

    componentWillMount() {
    }

    handleWin = e => {
        this.setState({winner : e.winner})
    }

    componentDidMount () {
        this.chessJs.eventBuilder(this.chessJs , true);
        window.addEventListener("win", this.handleWin);        
    }


    componentWillUnmount () {
        window.removeEventListener("win", this.handleWin);
    }

    updateBoard (boardstate) {
        let whiteFig = document.querySelectorAll(".white");
        let blackFig = document.querySelectorAll(".black");

        whiteFig.forEach( e => {
            e.parentNode.removeChild(e)
        });
        blackFig.forEach( e => {
            e.parentNode.removeChild(e)
        });

        Object.keys(boardstate).forEach( id => {
            let fig = document.createElement("div");
            fig.className = boardstate[id];
            document.getElementById(id).appendChild(fig);
            if(fig.className.indexOf(this.chessJs.turn) > -1){
                fig.setAttribute("draggable","true");
            }
        });
    }

    render () {
        return (
            <React.Fragment>   
                    <Board />
                    {this.state.winner && <Win winner={this.state.winner} />}
                    <DrawOffer winEvent={this.chessJs.winEvent}/>
            </React.Fragment>
        )
    }
}

export default Chess;
