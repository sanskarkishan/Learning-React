import React from "react";
import ReactDOM from "react-dom/client";

const AppLayout = () => {
  return (
    <div id="app">
        <Header />
        <Body />
    </div>
  );
}

const Header = () => {
  return (
    <div className="header"> 

      <div className="logo-container">
        <img className="logo" src="https://images-platform.99static.com/v84irzbNBd5aawXGKXfH4SEjcn0=/0x0:960x960/500x500/top/smart/99designs-contests-attachments/117/117132/attachment_117132760" alt="Logo" />
      </div>
      
      <div className="nav-items">
        <ul>
          <li>Home</li>
          <li>About</li>
          <li>Contact</li>
          <li>Cart</li>
        </ul>
      </div>

    </div>
  );
};

const Body = () => {
    return (
        <div className="body">
            <div className="search-bar">
                Search
            </div>
            <div className="res-container">
                <RestaurantCard img="https://pub-aaa82e9851064d22b954c3ebbafc9ae6.r2.dev/uploads/webp/delicious-soy-sauce-noodles-with-sesame-PGhhdB1mcfcRdwBhVRTE5.webp" name="Restaurant 1" description="This is the first restaurant." />
                <RestaurantCard img="https://pub-aaa82e9851064d22b954c3ebbafc9ae6.r2.dev/legacy/thumbnails/rigatoni-with-cream-sauce-w7UcpowFCkkrNh5g712PI.webp" name="Restaurant 2" description="This is the second restaurant." />
                <RestaurantCard img="https://pub-aaa82e9851064d22b954c3ebbafc9ae6.r2.dev/legacy/thumbnails/coffee-crema-v9GagSChFHN0stN6iFJAw.webp" name="Restaurant 3" description="This is the third restaurant." />
            </div>
        </div>
    );
}

const RestaurantCard = ( props ) => {
    return (
        <div className="res-card" style={{backgroundColor: "#f4c9c9"}}>
            <img src={props.img} alt={props.name} className="res-img" />
            <h3>{props.name}</h3>
            <p>{props.description}</p>
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<AppLayout />);