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
          {/*<video className='intro-wrap__video' autoPlay loop >
            <source src='assets/video/intro.webm' type='video/webm' />
          </video>*/}
          {/*<iframe src="https://www.youtube.com/embed/No3VUocaWMo?autoplay=1&controls=0&loop=1&showinfo=0&modestbranding=1&iv_load_policy=3&rel=0" className='intro-wrap__video' frameBorder="0"></iframe>*/}
          <iframe src="https://player.vimeo.com/video/217970872?autoplay=1&amp;loop=1&amp;" className='intro-wrap__video' frameBorder="0"></iframe>
        </div>
      </div>
    )
  }
}

export default HomePage;
