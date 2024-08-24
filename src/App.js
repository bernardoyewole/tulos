import axios from 'axios';
import { useEffect, useState } from 'react';
import Header from "./components/Header";
import HeroBanner from "./components/HeroBanner";
import NewArrival from "./components/NewArrival";
import NewStore from "./components/NewStore";
import Featured from './components/Featured';

function App() {
  const [baseApparel, setBaseApparel] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  const [menApparel, setMenApparel] = useState(null);
  const [womenApparel, setWomenApparel] = useState(null);
  const [kidsApparel, setKidsApparel] = useState(null);

  const options = {
    method: 'GET',
    url: 'https://apidojo-hm-hennes-mauritz-v1.p.rapidapi.com/products/list',
    params: {
      country: 'us',
      lang: 'en',
      currentpage: '0',
      pagesize: '30',
    },
    headers: {
      'x-rapidapi-key': '539f84e7fcmsh4984cab77c02428p1da61ejsnc1e79160e58c',
      'x-rapidapi-host': 'apidojo-hm-hennes-mauritz-v1.p.rapidapi.com'
    }
  };

  useEffect(() => {
    const fetchBaseApparel = async () => {
      try {
        const response = await axios.request(options);
        const baseApparel = [...response.data.results];
        console.log(baseApparel.length);
        setBaseApparel(baseApparel);

        setMenApparel(baseApparel.find(x => x.categoryName === 'Men'));
        setWomenApparel(baseApparel.find(x => x.categoryName === 'Ladies'));
        setKidsApparel(baseApparel.find(x => x.categoryName === 'Kids'));

        updateNewArrivals(baseApparel);
      }
      catch (error) {
        console.error(error);
      }
    };

    const updateNewArrivals = async (baseApparel) => {
      const validNewArrivals = [];
      let index = 0;

      while (validNewArrivals.length < 10 && index < baseApparel.length) {
        const item = baseApparel[index];
        try {
          await new Promise((resolve, reject) => {
            const img = new Image();
            img.src = item.images[0].baseUrl;
            img.onload = resolve;
            img.onerror = reject;
          });

          if (item.hasOwnProperty('sellingAttributes') && item.sellingAttributes.includes('New Arrival')) {
            validNewArrivals.push(item);
          }

        } catch {
          console.warn(`Image failed to load for item: ${item.code}, trying next item...`);
        }
        index++;
      }

      setNewArrivals(validNewArrivals);
    }

    fetchBaseApparel();
  }, []);

  return (
    <div className="h-full">
      <Header />
      <HeroBanner />
      <NewArrival newArrivals={newArrivals} />
      <NewStore />
      <Featured />
    </div>
  );
}

export default App;
