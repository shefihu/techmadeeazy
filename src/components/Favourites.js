import React from "react";
import FavoriteContent from "./FavoriteContent";
import FavouriteDev from "./FavouriteDev";
import Sidebar from "./layout/Sidebar";

const Favourites = () => {
  return (
    <div>
      <div style={{ display: "flex" }}>
        <div style={{ width: "300px" }}>
          <Sidebar />
        </div>

        <FavoriteContent />
      </div>
    </div>
  );
};

export default Favourites;
