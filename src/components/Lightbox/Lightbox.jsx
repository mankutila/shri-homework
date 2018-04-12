import React, {Component} from 'react';
import {connect} from 'react-redux';
import './Lightbox.css'

export class LightboxComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageLoading: true,
      hidden: true,
      offsetTop: 0,
      paddingRight: window.innerWidth - document.documentElement.clientWidth
    };
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.setState({
      offsetTop: document.body.scrollTop || window.pageYOffset,
      hidden: false
    });

    if (this.image && this.image.naturalHeight > 0) {
      this.setState({imageLoading: false});
    }
    document.addEventListener("keydown", this.handleKeyDown);
    document.body.classList.add('body-fixed');
    document.body.style.paddingRight = 40 + this.state.paddingRight + 'px';
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown);
    document.body.classList.remove('body-fixed');
    document.body.style.paddingRight = '40px';
  }

  handleKeyDown(e) {
    const key = e.keyCode;

    if (key === 27) {
      this.props.onClose();
    }
    if (key === 39) {
      this.props.onMoveNext();
      this.setState({imageLoading: true});
    }
    if (key === 37) {
      this.props.onMovePrev();
      this.setState({imageLoading: true});
    }
  }

  handleClick(e) {
    const target = e.target;

    if (target === document.querySelectorAll('.lightbox')[0]) {
      this.props.dispatch({
        type: 'CLOSE_LIGHTBOX'
      })
    }
  }

  render() {
    let {images, photoIndex} = this.props;

    return (
      <div
        className={`lightbox ${!this.state.hidden ? 'lightbox--visible' : ''}`}
        style={{
          top: this.state.offsetTop + 'px'
        }}
        onClick={this.handleClick}
      >
        <button
          className="lightbox__prev"
          onClick={() => {
            this.props.dispatch({
              type: 'TOGGLE_PHOTO',
              photoIndex: (photoIndex + images.length - 1) % images.length
            });
            this.setState({imageLoading: true})
          }}
          aria-label="Предыдущее фото">Предыдущее фото
        </button>

        <img
          ref={(node) => this.image = node}
          className={`lightbox__img ${this.state.imageLoading ? 'lightbox__img--hidden' : ''}`}
          src={images[photoIndex].largeImageURL}
          alt=""
          onLoad={() => this.setState({imageLoading: false})}
        />

        {this.state.imageLoading ? <div className="spinner">Загрузка...</div> : ''}

        <button
          className="lightbox__next"
          onClick={() => {
            this.props.dispatch({
              type: 'TOGGLE_PHOTO',
              photoIndex: (photoIndex + 1) % images.length
            });
            this.setState({imageLoading: true})
          }}
          aria-label="Следующее фото">Следующее фото
        </button>

        <button
          className="lightbox__close"
          onClick={() => {
            this.props.dispatch({
              type: 'CLOSE_LIGHTBOX'
            })
          }}
          aria-label="Закрыть">Закрыть
        </button>

      </div>
    )
  }
}

const stateToProps = (state) => ({
  images: state.images,
  error: state.error,
  photoIndex: state.photoIndex
});

export const Lightbox = connect(stateToProps)(LightboxComponent);