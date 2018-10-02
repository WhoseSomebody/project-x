import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loader from 'react-loader-spinner';
import uuid from 'uuid';
import ReactPaginate from 'react-paginate';
import ParticipantCard from './ParticipantCard';

export class ParticipantsList extends Component {
  render() {
    const {
      participants,
      handlePageClick,
      pagesCount,
      onRemove,
      showDetails,
      loading
    } = this.props;
    return (
      <div className="listWrapper">
        {loading && (
          <div className="loader">
            <Loader type="Oval" color="#232323" height="100" width="100" />
          </div>
        )}
        <div className="row">
          {!loading &&
            participants &&
            !!participants.length &&
            participants.map(participant => (
              <div
                key={uuid.v4()}
                className="col-12 col-sm-6 col-md-4 col-lg-3"
              >
                <ParticipantCard
                  participant={participant}
                  onRemove={onRemove}
                  showDetails={showDetails}
                />
              </div>
            ))}
          {!loading &&
            (!participants || !participants.length) && (
              <div className="empty-message">
                Принимаем ваши запросы на участие, стань первым участником чемпионата!
              </div>
            )}
        </div>
        {participants &&
          !!participants.length && (
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
          )}
      </div>
    );
  }
}

ParticipantsList.propTypes = {
  participants: PropTypes.object,
  handlePageClick: PropTypes.func,
  pagesCount: PropTypes.number,
  onRemove: PropTypes.func,
  showDetails: PropTypes.bool,
  loading: PropTypes.bool
};

export default ParticipantsList;
