import React, { Component } from 'react';
import AppNavigation from './navigation';
import Style from './header.scss';

export default class AppHeader extends Component {
  render() {
    return (
      <div className="app-header">
        <AppNavigation logout={this.props.logout} changeIsLoggedState={this.props.changeIsLoggedState}/>
      </div>
    )
  }
}