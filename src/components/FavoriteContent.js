import React from "react";
import FavouriteDev from "./FavouriteDev";

const FavoriteContent = () => {
  return (
    <div>
      {" "}
      <div>
        <div className="content-box">
          <div className="hireTop">
            <h1 className="">Favorites</h1>
          </div>
          <FavouriteDev />
        </div>
      </div>
    </div>
  );
};

export default FavoriteContent;
