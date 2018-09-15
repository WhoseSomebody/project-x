/* eslint-disable  react/no-unescaped-entities */
import React, { Component } from 'react';
import ModalVideo from 'react-modal-video';
// import { Link } from 'react-router-dom';
// import Parallax from 'parallax-js';
import FeedbackForm from '../FeedbackForm';

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
    // const scene = document.getElementById('scene');
    // const parallaxInstance = new Parallax(scene); // eslint-disable-line

    document.getElementById('wrapper').className =
      document.getElementById('wrapper').className + ' main-page';

    document.getElementById('body').className = 'black-background';
  }
  componentWillUnmount() {
    document.getElementById('body').className = '';
  }
  render() {
    return (
      <div className="container mainWrapper">
        <div className="block-1 row">
          <div className="background" />
          <div className="col col-md-6 col-12">
            <div className="content-wrapper">
              <div className="main-logo">
                <div className="top">
                  <span className="big">ROAD</span>
                  <span className="middle">
                    <div>TO</div>
                    <div>THE</div>
                  </span>
                  <span className="big">DREAM</span>
                </div>
                <div className="bottom">WORKOUT CHAMPIONSHIP</div>
              </div>
              <div className="venok" />
              <a href="#block-4" className="button button-main">
                Принять вызов!
              </a>
            </div>
          </div>
        </div>
        {/* <div className="block-1 row">
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
        </div> */}
        <div className="block-2 row">
          <div className="background" />
          <div className="col col-md-4 col-12">
            <div className="big-x" />
          </div>
          <div className="reason col col-md-8 col-12">
            <div className="paragraph">
              Road to the Dream Workout Championship - это главный турнир по
              воркауту в СНГ, цель которого дать возможность каждому выйти на
              поле битвы и доказать что он номер один в своем деле!
            </div>
            <div className="paragraph border-transparent">
              Сразись с лучшими за звание чемпиона, большой призовой фонд и
              возможность стать атлетом Road to the Dream вдохновляя окружающих
              своим примером!
            </div>
          </div>
        </div>
        <div className="block-3 row">
          <div className="background" />
          <div className="task row">
            <div className="col col-md-6 col-lg-4 offset-lg-1 col-12 image-wrapper">
              <div className="illustration youtube" />
            </div>
            <div className="col col-md-6 offset-lg-1 col-lg-6 col-12">
              <h4 className="task-name">Запиши видео</h4>
              <p>
                Квалификация. Твое первое препятствие на пути к победе это
                квалификация.
              </p>
              <p>
                Тренируйся, становись сильнее, быстрее, выносливее для того
                чтобы пройти квалификацию и получить свой пропуск на арену.
              </p>
            </div>
          </div>
          <div className="task row">
            <div className="d-md-none col col-md-6 offset-lg-1 col-lg-4 col-12 image-wrapper">
              <div className="illustration mail" />
            </div>
            <div className="col col-md-6 col-lg-6 col-12">
              <h4 className="task-name">Получи приглашение на батл</h4>
              <p>
                Чемпионат. После того как ты прошел квалификацию и получил
                приглашение на чемпионат, настоящая битва только впереди.
              </p>
              <p>
                Чемпионат - это место где соберутся лучшие атлеты всего мира,
                чтобы показать все на что они способны с целью прорваться в ТОП
                6 среди всех участников прошедших квалификацию.
              </p>
              <p>
                Задание, которое будет на чемпионате, будет объявлено за месяц
                до окончания квалификации, для того чтобы каждый смог
                подготовиться к грядущему сражению!
              </p>
            </div>
            <div className="d-none d-md-flex col col-md-6 offset-lg-1 col-lg-4 col-12 image-wrapper">
              <div className="illustration mail" />
            </div>
          </div>
          <div className="task row">
            <div className="col col-md-6 col-lg-4 offset-lg-1 col-12 image-wrapper">
              <div className="illustration trophy" />
            </div>
            <div className="col col-md-6 offset-lg-1  col-lg-6 col-12">
              <h4 className="task-name">Попади на чемпионат</h4>
              <p>
                Битва. Спустя месяц после чемпионата, ТОП 6 победителей
                соберутся вновь, чтобы сразиться за главный приз. Случайным
                образом будет образовано 3 пары, для битвы 1 на 1, чтобы узнать
                лучшего в каждой паре!
              </p>
              <p>
                Призы: <br />
                Чемпионат: <br />1 место: 50 000 рублей (квалификация на Битву){' '}
                <br />2 место: 30 000 рублей (квалификация на Битву) <br />3
                место: 20 000 рублей (квалификация на Битву) <br />4 место: 10
                000 рублей (квалификация на Битву) <br />5 место: 10 000 рублей
                (квалификация на Битву) <br />6 место: 10 000 рублей
                (квалификация на Битву) <br />
              </p>
              <p>
                Битва: <br />
                Победитель Пары: 100 000 рублей + контракт атлета Road to the
                Dream
              </p>
            </div>
          </div>
        </div>
        <div className="block-4 row" id="block-4">
          <div className="background" />

          <div className="col col-12 form-wrapper">
            <FeedbackForm />
          </div>
        </div>

        <ModalVideo
          channel="youtube"
          isOpen={this.state.isOpen}
          videoId="L61p2uyiMSo"
          onClose={() => this.setState({ isOpen: false })}
        />
      </div>
    );
  }
}
