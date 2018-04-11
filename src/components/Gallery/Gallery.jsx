import React, {Component} from 'react';
import {connect} from 'react-redux';

import {Picture} from "../Picture/Picture";
import {Lightbox} from "../Lightbox/Lightbox";
import {Infinite} from "../Infinite/Infinite";

import {fetchNext} from "../../actions/fetchNext";

import './Gallery.css'


class GalleryComponent extends Component {
  constructor() {
    super();
    this.state = {
      photoIndex: 0,
      isOpen: false
    };
    this.openLightbox = this.openLightbox.bind(this);
  }

  load() {
    const url = 'https://pixabay.com/api/?key=8532246-55268eb0f8f42379b33ae8c5d&q=architecture&image_type=photo&editors_choice=true&safesearch=true&per_page=50';
    fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        let results = data.hits;
        console.log(results);
        this.props.dispatch({
          type: 'APPEND_IMAGES',
          images: results
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  componentDidMount() {
    this.load();
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
      <Infinite fetchNext={fetchNext}>
        <section className="gallery">
          {images.map((item, index) => <Picture openLightBox={this.openLightbox}
                                                key={item.id}
                                                index={index}
                                                imgData={item}/>)}
        </section>

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
  page: state.page,
  error: state.error
});

export const Gallery = connect(stateToProps)(GalleryComponent);