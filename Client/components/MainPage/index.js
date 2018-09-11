/* eslint-disable  react/no-unescaped-entities */
import React, { Component } from 'react';
import ModalVideo from 'react-modal-video';
import Parallax from 'parallax-js';
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
    const scene = document.getElementById('scene');
    const parallaxInstance = new Parallax(scene); // eslint-disable-line

    document.getElementById('wrapper').className =
      document.getElementById('wrapper').className + ' main-page';
  }
  render() {
    return (
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
          <div className="col col-md-4 col-12">
            <div className="big-x" />
          </div>
          <div className="reason col col-md-8 col-12">
            <div className="paragraph">
              Главная цель проекта -{' '}
              <span className="bold">дать возможность</span> сотням талантливых
              и сильных парней и девушек заявить о себе и получить возможность
              <span className="bold"> стать частью команды RD!</span>
            </div>
          </div>
        </div>
        <div className="block-3 row">
          <div className="background" />
          <div className="task row">
            <div className="col col-md-6 col-lg-5 col-12 image-wrapper">
              <div className="illustration youtube" />
            </div>
            <div className="col col-md-6 offset-lg-2 col-lg-5 col-12">
              <h4 className="task-name">Запиши видео</h4>
              <p>
                Посмотри <a href="#"> правила</a>,{' '}
                <a href="#"> технику выполнения</a> и запиши видео своих
                результатов, и отправь нам используя форму с низу.
              </p>
              <p>
                Вы должны выполнить:
                <br />- 8 выходов силой на две руки <br />- 8 подтягиваний с
                весом отягощения 24 кг
                <br />- 16 отжиманий на брусьях с весом отягощения 32 кг
              </p>
            </div>
          </div>
          <div className="task row">
            <div className="col col-md-6 col-lg-5 col-12">
              <h4 className="task-name">Получи приглашение на батл</h4>
              <p>
                Члены Жюри будут следить за тем, насколько "чисто" выполнены
                упражнения участниками и отберут лучших 100 спортсменов для
                участия в Чемпионате!
              </p>
            </div>
            <div className="col col-md-6 offset-lg-2 col-lg-5 col-12 image-wrapper">
              <div className="illustration mail" />
            </div>
          </div>
          <div className="task row">
            <div className="col col-md-6 col-lg-5 col-12 image-wrapper">
              <div className="illustration trophy" />
            </div>
            <div className="col col-md-6 offset-lg-2 col-lg-5 col-12">
              <h4 className="task-name">Попади на чемпионат</h4>
              <p>
                В конце августа в Москве состоится первый Чемпионат Road to the
                Dream, куда будут приглашены сильнейшие участники, прошедшие
                отбор на сайте!
                <br />В рамках Чемпионата будет:
                <br />- Шоу-программа
                <br />- Конкурсы
                <br />- Соревнования по экстремальным видам спорта
              </p>
            </div>
          </div>
        </div>
        <div className="block-4 row">
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
