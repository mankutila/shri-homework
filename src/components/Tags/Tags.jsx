import React from 'react';
import { connect } from 'react-redux';

import './Tags.css';

const TAGS = [
  {
    title: 'Архитектура',
    slug: 'architecture'
  },
  {
    title: 'Океан',
    slug: 'ocean'
  },
  {
    title: 'Птицы',
    slug: 'birds'
  }
];

function TagsComponent({current, fetchImages, dispatch}) {

  return (
    <section className="tags">
      {TAGS.map( ({ title, slug }, index ) => (
        <button
          key={slug}
          className={`tag ${slug === current ? 'tag--current' : ''}`}
          onClick={() => {

            if (slug !== current) {
              dispatch({
                type: 'SET_TAG',
                tag: slug
              });
              dispatch({
                type: 'RESET_IMAGES'
              });
              fetchImages(slug, true);
            }

          }}
        >
          {title}
        </button>
      ))}
    </section>
  );

}

const stateToProps = (state) => ({
  current: state.tags.current
});

export const Tags = connect(stateToProps)(TagsComponent);