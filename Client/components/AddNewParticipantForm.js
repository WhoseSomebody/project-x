import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AvatarUpdater from '../components/AvatarUpdater';
import participantsService from '../services/participants-service';

class AddNewParticipantForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'Иван',
      surname: 'Бычара',
      age: '22',
      height: '183',
      weight: '75',
      email: 'byk.sam@mail.ru',
      pullUpLink: 'https://www.youtube.com/watch?v=JJ44WA_eV8E',
      muscleUpLink: 'https://www.youtube.com/watch?v=JJ44WA_eV8E',
      pushUpLink: 'https://www.youtube.com/watch?v=JJ44WA_eV8E',
      image: null,
      sentSuccess: false,
      nameError: false,
      surnameError: false,
      ageError: false,
      emailError: false,
      heightError: false,
      weightError: false,
      pullUpLinkError: false,
      muscleUpLinkError: false,
      pushUpLinkError: false,
      imageError: false
    };
  }

  onInputChange = (e, name, regexp) => {
    this.setState({
      [name]: e.target.value,
      [`${name}Error`]: !RegExp(regexp).test(e.target.value.toString())
    });
  };

  receiveImage = file => {
    console.log(file);
    this.setState({
      image: file
    });
  };

  validateForm = () => {
    const errors = {
      nameError: !RegExp(/^(?!\s*$).+/g).test(this.state.name),
      surnameError: !RegExp(/^(?!\s*$).+/g).test(this.state.surname),
      ageError: !RegExp(/^[0-9]*$/g).test(this.state.age),
      heightError: !RegExp(/^[0-9]*$/g).test(this.state.height),
      weightError: !RegExp(/^[0-9]*$/g).test(this.state.weight),
      emailError: !RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/g
      ).test(this.state.email),
      pullUpLinkError: !RegExp(
        /(http[s]?:\/\/)?[^\s(["<,>]*\.[^\s[",><]*/g
      ).test(this.state.pullUpLink),
      muscleUpLinkError: !RegExp(
        /(http[s]?:\/\/)?[^\s(["<,>]*\.[^\s[",><]*/g
      ).test(this.state.muscleUpLink),
      pushUpLinkError: !RegExp(
        /(http[s]?:\/\/)?[^\s(["<,>]*\.[^\s[",><]*/g
      ).test(this.state.pushUpLink),
      imageError: !this.state.image
    };
    this.setState({ ...errors });
    let failed = false;
    Object.keys(errors).forEach(key => {
      failed = failed || errors[key];
    });
    return !failed;
  };

  onSubmit = () => {
    const {
      name,
      surname,
      age,
      height,
      weight,
      email,
      pullUpLink,
      muscleUpLink,
      pushUpLink,
      image
    } = this.state;
    if (this.validateForm()) {
      participantsService
        .addNew({
          name,
          surname,
          age,
          height,
          weight,
          email,
          pullUpLink,
          muscleUpLink,
          pushUpLink,
          image
        })
        .then(() => {
          this.setState({
            sentSuccess: true
          });
          this.props.onSuccess();
        })
        .catch(err => alert('Not sent: ' + err.toString()));
    }
  };

  render() {
    return (
      <div className="feedback-form">
        <div className="row">
          <div className="col col-lg-8 col-12">
            <div className="row input-pair">
              <div className="col col-lg-3 col-12">
                <div className="title">Имя</div>
              </div>
              <div className="col col-lg-9 col-12">
                <div
                  className={`input-wrapper ${
                    this.state.nameError ? 'errored' : ''
                  }`}
                >
                  <input
                    type="text"
                    onChange={e =>
                      this.onInputChange(e, 'name', /^(?!\s*$).+/g)
                    }
                    value={this.state.name}
                  />
                </div>
              </div>
            </div>
            <div className="row input-pair">
              <div className="col col-lg-3 col-12">
                <div className="title">Фамилия</div>
              </div>
              <div className="col col-lg-9 col-12">
                <div
                  className={`input-wrapper ${
                    this.state.surnameError ? 'errored' : ''
                  }`}
                >
                  <input
                    type="text"
                    onChange={e =>
                      this.onInputChange(e, 'surname', /^(?!\s*$).+/g)
                    }
                    value={this.state.surname}
                  />
                </div>
              </div>
            </div>
            <div className="row input-pair">
              <div className="col col-lg-2 col-12">
                <div className="title">Возраст</div>
              </div>
              <div className="col col-lg-2 col-12">
                <div
                  className={`input-wrapper ${
                    this.state.ageError ? 'errored' : ''
                  }`}
                >
                  <input
                    type="number"
                    onChange={e => this.onInputChange(e, 'age', /^[0-9]*$/g)}
                    value={this.state.age}
                  />
                </div>
              </div>
              <div className="col col-lg-2 col-12">
                <div className="title">Рост</div>
              </div>
              <div className="col col-lg-2 col-12">
                <div
                  className={`input-wrapper ${
                    this.state.heightError ? 'errored' : ''
                  }`}
                >
                  <input
                    type="number"
                    onChange={e => this.onInputChange(e, 'height', /^[0-9]*$/g)}
                    value={this.state.height}
                  />
                </div>
              </div>
              <div className="col col-lg-2 col-12">
                <div className="title">Вес</div>
              </div>
              <div className="col col-lg-2 col-12">
                <div
                  className={`input-wrapper ${
                    this.state.weightError ? 'errored' : ''
                  }`}
                >
                  <input
                    type="number"
                    onChange={e => this.onInputChange(e, 'weight', /^[0-9]*$/g)}
                    value={this.state.weight}
                  />
                </div>
              </div>
            </div>
            <div className="row input-pair">
              <div className="col col-lg-3 col-12">
                <div className="title">Email</div>
              </div>
              <div className="col col-lg-9 col-12">
                <div
                  className={`input-wrapper ${
                    this.state.emailError ? 'errored' : ''
                  }`}
                >
                  <input
                    type="email"
                    onChange={e =>
                      this.onInputChange(
                        e,
                        'email',
                        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/g
                      )
                    }
                    value={this.state.email}
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
                <div
                  className={`input-wrapper ${
                    this.state.pullUpLinkError ? 'errored' : ''
                  }`}
                >
                  <input
                    type="link"
                    onChange={e =>
                      this.onInputChange(
                        e,
                        'pullUpLink',
                        /(http[s]?:\/\/)?[^\s(["<,>]*\.[^\s[",><]*/g
                      )
                    }
                    value={this.state.pullUpLink}
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
                <div
                  className={`input-wrapper ${
                    this.state.muscleUpLinkError ? 'errored' : ''
                  }`}
                >
                  <input
                    type="link"
                    onChange={e =>
                      this.onInputChange(
                        e,
                        'muscleUpLink',
                        /(http[s]?:\/\/)?[^\s(["<,>]*\.[^\s[",><]*/g
                      )
                    }
                    value={this.state.muscleUpLink}
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
                <div
                  className={`input-wrapper ${
                    this.state.pushUpLinkError ? 'errored' : ''
                  }`}
                >
                  <input
                    type="link"
                    onChange={e =>
                      this.onInputChange(
                        e,
                        'pushUpLink',
                        /(http[s]?:\/\/)?[^\s(["<,>]*\.[^\s[",><]*/g
                      )
                    }
                    value={this.state.pushUpLink}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col col-lg-4 col-12">
            <AvatarUpdater
              onImageSelect={this.receiveImage}
              errored={this.state.imageError}
              initialImage={this.state.image}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <a className="button button-main m-auto" onClick={this.onSubmit}>
              Добавить
            </a>
          </div>
        </div>
      </div>
    );
  }
}

AddNewParticipantForm.propTypes = {
  onCloseModal: PropTypes.func,
  onSuccess: PropTypes.func
};

export default AddNewParticipantForm;
