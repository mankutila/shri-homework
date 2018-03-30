import React from 'react';
import './Lightbox.css'

export class Lightbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {loading: true};
  }

  componentDidMount() {
    if (this.image && this.image.naturalHeight > 0) {
      this.setState({loading: false});
    }
  }

  render() {
    let { src, onClose, onMovePrev, onMoveNext} = this.props;

    return (
      <div className="lightbox">
        <button
          className="lightbox__prev"
          onClick={() => {
            onMovePrev();
            this.setState({loading: true})
          }}
          aria-label="Предыдущее фото">Предыдущее фото</button>

        <img
          ref={(node) => this.image = node}
          className={`lightbox__img ${this.state.loading ? 'lightbox__img--hidden' : ''}`}
          src={src}
          alt=""
          onLoad={() => this.setState({loading: false})}
        />

        {this.state.loading ? <div className="spinner">load..</div> : ''}

        <button
          className="lightbox__next"
          onClick={() => {
            onMoveNext();
            this.setState({loading: true})
          }}
          aria-label="Следующее фото">Следующее фото</button>
        <button
          className="lightbox__close"
          onClick={() => {
            onClose();
            this.setState({loading: true})
          }}
          aria-label="Закрыть">Закрыть</button>
      </div>
    )

  }

}