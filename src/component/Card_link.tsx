import React from 'react';
import { Link } from 'react-router-dom';

interface Element {
  name: string;
  english: string;
}

interface CardLinkProps {
  element: Element[]; 
}

const Card_link: React.FC<CardLinkProps> = ({ element }) => {
  return (
    <div className='card_component'>
      <div className='dspy_flex'>
        {Array.isArray(element) ? (
          element.map((element_item, index) => (
            <div className='item' key={index}>
              <Link to={`/detail-page/${element_item.name}`}>
                <p>{element_item.name}</p>
                <h3>{element_item.name}</h3>
                <h3>{element_item.english}</h3>
              </Link>
            </div>
          ))
        ) : (
          <p>No items to display</p>
        )}
      </div>
    </div>
  );
};

export default Card_link;
