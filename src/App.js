import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import PromoHeader from './components/PromoHeader';
import Section from './components/Section';
import CustomNavbar from './components/Navbar';
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw';
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize';
import loadConfig, { fetchDataFromSheet, getPropFromDriveData } from './utils/config'

import './styles/global.css';

function App() {
    const schema = {
        ...defaultSchema,
        tagNames: [...defaultSchema.tagNames, 'iframe'],
        attributes: {
            ...defaultSchema.attributes,
            iframe: [
                'src',
                'width',
                'height',
                'frameborder',
                'allow',
                'allowfullscreen',
            ],
        }
    }

    const [backgrounds, setBackgrounds] = useState([])
    const [sections, setSections] = useState([])
    const [navLinks, setNavLinks] = useState([])
    const [brand, setBrand] = useState({ label: "IMstandup.com", url: "/" })
    const [showHero, setShowHero] = useState(false)

    useEffect(() => {
        const fetchConfig = async () => {
            const config = await loadConfig();
            const data = await fetchDataFromSheet(`${config.G_SHEET}/values/CONFIG!A1:D500?key=${config.API_KEY}`);
            const bgUrls = getPropFromDriveData(data, 'bgPics');

            setBrand({label: getPropFromDriveData(data, 'brandLabel'), url: getPropFromDriveData(data, 'brandUrl')})
            setBackgrounds(bgUrls.split('\n'));
            setShowHero(getPropFromDriveData(data,'showHero') === 'Y')
        };

        const fetchSections = async () => {
            const config = await loadConfig();
            const data = await fetchDataFromSheet(`${config.G_SHEET}/values/SECTIONS!A1:D500?key=${config.API_KEY}`);

            const rows = data;
            const headers = rows[0];
            const dataRows = rows.slice(1);

            setSections(dataRows.map(row => {
                if(row.length != 0) {
                    return {
                        sectionID: row[0],
                        sectionLabel: row[1],
                        showInNav: row[2] === 'Y',
                        sectionContent: row[3]
                    }
                }
            }).filter(s => s != undefined))
        }

        fetchConfig()
        fetchSections()
    }, []);

    useEffect(() => {
        if (backgrounds.length > 0) {
            const randomIndex = Math.floor(Math.random() * backgrounds.length);
            document.body.style.backgroundImage = `url(${backgrounds[randomIndex]}), url(${backgrounds[randomIndex]})`;
        }

        if(sections.length > 0) {
            setNavLinks(sections.map(s => {
                if(s && s.showInNav) {
                    return { label: s.sectionLabel, url: `#${s.sectionID}` }
                }
            }).filter(s => s != undefined))
        }
    }, [backgrounds, sections]);


  return (
    <div className="App">
        <CustomNavbar links={navLinks} brand={brand} />
        
        { showHero && <PromoHeader /> }

        {sections.map((section) => (
            <Section title={section.sectionLabel} id={section.sectionID} key={section.sectionID}>
                <ReactMarkdown rehypePlugins={[rehypeRaw, [rehypeSanitize, schema]]}>{section.sectionContent}</ReactMarkdown>
            </Section>
        ))}


      <footer>
            Made by <strong>Sad Boi Works</strong> with :) & ♥
      </footer>
    </div>
  );
}

export default App;
