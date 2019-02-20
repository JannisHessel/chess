import React from "react";





class DrawOffer extends React.Component {


    constructor(props) {
        super(props);
        this.offer = React.createRef();
        this.state = {
            offer:false,
            offerCD:{
                current:20,
                white:5,
                black:5
            },
            claim:false,
            enemy:"black",
        }
    }

    turn = (e) => {

        let state = this.state;

        if (state.offerCD[e.color] > 0) {

            state.offerCD.current = --state.offerCD[e.color];

        }

        if (this.offer.current) {

            state.offer = this.offer.current.checked;

        };
        if (e.color === "white") {
            state.enemy = "black";
        } else {
            state.enemy = "white"
        }

        state.claim = e.claim;
        this.setState({state});
    }



    eventBuilder = (build) => {//build = true to build ;=false to remove

        let self = this;
        if(build){

            window.addEventListener("turn" , self.turn)
        } else {
            console.log(self)
            window.removeEventListener("turn" , self.turn);
        }
    }

    winning = draw => {
        let winEvent = this.props.winEvent
        if (draw) {
            winEvent.winner = "draw";
        } else {
            winEvent.winner = this.state.enemy;
        }
        window.dispatchEvent(winEvent);
    }

    
    componentDidMount () {

        this.eventBuilder (true);
    }

    componentWillUnmount () {
        
        this.eventBuilder (false);
    }

    render () {
        return (
            <div id="draw-offer">
                <button type="button" id="concede" onClick={() =>{this.winning(false)}}>concede</button>
                { 
                    !this.state.offer && this.state.offerCD.current === 0 && 

                    <span>
                        <input type="checkbox" id="offer" ref={this.offer} />
                        <label htmlFor="offer">offer draw</label>
                    </span>
                }
                {
                    this.state.offer &&

                    <button type="button" id="asdf" onClick={() =>{this.winning(true)}} >Take draw offer</button>
                }
                { 
                    this.state.claim &&

                    <button type="button" id="claim" onClick={() =>{this.winning(true)}} >
                        claim draw for {this.state.claim}
                    </button>
                }
            </div>
        )


    }

}

export default DrawOffer;