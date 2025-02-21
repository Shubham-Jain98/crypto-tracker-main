import React, { useEffect, useState } from "react";
import { trendingcoins } from "../config/api";
import { CryptoState } from "../pages/CryptoContext";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";
// import axios from 'axios'

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const SingleTrending = () => {
  const { currency, symbol } = CryptoState();
  const [trending, setTrending] = useState([]);

  // const fetchTrendingCoins = async () => {
  //     const {data} = await axios.get(trendingcoins(currency))
  //     setTrending(data);
  // }

  // const fetchTrendingCoins = async () => {
  //     try {
  //         const response = await fetch(trendingcoins(currency));
  //         const data = await response.json();

  //         console.log(data);
  //         setTrending(data);

  //     } catch(err){
  //         console.log(err);
  //     }
  // }
  const fetchTrendingCoins = async () => {
    try {
      const response = await fetch(trendingcoins(currency));

      if (response.status === 429) {
        const delayInMilliseconds = (60 * 1000) / 30;

        await new Promise((resolve) =>
          setTimeout(resolve, delayInMilliseconds)
        );
        return fetchTrendingCoins();
      }

      const data = await response.json();
      setTrending(data);
    } catch (err) {
      console.log(err);
    }
  };

  console.log("a");
  console.log(trending);

  useEffect(() => {
    fetchTrendingCoins();
  }, [currency]);

  const responsive = {
    0: {
      items: 1,
    },
    512: {
      items: 8,
    },
  };

  const items = trending.map((coin) => {
    let profit = coin?.price_change_percentage_24h >= 0;
    console.log("profit :" + profit);

    return (
      <div className="mt-16">
        <Link to={`/coins/${coin.id}`} style={{ textDecoration: "none" }}>
          <img
            className=" w-24 h-24 relative left-0 "
            src={coin?.image}
            alt={coin.name}
            style={{ marginBottom: 10 }}
          />
          <div className="text-white mt-3  flex flex-col relative left-2 ">
            <span className="flex uppercase g-1">
              {coin?.symbol}
              &nbsp;
              <span className={profit ? "text-green" : "text-red"}>
                {profit && "+"}
                {coin?.price_change_percentage_24h?.toFixed(2)}
                {"%"}
              </span>
            </span>
            <span className=" text-xl font-semibold flex ">
              {symbol}
              {numberWithCommas(coin?.current_price?.toFixed(2))}
            </span>
          </div>
        </Link>
      </div>
    );
  });
  
  return (
    <div className=" px-10 ml-8">
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={2500}
        disableDotsControls
        responsive={responsive}
        autoPlay
        items={items}
        disableButtonsControls
      />
    </div>
  );
};

export default SingleTrending;
