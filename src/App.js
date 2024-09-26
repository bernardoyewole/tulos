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
import Account from './pages/Account';
import { useAuth } from './provider/AuthProvider';

function App() {
  const [baseApparel, setBaseApparel] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [likedProducts, setLikedProducts] = useState([]);
  const [addToFavoriteTrigger, setAddToFavoriteTrigger] = useState(false);

  const { email, isAuthenticated } = useAuth();

  const fetchBaseApparel = async (currentPage = 0) => {
    const optionsBaseApparel = {
      method: 'GET',
      url: process.env.REACT_APP_API_URL,
      params: {
        country: 'ca',
        lang: 'en',
        currentpage: currentPage,
        pagesize: '30',
      },
      headers: {
        'x-rapidapi-key': process.env.REACT_APP_API_KEY,
        'x-rapidapi-host': process.env.REACT_APP_API_HOST
      }
    };

    try {
      const response = await axios.request(optionsBaseApparel);
      const baseApparel = [...response.data.results];
      setBaseApparel(prev => [...prev, ...baseApparel]);
      return baseApparel;
    }
    catch (error) {
      console.error(error);
      return [];
    }
  };

  const fetchCategories = async () => {
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

  const updateNewArrivals = async (baseApparel, currentPage) => {
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

    // If we don't have enough new arrivals, fetch more from the next page
    if (validNewArrivals.length < 10 && currentPage < 5) {
      const nextPage = currentPage + 1;
      const moreBaseApparel = await fetchBaseApparel(nextPage);
      const moreNewArrivals = await updateNewArrivals(moreBaseApparel, nextPage);
      const remainingCount = 10 - validNewArrivals.length;
      const remainderNewArrivals = moreNewArrivals.slice(0, remainingCount);

      return [...validNewArrivals, ...remainderNewArrivals];
    }


    return validNewArrivals;
  };

  useEffect(() => {
    const fetchInitialData = async () => {
      const baseApparel = await fetchBaseApparel();
      const newArrivals = await updateNewArrivals(baseApparel, 0);
      setNewArrivals(newArrivals);
      fetchCategories();
    };

    fetchInitialData();
  }, []);

  const onOpenSignInModal = () => {
    setIsModalOpen(true);
  }

  const onCloseSignInModal = () => {
    setIsModalOpen(false);
  }

  const addToFavorite = async (product) => {
    try {
      const response = await axios.post('https://localhost:44397/api/Favorite/addToFavorite', product);
      if (response.status === 200) {
        setAddToFavoriteTrigger(!addToFavoriteTrigger);
        return response.data;
      }
    } catch (error) {
      console.log(error);
      // return error.response.data;
    }
  }

  useEffect(() => {
    const fetchFavorites = async () => {
      if (isAuthenticated) {
        try {
          const response = await axios.get(`https://localhost:44397/api/Favorite/${email}`);

          if (response.status === 200) {
            const favorites = response.data;
            const likedProductIds = favorites.map(fav => fav.hmProductId);
            setLikedProducts(likedProductIds);
          }
        } catch (error) {
          console.error("Error fetching favorites:", error);
        }
      } else {
        setLikedProducts([]);
      }
    };

    fetchFavorites();
  }, [email, isAuthenticated, addToFavoriteTrigger]);

  return (
    <Router>
      <ScrollToTop>
        <Header categories={categories} onOpenModal={onOpenSignInModal} onCloseModal={onCloseSignInModal} open={isModalOpen} />
        <Routes>
          <Route path='/' element={<Home newArrivals={newArrivals} onOpenModal={onOpenSignInModal} addToFavorite={addToFavorite} likedProducts={likedProducts} updateLikedProducts={setLikedProducts} />} />
          <Route path='/product/:productCode' element={<Product addToFavorite={addToFavorite} likedProducts={likedProducts} />} />
          <Route path='/explore/:menu/:category/:subcategory' element={<Explore categories={categories} />} />
          <Route path='/resetPassword' element={<ResetPassword />} />
          <Route path='/account' element={<Account />} />
        </Routes>
        <Footer />
      </ScrollToTop>
    </Router>
  );
}

export default App;
