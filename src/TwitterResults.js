import React, { Component } from "react";
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

class TwitterResults extends Component {
    constructor (props) {
        super(props);
        this.state = {
            show:false,
            tweets:this.props.tweets
        };

        this.handleShow = () => {
            this.setState({ show: true });
        };

        this.handleHide = () => {
            this.setState({ show: false });
        };
    }


    render() {
        return (
            <div>
                <Button variant="primary" onClick={this.handleShow}>
                    Show Analyzed Tweets
                </Button>

                <Modal
                    className = "tweetModal"
                    show={this.state.show}
                    onHide={this.handleHide}
                    dialogClassName="modal-100w"
                    aria-labelledby="example-custom-modal-styling-title"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="example-custom-modal-styling-title">
                            Tweets Analyzed:
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {this.props.tweets}
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}


export default TwitterResults;
