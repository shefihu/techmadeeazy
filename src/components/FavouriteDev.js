import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listofcurrency } from "../redux/actions/currencyactions";
import { listofdev } from "../redux/actions/developersaction";
import Cookies from "js-cookie";
import Loader from "./Loader";
import "../css/favdev.css";
import { removeFromFavorites } from "../redux/actions/addFav";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
const FavouriteDev = () => {
  const [devs, setDevs] = useState([]);
  const [currenc, setCurrency] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [netcurrenc, setnetCurrency] = useState([]);
  const [activecurrenc, setActiveCurrency] = useState({
    id: "",
    name: "Naira",
    flag: "https://cdn.britannica.com/68/5068-004-72A3F250/Flag-Nigeria.jpg",
    symbol: "N",
    rate: 1,
  });
  const devLists = useSelector((state) => state.devLists);
  const { loading } = devLists;

  const favourites = useSelector((state) => state.favLists.favItems);

  useEffect(() => {
    setFavorites(favourites);
  }, [favourites]);

  const [dropdown, setDropdown] = useState(false);
  const [openDropdow, setOpendropdow] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(listofdev(setDevs));
  }, [dispatch]);
  useEffect(() => {
    dispatch(listofcurrency(setCurrency, setnetCurrency));
  }, [dispatch]);
  //open drop down
  const openDropdown = () => {
    setDropdown(true);
    setOpendropdow(true);
  };
  //close dropdown
  const closeDropdown = () => {
    setDropdown(false);
    setOpendropdow(false);
  };
  //currency handler
  const setThe = (id, name, flag_url, symbol) => {
    const rate = netcurrenc.filter(
      (cd) => id === cd.buying_currency_id && cd.currency_id === 1
    );
    setActiveCurrency({
      id: id,
      name: name,
      flag: flag_url,
      symbol: symbol,
      rate: rate[0].net_rate,
    });
  };
  const removeFromFavourites = (id) => {
    if (Favourites.find((heart) => heart.id === id)) {
      toast.success("Removed from favorites");
    }
    dispatch(removeFromFavorites(id));
    navigate("/favorites");
  };
  //getting favorites from cookie
  const Favourites = Cookies.get("favourites")
    ? JSON.parse(Cookies.get("favourites"))
    : [];
  return (
    <div>
      <ToastContainer />
      <section className="favcontainerController">
        <div className="favcardContainer">
          {loading ? (
            <>
              <Loader />
            </>
          ) : (
            <>
              {favorites.length === 0 ? (
                <>
                  <h1>No favorite developer yet</h1>
                </>
              ) : (
                <>
                  {favorites.map((dev) => {
                    return (
                      <>
                        <div className="favcards" key={dev.id}>
                          <img
                            src={dev.photo}
                            alt=""
                            style={{
                              width: "337px",
                              objectFit: "cover",
                              height: "180px",
                              position: "absolute",
                              borderRadius: "20px",
                            }}
                          />
                          <div
                            className="big"
                            onClick={() => {
                              removeFromFavourites(
                                dev.id
                                // dev.name,
                                // dev.photo,
                                // dev.avatar,
                                // dev.starting
                              );
                            }}
                          >
                            {Favourites.find((heart) => heart.id === dev.id) ===
                            undefined ? (
                              <>
                                {" "}
                                <div className="notcolored">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="19"
                                    height="19"
                                    fill="currentColor"
                                    className="bi bi-heart-fill"
                                    viewBox="0 0 16 16"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
                                    />
                                  </svg>
                                </div>
                              </>
                            ) : (
                              <>
                                <div className="colored">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="19"
                                    height="19"
                                    fill="currentColor"
                                    className="bi bi-heart-fill"
                                    viewBox="0 0 16 16"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
                                    />
                                  </svg>
                                </div>
                              </>
                            )}
                          </div>
                          <img
                            src={dev.avatar}
                            alt=""
                            style={{
                              width: "60px",
                              objectFit: "cover",
                              height: "60px",
                              position: "relative",
                              marginTop: "140px",
                              marginLeft: "20px",
                              borderRadius: "50%",
                            }}
                          />
                          <div>
                            <p>{dev.name}</p>
                            <p>
                              {activecurrenc.symbol}

                              {(
                                parseInt(dev.starting) * activecurrenc.rate
                              ).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      </>
                    );
                  })}
                  <div className="favfoot">
                    <h5>© 2022 DevHire</h5>

                    <div>
                      {!openDropdow && (
                        <>
                          {" "}
                          <button
                            onClick={openDropdown}
                            className="favselectbar"
                          >
                            <div className="favflagimg">
                              <img src={activecurrenc.flag} alt="" />
                            </div>
                            <div className="favflagname">
                              <h6>{activecurrenc.name}</h6>
                            </div>
                            <div className="favdropdown">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                class="bi bi-caret-down-fill"
                                viewBox="0 0 16 16"
                              >
                                <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                              </svg>
                            </div>
                          </button>
                        </>
                      )}
                      {openDropdow && (
                        <>
                          <button
                            onClick={closeDropdown}
                            className="favselectbar2"
                          >
                            <div className="favflagimg2">
                              <img src={activecurrenc.flag} alt="" />
                            </div>
                            <div className="favflagname2">
                              <h6>{activecurrenc.name}</h6>
                            </div>
                            <div className="favdropdown2">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                class="bi bi-caret-up-fill"
                                viewBox="0 0 16 16"
                              >
                                <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
                              </svg>
                            </div>
                          </button>
                        </>
                      )}

                      {dropdown && (
                        <>
                          {" "}
                          <div className="favselectopt">
                            {currenc.map((curr) => {
                              return (
                                <>
                                  <>
                                    <div
                                      onClick={() => {
                                        setThe(
                                          curr.id,
                                          curr.name,
                                          curr.flag_url,
                                          curr.symbol
                                          // curr.net_conversions.net_rate
                                        );
                                        setDropdown(false);
                                      }}
                                      className="favselectbar3"
                                    >
                                      <div className="favflagimg2">
                                        <img src={curr.flag_url} alt="" />
                                      </div>
                                      <div className="favflagname2">
                                        <h6>{curr.name}</h6>
                                      </div>
                                    </div>
                                  </>
                                </>
                              );
                            })}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default FavouriteDev;
