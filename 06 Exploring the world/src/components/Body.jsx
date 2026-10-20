import { useEffect, useState } from "react";
import RestaurantCard from "./RestaurantCard";
import Shimmer from "./Shimmer";

const API_URL =
  "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9352403&lng=77.624532&collection=83639&tags=layout_CCS_Biryani&sortBy=&filters=&type=rcv2&offset=100&carousel=true&third_party_vendor=1";

const Body = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`API request failed: ${response.status}`);
        }

        const jsonData = await response.json();
        const cards = jsonData.data.cards;

        const restaurantData = cards
          .filter((card) => card.card?.card?.info)
          .map((card) => {
            const info = card.card.card.info;

            return {
              id: info.id,
              name: info.name,
              rating: Number(info.avgRating) || 0,
              img: `https://media-assets.swiggy.com/swiggy/image/upload/${info.cloudinaryImageId}`,
              description: info.cuisines.join(", "),
              areaName: info.areaName,
              costForTwo: info.costForTwo,
              deliveryTime: info.sla.slaString,
            };
          });

        setRestaurants(restaurantData);
      } catch (fetchError) {
        setError(fetchError.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  if (isLoading)
    return (
      <div style={{ display: "flex", margin: "40px"}}>
        <Shimmer />
        <Shimmer />
        <Shimmer />
        <Shimmer />
        <Shimmer />
        <Shimmer />
        <Shimmer />
        <Shimmer />
      </div>
    );
  if (error) return <p role="alert">{error}</p>;
  if (restaurants.length === 0) return <p>No restaurants were returned.</p>;

  return (
    <div className="body">
      <div className="search-filter-container">
        <div className="search-bar">Search</div>
      </div>
      <div className="res-container">
        {restaurants.map((restaurant) => (
          <RestaurantCard
            key={restaurant.id}
            img={restaurant.img}
            name={restaurant.name}
            description={restaurant.description}
            rating={restaurant.rating}
            areaName={restaurant.areaName}
            costForTwo={restaurant.costForTwo}
            deliveryTime={restaurant.deliveryTime}
          />
        ))}
      </div>
    </div>
  );
};

export default Body;
