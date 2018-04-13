import React, { Component } from 'react';
import './Picture.css';

export class Picture extends Component {
  state = {
    hidden: true
  };

  componentDidMount() {
    if (this.image && this.image.naturalHeight > 0) {
      this.setState({hidden: false});
    }
  }

  render() {
    let {imgData, openLightBox, index} = this.props;

    if (!imgData) {
      return null;
    }

    let width = imgData.webformatWidth && imgData.webformatHeight && imgData.webformatWidth * 200 / imgData.webformatHeight;

    return (
      <a
        className="gallery__item"
        style={{
          width: width ? width + 'px' : ''
        }}
        onClick={(e) => {
          e.preventDefault();
          openLightBox(index);
        }}
        href={imgData.largeImageURL}
      >
        <img
          ref={(node) => this.image = node}
          className={`gallery__item-img ${this.state.hidden ? 'gallery__item-img--hidden' : ''}`}
          src={imgData.webformatURL}
          onLoad={() => this.setState({hidden: false})}
          alt={`Tags: ${imgData.tags}`}
        />
      </a>
    );
  }
}