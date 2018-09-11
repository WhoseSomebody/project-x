import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ParticipantsList from '../ParticipantsList';
import {
  getParticipants,
  deleteParticipant
} from '../../services/participants-service';
import AddNewParticipantForm from '../AddNewParticipantForm';

export class AdminPage extends Component {
  constructor() {
    super();
    this.state = {
      page: 1,
      pages: 1,
      limit: 12,
      participants: [],
      loading: true
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
    });
  };

  handlePageClick = data => {
    const { selected } = data;
    this.setState({ page: selected + 1 }, () => {
      this.loadParticipants();
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
              onRemove={this.removeParticipant}
              showDetails
              loading={this.state.loading}
            />
          </div>
        </div>
      </div>
    );
  }
}
AdminPage.propTypes = {
  history: PropTypes.object.isRequired
};

export default AdminPage;
