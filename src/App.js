import React, { Component } from "react";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootswatch/dist/litera/bootstrap.min.css";
import { InputGroup, CardDeck, Card, Row, Col } from "react-bootstrap";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newItem: "",
      name: "",
      list: []
    };
  }

  deleteItem(id) {
    //copy current list of items
    const list = [...this.state.list];

    const updatedList = list.filter(item => item.id !== id);

    this.setState({ list: updatedList });
  }

  updateInput(key, value) {
    this.setState({
      [key]: value
    });
  }

  addItem() {
    //create item with unique id
    const newItem = {
      id: 1 + Math.random(),
      value: this.state.newItem.slice(),
      name: this.state.name.slice()
    };

    const list = [...this.state.list];

    axios
      .post("/submit", this.state)

      .then(
        response => {
          console.log(response);
        },
        error => {
          console.log(error);
        }
      );

    //add item
    console.log(newItem);

    list.unshift(newItem);

    //update state
    this.setState({
      list,
      newItem: "",
      name: ""
    });
  }

  render() {
    return (
      <div className="App">
        <div className="container mt-5">
          Add an item
          <br />
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Type"
              value={this.state.newItem}
              onChange={e => this.updateInput("newItem", e.target.value)}
            />
          </div>
          <textarea
            className="form-control mb-5"
            placeholder="write a comment"
            aria-label="With textarea"
            value={this.state.name}
            onChange={e => this.updateInput("name", e.target.value)}
          ></textarea>
          <button
            className="btn btn-success btn-block "
            onClick={() => {
              this.state.name === ""
                ? alert("Write Something")
                : this.addItem();
            }}
          >
            Add
          </button>
          <br />
        </div>
        <div className="container-fluid">
          <CardDeck>
            <Row>
              {this.state.list.map(item => {
                return (
                  <Col sm="2" className="auto">
                    <Card id="addItem" class="cardbody">
                      <Card.Body>
                        <Card.Title id="title">{item.value}</Card.Title>
                        <Card.Text id="note">{item.name}</Card.Text>
                      </Card.Body>
                      <button
                        className="btn btn-danger sm"
                        onClick={() => this.deleteItem(item.id)}
                      >
                        X
                      </button>
                    </Card>
                  </Col>
                );
              })}
            </Row>
          </CardDeck>
        </div>
      </div>
    );
  }
}

export default App;
