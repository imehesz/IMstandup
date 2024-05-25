import React, { useState, useEffect } from 'react';
import { fetchDataFromSheet, getPropFromDriveData } from '../utils/imxUtil';
import loadConfig from '../utils/config';

import "../styles/promo-header.css"

const PromoHeader = () => {
  const [promoBgImg, setPromoBgImg] = useState('https://i.imgur.com/vD0Kur7.jpg');
  const [showTitle, setShowTitle] = useState(false);

  useEffect(() => {
    const fetchPromoData = async () => {
      const config = await loadConfig();
      const data = await fetchDataFromSheet(`${config.G_SHEET}/values/Sheet1!A1:D500?key=${config.API_KEY}`);
      const bgImg = getPropFromDriveData(data, 'promoBgImg');
      const titleVisible = getPropFromDriveData(data, 'showTitle');

      setPromoBgImg(bgImg || 'https://i.imgur.com/vD0Kur7.jpg');
      setShowTitle(titleVisible);
    };

    fetchPromoData();
  }, []);

  return (
    /* <section className="module content" style={{ backgroundImage: `url(${promoBgImg})` }}> */
    <section className="module content promo-header">
      <div className="parallax-container">
        {showTitle && <h1>IMRE MEHESZ</h1>}
        <small>comedian \\ actor \\ male model \\ blue steel</small>
        <br /><br />
        <p>
          Fighting communism, death and babies one joke at a time.
          <br /><br />
          <a href="#bookme" className="btn btn-large">BOOK ME!</a>
          <br /><br />
        </p>
      </div>
    </section>
  );
};

export default PromoHeader;
