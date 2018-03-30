import React from 'react';
import './Lightbox.css'

export class Lightbox extends React.Component {
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
      this.props.onClose();
    }
  }

  render() {
    let {src, onClose, onMovePrev, onMoveNext} = this.props;

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
            onMovePrev();
            this.setState({imageLoading: true})
          }}
          aria-label="Предыдущее фото">Предыдущее фото
        </button>

        <img
          ref={(node) => this.image = node}
          className={`lightbox__img ${this.state.imageLoading ? 'lightbox__img--hidden' : ''}`}
          src={src}
          alt=""
          onLoad={() => this.setState({imageLoading: false})}
        />

        {this.state.imageLoading ? <div className="spinner">Загрузка...</div> : ''}

        <button
          className="lightbox__next"
          onClick={() => {
            onMoveNext();
            this.setState({imageLoading: true})
          }}
          aria-label="Следующее фото">Следующее фото
        </button>

        <button
          className="lightbox__close"
          onClick={() => {
            onClose();
            this.setState({imageLoading: true})
          }}
          aria-label="Закрыть">Закрыть
        </button>

      </div>
    )

  }

}