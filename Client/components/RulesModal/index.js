import React from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';
import { Document } from 'react-pdf/dist/entry.webpack';

// import rulesDoc from '../../assets/Polozhenie_RDWC_2018_Moscow.pdf';

export default class RulesModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { onRequestClose, isOpen } = this.props;
    return (
      <ReactModal
        className="Modal"
        overlayClassName="Overlay"
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        ariaHideApp={false}
        shouldCloseOnOverlayClick
        shouldCloseOnEsc
        style={{
          zIndex: 11,
          transition: 'width 0.1s linear'
        }}
      >
        <Document file="https://cors-anywhere.herokuapp.com/https://manning-content.s3.amazonaws.com/download/5/54dea42-e46e-44c7-a930-d4c86a2c2ca3/CORS_ch03.pdf" />
      </ReactModal>
    );
  }
}

RulesModal.propTypes = {
  onRequestClose: PropTypes.func,
  isOpen: PropTypes.bool
};
