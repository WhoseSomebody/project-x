import React, { Component } from 'react';
import PropTypes from 'prop-types';
import uuidv1 from 'uuid/v1';
import AvatarUpdater from '../components/AvatarUpdater';

class FeedbackForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      surname: '',
      age: '',
      height: '',
      weight: '',
      pullUpLink: '',
      muscleUpLink: '',
      pushUpLink: '',
      validationErrors: []

      // id: props.note.id,
      // title: props.note.title,
      // content: props.note.content,
      // tags: props.note.tags,
    };

    this.onTitleChange = this.onTitleChange.bind(this);
    this.onContentChange = this.onContentChange.bind(this);
    this.onTagsChange = this.onTagsChange.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  onTitleChange(event) {
    const title = event.target.value;

    this.validateTitle(title);

    this.setState({ title: title });
  }

  onContentChange(event) {
    const content = event.target.value;

    this.validateContent(content);

    this.setState({ content: content });
  }

  onTagsChange(event) {
    const tags = event.target.value;

    if (this.validateTags(tags)) {
      this.setState({ tags: tags.split(',') });
    }
  }

  onSave(event) {
    event.preventDefault();

    if (
      this.state.validationErrors &&
      this.state.validationErrors.length === 0
    ) {
      const { title, content } = this.state;

      if (this.validateTitle(title) && this.validateContent(content)) {
        this.props.onSaveNote({
          id: this.state.id,
          title: this.state.title,
          content: this.state.content,
          tags: this.state.tags
        });
      }
    }
  }

  validateTitle(title) {
    const message = 'Title is required';

    if (title === '') {
      this.addValidationError(message);
      return false;
    } else {
      this.removeValidationError(message);
      return true;
    }
  }

  validateContent(content) {
    const message = 'Content is required';

    if (content === '') {
      this.addValidationError(message);
      return false;
    } else {
      this.removeValidationError(message);
      return true;
    }
  }

  validateTags(tags) {
    const message = 'Tags must be a comma separated list';

    if (tags !== '') {
      var regex = new RegExp(/^([\w]+[\s]*[,]?[\s]*)+$/);

      if (!regex.test(tags)) {
        this.addValidationError(message);
        return false;
      } else {
        this.removeValidationError(message);
        return true;
      }
    } else {
      this.removeValidationError(message);
    }
  }

  addValidationError(message) {
    this.setState(previousState => {
      const validationErrors = [...previousState.validationErrors];
      validationErrors.push({ message });
      return {
        validationErrors: validationErrors
      };
    });
  }

  removeValidationError(message) {
    this.setState(previousState => {
      const validationErrors = previousState.validationErrors.filter(
        error => error.message !== message
      );

      return {
        validationErrors: validationErrors
      };
    });
  }

  render() {
    const validationErrorSummary = this.state.validationErrors.map(error => (
      <div
        key={uuidv1()}
        className="alert alert-danger alert-dismissible fade show"
      >
        {error.message}
        <button type="button" className="close" data-dismiss="alert">
          <span>&times;</span>
        </button>
      </div>
    ));

    return (
      <div className="feedback-form">
        {validationErrorSummary}
        <div className="row">
          <div className="col col-lg-8 col-12">
            <div className="row input-pair">
              <div className="col col-lg-3 col-12">
                <div className="title">Имя</div>
              </div>
              <div className="col col-lg-9 col-12">
                <div className="input-wrapper">
                  <input
                    type="text"
                    autoFocus
                    onChange={e => this.onInputChange(e, 'name')}
                    value={this.state.title}
                  />
                </div>
              </div>
            </div>
            <div className="row input-pair">
              <div className="col col-lg-3 col-12">
                <div className="title">Фамилия</div>
              </div>
              <div className="col col-lg-9 col-12">
                <div className="input-wrapper">
                  <input
                    type="text"
                    autoFocus
                    onChange={e => this.onInputChange(e, 'name')}
                    value={this.state.title}
                  />
                </div>
              </div>
            </div>
            <div className="row input-pair">
              <div className="col col-lg-2 col-12">
                <div className="title">Возраст</div>
              </div>
              <div className="col col-lg-2 col-12">
                <div className="input-wrapper">
                  <input
                    type="text"
                    autoFocus
                    onChange={e => this.onInputChange(e, 'name')}
                    value={this.state.title}
                  />
                </div>
              </div>
              <div className="col col-lg-2 col-12">
                <div className="title">Рост</div>
              </div>
              <div className="col col-lg-2 col-12">
                <div className="input-wrapper">
                  <input
                    type="text"
                    autoFocus
                    onChange={e => this.onInputChange(e, 'name')}
                    value={this.state.title}
                  />
                </div>
              </div>
              <div className="col col-lg-2 col-12">
                <div className="title">Вес</div>
              </div>
              <div className="col col-lg-2 col-12">
                <div className="input-wrapper">
                  <input
                    type="text"
                    autoFocus
                    onChange={e => this.onInputChange(e, 'name')}
                    value={this.state.title}
                  />
                </div>
              </div>
            </div>
            <div className="row input-pair">
              <div className="col col-lg-3 col-12">
                <div className="title">Подтягивания</div>
                <div className="subtitle">(Ссылка на видео)</div>
              </div>
              <div className="col col-lg-9 col-12">
                <div className="input-wrapper">
                  <input
                    type="text"
                    autoFocus
                    onChange={e => this.onInputChange(e, 'name')}
                    value={this.state.title}
                  />
                </div>
              </div>
            </div>
            <div className="row input-pair">
              <div className="col col-lg-3 col-12">
                <div className="title">Выходы силой</div>
                <div className="subtitle">(Ссылка на видео)</div>
              </div>
              <div className="col col-lg-9 col-12">
                <div className="input-wrapper">
                  <input
                    type="text"
                    autoFocus
                    onChange={e => this.onInputChange(e, 'name')}
                    value={this.state.title}
                  />
                </div>
              </div>
            </div>
            <div className="row input-pair">
              <div className="col col-lg-3 col-12">
                <div className="title">Отжимания</div>
                <div className="subtitle">(Ссылка на видео)</div>
              </div>
              <div className="col col-lg-9 col-12">
                <div className="input-wrapper">
                  <input
                    type="text"
                    autoFocus
                    onChange={e => this.onInputChange(e, 'name')}
                    value={this.state.title}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col col-lg-4 col-12">
            {/* <div className="imageWrapper">image will be here</div> */}
            <AvatarUpdater/>
            <a
              href="#"
              className="button button-inverse block"
              onClick={this.props.onCloseModal}
            >
              Загрузить фото
            </a>
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <a
              href="#"
              className="button button-main  m-auto"
              onClick={this.props.onCloseModal}
            >
              Отправить
            </a>
          </div>
        </div>
      </div>
    );
  }
}

FeedbackForm.propTypes = {
  onCloseModal: PropTypes.func,
  onSaveNote: PropTypes.func
};

export default FeedbackForm;
