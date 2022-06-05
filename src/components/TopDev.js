import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import "../css/topdev.css";
import { listofcurrency } from "../redux/actions/currencyactions";
import { listofdev } from "../redux/actions/developersaction";
import Loader from "./Loader";
import { addToFav } from "../redux/actions/addFav";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
const TopDev = () => {
  const [devs, setDevs] = useState([]);
  const [currenc, setCurrency] = useState([]);
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

  const [dropdown, setDropdown] = useState(false);
  const [openDropdow, setOpendropdow] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listofdev(setDevs));
  }, [dispatch]);

  useEffect(() => {
    dispatch(listofcurrency(setCurrency, setnetCurrency));
  }, [dispatch]);
  //opening dropdown
  const openDropdown = () => {
    setDropdown(true);
    setOpendropdow(true);
  };
  //closing dropdown
  const closeDropdown = () => {
    setDropdown(false);
    setOpendropdow(false);
  };

  const navigate = useNavigate();

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
  const addFav = (_id, display_name, service_photo, avatar, starting_from) => {
    if (Favourites.find((heart) => heart.id === _id)) {
      toast.error("Already in Favourites");
    } else {
      toast.success("Added to Favourites");
      navigate("/");
      dispatch(
        addToFav(_id, display_name, service_photo, avatar, starting_from)
      );
    }
  };

  const Favourites = Cookies.get("favourites")
    ? JSON.parse(Cookies.get("favourites"))
    : [];

  return (
    <div>
      <ToastContainer />
      <section className="containerController">
        <div className="cardContainer">
          {loading ? (
            <>
              <Loader />
            </>
          ) : (
            <>
              {" "}
              {devs.map((dev, index) => {
                return (
                  <>
                    <div key={index} className="cards">
                      <div style={{}}>
                        <img
                          src={dev._source.service_photo}
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
                            addFav(
                              dev._id,
                              dev._source.display_name,
                              dev._source.service_photo,
                              dev._source.avatar,
                              dev._source.starting_from
                            );
                          }}
                        >
                          {Favourites.find((heart) => heart.id === dev._id) ===
                          undefined ? (
                            <>
                              {" "}
                              <div className="notcolored">
                                <>
                                  {" "}
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
                                </>
                              </div>
                            </>
                          ) : (
                            <>
                              {" "}
                              <div className="colored">
                                <>
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
                                </>
                              </div>
                            </>
                          )}
                        </div>
                        <img
                          src={dev._source.avatar}
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
                      </div>
                      <div className="cardInfo">
                        <div>
                          <p>{dev._source.display_name}</p>
                          <p>
                            {activecurrenc.symbol}
                            {(
                              parseInt(dev._source.starting_from) *
                              activecurrenc.rate
                            ).toFixed(2)}
                          </p>
                        </div>
                        <p className="hire">Hire Now</p>
                      </div>
                    </div>
                  </>
                );
              })}
            </>
          )}
        </div>
        <div className="foot">
          <h5>© 2022 DevHire</h5>

          <div>
            {!openDropdow && (
              <>
                {" "}
                <button onClick={openDropdown} className="selectbar">
                  <div className="flagimg">
                    <img src={activecurrenc.flag} alt="" />
                  </div>
                  <div className="flagname">
                    <h6>{activecurrenc.name}</h6>
                  </div>
                  <div className="dropdown">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-caret-down-fill"
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
                <button onClick={closeDropdown} className="selectbar2">
                  <div className="flagimg2">
                    <img src={activecurrenc.flag} alt="" />
                  </div>
                  <div className="flagname2">
                    <h6>{activecurrenc.name}</h6>
                  </div>
                  <div className="dropdown2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-caret-up-fill"
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
                <div className="selectopt">
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
                              );
                              setDropdown(false);
                            }}
                            className="selectbar3"
                          >
                            <div className="flagimg2">
                              <img src={curr.flag_url} alt="" />
                            </div>
                            <div className="flagname2">
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
      </section>
    </div>
  );
};

export default TopDev;
