import React from 'react';
import './Picture.css'

export class Picture extends React.Component {
  constructor(props) {
    super(props);
    this.state = {hidden: true};
  }

  componentDidMount() {

  }

  render() {
    let {imgData} = this.props;

    if (!imgData) {
      return null;
    }

    let width = imgData.webformatWidth && imgData.webformatHeight && imgData.webformatWidth * 200 / imgData.webformatHeight;

    return (
      <div
        className="gallery__item"
        style={{
          width: width ? width + 'px' : ''
        }}
      >
        <img src={imgData.webformatURL} alt=""/>
      </div>
    );
  }
}