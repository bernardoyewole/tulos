import axios from 'axios';
import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Header from "./components/Header";
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Product from './pages/Product';
import Explore from './pages/Explore'
import ResetPassword from './pages/ResetPassword';
import Account from './pages/Account';
import { useAuth } from './provider/AuthProvider';
import Favorites from './pages/Favorites';
import Cart from './pages/Cart';
import toast, { Toaster } from 'react-hot-toast';
import SearchExplore from './pages/SearchExplore';

function App() {
  const [baseApparel, setBaseApparel] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [likedProducts, setLikedProducts] = useState([]);
  const [likedProductIds, setLikedProductIds] = useState([]);
  const [username, setUsername] = useState('');

  const navigate = useNavigate();
  const { email, isAuthenticated } = useAuth();

  const fetchBaseApparel = async (currentPage = 0) => {
    const optionsBaseApparel = {
      method: 'GET',
      url: process.env.REACT_APP_API_URL,
      params: {
        country: 'ca',
        lang: 'en',
        page: currentPage,
        pagesize: '30',
        sort: 'newProduct',
        categoryId: 'ladies_newarrivals'
      },
      headers: {
        'x-rapidapi-key': process.env.REACT_APP_API_KEY,
        'x-rapidapi-host': process.env.REACT_APP_API_HOST
      }
    };

    try {
      const response = await axios.request(optionsBaseApparel);
      const baseApparel = [...response.data.plpList.productList];
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
        'x-rapidapi-key':  process.env.REACT_APP_API_KEY,
        'x-rapidapi-host': process.env.REACT_APP_API_HOST
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

  const updateNewArrivals = async (baseApparel) => {
    const validNewArrivals = [];

    // Collect items marked as "New Arrival"
    for (let index = 0; index < baseApparel.length; index++) {
      const item = baseApparel[index];
      if (item.sellingAttributes && item.sellingAttributes.includes('New Arrival')) {
        validNewArrivals.push(item);
      }
    }

    // If we don't have enough new arrivals, add items that are not "New Arrival"
    if (validNewArrivals.length < 10) {
      const fillers = baseApparel.filter(
        (item) => !item.sellingAttributes || !item.sellingAttributes.includes('New Arrival')
      );

      let fillerIndex = 0;
      while (validNewArrivals.length < 10) {
        // Stop if we run out of fillers
        if (fillerIndex >= fillers.length) break;

        validNewArrivals.push(fillers[fillerIndex]);
        fillerIndex++;
      }
    }

    return validNewArrivals;
  };


  useEffect(() => {
    const fetchInitialData = async () => {
      const baseApparel = await fetchBaseApparel();
      const newArrivals = await updateNewArrivals(baseApparel);

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
      const response = await axios.post('https://tulosapi.azurewebsites.net/api/Favorite/addToFavorite', product);
      if (response.status === 200) {
        fetchFavorites();
        return response.data;
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleShopNow = () => {
    const selectedCategory = categories.find(c => c.CatName === "Women");
    const menu = selectedCategory.CatName;
    const category = selectedCategory.CategoriesArray[0].CatName;
    const subcategory = selectedCategory.CategoriesArray[0].CategoriesArray[0].CatName;
    if (menu !== undefined && category !== undefined && subcategory !== undefined) {
      navigate(`explore/${menu}/${category}/${subcategory}`);
    }
  }

  const handleShop = (categoryName) => {
    const selectedCategory = categories.find(c => c.CatName === categoryName);
    const menu = selectedCategory.CatName;
    const category = selectedCategory.CategoriesArray[0].CatName;
    const subcategory = selectedCategory.CategoriesArray[0].CategoriesArray[0].CatName;

    if (menu && category && subcategory) {
      navigate(`explore/${menu}/${category}/${subcategory}`);
    }
  }

  const fetchFavorites = async () => {
    if (isAuthenticated) {
      try {
        const response = await axios.get(`https://tulosapi.azurewebsites.net/api/Favorite/${email}`);

        if (response.status === 200) {
          const favorites = response.data;
          const likedProductIds = favorites.map(fav => fav.hmProductId);

          setLikedProducts(favorites);
          setLikedProductIds(likedProductIds);
        }
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    } else {
      setLikedProducts([]);
    }
  }

  const handleSearch = (queryText) => {
    navigate(`/searchExplore/${queryText}`);
  }

  useEffect(() => {
    fetchFavorites();

    if (email !== null && isAuthenticated) {
      getUserInfo();
    }
  }, [email, isAuthenticated]);


  const getUserInfo = () => {
    axios.get(`https://tulosapi.azurewebsites.net/api/User/${email}`)
      .then(res => {
        if (res.status === 200) {
          setUsername(`${res.data.firstName} ${res.data.lastName}`);
        }
      })
      .catch(err => {
        console.log(err.response);
      });
  }

  const showWelcomeMessage = () => {
    toast.custom(
      <div className="w-[300px] bg-green-300 shadow-md">
        <p className='text-[15px] text-center py-6'>Welcome, {username}!</p>
      </div>,
      {
        duration: 3000,
        position: 'right-top',
        backgroundColor: 'white'
      }
    );
  }

  return (
    <ScrollToTop>
      <Toaster />
      <Header
        categories={categories}
        onOpenModal={onOpenSignInModal}
        onCloseModal={onCloseSignInModal}
        isModalOpen={isModalOpen}
        handleSearch={handleSearch}
        welcomeUser={showWelcomeMessage}
      />
      <Routes>
        <Route
          path='/'
          element={<Home
            newArrivals={newArrivals}
            shopNow={handleShopNow}
            shop={handleShop}
          />}
        />
        <Route
          path='/product/:productCode'
          element={<Product
            addToFavorite={addToFavorite}
            likedProductIds={likedProductIds}
            onOpenModal={onOpenSignInModal} />}
        />
        <Route
          path='/explore/:menu/:category/:subcategory'
          element={<Explore
            categories={categories}
            onOpenModal={onOpenSignInModal}
            addToFavorite={addToFavorite}
            likedProductIds={likedProductIds}
            updateLikedProducts={setLikedProducts} />}
        />
        <Route
          path='/searchExplore/:query'
          element={<SearchExplore
            onOpenModal={onOpenSignInModal}
            addToFavorite={addToFavorite}
            likedProductIds={likedProductIds}
            updateLikedProducts={setLikedProducts}
            shopNow={handleShopNow}
          />}
        />
        <Route
          path='/favorites'
          element={<Favorites
            likedProducts={likedProducts}
            likedProductIds={likedProductIds}
            addToFavorite={addToFavorite}
            onOpenModal={onOpenSignInModal}
            shopNow={handleShopNow}
          />}
        />
        <Route
          path='/cart'
          element={<Cart
            likedProducts={likedProducts}
            likedProductIds={likedProductIds}
            addToFavorite={addToFavorite}
            onOpenModal={onOpenSignInModal}
            shopNow={handleShopNow}
          />}
        />
        <Route
          path='/resetPassword'
          element={<ResetPassword />}
        />
        <Route
          path='/account'
          element={<Account />}
        />
      </Routes>
      <Footer />
    </ScrollToTop>
  );
}

export default App;
