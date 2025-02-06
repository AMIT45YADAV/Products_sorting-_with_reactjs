import React, { useEffect, useState } from "react";
// import public from '../public/Data.json'

const App = () => {
  const [products, setProducts] = useState([]);
  const [sortOption, setSortOption] = useState("price-asc");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("./Data.json");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const jsonData = await response.json();
        setProducts(jsonData);
      } catch (error) {
        console.log("Data not showing", error);
      }
    };

    fetchData();
  }, []);

  const sortedProducts = [...products].sort((a, b) => {
    if (sortOption === "price-asc") return a.price - b.price;
    if (sortOption === "price-desc") return b.price - a.price;
    return 0;
  });
  console.log(products, "products");
  console.log(
    products?.map((item, index) =>
      console.log(
        item?.products?.map((item, index) => <p>{item.title}</p>),
        "item"
      )
    )
  );

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Product Sorting With ReactJS</h1>

      <select
        value={sortOption}
        onChange={(e) => setSortOption(e.target.value)}
        className="mb-4 p-2 border rounded"
      >
        <option value="price-asc">Price: min to max</option>
        <option value="price-desc">Price: max to min</option>
      </select>

      {sortedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sortedProducts.map((product, index) => (
            <div
              key={product.id || `${product.title}-${index}`}
              className="border rounded-xl p-4 shadow-md"
            >
              <h6 className="text-xl font-bold mb-2">Title: {product.title}</h6>
              <img
                className="rounded-lg w-full h-auto mb-2"
                src={product.images}
                alt={product.title}
              />

              <p>{product.description}</p>
              <p>Price: {product.price}</p>
              <p>Tags: {product.tags}</p>
              <p>Brand: {product.brand}</p>
              <p>Category: {product.category}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading products...</p>
      )}
    </div>
  );
};

export default App;
