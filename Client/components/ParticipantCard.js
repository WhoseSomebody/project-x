import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class ParticipantCard extends Component {
  render() {
    const { participant } = this.props;
    return (
      <div className="card-wrapper">
        <div className="card-top">
          <img src={participant.image_url} alt="" />
        </div>
        <div className="card-borrom">
          <h3 className="card-name">{participant.fullName}</h3>
          <div className="card-details">
            {participant.age} лет / {participant.weight} кг /{' '}
            {participant.height} см
          </div>
        </div>
      </div>
    );
  }
}

ParticipantCard.propTypes = {
  participant: PropTypes.object
};

export default ParticipantCard;
