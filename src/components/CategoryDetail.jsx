// components/CategoryDetail.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import Fruits from './TableComponents/Fruits';
import Cars from './TableComponents/Cars';
import Books from './TableComponents/Books';
import Movies from './TableComponents/Movies';
import Food from './TableComponents/Food';

const CategoryDetail = () => {
  const { category } = useParams();

  const components = {
    food: <Food />,
    fruits: <Fruits />,
    cars: <Cars />,
    books: <Books />,
    movies: <Movies />,
  };

  return (
    <div>
      {components[category] || <p>Category not found</p>}
    </div>
  );
};

export default CategoryDetail;
