import React, { Component } from 'react';

class HomePage extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className='ct-home'>
        <div className='intro-wrap'>
          <div className='intro-wrap__photo'></div>
          <img src="assets/img/intro-video.gif" className='intro-wrap__video' alt="" />
        </div>
      </div>
    )
  }
}

export default HomePage;
