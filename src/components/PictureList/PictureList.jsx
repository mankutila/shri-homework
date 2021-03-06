import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Picture } from "../Picture/Picture";

import './PictureList.css';

class PictureListComponent extends Component {
  constructor() {
    super();
    this.openLightbox = this.openLightbox.bind(this);
  }

  openLightbox(index) {
    this.props.dispatch({
      type: 'OPEN_LIGHTBOX',
      photoIndex: index
    });
  }

  render() {
    const { images, total, loading, error } = this.props;

    return (
      <section className="gallery">

        { total === 0 && !loading && !error && <div className="gallery__message">
          Нет никаких изображений по этой теме.
        </div> }

        { error && !loading && <div className="gallery__message">Ошибка загрузки изображений :(</div> }

        { images.map((item, index) => {
          return <Picture openLightBox={this.openLightbox} key={index} index={index} imgData={item}/>;
        })
        }
      </section>
    );
  }
}

const stateToProps = (state) => ({
  images: state.images.images,
  total: state.images.total,
  loading: state.images.loading,
  error: state.images.error
});

export const PictureList = connect(stateToProps)(PictureListComponent);
