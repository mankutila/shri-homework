import React, {Component} from 'react';
import {connect} from 'react-redux';

import {Picture} from "../Picture/Picture";

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
    const {images} = this.props;

    return (
        <React.Fragment>
          <section className="gallery">
            {images.map((item, index) => <Picture openLightBox={this.openLightbox}
                                                  key={index}
                                                  index={index}
                                                  imgData={item}/>)}
          </section>
        </React.Fragment>
    );
  }
}

const stateToProps = (state) => ({
  images: state.images,
  error: state.error
});

export const PictureList = connect(stateToProps)(PictureListComponent);