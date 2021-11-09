import React, { Component } from "react";
import Player from "./Player";
import Food from "./Food";
import Obstacle from "./Obstacle";
import Obstacle2 from "./Obstacle2";
import Obstacle3 from "./Obstacle3";
import Obstacle4 from "./Obstacle4";

const getRandomCoordinates = () => {
  let min = 5;
  let max = 90;
  let x = Math.floor((Math.random() * (max - min + 1) + min) / 5) * 5;
  let y = Math.floor((Math.random() * (max - min + 1) + min) / 5) * 5;
  return [x, y];
};

const initialState = {
  food: [getRandomCoordinates()],
  obstacle: [getRandomCoordinates()],
  obstacle2: [getRandomCoordinates()],
  obstacle3: [getRandomCoordinates()],
  obstacle4: [getRandomCoordinates()],
  speed: 100,
  direction2: "left",
  direction21: "left2",
  direction23: "left3",
  direction24: "left4",
  direction: "",
  snakeDots: [
    [0, 0],
    [5, 0],
  ],
};

class MainGame extends Component {
  state = initialState;

  componentDidMount() {
    setInterval(this.moveObs4, this.state.speed);
    setInterval(this.moveObs3, 180);
    setInterval(this.moveObs2, 120);
    setInterval(this.moveObs, 160);
    setInterval(this.moveSnake, this.state.speed);
    document.onkeydown = this.onKeyDown;
  }
  componentDidUpdate() {
    this.checkIK();
    this.checkIHO1();
    this.checkIHO2();
    this.checkIHO3();
    this.checkIHO4();

    let head = this.state.snakeDots[this.state.snakeDots.length - 1];
    if (head[0] > 15 && head[1] > 15) {
      this.checkIC();
    }
    this.checkIOB();
  }
  //Obstracle functions
  //                 //
  //                 //
  //                 //
  //                 //
  //                 //
  //                 //
  //                 //
  //                 //
  //                 //
  //                 //
  /////////////////////
  moveObs = () => {
    let obsDot = [...this.state.obstacle];
    let obs1 = obsDot[0];
    if (this.state.direction2 == "right" && obs1[0] > 90) {
      this.setState({ direction2: "left" });
    }
    if (this.state.direction2 == "left" && obs1[0] < 5) {
      this.setState({ direction2: "right" });
    }
    if (this.state.direction2 == "right") {
      obs1 = [obs1[0] + 5, obs1[1]];
    }
    if (this.state.direction2 == "left") {
      obs1 = [obs1[0] - 5, obs1[1]];
    }
    obsDot.push(obs1);
    obsDot.shift();
    this.setState({
      obstacle: obsDot,
    });
  };
  moveObs2 = () => {
    let obsDot2 = [...this.state.obstacle2];
    let obs2 = obsDot2[0];
    if (this.state.direction21 == "right2" && obs2[0] > 90) {
      this.setState({ direction21: "left2" });
    }
    if (this.state.direction21 == "left2" && obs2[0] < 5) {
      this.setState({ direction21: "right2" });
    }
    if (this.state.direction21 == "right2") {
      obs2 = [obs2[0] + 5, obs2[1]];
    }
    if (this.state.direction21 == "left2") {
      obs2 = [obs2[0] - 5, obs2[1]];
    }
    obsDot2.push(obs2);
    obsDot2.shift();
    this.setState({
      obstacle2: obsDot2,
    });
  };
  moveObs3 = () => {
    let obsDot3 = [...this.state.obstacle3];
    let obs3 = obsDot3[0];
    if (this.state.direction23 == "right3" && obs3[1] > 90) {
      this.setState({ direction23: "left3" });
    }
    if (this.state.direction23 == "left3" && obs3[1] < 5) {
      this.setState({ direction23: "right3" });
    }
    if (this.state.direction23 == "right3") {
      obs3 = [obs3[0], obs3[1] + 5];
    }
    if (this.state.direction23 == "left3") {
      obs3 = [obs3[0], obs3[1] - 5];
    }
    obsDot3.push(obs3);
    obsDot3.shift();
    this.setState({
      obstacle3: obsDot3,
    });
  };
  moveObs4 = () => {
    let obsDot4 = [...this.state.obstacle4];
    let obs4 = obsDot4[0];
    if (this.state.direction24 == "right4" && obs4[1] > 90) {
      this.setState({ direction24: "left4" });
    }
    if (this.state.direction24 == "left4" && obs4[1] < 5) {
      this.setState({ direction24: "right4" });
    }
    if (this.state.direction24 == "right4") {
      obs4 = [obs4[0], obs4[1] + 5];
    }
    if (this.state.direction24 == "left4") {
      obs4 = [obs4[0], obs4[1] - 5];
    }
    obsDot4.push(obs4);
    obsDot4.shift();
    this.setState({
      obstacle4: obsDot4,
    });
  };

  onKeyDown = (e) => {
    e = e || window.event;
    switch (e.keyCode) {
      case 38:
        this.setState({ direction: "UP" });
        break;
      case 40:
        this.setState({ direction: "DOWN" });
        break;
      case 37:
        this.setState({ direction: "LEFT" });
        break;
      case 39:
        this.setState({ direction: "RIGHT" });
        break;
    }
  };
  moveSnake = () => {
    let dots = [...this.state.snakeDots];
    let head = dots[dots.length - 1];

    switch (this.state.direction) {
      case "RIGHT":
        head = [head[0] + 5, head[1]];
        break;
      case "LEFT":
        head = [head[0] - 5, head[1]];
        break;
      case "DOWN":
        head = [head[0], head[1] + 5];
        break;
      case "UP":
        head = [head[0], head[1] - 5];
        break;
    }
    dots.push(head);
    dots.shift();
    this.setState({
      snakeDots: dots,
    });
  };
  checkIOB() {
    let dots = [...this.state.snakeDots];
    let head = dots[dots.length - 1];
    if (head[0] >= 100 || head[0] < 0 || head[1] < 0 || head[1] >= 100) {
      this.gameOver();
    }
  }
  checkIC() {
    let snakes = [...this.state.snakeDots];
    let head = this.state.snakeDots[this.state.snakeDots.length - 1];
    snakes.pop(head);
    snakes.forEach((dot) => {
      if (head[0] == dot[0] && head[1] == dot[1]) {
        this.gameOver();
      }
    });
  }

  checkIHO1() {
    let head = this.state.snakeDots[this.state.snakeDots.length - 1];
    let obs = this.state.obstacle[0];
    if (head[0] == obs[0] && head[1] == obs[1]) {
      this.setState({
        obstacle: [getRandomCoordinates()],
      });
      this.gameOver();
    }
  }
  checkIHO2() {
    let head = this.state.snakeDots[this.state.snakeDots.length - 1];
    let obs = this.state.obstacle2[0];
    if (head[0] == obs[0] && head[1] == obs[1]) {
      this.setState({
        obstacle2: [getRandomCoordinates()],
      });
      this.gameOver();
    }
  }
  checkIHO3() {
    let head = this.state.snakeDots[this.state.snakeDots.length - 1];
    let obs = this.state.obstacle3[0];
    if (head[0] == obs[0] && head[1] == obs[1]) {
      this.setState({
        obstacle3: [getRandomCoordinates()],
      });
      this.gameOver();
    }
  }
  checkIHO4() {
    let head = this.state.snakeDots[this.state.snakeDots.length - 1];
    let obs = this.state.obstacle4[0];
    if (head[0] == obs[0] && head[1] == obs[1]) {
      this.setState({
        obstacle4: [getRandomCoordinates()],
      });
      this.gameOver();
    }
  }
  checkIK() {
    let head = this.state.snakeDots[this.state.snakeDots.length - 1];
    let food = this.state.food[0];
    if (head[0] === food[0] && head[1] === food[1]) {
      this.setState({
        food: [getRandomCoordinates()],
        obstacle: [getRandomCoordinates()],
        obstacle2: [getRandomCoordinates()],
        obstacle3: [getRandomCoordinates()],
        obstacle4: [getRandomCoordinates()],
      });
      this.Enl();
      this.increaseSpeed();
    }
  }

  Enl() {
    let newSnake = [...this.state.snakeDots];
    newSnake.unshift([]);
    this.setState({
      snakeDots: newSnake,
    });
  }

  increaseSpeed() {
    if (this.state.speed > 10) {
      this.setState({
        speed: this.state.speed - 10,
      });
    }
  }

  gameOver() {
    this.setState({
      food: [getRandomCoordinates()],
      obstacle: getRandomCoordinates(),
      obstacle2: getRandomCoordinates(),
      obstacle3: getRandomCoordinates(),
      obstacle4: getRandomCoordinates(),
    });
    let ans = prompt(
      "Do you want to save your score? Say 'Y' for yes N for 'no' and Anything else to reset "
    );
    if (ans == "Y") {
      let name = prompt("Enter your name");
      alert(`Game Over, ${name} Score: ${this.state.snakeDots.length - 2}`);
      this.setState(initialState);
    } else if (ans == "N") {
      alert(`Game Over, Your Score: ${this.state.snakeDots.length - 2}`);
      this.setState(initialState);
    } 

      this.setState(initialState);
    }
  
  render() {
    return (
      <>
        <div className="gameArea" id="MG">
          <p id="p">Press Any arrow-key to start</p>
          <h1 id="p2">{this.state.snakeDots.length - 2}</h1>

          <Player snakeDot={this.state.snakeDots} />
          <Food foodDot={this.state.food} />
          <Obstacle obsDot={this.state.obstacle} />
          <Obstacle2 obsDot2={this.state.obstacle2} />
          <Obstacle3 obsDot3={this.state.obstacle3} />
          <Obstacle4 obsDot4={this.state.obstacle4} />
        </div>
        <br />
 
        <div id="all-btn"  >
        <button id="btn1" className=" btn btn-lg btn-primary" onClick={()=>{
          this.setState({direction: "UP"})
        }}>↑</button>
        <br />
        <br />
        <button id="btn2" className="btn btn-lg btn-primary" onClick={()=>{
          this.setState({direction: "LEFT"})
        }}>←</button>
        <br />
        <br />
        <button id="btn3" className="btn btn-lg btn-primary" onClick={()=>{
          this.setState({direction: "RIGHT"})
        }}>→</button>
        <br />
        <br />
        <button id="btn4" className="btn btn-lg btn-primary" onClick={()=>{
          this.setState({direction: "DOWN"})
        }}>↓</button>
        </div>
        
        
      </>
    );
  }
}


export default MainGame;
