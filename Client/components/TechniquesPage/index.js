import React, { Component } from 'react';
import FeedbackForm from '../FeedbackForm';
import ResponsiveEmbed from 'react-responsive-embed';

export default class TechniquesPage extends Component {
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
    document.getElementById('header').className =
      document.getElementById('header').className + ' inversed';
    document.getElementById('wrapper').className =
      document.getElementById('wrapper').className +
      ' inversed techniques-page';
  }
  render() {
    return (
      <div className="container">
        {/* <div className="block-1 row">
          <h1 className="centered main-title">Техника выполнения</h1>
        </div> */}
        <div className="block-2">
          <div className="background" />
          <div className="col offset-md-1 col-md-10 col-12 video-wrapper">
            <ResponsiveEmbed
              ratio="16:9"
              src="https://www.youtube.com/embed/iTeTyK6UrD0"
            />
          </div>
          <div className="task row">
            <div className="col col-md-5 col-12 title-wrapper">
              <h1 className="bordered-title centered">Выходы на две</h1>
            </div>
            <div className="col offset-md-1 col-md-6 col-12">
              <p className="explanation">
                1. Ноги в коленях прямые на протяжении всего упражнения, <br />
                2. Локти полностью выпрямляются в нижней точке;
                <br />
                3. Локти полностью выпрямляются в верхней точке;
                <br />
                4. Обе руки синхронно выполняют выход на две;
                <br />
                5. Раскачка минимальная либо отсутствует.
                <br />
              </p>
            </div>
          </div>
          <div className="task row">
            <div className="col col-md-5 col-12 title-wrapper">
              <h1 className="bordered-title centered">Брусья</h1>
            </div>
            <div className="col offset-md-1 col-md-6 col-12">
              <p className="explanation">
                1. Тело прямое на протяжении всего упражнения; <br />
                2. В нижней точке руки в локте согнуты на 90 градусов или ниже;{' '}
                <br />
                3. В верхней точки локти полностью выпрямлены и фиксируются на
                долю секунды; <br />
                4. Рывки ногами для придания инерции отсутствуют. <br />
              </p>
            </div>
          </div>
          <div className="task row">
            <div className="col col-md-5 col-12 title-wrapper">
              <h1 className="bordered-title centered">Подтягивания</h1>
            </div>
            <div className="col offset-md-1 col-md-6 col-12">
              <p className="explanation">
                1. Тело прямое на протяжении всего движения;
                <br />
                2. Локти полностью выпрямляются в нижней точке;
                <br />
                3. Подбородок заходит за перекладину в верхней точке;
                <br />
                4. Рывки ногами для придания инерции отсутствуют.
                <br />
              </p>
            </div>
          </div>
          {/* <div className="task row">
            <div className="col col-md-1 col-lg-1 col-12 number-wrapper">
              <h1 className="centered">1</h1>
            </div>
            <div className="col col-md-6 col-lg-6 col-12 video-wrapper">
              <ResponsiveEmbed
                ratio="16:9"
                src="https://www.youtube.com/embed/2yqz9zgoC-U"
              />
            </div>
            <div className="col col-md-5  col-lg-5 col-12">
              <h3 className="task-name">Выход силой</h3>
              <p>
                Сначала вы делаете подтягивание, а потом, в верхней точке,
                отжимаете себя от турника.
              </p>
              <p>
                По отдельности сделать подтягивание или отжаться от турника
                сравнительно легко, а вот объединение двух составляющих вместе,
                и переход от одной составляющей упражнения к другой требует
                определённой силовой и координационной подготовки.
              </p>
            </div>
          </div>
          <div className="task row">
            <div className="col col-md-1 col-lg-1 col-12 number-wrapper">
              <h1 className="centered">2</h1>
            </div>
            <div className="col col-md-6 col-lg-6 col-12 video-wrapper">
              <ResponsiveEmbed
                ratio="16:9"
                src="https://www.youtube.com/embed/2yqz9zgoC-U"
              />
            </div>
            <div className="col col-md-5  col-lg-5 col-12">
              <h3 className="task-name">Подтягивания с отягощением</h3>
              <p>
                Не раскачивайтесь корпусом/ногами, а производите
                подъем/опускание плавно в одной плоскости; Во время
                подъемов/опусканий, верхняя часть туловища и предплечья не
                должны двигаться; Во время подтягиваний держите локти всегда под
                перекладиной; В нижней точке траектории полностью распрямите
                руки.
              </p>
            </div>
          </div>
          <div className="task row">
            <div className="col col-md-1 col-lg-1 col-12 number-wrapper">
              <h1 className="centered">3</h1>
            </div>
            <div className="col col-md-6 col-lg-6 col-12 video-wrapper">
              <ResponsiveEmbed
                ratio="16:9"
                src="https://www.youtube.com/embed/2yqz9zgoC-U"
              />
            </div>
            <div className="col col-md-5  col-lg-5 col-12">
              <h3 className="task-name">Отжимания с отягощением</h3>
              <p>
                В исходном положении (верхней точке) ваш корпус расположен
                вертикально, вы держитесь на прямых руках, локти развернуты
                назад. Сделав вдох, опускайтесь вниз настолько, насколько
                позволяет гибкость ваших плечевых суставов. Ориентируйтесь на
                угол 90 градусов в локтях.
              </p>
            </div>
          </div> */}
        </div>
        <div className="block-3 row">
          <div className="col col-12 form-wrapper dark">
            <h3 className="centered">Форма отправки</h3>
            <FeedbackForm dark />
          </div>
        </div>
      </div>
    );
  }
}
