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
      mycoin:100000000,
      newBlock:'',
    };

    this.handleChange = this.handleChange.bind(this);
    this.getBlockchain = this.getBlockchain.bind(this);
    this.addData = this.addData.bind(this);
    this.numberWithCommas = this.numberWithCommas.bind(this);
    this.onlyNumber = this.onlyNumber.bind(this.event);
    this.removeChar = this.removeChar.bind(this.event);
  }

  handleChange(event) {
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
    console.log(blockCode);

    this.setState({
      coinRecord: "",
      newBlock: JSON.stringify(blockCode),
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

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Free Coin by minho</h1>
          <h1>My Coin : $<span>{this.numberWithCommas(this.state.mycoin)}</span></h1>
        </header>
        <p className="App-intro">
          사용할 코인 갯수 : <input type="number" 
                            value={this.state.useCoinRecord} 
                            onChange={this.handleChange} 
                            onKeyDown={this.onlyNumber.bind(this.event)}
                            onKeyUp={this.removeChar.bind(this.event)}/> 
          <button onClick={this.addData.bind(this)}>코인 사용</button><br/>
          {/*<button onClick={this.getBlockchain.bind(this)}>프리코인 발행</button>*/}
        </p>

        <div>{this.state.newBlock}</div>
      </div>
    );
  }
}

export default App;
