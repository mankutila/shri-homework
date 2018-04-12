import React, {Component} from 'react';
import {connect} from 'react-redux';

import './Infinite.css';

const THRESHOLD = 500;

export class InfiniteComponent extends Component {

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

  onScroll() {
    if (!this.container || this.props.loading) {
      return;
    }

    let scrollTop = document.body.scrollTop || document.documentElement.scrollTop,
      containerHeight = this.container.clientHeight,
      windowHeight = window.innerHeight;

    if (scrollTop + windowHeight >= containerHeight - THRESHOLD && !this.props.allLoaded) {
      this.nextPage();
    }
  }

  async nextPage() {
    try {
      await this.props.fetchImages();
    } catch(error) {
      this.props.dispatch({
        type: 'LOAD_ERROR',
        error
      });
    }

  }

  render() {
    return (
      <div ref={(container) => this.container = container}>

        {this.props.children}

        {this.props.loading && (
          <div className="loading">
            <div className="loader">Загрузка...</div>
          </div>
        )}

      </div>
    );
  }
}

const stateToProps = (state) => ({
  loading: state.loading,
  allLoaded: state.allLoaded,
  error: state.error
});

export const Infinite = connect(stateToProps)(InfiniteComponent);