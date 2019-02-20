import React from "react";


class Clock extends React.Component {

    render () {
        return (
            <React.Fragment>
                <div className="clockbox">
                    <div id="whiteclock"></div>
                    <div id="blackclock"></div>
                
                </div>
            </React.Fragment>
        )
    }
}

export default Clock;
