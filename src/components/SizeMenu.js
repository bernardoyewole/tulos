import { IoCloseOutline } from 'react-icons/io5';
import { AsyncImage } from 'loadable-image';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../provider/CartProvider';
import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useAuth } from '../provider/AuthProvider';

function SizeMenu({ isOpen, product, setSize, selectedSize, closeMenu }) {
    const [errorMessage, setErrorMessage] = useState('');
    const { addToCart } = useCart();
    const { email } = useAuth();
    const navigate = useNavigate();

    const goToCart = () => {
        navigate('/cart');
        toast.dismiss();
    }

    const addToBag = async () => {
        if (selectedSize === null || selectedSize.length === 0) {
            setErrorMessage('Please select a size');
            return;
        }

        const productObj = {
            userEmail: email,
            hmProductId: product.hmProductId,
            name: product.name,
            imageUrl: product.imageUrl,
            price: product.price,
            size: selectedSize,
            sizeVariants: product.sizeVariants,
            color: product.color
        }

        setSize(null);

        const result = await addToCart(productObj);

        if (result) {
            toast.custom(
                <div onClick={goToCart} className="flex p-6 gap-4 w-[340px] bg-white shadow-md cursor-pointer">
                    <div className="w-[40%]">
                        <img className="w-[100%]" src={productObj.imageUrl} />
                    </div>
                    <div>
                        <p className="text-sm">{productObj.name}</p>
                        <p className="mb-3 text-sm font-semibold">{productObj.price}</p>
                        <div className="flex gap-2 text-xs">
                            <p className="flex flex-col gap-1">
                                <span>Colour</span>
                                <span>Size</span>
                                <span>quantity</span>
                            </p>
                            <p className="flex flex-col gap-1">
                                <span>{productObj.color}</span>
                                <span>{productObj.size}</span>
                                <span>{productObj.quantity}</span>
                            </p>
                        </div>
                    </div>
                </div>,
                {
                    duration: 2000,
                    position: 'right-top',
                    backgroundColor: 'white'
                }
            );

            setSize(null);
            setTimeout(() => closeMenu(), 3000);
        }
    }

    const handleSize = (size) => {
        setSize(size);

        if (size.length > 0) {
            setErrorMessage('');
        }
    }

    useEffect(() => {
        setErrorMessage('');
    }, [product]);

    return (
        <>
            <div
                className={`fixed inset-0 bg-black transition-opacity duration-500 ${isOpen ? 'opacity-50 visible z-40' : 'opacity-0 invisible'}`}
                onClick={closeMenu}
            />
            <div
                className={`overflow-scroll fixed top-0 right-0 h-full w-[460px] bg-white transition-transform transform ${isOpen ? 'translate-x-0' : 'translate-x-full'
                    } z-50 duration-500`}
            >
                <Toaster />
                <div className="px-4 py-6 flex justify-between items-center">
                    <h2 className="text-center text-[15px] w-full">ADD TO BAG</h2>
                    <button onClick={closeMenu}>
                        <IoCloseOutline className="text-3xl" />
                    </button>
                </div>

                <div className="p-4">
                    <Link to={`/product/${product.hmProductId}`} className="flex gap-4">
                        <AsyncImage
                            src={product.imageUrl}
                            style={{ width: '60%', height: "300px", objectFit: 'cover' }}
                            loader={<div style={{ background: '#ededed' }} />}
                        />
                        <div>
                            <h3 className="text-md font-semibold uppercase">{product.name}</h3>
                            <p className="text-lg">$74.99</p>
                            <p className="text-sm">Selected Colour: {product.color}</p>
                        </div>
                    </Link>

                    <div className="mt-6">
                        <h4 className="text-sm font-semibold mb-2">SELECT SIZE</h4>
                        <div className="grid grid-cols-4 gap-1">
                            {product.sizeVariants && product.sizeVariants.length > 0 ? product.sizeVariants.map((size) => (
                                <button
                                    key={size}
                                    className={`py-3 px-4 text-sm font-semibold border hover:border-black transition-colors duration-200 ${selectedSize === size && 'border-black'}`}
                                    onClick={() => handleSize(size)}
                                >
                                    {size}
                                </button>
                            )) :
                                <button
                                    className="py-2 px-4 border text-sm hover:border-black transition-colors duration-200"
                                >
                                    NO SIZE
                                </button>
                            }
                        </div>
                        <p className='text-sm text-red-600 h-4 pt-2'>{errorMessage.length > 0 && errorMessage}</p>
                    </div>

                    <div className="mt-4">
                        <button onClick={addToBag} className="w-full bg-black text-white py-3 font-semibold mb-4">
                            ADD TO BAG
                        </button>
                        <button className="w-full border border-black py-3 font-semibold">
                            <Link to={`/product/${product.hmProductId}`} className='block'>
                                GO TO PRODUCT
                            </Link>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
export default SizeMenu;