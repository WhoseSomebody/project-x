import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import 'image-compressor';
import Webcam from 'react-webcam';
import AvatarEditor from 'react-avatar-editor';
import Slider from 'rc-slider';
import uuid from 'uuid';
import Dropzone from 'react-dropzone';
import ReactModal from 'react-modal';

import './customModalStyles.css';

const compressorSettings = {
  toWidth: 500,
  mimeType: 'image/jpeg',
  mode: 'strict',
  quality: 1,
  speed: 'low'
};

const imageCompressor = new ImageCompressor(); // eslint-disable-line

class AvatarUpdater extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: {
        scale: 1
      },
      isCameraActivated: false
    };
  }

  handleSlider = value => {
    this.setState({
      image: {
        ...this.state.image,
        scale: value / 100
      }
    });
  };

  toggleImageModal = value => {
    this.setState({
      isImgModalOpen: value || !this.state.isImgModalOpen,
      image: {
        ...this.state.image,
        src: value ? null : this.state.image.src
      }
    });
  };

  captureFromWebcam = () => {
    const imageSrc = this.webcam.getScreenshot();
    this.setState({
      image: {
        ...this.state.image,
        src: imageSrc
      }
    });
  };

  returnProccessedImage = () =>
    this.editor.getImage().toBlob(res => {
      this.toggleImageModal(false);
      const name = uuid.v1();
      const file = new File([res], name);
      this.props.onSubmit(file);
    });

  render() {
    return (
      <div>
        <div
          className="imageWrapper"
          role="presentation"
          onClick={() => this.toggleImageModal(true)}
        >
          <img alt="" size="8rem" src={this.props.initalImage} />
          <div className="imageOverlay" />
          <div>Update avatar</div>
        </div>
        <ReactModal
          className="Modal"
          overlayClassName="Overlay"
          isOpen={true}
          ariaHideApp={false}
          shouldCloseOnOverlayClick
          shouldCloseOnEsc
          style={{
            width: this.state.image.src ? '50vw' : '',
            transition: 'width 0.1s linear'
          }}
        >
          <div className="cardContentWrapper">
            <div className="col col-md-6 col-12">
              {!this.state.isCameraActivated && (
                <div
                  className={'webcamWrapper'}
                  role="presentation"
                  onClick={() => this.setState({ isCameraActivated: true })}
                >
                  <span>Camera</span>
                </div>
              )}
              {this.state.isCameraActivated && (
                <div
                  className={`webcamWrapper ${
                    this.state.isCameraActivated ? 'noPointer' : ''
                  }`}
                >
                  <div className="textTips">
                    Please make sure to allow camera access
                  </div>
                  <Webcam
                    className="webcam"
                    audio={false}
                    // width={00}
                    // height={500}
                    ref={webcam => {
                      this.webcam = webcam;
                    }}
                    screenshotFormat="image/jpeg"
                  />
                  <a
                    href="#"
                    className="button button-inverse block"
                    onClick={() => this.toggleImageModal(false)}
                  >
                    Сделать снимок
                  </a>
                </div>
              )}

              <Dropzone
                accept="image/*"
                className="dropzoneWrapper"
                multiple={false}
                onDrop={accepted => {
                  if (accepted[0]) {
                    this.setState({ processingImage: true }, () => {
                      imageCompressor.run(
                        accepted[0].preview,
                        compressorSettings,
                        img => {
                          this.setState({
                            processingImage: false,
                            image: {
                              src: img
                            }
                          });
                        }
                      );
                    });
                  }
                }}
                activeClassName="active"
              >
                <div className="dropzoneNote">+ Upload Photo</div>
              </Dropzone>
            </div>
            <div
              className="col col-md-6 col-12"
              style={{
                opacity: this.state.image.src ? 1 : 0,
                zIndex: this.state.image.src ? 0 : -1,
                position: this.state.image.src ? '' : 'absolute',
                transition: 'opacity 0.3s linear'
              }}
            >
              <AvatarEditor
                ref={editor => {
                  this.editor = editor;
                }}
                image={this.state.image.src}
                width={window.innerWidth * 0.14}
                height={window.innerWidth * 0.14}
                borderRadius={300}
                border={50}
                color={[255, 255, 255, 0.95]} // RGBA
                scale={this.state.image.scale}
                rotate={0}
              />
              <div className="slider">
                <div className="textTips">
                  <span>Small</span>
                  <span>Large</span>
                </div>
                <Slider
                  defultValue={this.state.image.scale}
                  min={100}
                  max={200}
                  onChange={this.handleSlider}
                />
              </div>
              <div className="textTips">
                Reposition the photo to set the thumbnail
              </div>
              <div className="buttons">
                <a
                  href="#"
                  className="button button-inverse block"
                  onClick={() => this.toggleImageModal(false)}
                >
                  Отмена
                </a>
                <a
                  href="#"
                  className="button button-inverse block"
                  onClick={() => this.returnProccessedImage()}
                >
                  Загрузить
                </a>
              </div>
            </div>
          </div>
        </ReactModal>
        {/* {this.state.processingImage && (
          <div className="spinnerWrapper">
            <Spinner />
          </div>
        )} */}
      </div>
    );
  }
}

AvatarUpdater.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  initalImage: PropTypes.string
};

export default AvatarUpdater;
