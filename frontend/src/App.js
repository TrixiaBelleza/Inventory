import React, { Component } from 'react'
import autobind from 'react-autobind';
import axios from 'axios';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import ViewItems from './components/ViewItems';

class App extends Component {
  render() {
    return(
      <div id='main'>
      
        <Router>
          <Route exact={true} path="/" component={ViewItems} />
        </Router>
      </div>
    );
  }
}
export default App;
