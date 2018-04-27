import React, { Component } from 'react';
import { connect } from 'react-redux';

import './Infinite.css';

const THRESHOLD = 500;

export class InfiniteComponent extends Component {
  componentDidMount() {
    document.addEventListener('scroll', this.onScroll, { passive: true });
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.onScroll);
  }

  onScroll = () => {
    if (!this.container || this.props.loading) {
      return;
    }

    let scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    let containerHeight = this.container.clientHeight;
    let windowHeight = window.innerHeight;

    if (scrollTop + windowHeight >= containerHeight - THRESHOLD && !this.props.allLoaded) {
      this.nextPage();
    }
  };

  async nextPage() {
    try {
      await this.props.fetchImages(this.props.current);
    } catch (error) {
      this.props.dispatch({
        type: 'LOAD_ERROR'
      });
    }
  }

  render() {
    return (
      <div ref={(container) => {this.container = container;}}>

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
  loading: state.images.loading,
  allLoaded: state.images.allLoaded,
  error: state.images.error,
  current: state.tags.current
});

export const Infinite = connect(stateToProps)(InfiniteComponent);
