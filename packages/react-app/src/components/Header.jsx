import { PageHeader } from "antd";
import React from "react";
import { BrowserRouter, Link } from "react-router-dom";
import './Header.css';

// displays a page header

export default function Header({ setRoute }) {

  const generateLogoLink = () => {
    return (
      <Link
        onClick={() => {
          setRoute("/");
        }}
        to="/"
      >
        <h1>Logo</h1>
      </Link>
    );
  };

  return (
      <header>
        <BrowserRouter>
          {generateLogoLink()}
        </BrowserRouter>
      </header>
  );
}
