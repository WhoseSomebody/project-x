import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Popup from 'react-popup';

export class ParticipantCard extends Component {
  showDetails = () => {
    const { participant, showDetails } = this.props;
    if (showDetails)
      Popup.plugins().popover(
        <div>
          <div> Имя: {participant.name} {participant.surname}</div>
          <div> Возраст: {participant.age}</div>
          <div> Рост: {participant.height}</div>
          <div> Вес: {participant.weight}</div>
          <div>
            {' '}
            Email:{' '}
            <a href={`mailto:${participant.email}`}>{participant.email}</a>
          </div>
          <div>
            Подтягивания: <a href={participant.pullUp}>{participant.pullUp}</a>
          </div>
          <div>
            Выходы силой:
            <a href={participant.muscleUp}>{participant.muscleUp}</a>
          </div>
          <div>
            Отжимания: <a href={participant.pushUp}>{participant.pushUp}</a>
          </div>
        </div>,
        this.details
      );
  };

  render() {
    const { participant, showDetails, onRemove } = this.props;
    return (
      <div
        className={`card-wrapper ${showDetails ? 'with-details' : ''}`}
        ref={node => {
          this.details = node;
        }}
      >
        {onRemove && (
          <button className="remove-button" onClick={() => onRemove(participant)}>
            ✕
          </button>
        )}
        <div onClick={this.showDetails} className="card-top">
          <img src={participant.imageUrl} alt="" />
        </div>
        <div className="card-borrom">
          <h3 className="card-name">{participant.name} {participant.surname}</h3>
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
  participant: PropTypes.object,
  onRemove: PropTypes.func,
  showDetails: PropTypes.bool
};

export default ParticipantCard;
