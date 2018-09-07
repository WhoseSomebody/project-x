import React, { Component } from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid';
import ParticipantCard from './ParticipantCard';
import ReactPaginate from 'react-paginate';

export class ParticipantsList extends Component {
  render() {
    const { participants, handlePageClick, pagesCount } = this.props;
    return (
      <div className="listWrapper">
        <div className="row">
          {participants.map(participant => (
            <div key={uuid.v4()} className="col-12 col-sm-6 col-md-4 col-lg-3">
              <ParticipantCard participant={participant} />
            </div>
          ))}
        </div>
        <div className="row">
          <ReactPaginate
            previousLabel={'< Назад'}
            nextLabel={'Следующая >'}
            breakLabel={<a href="">...</a>}
            breakClassName={'break-me'}
            pageCount={pagesCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName={'pagination'}
            subContainerClassName={'pages pagination'}
            activeClassName={'active'}
          />
        </div>
      </div>
    );
  }
}

ParticipantsList.propTypes = {
  participants: PropTypes.object,
  handlePageClick: PropTypes.func,
  pagesCount: PropTypes.number
};

export default ParticipantsList;
