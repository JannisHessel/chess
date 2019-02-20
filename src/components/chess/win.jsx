import React from "react";
import { colorful } from "../../js/utility";





class Win extends React.Component {

    componentDidMount () {
        if(this.props.winner && this.props.winner !== "draw"){
            let colorLoop = colorful(document.getElementById("win"));
            document.getElementById("win").addEventListener("click" , function stop(e) {
                clearInterval(colorLoop);
                e.currentTarget.removeEventListener("click" , stop);
            })
        }
    }

    render () {
        if(this.props.winner && this.props.winner !== "draw"){
            let string = this.props.winner.toUpperCase() + " DID WIN THE GAME!";
            let i = 0;
            return (
                <div id="win">
                    { 
                        string.split("").map( single => {
                            return ( <span key={"win" + i++}>{single}</span>)
                        })
                    }
                </div>
            )
        }
        if (this.props.winner === "draw"){
            return <div id="win">THE GAME IS A DRAW!</div>
        }
        return ("");

    }
}

export default Win;