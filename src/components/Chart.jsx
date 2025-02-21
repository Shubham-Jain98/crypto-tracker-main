import React, { useEffect, useState } from "react";
import { HistoricalChart } from "../config/api";
import { CryptoState } from "../pages/CryptoContext";
import { Line } from "react-chartjs-2";
import { chartDays } from "../config/data";
import Selectbtn from "./Selectbtn";
import { GridLoader } from "react-spinners";

import {
  Chart as ChartJS,
  LineElement,
  CategoryScale, //x
  LinearScale, //y
  PointElement,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const Chart = ({ coin }) => {
  const [historicalData, setHistoricalData] = useState([]);
  const [days, setDays] = useState(1);

  const { currency } = CryptoState();

  const fetchdata = async () => {
    try {
      const response = await fetch(HistoricalChart(coin.id, days, currency));
      const data = await response.json();

      console.log("data:", data);
      setHistoricalData(data.prices);
    } catch (err) {
      console.log("in catch blk");
      console.log("error is" + err);
    }
  };
  console.log(historicalData);
  useEffect(() => {
    fetchdata();
  }, [currency, days]);

  return (
    <div className="flex flex-col gap-3 ">
      <div>
        {!historicalData ? (
          <div className="bg-black flex  flex-col gap-4 justify-center items-center">
            <GridLoader color="#EEBC1D" />
            <div className="text-white font-bold text-2xl">Loading...</div>
          </div>
        ) : (
          <div className="">
            <Line
              height={400}
              width={700}
              key={`${coin.id}-${currency}-${days}`}
              data={{
                labels: historicalData.map((coin) => {
                  let date = new Date(coin[0]);
                  let time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12}:${date.getMinutes()}PM`
                      : `${date.getHours()}:${date.getMinutes()}AM`;

                  return days === 1 ? time : date.toLocaleDateString();
                }),

                datasets: [
                  {
                    data: historicalData.map((coin) => coin[1]),
                    label: `Price (Past ${days} Days) in ${currency}`,
                    borderColor: "#eebc1d",
                    pointBorderColor: "#eebc1d",
                    backgroundColor: "#EEBC1D",
                  },
                ],
              }}
              options={{
                plugins: {
                  legend: {
                    display: true,
                  },
                },
                scales: {
                  y: {
                    // min :
                  },
                },

                elements: {
                  point: {
                    radius: 1,
                  },
                },
                tooltips: {
                  enabled: true,
                  mode: "index",
                },
              }}
            />
          </div>
        )}
      </div>
      <div className="text-white flex gap-5 font-bold  justify-evenly ">
        {chartDays.map((day) => (
          <div className=" cursor-pointer border-1 border-yellowc py-2 px-7 rounded-md  hover:bg-yellowc">
            <Selectbtn day={day} setDays={setDays} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chart;
