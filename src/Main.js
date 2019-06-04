import React, { Component } from "react";
import axios from 'axios'
import Score from './Score'
import Button from 'react-bootstrap/Button'
import Alert from  'react-bootstrap/Alert'
import TwitterResults from "./TwitterResults";

class Main extends Component {
    constructor (props) {
        super(props);
        this.state = {
            score:"",
            twitterData:"",
            fontColor:"",
            tweets:[],
            resultsHidden: true,
            isLoading: false,
            alert:""
        };

        this.handleClick = this.handleClick.bind(this);
        this.handleScoreChange = this.handleScoreChange.bind(this);
    }

    static getColor(parScore){

        const colors = {
            "0":"#ff0000",
            "2":"#c55900",
            "4":"#fffc00",
            "6":"#009b2b",
            "8":"#1a9f9b"
        };

        let returnValue;
        if (parScore < 2){
            returnValue = colors["0"];
        }
        else if (parScore <= 4){
            returnValue = colors["2"];
        }
        else if (parScore <= 6) {
            returnValue = colors["4"];
        }
        else if (parScore <= 8) {
            returnValue = colors["6"];
        }
        else if (parScore > 8) {
            returnValue = colors["8"];
        }

        return returnValue

    }
    formatTweets(tweets){
        let twitterFeed = [];
        tweets.forEach(tweet => {
            twitterFeed.push(<div className="tweet">{tweet}</div>)
        });
        return twitterFeed

    }

    handleScoreChange(event){
        let newScore = event.target.value;
        this.setState({twitterData: newScore});
        //this.setState({fontColor:this.getColor(newScore)})
}

    handleClick(){
        let url = "";
        let urlParameter = this.state.twitterData;
        if (isNaN(urlParameter))
            url = "http://ec2-34-247-107-79.eu-west-1.compute.amazonaws.com/getTimeline/" + urlParameter;
        else
            url = "http://ec2-34-247-107-79.eu-west-1.compute.amazonaws.com/getReplies/" + urlParameter;
        axios.get(url)

            .then(response => {
                if ("errorMsg"in response.data)
                    this.setState({
                        alert:response.data['errorMsg']
                    });
                else
                    this.setState({
                        score: response.data['score'],
                        fontColor: Main.getColor(response.data['score']),
                        tweets: response.data['tweets'],
                        resultsHidden:false,
                        alert: ""
                    })
                }
                )
            .catch(error => {
                this.setState({
                    alert: error.message
                })
            })
        }


        render() {
        return (
            <div className="spacerMargin">
                <div className="main">
                    <div className="base">
                        <h3>Enter Twitter Handle or Tweet ID to Analyse Tweets</h3>
                        <p> Tweets will be fetched from the relevant places on Twitter and the language sentiment will be analyzed and scored!</p>
                        <input onChange={this.handleScoreChange} type="text"/> &nbsp;
                        <Button variant = "primary" onClick={this.handleClick}>Analyze</Button>
                    </div>
                    <div className="alert">{this.state.alert}</div>
                    {!this.state.resultsHidden && (
                        <div className="content">
                            <Score variant="primary" score={this.state.score} color={this.state.fontColor}/>
                            <TwitterResults tweets={this.formatTweets(this.state.tweets)} />
                        </div>
                    )}



                </div>
            </div>
        );
    }
}

export default Main;
