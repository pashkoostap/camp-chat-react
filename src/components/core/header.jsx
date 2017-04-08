import React, { Component } from 'react';
import AppNavigation from './navigation';
import Style from './header.scss';

export default class AppHeader extends Component {
  render() {
    return (
      <div className="app-header">
        <AppNavigation />
      </div>
    )
  }
}