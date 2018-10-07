import React from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';
// import { Document, Page } from 'react-pdf/dist/entry.webpack';

// import rulesDoc from '../../assets/Polozhenie_RDWC_2018_Moscow.pdf';

export default class RulesModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file:
        'https://project-x-backend.herokuapp.com/public/Polozhenie_RDWC_2018_Moscow.pdf',
      numPages: null
    };
  }

  onFileChange = event => {
    this.setState({
      file: event.target.files[0]
    });
  };

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  };
  render() {
    const { onRequestClose, isOpen } = this.props;
    // const { file } = this.state;
    return (
      <ReactModal
        className="Modal rules-modal"
        overlayClassName="Overlay"
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        ariaHideApp={false}
        shouldCloseOnOverlayClick
        shouldCloseOnEsc
        // style={{
        //   zIndex: 11,
        //   transition: 'width 0.1s linear'
        // }}
      >
        {/* <Document file={file} onLoadSuccess={this.onDocumentLoadSuccess}>
          {Array.from(new Array(numPages), (el, index) => (
            <Page key={`page_${index + 1}`} pageNumber={index + 1} />
          ))}
        </Document> */}
        hello
        {/* <object
          data={file}
          type="application/pdf"
          width="100%"
          height="100%"
        >
          <iframe
            src={file}
            width="100%"
            height="100%"
            style="border: none;"
          >
            This browser does not support PDFs. Please download the PDF to view
            it: <a href={file}>Download PDF</a>
          </iframe>
        </object> */}
      </ReactModal>
    );
  }
}

RulesModal.propTypes = {
  onRequestClose: PropTypes.func,
  isOpen: PropTypes.bool
};
