import React from 'react';
import {Picture} from '../Picture/Picture';
import './Gallery.css'


export class Gallery extends React.Component {
  constructor() {
    super();
    this.state = {
      images: []
    };
  }

  componentDidMount() {
    const url = 'https://pixabay.com/api/?key=8532246-55268eb0f8f42379b33ae8c5d&category=nature&image_type=photo&editors_choice=true&safesearch=true';

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

  render() {
    return (
      <div className="gallery">
        {this.state.images.map((item) => <Picture key={item.id} imgData={item}/>)};
      </div>
    );
  }
}