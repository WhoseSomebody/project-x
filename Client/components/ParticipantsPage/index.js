import React, { Component } from 'react';
import ParticipantsList from '../ParticipantsList';
import { getParticipants } from '../../services/participants-service';
import ModalVideo from 'react-modal-video';

export default class ParticipantsPage extends Component {
  constructor() {
    super();
    this.state = {
      page: 1,
      pages: 1,
      limit: 12,
      count: null,
      participants: [],
      loading: true,
      videoId: '',
      isOpen: false,
    };
  }

  openInNewTab = url => {
    var win = window.open(url, '_blank');
    win.focus();
  };

  getUrlParams = (search = '') => {
    let hashes = search.slice(search.indexOf('?') + 1).split('&');
    let params = {};
    hashes.map(hash => {
      let [key, val] = hash.split('=');
      params[key] = decodeURIComponent(val);
    });

    return params;
  };

  openModal = participant => {
    console.log(participant.qualificationLink);
    if (participant.qualificationLink.indexOf('youtube.com') != -1) {
      this.setState({
        isOpen: true,
        videoId: this.getUrlParams(participant.qualificationLink).v,
      });
    } else if (participant.qualificationLink.indexOf('youtu.be') != -1) {
      this.setState({
        isOpen: true,
        videoId: participant.qualificationLink.split('/')[
          participant.qualificationLink.split('/').length - 1
        ],
      });
    } else {
      this.openInNewTab(participant.qualificationLink);
    }
  };

  closeModal = () => {
    this.setState({ isOpen: false, videoId: '' });
  };

  componentDidMount() {
    this.loadParticipants();
  }

  loadParticipants = () => {
    const { page, limit } = this.state;
    this.setState({
      loading: true,
    });
    getParticipants({ page, limit }).then(res =>
      this.setState({
        ...res,
        loading: false,
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
            hoverable
            openVideo={participant => this.openModal(participant)}
          />
        </div>
        <ModalVideo
          channel="youtube"
          videoId={this.state.videoId}
          isOpen={this.state.isOpen}
          onClose={this.closeModal}
        />
      </div>
    );
  }
}
