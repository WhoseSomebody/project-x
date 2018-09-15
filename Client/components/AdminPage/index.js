import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ParticipantsList from '../ParticipantsList';
import {
  getParticipants,
  deleteParticipant
} from '../../services/participants-service';
import AddNewParticipantForm from '../AddNewParticipantForm';
import ReactModal from 'react-modal';

export class AdminPage extends Component {
  constructor() {
    super();
    this.state = {
      page: 1,
      pages: 1,
      limit: 12,
      participants: [],
      loading: true,
      isModalOpen: false,
      image: {}
    };
  }

  componentDidMount() {
    this.loadParticipants();
  }

  loadParticipants = () => {
    const { page, limit } = this.state;
    this.setState({
      loading: true
    });
    getParticipants({ page, limit }).then(res =>
      this.setState({
        ...res,
        loading: false
      })
    );
  };

  removeParticipant = participant => {
    deleteParticipant(participant).then(() => {
      this.loadParticipants();
      this.setState({
        participantToRemove: null,
        isModalOpen: false
      });
    });
  };

  handlePageClick = data => {
    const { selected } = data;
    this.setState({ page: selected + 1 }, () => {
      this.loadParticipants();
    });
  };

  handleRemoveRequest = participantToRemove => {
    this.setState({
      isModalOpen: true,
      participantToRemove
    });
  };

  render() {
    return (
      <div className="container admin-page">
        <div className="block-3 row">
          <div className="col col-12 form-wrapper">
            <h1 className="centered">Добавить участника</h1>
            <AddNewParticipantForm onSuccess={this.loadParticipants} />
          </div>
        </div>
        <div className="block-3 row">
          <div className="col col-12">
            <h1 className="centered">Удалить участника</h1>
            <ParticipantsList
              participants={this.state.participants}
              handlePageClick={this.handlePageClick}
              pagesCount={this.state.pages}
              onRemove={this.handleRemoveRequest}
              // onRemovePopupOpen={this.setState({ isModalOpen: true })}
              showDetails
              loading={this.state.loading}
            />
          </div>
        </div>
        <ReactModal
          className="Modal delete-modal"
          overlayClassName="Overlay"
          isOpen={this.state.isModalOpen}
          onRequestClose={() =>
            this.setState({
              isModalOpen: false
            })
          }
          ariaHideApp={false}
          shouldCloseOnOverlayClick
          shouldCloseOnEsc
          style={{
            zIndex: 11,
            transition: 'width 0.1s linear'
          }}
        >
          <h3 className="delete-message">Вы уверены, что хотите безвозвратно удалить участника?</h3>
          <div className="row">
            <a
              className="button button-inverse m-auto"
              onClick={() =>
                this.setState({
                  isModalOpen: false
                })
              }
            >
              Отмена
            </a>
            <a
              className="button button-main m-auto"
              onClick={() =>
                this.removeParticipant(this.state.participantToRemove)
              }
            >
              Удалить
            </a>
          </div>
        </ReactModal>
      </div>
    );
  }
}
AdminPage.propTypes = {
  history: PropTypes.object.isRequired
};

export default AdminPage;
