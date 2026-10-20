const RestaurantCard = ({
  img,
  name,
  description,
  rating,
  areaName,
  costForTwo,
  deliveryTime,
}) => {
  return (
    <div className="res-card" style={{ backgroundColor: "#f4c9c9" }}>
      <img src={img} alt={name} className="res-img" />
      <h3>{name}</h3>
      <p>{description}</p>
      <p>{areaName}</p>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <p>{costForTwo}</p>
          <p>{deliveryTime}</p>
        </div>
        <div>
          <p>Rating: {rating} Stars</p>
          {rating >= 4.5 && <p>Excellent!</p>}
          {rating < 4.5 && <p>Good!</p>}
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
