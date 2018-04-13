import React, { Component } from 'react';
import { connect } from 'react-redux';

import { PictureList } from "../PictureList/PictureList";
import { Lightbox } from "../Lightbox/Lightbox";
import { Infinite } from "../Infinite/Infinite";
import { Tags } from "../Tags/Tags";

import './Gallery.css'

class GalleryComponent extends Component {

  fetchImages = (firstLoad = false) => {
    const COUNT = 50,
          page = this.props.page,
          url = `https://pixabay.com/api/?`+
                `key=8532246-55268eb0f8f42379b33ae8c5d`+
                `&q=architecture`+
                `&image_type=photo`+
                `&editors_choice=true&safesearch=true`+
                `&per_page=${COUNT}`+
                `&page=${page}`;

    this.props.dispatch({
      type: 'LOAD_IMAGES'
    });

    fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        if (firstLoad) {
          this.props.dispatch({
            type: 'SET_TOTAL',
            total: data.total
          });
        }
        this.props.dispatch({
          type: 'APPEND_IMAGES',
          images: data.hits,
          page: page + 1,
          loading: false
        });
        // console.log('TOTAL:', this.props);
        // console.log(data);
        // console.log('IMAGES LENGTH:', this.props.images.length);
        if (this.props.total === this.props.images.length) {
          this.props.dispatch({type: 'ALL_LOADED'});
        }
      })
      .catch((error) => {
        this.props.dispatch({
          type: 'LOAD_ERROR',
          error
        });
      });
  };

  componentDidMount() {
    this.fetchImages(true);
  }

  render() {
    const {isOpen} = this.props;

    return (
      <Infinite fetchImages={this.fetchImages}>

        <Tags/>

        <PictureList />

        {isOpen && <Lightbox />}

      </Infinite>
    );
  }
}

const stateToProps = (state) => ({
  images: state.images.images,
  loading: state.images.loading,
  page: state.images.page,
  error: state.images.error,
  total: state.images.total,
  isOpen: state.lightbox.isOpen,
  photoIndex: state.lightbox.photoIndex,
});

export const Gallery = connect(stateToProps)(GalleryComponent);
