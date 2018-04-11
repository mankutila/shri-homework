import React, {Component} from 'react';
import {connect} from 'react-redux';

import {Picture} from "../Picture/Picture";
import {Lightbox} from "../Lightbox/Lightbox";
import {Infinite} from "../Infinite/Infinite";


import './Gallery.css'


class GalleryComponent extends Component {
  constructor() {
    super();
    this.state = {
      photoIndex: 0,
      isOpen: false
    };
    this.openLightbox = this.openLightbox.bind(this);
    this.fetchImages = this.fetchImages.bind(this);
  }

  fetchImages() {
    const COUNT = 50;
    const page = this.props.page;
    const url = `https://pixabay.com/api/?key=8532246-55268eb0f8f42379b33ae8c5d&q=architecture&image_type=photo&editors_choice=true&safesearch=true&per_page=${COUNT}&page=${page}`;
    this.props.dispatch({
      type: 'LOAD_IMAGES'
    });

    fetch('https://cors-anywhere.herokuapp.com/' + url) //proxy for cors requests
      .then((resp) => resp.json())
      .then((data) => {
        this.props.dispatch({
          type: 'SET_TOTAL',
          total: data.total
        });
        this.props.dispatch({
          type: 'APPEND_IMAGES',
          images: data.hits,
          page: page + 1,
          loading: false
        });
      })
      .catch((error) => {

        this.props.dispatch({
          type: 'LOAD_ERROR',
          error
        });
      });
  }

  componentDidMount() {
    this.fetchImages();
  }

  openLightbox(index) {
    this.setState({
      isOpen: true,
      photoIndex: index
    });
  }

  render() {
    const {photoIndex, isOpen} = this.state,
          images = this.props.images;
    return (
      <Infinite fetchImages={this.fetchImages}>
        <section className="gallery">

          {images.map((item, index) => <Picture openLightBox={this.openLightbox}
                                                key={index}
                                                index={index}
                                                imgData={item}/>)}
        </section>

        {this.props.loading && (
          <div>LOADING</div>
        )}

        {isOpen && (
          <Lightbox
            src={images[photoIndex].largeImageURL}
            onClose={() => this.setState({isOpen: false})}
            onMovePrev={() =>
              this.setState({
                photoIndex: (photoIndex + images.length - 1) % images.length,
              })
            }
            onMoveNext={() =>
              this.setState({
                photoIndex: (photoIndex + 1) % images.length,
              })
            }
          />
        )}
      </Infinite>
    );
  }
}

const stateToProps = (state) => ({
  images: state.images,
  loading: state.loading,
  page: state.page,
  error: state.error
});

export const Gallery = connect(stateToProps)(GalleryComponent);