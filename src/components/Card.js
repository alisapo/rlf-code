import React from 'react';

const Card = ({ article }) => {
  return (
    <div className="card">
      <div className="title-card">
        <h1>{article.title}</h1>
      </div>
      <div className="tags-card">
        <div>{article.audience}</div>
        <div>{article.speciality}</div>
        <div>{article.section}</div>
      </div>
      <div className="summary-card">
        <p>{article.summary}</p>
      </div>
    </div>
  );
}

export default Card;
