import { CryptoState } from "../pages/CryptoContext";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const CoinsTable = ({ currentItems, currency, search, setSearch, loading }) => {
  const { symbol } = CryptoState();
  const navigate = useNavigate();

  const handleRowClick = (id) => {
    navigate(`/coins/${id}`);
  };

  return (
    <div className="w-full p-4 bg-black">
      <div className="text-white flex justify-center text-4xl font-semibold">
        Cryptocurrency Prices By Market Cap
      </div>

      <div className="w-full my-4">
        <input
          className="w-full pl-4 h-14 bg-black border-spacing-1 rounded border text-white"
          type="text"
          value={search}
          placeholder="Search Crypto Currency..."
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <table className="w-full bg-white">
        <thead className="h-14 w-full bg-gold">
          <tr className="bg-gold">
            {["Coin", "Price", "24h Change", "Market Cap"].map(
              (head, index) => (
                <th key={index} className="text-black font-semibold text-lg pl-4">
                  {head}
                </th>
              )
            )}
          </tr>
        </thead>
        <tbody className="bg-black text-white">
          {currentItems.map((row, ridx) => {
            const profit = row.price_change_percentage_24h > 0;
            return (
              <tr
                key={ridx}
                onClick={() => handleRowClick(row.id)}
                className="border-b-2"
              >
                <td className="text-white pl-4">
                  <div className="flex items-center my-2 gap-4">
                    <img
                      src={row?.image}
                      alt={row.name}
                      className="h-14 w-14"
                    />
                    <div>
                      <div className="uppercase text-white ">{row.symbol}</div>
                      <div>{row.name}</div>
                    </div>
                  </div>
                </td>
                <td>
                  {symbol} {numberWithCommas(row.current_price.toFixed(2))}
                </td>
                <td className={profit ? "text-green" : "text-red"}>
                  {profit && "+"}
                  {row.price_change_percentage_24h.toFixed(2)}
                  {"%"}
                </td>
                <td className="text-white ">
                  {symbol}{" "}
                  {numberWithCommas(row.market_cap.toString().slice(0, -6))}{" "}
                  {"M"}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default CoinsTable;
