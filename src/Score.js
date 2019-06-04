import React, { Component } from "react";

class Score extends Component {
    render() {
        return (
            <div className="score">
                <p style = {{color:this.props.color}}>Your Score: &nbsp;{this.props.score}</p>
            </div>
        );
    }
}

export default Score;
