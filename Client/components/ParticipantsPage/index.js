import React, { Component } from 'react';
import ParticipantsList from '../ParticipantsList';
import { getParticipants } from '../../services/participants-service';

export default class ParticipantsPage extends Component {
  constructor() {
    super();
    this.state = {
      page: 1,
      pages: 1,
      limit: 12,
      count: null,
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

  handlePageClick = data => {
    const { selected } = data;
    this.setState({ page: selected + 1 }, () => {
      this.loadParticipants();
    });
  };

  render() {
    const { pages } = this.state;
    return (
      <div className="row row-1">
        <div className="container mainWrapper">
          <div className="row">
            {/* <div className="col col-12 col-sm-6 col-md-4 col-lg-3">
              <div className="note">
                <div className="subtitle">Общее кол-во участников</div>
                <div className="count">0</div>
              </div>
            </div> */}
            <div className="col col-12 col-sm-6 col-md-4 col-lg-3">
              <div className="note">
                <div className="subtitle">Участники которые прошли отбор</div>
                <div className="count violet">{this.state.count}</div>
              </div>
            </div>
          </div>
          <ParticipantsList
            participants={this.state.participants}
            handlePageClick={this.handlePageClick}
            pagesCount={pages}
            loading={this.state.loading}
          />
        </div>
      </div>
    );
  }
}
