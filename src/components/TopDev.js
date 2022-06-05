import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import "../css/topdev.css";
import { listofcurrency } from "../redux/actions/currencyactions";
import { listofdev } from "../redux/actions/developersaction";
import Loader from "./Loader";
const TopDev = () => {
  const [devs, setDevs] = useState([]);
  const [currenc, setCurrency] = useState([]);
  const [netcurrenc, setnetCurrency] = useState([]);
  const [favorites, setFavorites] = useState([
    {
      id: "",
      photo: "",
      avatar: "",
      name: "",
    },
  ]);

  const [activecurrenc, setActiveCurrency] = useState({
    id: "",
    name: "naira",
    flag: "https://cdn.britannica.com/68/5068-004-72A3F250/Flag-Nigeria.jpg",
    symbol: "N",
    rate: 1,
  });
  const devLists = useSelector((state) => state.devLists);
  const { loading, developers, error } = devLists;

  const currencyLists = useSelector((state) => state.currencyLists);
  console.log(currencyLists);
  // const { loading2, currency, error2 } = devLists;
  const [dropdown, setDropdown] = useState(false);
  const [openDropdow, setOpendropdow] = useState(false);
  console.log(devLists);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listofdev(setDevs));
  }, [dispatch]);
  useEffect(() => {
    dispatch(listofcurrency(setCurrency, setnetCurrency));
  }, [dispatch]);
  const openDropdown = () => {
    setDropdown(true);
    setOpendropdow(true);
  };
  const closeDropdown = () => {
    setDropdown(false);
    setOpendropdow(false);
  };
  const setThe = (id, name, flag_url, symbol) => {
    const rate = netcurrenc.filter(
      (cd) => id == cd.buying_currency_id && cd.currency_id == 1
    );

    console.log("yeah", rate[0]);
    setActiveCurrency({
      id: id,
      name: name,
      flag: flag_url,
      symbol: symbol,
      rate: rate[0].net_rate,
    });
  };
  const addFav = (_id, display_name, service_photo, avatar) => {
    const value = {
      id: _id,
      name: display_name,
      photo: service_photo,
      avatar: avatar,
    };
    // const newValue = [value];
    // const newArray = value.push(favorites);
    // const newArray = newValue.push(value);
    setFavorites((prevState) => {
      return [...prevState, value];
    });
    Cookies.set("favourites", JSON.stringify(favorites), { expires: 7 });
    console.log("yeah", favorites);
  };
  console.log(activecurrenc);
  return (
    <div>
      <section className="containerController">
        <div className="cardContainer">
          {loading ? (
            <>
              <Loader />
            </>
          ) : (
            <>
              {" "}
              {devs.map((dev) => {
                return (
                  <>
                    <div
                      onClick={() => {
                        addFav(
                          dev._id,
                          dev._source.display_name,
                          dev._source.service_photo,
                          dev._source.avatar
                        );
                      }}
                      className="cards"
                    >
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
                    </div>
                  </>
                );
              })}
            </>
          )}
        </div>
        <div className="foot">
          <h5>© 2022 DevHire</h5>
          {/* <select id="gender">
            <option>male</option>
            <option>female</option>
            <option>others</option>
          </select> */}
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
                      class="bi bi-caret-down-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
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
                                // curr.net_conversions.net_rate
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
          {/* <h1>{activecurrenc.id}</h1> */}
        </div>
      </section>
    </div>
  );
};

export default TopDev;
