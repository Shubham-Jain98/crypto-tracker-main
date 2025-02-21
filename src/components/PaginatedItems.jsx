import React from "react";
import { useState, useEffect } from "react";
import { CryptoState } from "../pages/CryptoContext";
import { CoinList } from "../config/api";
import { BarLoader } from "react-spinners";
import ReactPaginate from "react-paginate";
import "bootstrap/dist/css/bootstrap.min.css";
import CoinsTable from "./CoinsTable";

const PaginatedItems = () => {
  const [page, setPage] = useState(1);
  const [coins, setCoins] = useState(null);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const { currency } = CryptoState();
  const itemsPerPage = 10;

  const fetchCoins = async () => {
    setLoading(true);

    try {
      const response = await fetch(CoinList(currency));
      const data = await response.json();
      setCoins(data);
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchCoins();
  }, [currency]);

  const handleSearch = () => {
    if (loading || !coins) {
      return [];
    }
    return coins.filter((coin) => {
      return (
        coin.name.toLowerCase().includes(search.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(search.toLowerCase())
      );
    });
  };

  const handlePageClick = ({ selected }) => {
    setPage(selected + 1);
  };

  const pageCount = Math.ceil(handleSearch().length / itemsPerPage);
  const currentItems = handleSearch().slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <div className="flex w-full h-full">
      {!coins ? (
        <BarLoader
          color="yellow"
          height={5}
          width={"100%"}
          speedMultiplier={1.25}
        />
      ) : (
        <div className="flex w-full flex-col relative bottom-1">
          <CoinsTable
            currentItems={currentItems}
            currency={currency}
            search={search}
            setSearch={setSearch}
            loading={loading}
          />
          <div className="flex justify-content-center text-bottom mb-2">
            <ReactPaginate
              breakLabel="..."
              nextLabel=">"
              onPageChange={handlePageClick}
              pageRangeDisplayed={3}
              marginPagesDisplayed={2}
              pageCount={pageCount}
              previousLabel="<"
              renderOnZeroPageCount={null}
              pageClassName="inline-block mx-1 px-3 py-2 rounded-[50%] bg-black"
              pageLinkClassName="block text-yellowc w-full h-full text-center no-underline"
              previousClassName=" text-yellowc inline-block mx-1 px-3 py-1 rounded-lg"
              previousLinkClassName="text-yellowc text-2xl block w-full h-full text-center no-underline"
              nextClassName=" text-yellowc inline-block text-goldc mx-1 px-3 py-1 rounded-lg"
              nextLinkClassName=" text-yellowc w-full h-full text-center no-underline"
              breakClassName=" text-yellowc inline-block mx-1 px-3 py-1 rounded-lg"
              breakLinkClassName=" text-yellowc w-full h-full text-center no-underline text-2xl"
              activeClassName="font-bold border-2 border-gold "
              containerClassName=" flex items-center justify-center"
            />
          </div>
        </div>
      )}
    </div>
  );
};
export default PaginatedItems;
