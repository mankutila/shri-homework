import React from 'react';
import {Picture} from '../Picture/Picture';
import {Lightbox} from "../Lightbox/Lightbox";
import './Gallery.css'

export class Gallery extends React.Component {
  constructor() {
    super();
    this.state = {
      images: [],
      photoIndex: 0,
      isOpen: false,
    };
  }

  componentDidMount() {
    const url = 'https://pixabay.com/api/?key=8532246-55268eb0f8f42379b33ae8c5d&q=architecture&image_type=photo&editors_choice=true&safesearch=true&per_page=50';

    fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        let results = data.hits;
        this.setState({images: results})
      })
      .catch(function (error) {
        console.log(error);
      });

  }

  openLightbox(index) {
    this.setState({
      isOpen: true,
      photoIndex: index
    });
  }

  render() {
    const {images, photoIndex, isOpen} = this.state;
    return (
      <React.Fragment>
        <section className="gallery">
          {images.map((item, index) => <Picture openLightBox={this.openLightbox.bind(this)}
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
      </React.Fragment>
    );
  }
}