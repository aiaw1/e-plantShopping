import React, { useState } from 'react';
import './ProductList.css';
import CartItem from './CartItem';
import { useDispatch } from 'react-redux';
import { addItem } from './CartSlice'; // Adjust this path to match your project structure

function ProductList({ onHomeClick }) {
  const [showCart, setShowCart] = useState(false);
  const [showPlants, setShowPlants] = useState(false);
  const [addedToCart, setAddedToCart] = useState({});
  const dispatch = useDispatch();

  const plantsArray = [
    {
      category: 'Air Purifying Plants',
      plants: [
        {
          name: 'Snake Plant',
          image: 'https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg',
          description: 'Produces oxygen at night, improving air quality.',
          cost: '$15',
        },
        {
          name: 'Spider Plant',
          image: 'https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg',
          description: 'Filters formaldehyde and xylene from the air.',
          cost: '$12',
        },
        {
          name: 'Peace Lily',
          image: 'https://cdn.pixabay.com/photo/2019/06/12/14/14/peace-lilies-4269365_1280.jpg',
          description: 'Removes mold spores and purifies the air.',
          cost: '$18',
        },
        {
          name: 'Boston Fern',
          image: 'https://cdn.pixabay.com/photo/2020/04/30/19/52/boston-fern-5114414_1280.jpg',
          description: 'Adds humidity to the air and removes toxins.',
          cost: '$20',
        },
        {
          name: 'Rubber Plant',
          image: 'https://cdn.pixabay.com/photo/2020/02/15/11/49/flower-4850729_1280.jpg',
          description: 'Easy to care for and effective at removing toxins.',
          cost: '$17',
        },
        {
          name: 'Aloe Vera',
          image: 'https://cdn.pixabay.com/photo/2018/04/02/07/42/leaf-3283175_1280.jpg',
          description: 'Purifies the air and has healing properties for skin.',
          cost: '$14',
        },
      ],
    },
  ];

  const handleAddToCart = (plant) => {
    const cleanedProduct = {
      name: plant.name,
      image: plant.image,
      cost: parseFloat(plant.cost.replace('$', '')), // convert "$15" to 15
    };

    dispatch(addItem(cleanedProduct));

    setAddedToCart((prev) => ({
      ...prev,
      [plant.name]: true,
    }));
  };

  return (
    <div>
      <header className="header">
        <button onClick={onHomeClick}>Home</button>
        <button onClick={() => setShowPlants(!showPlants)}>About Us</button>
        <button onClick={() => setShowCart(!showCart)}>
          {showCart ? 'Hide Cart' : 'View Cart'}
        </button>
      </header>

      {showPlants && (
        <div className="about-us">
          <h2>About Our Plants</h2>
          <p>We specialize in air-purifying plants that enhance your environment.</p>
        </div>
      )}

      <div className="product-list">
        {plantsArray.map((category, index) => (
          <div key={index}>
            <h2>{category.category}</h2>
            <div className="plant-grid">
              {category.plants.map((plant, i) => (
                <div className="plant-card" key={i}>
                  <img src={plant.image} alt={plant.name} />
                  <h3>{plant.name}</h3>
                  <p>{plant.description}</p>
                  <p>Price: {plant.cost}</p>
                  <button
                    onClick={() => handleAddToCart(plant)}
                    disabled={addedToCart[plant.name]}
                  >
                    {addedToCart[plant.name] ? 'Added ✓' : 'Add to Cart'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {showCart && <CartItem />}
    </div>
  );
}

export default ProductList;
