import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Popup from 'react-popup';

export class ParticipantCard extends Component {
  showDetails = () => {
    const { participant, showDetails } = this.props;
    if (showDetails) {
      Popup.plugins().popover(
        <div>
          <div>
            {' '}
            Имя: {participant.name} {participant.surname}
          </div>
          <div> Возраст: {participant.age}</div>
          <div> Рост: {participant.height}</div>
          <div> Вес: {participant.weight}</div>
          <div>
            {' '}
            Email:{' '}
            <a href={`mailto:${participant.email}`}>{participant.email}</a>
          </div>
          <div>Номер телефона: {participant.phone}</div>
          <div>
            Квалификация:{' '}
            <a href={participant.qualificationLink}>
              {participant.qualificationLink}
            </a>
          </div>
          <div>
            Instagram:{' '}
            <a href={participant.instagramLink}>{participant.instagramLink}</a>
          </div>
        </div>,
        this.details
      );
      window.addEventListener('scroll', () => Popup.refreshPosition());
    }
  };

  render() {
    const {
      participant,
      showDetails,
      onRemove,
      hoverable,
      openVideo,
    } = this.props;
    return (
      <div
        className={`card-wrapper ${showDetails ? 'with-details' : ''}`}
        ref={node => {
          this.details = node;
        }}
      >
        {onRemove && (
          <button
            className="remove-button"
            onClick={() => onRemove(participant)}
          >
            ✕
          </button>
        )}
        <div onClick={this.showDetails} className="card-top">
          <img src={participant.imageUrl} alt="" />
          {hoverable && (
            <div className="socials">
              <a
                href={participant.instagramLink}
                rel="noopener noreferrer"
                target="_blank"
                className="instagram"
              >
                <div className="icon" />
                <div className="social-title">Instagram</div>
              </a>
              <a
                // href={participant.qualificationLink}
                // rel="noopener noreferrer"
                // target="_blank"
                onClick={() => openVideo(participant)}
                className="youtube"
              >
                <div className="icon" />
                <div className="social-title">YouTube</div>
              </a>
            </div>
          )}
        </div>
        <div className="card-borrom">
          <h3 className="card-name">
            {participant.name} {participant.surname}
          </h3>
          <div className="card-details">
            {participant.age} {text(participant.age)} / {participant.weight} кг
            / {participant.height} см
          </div>
        </div>
      </div>
    );
  }
}

function text(age) {
  let txt;
  let count = age % 100;
  if (count >= 5 && count <= 20) {
    txt = 'лет';
  } else {
    count = count % 10;
    if (count == 1) {
      txt = 'год';
    } else if (count >= 2 && count <= 4) {
      txt = 'года';
    } else {
      txt = 'лет';
    }
  }
  return txt;
}

ParticipantCard.propTypes = {
  participant: PropTypes.object,
  onRemove: PropTypes.func,
  openVideo: PropTypes.func,
  showDetails: PropTypes.bool,
  hoverable: PropTypes.bool,
};

export default ParticipantCard;
