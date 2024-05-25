import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import PromoHeader from './components/PromoHeader';
import YoutubeList from './components/YoutubeList';
import Section from './components/Section';
import CustomNavbar from './components/Navbar';

import loadConfig, { fetchDataFromSheet, getPropFromDriveData } from './utils/config'

import './styles/global.css';

function App() {
    const navLinks = [
        { label: "About", url: '#about'},
        { label: "Podcast", url: '#podcast'},
        { label: "Patreon", url: '#patreon'},
        { label: "Shows", url: '#showdates'},
        { label: "Bookings", url: '#bookme'},
    ]

    const brand = { label: "IMstandup.com", url: "/" }

    const [backgrounds, setBackgrounds] = useState([]);

    useEffect(() => {
        const fetchBackgrounds = async () => {
            const config = await loadConfig();
            const data = await fetchDataFromSheet(`${config.G_SHEET}/values/Sheet1!A1:D500?key=${config.API_KEY}`);
            const bgUrls = getPropFromDriveData(data, 'bgPics');
            setBackgrounds(bgUrls.split('\n'));
        };

        fetchBackgrounds();
    }, []);

    useEffect(() => {
        if (backgrounds.length > 0) {
            const randomIndex = Math.floor(Math.random() * backgrounds.length);
            document.body.style.backgroundImage = `url(${backgrounds[randomIndex]})`;
        }
    }, [backgrounds]);


  return (
    <div className="App">
      <CustomNavbar links={navLinks} brand={brand} />

      <PromoHeader />
      
      <Section title="About" id="about">
        <p>
            Imre started out in Jacksonville (FL) as a stand-up comedian and VO Actor. He's been through several comedy contests and featuring mostly in Florida with his Dark-Style jokes.
        </p>
        <p>
            He's the host of the <strong>Rock Bottom Open Mic</strong> at the <a href="https://www.comedyzone.com/" target="_blank">Comedy Zone</a> in Jacksonville on Wednesday nights and the <a href="https://www.facebook.com/groups/HotBreathComedyNetwork" target="_blank">Write 10 After Dark</a> joke writing contest at 10pm EST daily on the <strong>Hot Breath Comedy Network</strong> (over 8000 members!).
        </p>
      </Section>

      <Section title="Podcast" id="podcast">
        <p>
            Just like everybody else Imre also has a podcast called <a href="https://podcasters.spotify.com/pod/show/psst-did-you-hear-that" target="_blank">Psst! Did You Hear That!?</a> Listen to it on Spotify or wherever. <br />
            It's better than Rogan's :P
        </p>
      </Section>

      <Section title="Patreon" id="patreon">
        <p>
            Support Imre at <a href="https://www.patreon.com/imehesz" target="_blank">patreon.com/imehesz</a>. He'll send a Christmas card :)
        </p>
      </Section>

      <Section title="Show Dates / Calendar" id="showdates">
        <p>
            You can always catch him at random open-mics around JAX (FL) or come see him on a date below ...
        </p>

        <iframe
          src="https://calendar.google.com/calendar/embed?src=r81ehf906m133dgb942k6m9kao%40group.calendar.google.com&ctz=America%2FNew_York&mode=AGENDA&bgcolor=%23ff1493&showTabs=0&showTitle=1&showNav=0&showDate=0&showCalendars=0&showPrint=0&color=red"
          style={{ border: 0 }}
          height="600"
          width="100%"
          frameBorder="0"
          scrolling="no"
        ></iframe>
      </Section>

      <Section title="Member of Hot Breath!PRO">
        <p>
            <a href="https://www.joelbyarscomedy.com/" target="_blank">Hot Breath!PRO</a> lead by <strong>Joel Byars</strong> is a dedicated group of standup comedians aiming to produce the highest level of comedy around the world.
        </p>

        <iframe width="100%" height="400" src="//imstandup.com/hbprosmap/"></iframe>
      </Section>
      
      <Section title="Bookings / Social" id="bookme">
        <ul>
          <li>Sign up to my <a href="https://mailchi.mp/e41d5d556175/imstandup-newsletter">NEWSLETTER</a>!</li>
          <li>Facebook: <a href="https://facebook.com/IMstandup" target="_blank">IMstandup</a></li>
          <li>Instagram: <a href="https://instagram.com/imehesz" target="_blank">imehesz</a></li>
          <li>TikTok: <a href="https://www.tiktok.com/@imstandup" target="_blank">IMstandup</a></li>
        </ul>
      </Section>

      <Section title="Clips">
        <YoutubeList />
      </Section>

      <footer>
            Made by <strong>Sad Boi Works</strong> with :) & ♥
      </footer>
    </div>
  );
}

export default App;
