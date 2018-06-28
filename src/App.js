import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as blockchain from './blockchain/dist/index';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      useCoinRecord: 0,
      coinRecord: 0,
      mycoin:398292000,
      newBlock:'',
    };
  }

  handleChange = (event) => {
    this.setState({useCoinRecord: event.target.value});
  }

  addData = () => {
    if(this.state.useCoinRecord > 0 && (this.state.useCoinRecord <= this.state.mycoin)){
      this.setState({
        mycoin: parseInt(this.state.mycoin) - parseInt(this.state.useCoinRecord),
        useCoinRecord: "",
        coinRecord: this.state.coinRecord + "/?/hash/?/" + this.state.useCoinRecord,
      },() => {
        if(this.state.coinRecord.length > 50){
          this.getBlockchain();
        }
      });    
    }
  }

  getBlockchain = () => {
    const blockCode = blockchain.createNewBlock(this.state.coinRecord);
    console.log(JSON.stringify(blockCode, undefined, 2));

    this.setState({
      coinRecord: "",
      newBlock: blockCode,
    });
  };

  numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  onlyNumber = (event) => {
    event = event || window.event;
    var keyID = (event.which) ? event.which : event.keyCode;
    if ( (keyID >= 48 && keyID <= 57) || (keyID >= 96 && keyID <= 105) || keyID == 8 || keyID == 46 || keyID == 37 || keyID == 39 ) 
      return;
    else
      return false;
  }

  removeChar = (event) => {
    event = event || window.event;
    var keyID = (event.which) ? event.which : event.keyCode;
    if ( keyID == 8 || keyID == 46 || keyID == 37 || keyID == 39 ) 
      return;
    else
      event.target.value = event.target.value.replace(/[^0-9]/g, "");
  }

  CoinJson = (props) => { 
    return (
      <pre>
        <code>
          MINING SUCCESS :D !!! YOU GOT A COIN!!!! <br/><br/><br/>
          index : {props.json.index} <br/>
          hash : <text className='coinHash'>{props.json.hash}</text> <br/>
          previousHash : {props.json.previousHash} <br/>
          data : {props.json.data} <br/>
          timestamp : {props.json.timestamp} <br/>
        </code>      
      </pre>
    );
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Free Coin by #####</h1>
          <h1>My Coin : $<span>{this.numberWithCommas(this.state.mycoin)}</span></h1>
        </header>
        <p className="App-intro">
          use coin : <input type="number" 
                            value={this.state.useCoinRecord} 
                            onChange={this.handleChange} 
                            onKeyDown={this.onlyNumber.bind(this.event)}
                            onKeyUp={this.removeChar.bind(this.event)}/> 
          <button onClick={this.addData}>confirm</button><br/>
        </p>
        <this.CoinJson json={this.state.newBlock}/>
      </div>
    );
  }
}



export default App;