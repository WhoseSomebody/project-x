import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import 'image-compressor';
import AvatarEditor from 'react-avatar-editor';
import Slider from 'rc-slider';
import uuid from 'uuid';
import Dropzone from 'react-dropzone';
import ReactModal from 'react-modal';
import EXIF from 'exif-js';
import ImageLoader from 'react-image-file';

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
      isImgModalOpen: false,
      rotate: 0
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
      this.setState({
        image: {
          ...this.state.image,
          src: file
        }
      });
      this.props.onImageSelect(file);
    });

  render() {
    return (
      <div>
        <div
          className={`imageWrapper ${this.props.errored ? 'errored' : ''}`}
          role="presentation"
          // onClick={() => this.toggleImageModal(true)}
        >
          <Dropzone
            accept="image/*"
            className="dropzoneWrapper"
            multiple={false}
            onDrop={accepted => {
              if (accepted[0]) {
                EXIF.getData(accepted[0], () => {
                  var orientation = EXIF.getTag(accepted[0], 'Orientation');
                  let rotatePic = 0;
                  switch (orientation) {
                    case 8:
                      rotatePic = 270;
                      break;
                    case 6:
                      rotatePic = 90;
                      break;
                    case 3:
                      rotatePic = 180;
                      break;
                    default:
                      rotatePic = 0;
                  }
                  imageCompressor.run(
                    accepted[0].preview,
                    compressorSettings,
                    img => {
                      this.setState({
                        processingImage: false,
                        isImgModalOpen: true,
                        image: {
                          src: img
                        },
                        rotate: rotatePic
                      });
                    }
                  );
                });
              }
            }}
            activeClassName="active"
          >
            {/* <div className="dropzoneNote">+ Upload Photo</div> */}
            <div className="image">
              <ImageLoader file={this.props.initialImage} alt="" />
            </div>
          </Dropzone>
        </div>
        <Dropzone
          accept="image/*"
          className="button button-inverse block"
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
                      },
                      isImgModalOpen: true
                    });
                  }
                );
              });
            }
          }}
          activeClassName="active"
        >
          Загрузить фото
        </Dropzone>
        <ReactModal
          className="Modal"
          overlayClassName="Overlay"
          isOpen={this.state.isImgModalOpen}
          onRequestClose={() => this.toggleImageModal(false)}
          ariaHideApp={false}
          shouldCloseOnOverlayClick
          shouldCloseOnEsc
          style={{
            width: this.state.image.src ? '50vw' : '',
            transition: 'width 0.1s linear'
          }}
        >
          <div className="cardContentWrapper">
            <div className="col col-12">
              <div className="canvasWrapper">
                <AvatarEditor
                  ref={editor => {
                    this.editor = editor;
                  }}
                  image={this.state.image.src}
                  width={350}
                  height={350}
                  border={50}
                  color={[255, 255, 255, 0.95]} // RGBA
                  scale={this.state.image.scale}
                  rotate={this.state.rotate}
                />
              </div>
              <a
                onClick={() =>
                  this.setState({ rotate: this.state.rotate + 90 })
                }
                className="rotate-button"
              >
              </a>
              <div className="slider">
                <div className="textTips">
                  <span>меншье</span>
                  <span>больше</span>
                </div>
                <Slider
                  defultValue={this.state.image.scale}
                  min={100}
                  max={200}
                  onChange={this.handleSlider}
                />
              </div>
              <div className="textTips">Двигайте фотографию для обрезки</div>
              <div className="buttons">
                <a
                  className="button button-inverse block"
                  onClick={() => this.toggleImageModal(false)}
                >
                  Отмена
                </a>
                <a
                  className="button button-inverse block"
                  onClick={() => this.returnProccessedImage()}
                >
                  Ок
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
  onImageSelect: PropTypes.func.isRequired,
  initialImage: PropTypes.string,
  errored: PropTypes.bool
};

export default AvatarUpdater;
