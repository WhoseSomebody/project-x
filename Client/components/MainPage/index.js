import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ModalVideo from 'react-modal-video';
import Parallax from 'parallax-js';

export default class MainPage extends Component {
  constructor() {
    super();
    this.state = {
      isOpen: false
    };
    this.openModal = this.openModal.bind(this);
  }

  openModal() {
    this.setState({ isOpen: true });
  }

  componentDidMount() {
    const scene = document.getElementById('scene');
    const parallaxInstance = new Parallax(scene); // eslint-disable-line
  }
  render() {
    return (
      <div className="row row-1">
        <div className="container mainWrapper">
          <div className="block-1 row">
            <div className="col col-md-4 col-12">
              <h1>Проект Х</h1>
              <h4>Ты. Новый. Лучший.</h4>
              <a href="#" className="button button-main">
                Принять вызов!
              </a>
            </div>
            <div className="col col-md-4 col-12">
              <div className="man-image" />
              <a onClick={this.openModal} className="video-trigger" />
            </div>
            <div className="col col-md-4 col-12">
              <div className="info">
                <h4>Подача заявки на участие:</h4>
                <div className="date">
                  <div className="day">1-31</div>
                  <h2 className="month">сентября</h2>
                </div>
              </div>
              <div className="info">
                <h4>Чемпионат по street workout:</h4>
                <div className="date">
                  <div className="day">7</div>
                  <h2 className="month">октября</h2>
                </div>
              </div>
            </div>
            <div data-relative-input="true" id="scene" className="parallax">
              <div data-depth="0.1" className="Black" />
              <div data-depth="0.3" className="Gray" />
              <div data-depth="0.5" className="White" />
              <div data-depth="0.7" className="Violet" />
            </div>
          </div>
          <div className="block-2 row">
            <div className="col col-md-3 col-12">
              <div className="big-x" />
            </div>
            <div className="col col-md-9 col-12">
              <div className="paragraph-reason">
                Главная цель проекта - <span className="bold">дать возможность</span> сотням талантливых и
                сильных парней и девушек заявить о себе и получить возможность
                <span className="bold">стать частью команды RD!</span>
              </div>
            </div>
          </div>
          <div className="block-3 row" />
          <div className="block-4 row" />

          <ModalVideo
            channel="youtube"
            isOpen={this.state.isOpen}
            videoId="L61p2uyiMSo"
            onClose={() => this.setState({ isOpen: false })}
          />
        </div>
      </div>
    );
  }
}
