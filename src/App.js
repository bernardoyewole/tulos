import axios from 'axios';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from "./components/Header";
import Footer from './components/Footer';
import Home from './pages/Home';
import Product from './pages/Product';

function App() {
  const [baseApparel, setBaseApparel] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  const [menApparel, setMenApparel] = useState(null);
  const [womenApparel, setWomenApparel] = useState(null);
  const [kidsApparel, setKidsApparel] = useState(null);

  const options = {
    method: 'GET',
    url: process.env.REACT_APP_API_URL,
    params: {
      country: 'us',
      lang: 'en',
      currentpage: '0',
      pagesize: '30',
    },
    headers: {
      'x-rapidapi-key': process.env.REACT_APP_API_KEY,
      'x-rapidapi-host': process.env.REACT_APP_API_HOST
    }
  };

  useEffect(() => {
    const fetchBaseApparel = async () => {
      try {
        const response = await axios.request(options);
        const baseApparel = [...response.data.results];
        setBaseApparel(baseApparel);

        // setMenApparel(baseApparel.find(x => x.categoryName === 'Men'));
        // setWomenApparel(baseApparel.find(x => x.categoryName === 'Ladies'));
        // setKidsApparel(baseApparel.find(x => x.categoryName === 'Kids'));

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
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<Home newArrivals={newArrivals} />} />
        <Route path='/product/:id' element={<Product />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
