import React, { useEffect, useState } from "react";

import { motion } from "framer-motion";
import "../css/components.css";
import "../css/normalize.css";
import "../css/skeleton.css";

function Card(props) {
  const [metadata, setMetadata] = useState({});

  const cover = `https://raw.githubusercontent.com/gilbarbara/logos/master/logos/${props.title.toLowerCase()}-icon.svg`;

  const variants = {
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeIn",
        type: "spring",
        stiffness: 50,
      },
    }),
    hidden: { opacity: 0, y: 200 },
  };

  useEffect(() => {
    async function getMetadata() {
      const response = await fetch(`https://api.microlink.io?url=${props.link}%2F&palette=true`);
      const metadata = await response.json();

      const background = metadata.data.logo.background_color.toLowerCase();
      const logo = metadata.data.image ?? metadata.data.logo;

      setMetadata({
        logo: logo.url,
        publisher: metadata.data.publisher,
        colorPrimary: logo.color,
        colorSecondary: background === "#ffffff" || background === "#000000" ? logo.alternative_color : background,
      });

      console.log(metadata);
    }

    getMetadata();
  }, [props.link]);

  return (
    <a href={props.link} target="_blank" rel="noopener noreferrer">
      <motion.div className="Card four columns" initial="hidden" animate="visible" custom={props.i} variants={variants}>
        <div
          className="cover-wrapper"
          style={{
            backgroundImage: `linear-gradient(0deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.2) 100%), linear-gradient(0deg, ${metadata.colorPrimary} 0%, ${metadata.colorSecondary} 100%)`,
          }}
        >
          <div className="cover" style={{ backgroundImage: `url(${metadata.logo})` }}></div>
        </div>
        <div className="data">
          <h2>{props.title}</h2>
          <p>{props.subtitle}</p>
        </div>
      </motion.div>
    </a>
  );
}

export default Card;
