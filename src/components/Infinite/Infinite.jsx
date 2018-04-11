import React, {Component} from 'react';

const THRESHOLD = 500;

export class Infinite extends Component {

  state = {
    loading: false
  };

  constructor(props) {
    super(props);

    this.onScroll = this.onScroll.bind(this);
  }

  componentDidMount() {
    document.addEventListener('scroll', this.onScroll, {passive: true});
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.onScroll);
  }

  componentDidUpdate() {
    this.onScroll();
  }

  onScroll() {
    /*if (!this.container || this.state.loading) {
      return;
    }

    let scrollTop = document.body.scrollTop || document.documentElement.scrollTop,
      containerHeight = this.container.clientHeight,
      windowHeight = window.innerHeight;

    if (scrollTop + windowHeight >= containerHeight - THRESHOLD) {
      this.nextPage();
    }*/
  }

  async nextPage() {
    this.setState({loading: true});

    try {
      await this.props.fetchNext();
    } catch(err) {
      console.error(err);
    } finally {
      this.setState({loading: false});
    }
  }

  /*{<div className="infinite" ref={(container) => this.container = container}>
        {this.props.children}

        {this.state.loading && (
          <div className="infinite__spinner">
            <div className="spinner"/>
          </div>
        )}
      </div>}

  */

  render() {
    return (
      <div ref={(container) => this.container = container}>
        {this.props.children}
      </div>


    );
  }

}