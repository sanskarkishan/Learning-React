

const RestaurantCard = ( props ) => {
    return (
        <div className="res-card" style={{backgroundColor: "#f4c9c9"}}>
            <img src={props.img} alt={props.name} className="res-img" />
            <h3>{props.name}</h3>
            <p>{props.description}</p>
            <p>Rating: {props.rating} Stars</p>
            {props.rating >= 4.5 && <p>Excellent!</p>}
            {props.rating < 4.5 && <p>Good!</p>}
            
        </div>
    );
};

export default RestaurantCard;