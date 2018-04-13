import React, { Component } from 'react';
import { connect } from 'react-redux';

import { addBodyStyles, removeBodyStyles } from '../../utils/lightboxUtils';

import './Lightbox.css';

export class LightboxComponent extends Component {
  state = {
    imageLoading: true,
    hidden: true,
    offsetTop: 0,
    paddingRight: window.innerWidth - document.documentElement.clientWidth,
  };

  componentDidMount() {
    this.setState({
      offsetTop: document.body.scrollTop || window.pageYOffset,
      hidden: false,
    });

    if (this.image && this.image.naturalHeight > 0) {
      this.setState({ imageLoading: false });
    }
    document.addEventListener('keydown', this.handleKeyDown);
    addBodyStyles(this.state);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
    removeBodyStyles();
  }

  movePrev = () => {
    const { images, photoIndex } = this.props;
    this.props.dispatch({
      type: 'TOGGLE_IMAGE',
      photoIndex: (photoIndex + images.length - 1) % images.length
    });
    this.setState({ imageLoading: true });
  };

  moveNext = () => {
    const {images, photoIndex} = this.props;
    this.props.dispatch({
      type: 'TOGGLE_IMAGE',
      photoIndex: (photoIndex + 1) % images.length
    });
    this.setState({imageLoading: true});
  };

  closeLightBox = () => {
    this.props.dispatch({
      type: 'CLOSE_LIGHTBOX'
    })
  };

  handleKeyDown = (e) => {
    const key = e.keyCode;

    if (key === 27) {
      this.closeLightBox();
    }
    if (key === 37) {
      this.movePrev();
    }
    if (key === 39) {
      this.moveNext();
    }
  };

  handleClick = (e) => {
    const target = e.target;

    if (target === document.querySelectorAll('.lightbox')[0]) {
      this.closeLightBox();
    }
  };

  render() {
    let {images, photoIndex} = this.props;

    return (
      <div className={`lightbox ${!this.state.hidden ? 'lightbox--visible' : ''}`}
        style={{
          top: this.state.offsetTop + 'px'
        }}
        onClick={this.handleClick}>

        <button className="lightbox__prev" onClick={this.movePrev} aria-label="Предыдущее фото">Предыдущее фото</button>

        <img ref={(node) => this.image = node}
          className={`lightbox__img ${this.state.imageLoading ? 'lightbox__img--hidden' : ''}`}
          src={images[photoIndex].largeImageURL}
          alt={`Tags: ${images[photoIndex].tags}`}
          onLoad={() => this.setState({imageLoading: false})}
        />

        {this.state.imageLoading ? <div className="spinner">Загрузка...</div> : ''}

        <button className="lightbox__next" onClick={this.moveNext} aria-label="Следующее фото">Следующее фото</button>

        <button className="lightbox__close" onClick={this.closeLightBox} aria-label="Закрыть">Закрыть</button>

      </div>
    )
  }
}

const stateToProps = (state) => ({
  images: state.images.images,
  error: state.images.error,
  photoIndex: state.lightbox.photoIndex
});

export const Lightbox = connect(stateToProps)(LightboxComponent);