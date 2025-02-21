import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CryptoState } from "../pages/CryptoContext";
import { SingleCoin } from "../config/api";
import { numberWithCommas } from "./CoinsTable";
import Chart from "./Chart";
import { BarLoader } from "react-spinners";
import parse from "html-react-parser";

const Coinpage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState(null);

  const { currency, symbol } = CryptoState();

  const fetchCoin = async () => {
    const response = await fetch(SingleCoin(id));
    const data = await response.json();

    setCoin(data);
  };

  useEffect(() => {
    fetchCoin();
  }, [id]);

  console.log("abc" + coin);

  if (!coin) {
    return (
      <BarLoader
        color="yellow"
        height={5}
        width={1270}
        speedMultiplier={0.75}
      />
    );
  }

  return (
    <div className=" flex  bg-black w-full min-h-screen px-12 gap-5 pb-5">
      <div className="bg-black text-white flex flex-col w-1/4 gap-3 border-r-2 pr-10">
        <div className="flex flex-col text-center gap-2 ">
          <div className=" flex text-center justify-between pl-8">
            <img
              className=" h-52"
              src={coin?.image.large}
              alt={coin.name}
            ></img>
          </div>
          <div className="text-2xl font-bold pr-14 ">{coin?.name}</div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="text-m">
            {coin?.description.en && coin.description.en.length > 200
              ? parse(`${coin.description.en.slice(0, 250)}...`)
              : parse(coin.description.en)}
          </div>
          <div className="text-xl font-bold">
            {"Market Price : "}
            {numberWithCommas(
              coin?.market_data.current_price[currency.toLowerCase()]
            )}
          </div>
          <div className="text-xl font-bold">
            {"Market Cap : "}
            {symbol}{" "}
            {numberWithCommas(
              coin?.market_data.market_cap[currency.toLowerCase()]
                .toString()
                .slice(0, -6)
            )}
          </div>
        </div>
      </div>
      <div className=" flex justify-center w-full">
        <Chart coin={coin} />
      </div>
    </div>
  );
};

export default Coinpage;
