import axios from 'axios';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from "./components/Header";
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Product from './pages/Product';
import Explore from './pages/Explore'
import AuthProvider from './provider/AuthProvider';
import ResetPassword from './pages/ResetPassword';

function App() {
  const [baseApparel, setBaseApparel] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  const [categories, setCategories] = useState([]);

  const optionsBaseApparel = {
    method: 'GET',
    url: process.env.REACT_APP_API_URL,
    params: {
      country: 'ca',
      lang: 'en',
      currentpage: '0',
      pagesize: '30',
    },
    headers: {
      'x-rapidapi-key': process.env.REACT_APP_API_KEY,
      'x-rapidapi-host': process.env.REACT_APP_API_HOST
    }
  };

  const optionsCategory = {
    method: 'GET',
    url: 'https://apidojo-hm-hennes-mauritz-v1.p.rapidapi.com/categories/list',
    params: {
      lang: 'en',
      country: 'us'
    },
    headers: {
      'x-rapidapi-key': '539f84e7fcmsh4984cab77c02428p1da61ejsnc1e79160e58c',
      'x-rapidapi-host': 'apidojo-hm-hennes-mauritz-v1.p.rapidapi.com'
    }
  };

  useEffect(() => {
    const fetchBaseApparel = async () => {
      try {
        // const response = await axios.request(optionsBaseApparel);
        // const baseApparel = [...response.data.results];
        const baseApparel = [];
        setBaseApparel(baseApparel);
        updateNewArrivals(baseApparel);
      }
      catch (error) {
        console.error(error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.request(optionsCategory);
        const categories = [...response.data];
        const filteredCategories = categories.filter(cat => cat.tagCodes.length > 0).filter(cat => cat.CatName !== 'Divided' && cat.CatName !== 'Beauty' && cat.CatName !== 'Sport')
        setCategories(filteredCategories);
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
    fetchCategories();
  }, []);

  return (
    <AuthProvider>
      <Router>
        <ScrollToTop>
          <Header categories={categories} />
          <Routes>
            <Route path='/' element={<Home newArrivals={newArrivals} />} />
            <Route path='/product/:productCode' element={<Product />} />
            <Route path='/explore/:menu/:category/:subcategory' element={<Explore categories={categories} />} />
            <Route path='/resetPassword' element={<ResetPassword />} />
          </Routes>
          <Footer />
        </ScrollToTop>
      </Router>
    </AuthProvider>
  );
}

export default App;
