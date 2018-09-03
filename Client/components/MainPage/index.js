import React, { Component } from 'react';
import Parallax from 'parallax-js';

export default class MainPage extends Component {
  componentDidMount() {
    const scene = document.getElementById('scene');
    const parallaxInstance = new Parallax(scene); // eslint-disable-line
  }
  render() {
    return (
      <div>
        <div className="block-1">
          <div data-relative-input="true" id="scene">
            <div data-depth="0.2">My first Layer!</div>
            <div data-depth="0.6">My second Layer!</div>
          </div>
        </div>
        <div className="block-2">b2</div>
        <div className="block-3">b3</div>
        <div className="block-4">b4</div>
      </div>
    );
  }
}
