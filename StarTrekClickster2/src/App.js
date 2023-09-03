import React, { Component } from "react";
import Card from "./components/Card";
import Wrapper from "./components/Wrapper";
import Score from "./components/Score";
import starTrekChars from "./cards.json";
import "./App.css";

class App extends Component {
  // Setting this.state.starTrekChars to the cards json array
  state = {
    starTrekChars,
    clickedStarTrekCharIds: [],
    score: 0,
    goal: 10,
    status: ""
  };

  //shuffle the pup cards in the browser when clicked
  shuffleScoreCard = id => {
    let clickedStarTrekCharIds = this.state.clickedStarTrekCharIds;

    if(clickedStarTrekCharIds.includes(id)){
      this.setState({ clickedStarTrekCharIds: [], score: 0, status:  "Game Over! You lost. Click to play again!" });
      return;
    }else{
      clickedStarTrekCharIds.push(id)

      if(clickedStarTrekCharIds.length === 10){
        this.setState({score: 10, status: "You Won! Great Job, Smartie! Click to play again!", clickedStarTrekCharIds: []});
        console.log('You Win');
        return;
      }

      this.setState({ starTrekChars, clickedStarTrekCharIds, score: clickedStarTrekCharIds.length, status: " " });

      for (let i = starTrekChars.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [starTrekChars[i], starTrekChars[j]] = [starTrekChars[j], starTrekChars[i]];
      }
    }
  }

  // Map over this.state.cards and render a Card component for each card object
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">The Star Trek Clickster</h1>
          <p className="App-intro">
            Try not to click on the same Star Trek Character twice!
          </p>
        </header>
        <Score total={this.state.score}
               goal={10}
               status={this.state.status}
               />
        <Wrapper>
          {this.state.starTrekChars.map(Trekkies => (
            <Card
              shuffleScoreCard={this.shuffleScoreCard}
              id={Trekkies.id}
              key={Trekkies.id}
              image={Trekkies.image}
            />
          ))}
        </Wrapper>
        <footer>
          <p>Designed and built by Peter Santiago.</p>
        </footer>
    </div>
    );
  }
}

export default App;
