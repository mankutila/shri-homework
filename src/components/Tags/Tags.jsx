import React, {Component} from 'react';

import {Picture} from "../Picture/Picture";

const TAGS = [
  {
    title: "Архитектура",
    slug: "architecture"
  },
  {
    title: "Океан",
    slug: "ocean"
  },
  {
    title: "Птицы",
    slug: "birds"
  }
];

export class Tags extends Component {


  render() {
    return (
      <section className="tags">
        {TAGS.map(({title, slug}, index) => (
          <button
            key={slug}
            className={`tag`}
            /*onClick={() => dispatch({
              type: 'SET_TAG',
              tag: slug
            })}*/
          >
            {title}
          </button>
        ))}
      </section>
    );
  }
}