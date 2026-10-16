import RestaurantCard from "./RestaurantCard";
import resData from "../utils/resdata";
import { useState } from "react";

const Body = () => {

    const [res, setRes] = useState(resData);



  return (
    <div className="body">
      <div className="search-filter-container">
        <div className="search-bar">Search</div>
        <button className="filter-btn" onClick={() =>{

            setRes(resData.filter((restaurant) => restaurant.rating >= 4.5));

            // resData = resData.filter((restaurant) => restaurant.rating >= 4.5);
            // console.log(resData);
        }}>Top Rated Restaurants</button>
      </div>
      <div className="res-container">
        {res.map((restaurant) => (
          <RestaurantCard
            key={restaurant.id}
            img={restaurant.img}
            name={restaurant.name}
            description={restaurant.description}
            rating={restaurant.rating}
          />
        ))}
      </div>
    </div>
  );
};

export default Body;
