import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Header from './core/header';
import Auth from './auth/auth';
import Chats from './chats/chats';
import Home from './home';


export default class RootComponent extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      text: 'temp'
    }
  }
  render() {
    return (
      <div className="app-wrap">
        <Header />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/auth' component={() => { return (<Auth text={this.state.text} />) }} />
          <Route path='/chat' component={() => { return (<Chats text={this.state.text} />) }} />
        </Switch>
      </div>
    )
  }
}