import React from "react";
import { useNavigate } from "react-router-dom";
import { CryptoState } from "../pages/CryptoContext";

const Header = () => {
  const navigate = useNavigate();

  const { currency, setCurrency } = CryptoState();
  return (
    <div className="flex bg-black w-full p-5 justify-between">
      <div
        onClick={() => navigate("/")}
        className="text-yellowc font-extrabold text-3xl cursor-pointer"
      >
        CRYPTO WATCH
      </div>

      <div className="flex gap-8">
        <div className="w-26">
          <label for="CURRENCY"></label>
          <select
            name="INR"
            id="INR"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="w-24 h-10 border-2 outline-none rounded-md border-white bg-black text-white pl-2"
          >
            <option value="INR">INR</option>
            <option value="USD">USD</option>
          </select>
        </div>

        <div>
          <select
            name="Login"
            id="Login"
            className="w-24 h-10 border-0 outline-none rounded-md bg-yellowc pl-2"
          >
            <option value="Login">LOGIN</option>
            <option value="Sign Up">SIGN UP</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Header;
