import { AsyncImage } from 'loadable-image';
import { Link } from 'react-router-dom';
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { HiOutlineMinus, HiOutlinePlus } from "react-icons/hi2";
import { useCart } from '../provider/CartProvider';

function CartItem({ item, likedProductIds, likeProduct }) {
    const { addToCart, removeFromCart } = useCart();

    const handleAddItem = (product) => {
        addToCart(product);
    }

    const handleRemoveItem = (itemId) => {
        removeFromCart(itemId);
    }

    const handleLike = (item) => {
        delete item.id;
        likeProduct(item);
    }

    return (
        <div>
            <div className='flex gap-6'>
                <Link to={`/product/${item.hmProductId}`} className='relative block cursor-pointer'>
                    <div className="relative w-32 h-[10rem]">
                        <AsyncImage
                            src={item.imageUrl}
                            style={{ width: '100%', height: "100%", objectFit: 'cover' }}
                            loader={<div style={{ background: '#ededed' }} />}
                            error={<div></div>}
                        />
                        {likedProductIds.includes(item.hmProductId) ? (
                            <IoMdHeart
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleLike(item);
                                }}
                                className="absolute top-3 right-4 text-xl text-red-500 fill-current md:hover:text-red-600 cursor-pointer"
                            />
                        ) : (
                            <div className="group">
                                <IoMdHeartEmpty
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleLike(item);
                                    }}
                                    className="absolute top-3 right-4 text-xl text-gray-600 md:group-hover:hidden"
                                />
                                <IoMdHeart
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleLike(item);
                                    }}
                                    className="absolute top-3 right-4 text-xl text-red-500 cursor-pointer hidden md:group-hover:block"
                                />
                            </div>
                        )}
                    </div>
                </Link>
                <div>
                    <div className='text-sm'>
                        <p className='uppercase'>{item.name}</p>
                        <p>{item.price}</p>
                    </div>
                    <div className='flex text-xs gap-2'>
                        <div className='flex flex-col gap-1'>
                            <p>Colour</p>
                            <p>Size</p>
                            <p>Quantity</p>
                            <p>Total</p>
                        </div>
                        <div className='flex flex-col gap-1'>
                            <p>{item.color}</p>
                            <p>{item.size}</p>
                            <p>{item.quantity}</p>
                            <p className='font-bold'>${(Number(item.price) * Number(item.quantity)).toFixed(2)}</p>
                        </div>
                    </div>
                    <div className="flex items-center border border-gray-300 w-32 justify-between p-3 mt-3 hover:border-black transition-colors duration-300">
                        <button onClick={() => handleRemoveItem(item.id)} className="text-2xl font-semibold focus:outline-none">
                            <HiOutlineMinus />
                        </button>
                        <span className="text-lg text-center w-6">{item.quantity}</span>
                        <button onClick={() => handleAddItem(item)} className="text-2xl font-semibold focus:outline-none">
                            <HiOutlinePlus />
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default CartItem;
