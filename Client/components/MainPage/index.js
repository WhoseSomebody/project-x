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
                <img
                  src={require('../../assets/RD logo white@2x.png')}
                  alt=""
                />
                {/* <div className="top">
                  <span className="big">ROAD</span>
                  <span className="middle">
                    <div>TO</div>
                    <div>THE</div>
                  </span>
                  <span className="big">DREAM</span>
                </div>
                <div className="bottom">WORKOUT CHAMPIONSHIP</div> */}
              </div>
              {/* <div className="venok" /> */}
              <a href="#block-4" className="button button-main">
                Принять вызов!
              </a>
            </div>
          </div>
        </div>
        <div className="block-2 row">
          <div className="background" />
          <div className="col col-md-4 col-12 offset-lg-1 col-lg-3">
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
              <h4 className="task-name">Попади на чемпионат</h4>
              <p>
                После того как ты прошел квалификацию и получил приглашение на
                чемпионат, настоящая битва только впереди.
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
              <h4 className="task-name">Битва</h4>
              <p>
                Спустя месяц после чемпионата, ТОП 6 победителей соберутся
                вновь, чтобы сразиться за главный приз. Случайным образом будет
                образовано 3 пары, для битвы 1 на 1, чтобы узнать лучшего в
                каждой паре!
              </p>
            </div>
          </div>
          <div className="task row">
            <div className="d-md-none col col-md-6 offset-lg-1 col-lg-4 col-12 image-wrapper">
              <div className="illustration piedistal" />
            </div>
            <div className="col col-md-6 col-lg-6 col-12">
              <h4 className="task-name">Забери свой приз</h4>
              <p>
                Чемпионат: (квалификация на Битву) <br />
                <span className="accented">1</span> место:{' '}
                <span className="accented">50 000</span> рублей <br />
                <span className="accented">2</span> место:{' '}
                <span className="accented">30 000</span> рублей <br />
                <span className="accented">3</span> место:{' '}
                <span className="accented">20 000</span> рублей <br />
                <span className="accented">4</span> место:{' '}
                <span className="accented">10 000</span> рублей <br />
                <span className="accented">5</span> место:{' '}
                <span className="accented">10 000</span> рублей <br />
                <span className="accented">6</span> место:{' '}
                <span className="accented">10 000</span> рублей <br />
              </p>

              <p>
                Битва: <br />
                <span className="accented">
                  Победитель Пары: 100 000 рублей + контракт атлета Road to the
                  Dream{' '}
                </span>
              </p>
            </div>
            <div className="d-none d-md-flex col col-md-6 offset-lg-1 col-lg-4 col-12 image-wrapper">
              <div className="illustration piedistal" />
            </div>
          </div>
        </div>
        <div className="block-4 row" id="block-4">
          <div className="background" />

          <div className="col col-12 form-wrapper">
            <h3 className="centered">ФОРМА ОТПРАВКИ</h3>
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
