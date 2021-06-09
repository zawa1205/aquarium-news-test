import React from "react";
import logo from '../img/pngn.png';

export default function Body() {
    return (
        <header className="header">
        <img src={logo} className="logo" alt="logo" />
        <h1 className="title">水族館DB(α)</h1>
      </header>
    );
  }