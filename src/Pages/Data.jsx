import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

const Data = () => {
  const navigate = useNavigate();

  const categories = ['Food', 'Fruits', 'Cars', 'Books', 'Movies'];

  const handleCategoryClick = (category) => {
    navigate(`/data/${category.toLowerCase()}`);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Data Dashboard</h1>
      <>
        <p className="mb-6">Click on a button to show its respective data</p>
        <div className="flex flex-wrap gap-4 mb-6">
          {categories.map((category) => (
            <Button
              key={category}
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {categories.map((category) => (
            <Card
              key={category}
              className="transition-all border border-muted py-0"
            >
              <CardContent className="p-4">
                <h2 className="text-lg font-semibold">{category}</h2>
                <p className="mb-6 mt-2">This card is related to {category}. Click on the button to view its respective table.</p>
                <Button onClick={() => handleCategoryClick(category)}>
                  Click to view
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </>
    </div>
  );
};

export default Data;