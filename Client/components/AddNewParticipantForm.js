/* eslint-disable no-useless-escape*/
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ru from 'react-phone-number-input/locale/ru';
import PhoneInput from 'react-phone-number-input';
import AvatarUpdater from '../components/AvatarUpdater';
import participantsService from '../services/participants-service';

class AddNewParticipantForm extends Component {
  constructor(props) {
    super(props);
    this.initialState = {
      name: '',
      surname: '',
      age: '',
      height: '',
      weight: '',
      email: '',
      phone: '',
      qualificationLink: '',
      image: null,
      sentSuccess: false,
      nameError: false,
      surnameError: false,
      ageError: false,
      emailError: false,
      heightError: false,
      weightError: false,
      qualificationLinkError: false,
      imageError: false
    };
    this.state = { ...this.initialState };
  }

  onInputChange = (e, name, regexp) => {
    this.setState({
      [name]: e.target.value,
      [`${name}Error`]: !RegExp(regexp).test(e.target.value.toString())
    });
  };

  receiveImage = file => {
    // console.log(file);
    this.setState({
      image: file
    });
  };

  validateForm = () => {
    const errors = {
      nameError: !RegExp(/^(?!\s*$).+/g).test(this.state.name),
      surnameError: !RegExp(/^(?!\s*$).+/g).test(this.state.surname),
      ageError: !RegExp(/^\d+$/g).test(this.state.age),
      heightError: !RegExp(/^\d+$/g).test(this.state.height),
      weightError: !RegExp(/^\d+$/g).test(this.state.weight),
      phoneError: !RegExp(
        /(([+][(]?[0-9]{1,3}[)]?)|([(]?[0-9]{4}[)]?))\s*[)]?[-\s\.]?[(]?[0-9]{1,3}[)]?([-\s\.]?[0-9]{3})([-\s\.]?[0-9]{3,4})/g
      ).test(this.state.phone),
      emailError: !RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/g
      ).test(this.state.email),
      qualificationLinkError: !RegExp(
        /(http[s]?:\/\/)?[^\s(["<,>]*\.[^\s[",><]*/g
      ).test(this.state.qualificationLink),
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
      phone,
      qualificationLink,
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
          phone,
          qualificationLink,
          image
        })
        .then(() => {
          this.setState({
            ...this.initialState,
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
              <div className="col col-lg-3 col-12">
                <div className="title">Возраст</div>
              </div>
              <div className="col col-lg-9 col-12">
                <div
                  className={`input-wrapper ${
                    this.state.ageError ? 'errored' : ''
                  }`}
                >
                  <input
                    type="number"
                    onChange={e => this.onInputChange(e, 'age', /^\d+$/g)}
                    value={this.state.age}
                  />
                </div>
              </div>
            </div>
            <div className="row input-pair">
              <div className="col col-lg-3 col-12">
                <div className="title">Рост</div>
              </div>
              <div className="col col-lg-4 col-12">
                <div
                  className={`input-wrapper ${
                    this.state.heightError ? 'errored' : ''
                  }`}
                >
                  <input
                    type="number"
                    onChange={e => this.onInputChange(e, 'height', /^\d+$/g)}
                    value={this.state.height}
                  />
                </div>
              </div>
              <div className="col col-lg-1 col-12">
                <div className="title">Вес</div>
              </div>
              <div className="col col-lg-4 col-12">
                <div
                  className={`input-wrapper ${
                    this.state.weightError ? 'errored' : ''
                  }`}
                >
                  <input
                    type="number"
                    onChange={e => this.onInputChange(e, 'weight', /^\d+$/g)}
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
                <div className="title">Номер тел.</div>
              </div>
              <div className="col col-lg-9 col-12">
                <div
                  className={`input-wrapper ${
                    this.state.phoneError ? 'errored' : ''
                  }`}
                >
                  <PhoneInput
                    placeholder=""
                    labels={ru}
                    value={this.state.phone}
                    onChange={phone =>
                      this.setState({
                        phone,
                        phoneError: !RegExp(
                          /(([+][(]?[0-9]{1,3}[)]?)|([(]?[0-9]{4}[)]?))\s*[)]?[-\s\.]?[(]?[0-9]{1,3}[)]?([-\s\.]?[0-9]{3})([-\s\.]?[0-9]{3,4})/g
                        ).test(phone)
                      })
                    }
                  />
                </div>
              </div>
            </div>
            <div className="row input-pair">
              <div className="col col-lg-3 col-12">
                <div className="title">Квалификация</div>
                <div className="subtitle">(Ссылка на видео)</div>
              </div>
              <div className="col col-lg-9 col-12">
                <div
                  className={`input-wrapper ${
                    this.state.qualificationLinkError ? 'errored' : ''
                  }`}
                >
                  <input
                    type="link"
                    onChange={e =>
                      this.onInputChange(
                        e,
                        'qualificationLink',
                        /(http[s]?:\/\/)?[^\s(["<,>]*\.[^\s[",><]*/g
                      )
                    }
                    value={this.state.qualificationLink}
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
