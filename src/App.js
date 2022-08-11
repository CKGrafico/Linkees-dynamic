import React from "react";
import Card from "./components/Card";
import Footer from "./components/Footer";
import Header from "./components/Header";
import linksInfo from "./links.json";

import "./css/normalize.css";
import "./css/skeleton.css";

function App() {
  return (
    <div className="App">
      <Header />
      <div className="container row">
        {linksInfo.items.map((item, i) => {
          return <Card i={i} title={item.title} subtitle={item.subtitle} link={item.link} microlink={item.microlink}></Card>;
        })}
      </div>
      <Footer />
    </div>
  );
}

export default App;
