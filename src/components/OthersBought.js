import { Link } from "react-router-dom";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { AsyncImage } from 'loadable-image';
import { useAuth } from "../provider/AuthProvider";

function OthersBought({ OthersBought, addToFavorite, likedProducts, onOpenModal }) {
    const { email, isAuthenticated } = useAuth();

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        swipeToSlide: true,
        responsive: [
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                },
            },
        ],
    };

    const handleLike = (item) => {
        if (!isAuthenticated) {
            onOpenModal();
            return;
        }

        const itemObj = {
            userEmail: email,
            hmProductId: item.defaultArticle.code,
            name: item.name,
            imageUrl: item.defaultArticle.images[0].baseUrl || item.galleryImages[0].baseUrl,
            price: item.whitePrice.price
        }

        addToFavorite(itemObj);
    }

    return (
        <section className="my-container my-20">
            <h2 className="font-semibold text-lg pb-4">Others Also Bought</h2>
            <Slider {...settings}>
                {OthersBought.map((item) => (
                    <div key={item.code} className="relative">
                        <Link to={`/product/${item.defaultArticle.code}`} className='cursor-pointer'>
                            <AsyncImage
                                src={item.defaultArticle.images[0].baseUrl} alt={item.name}
                                style={{ width: '100%', height: "auto", aspectRatio: 11 / 16 }}
                                loader={<div style={{ background: '#ededed' }} />}
                                error={
                                    <AsyncImage
                                        src={item.galleryImages[0].baseUrl}
                                        style={{ width: '100%', height: "auto", aspectRatio: 11 / 16 }}
                                        loader={<div style={{ background: '#ededed' }} />}
                                    />
                                }
                            />
                            {likedProducts.includes(item.defaultArticle.code) ? (
                                <IoMdHeart
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleLike(item);
                                    }}
                                    className="absolute top-3 right-4 text-2xl text-red-500 fill-current hover:text-red-600 cursor-pointer"
                                />
                            ) : (
                                <div className="group">
                                    <IoMdHeartEmpty
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleLike(item);
                                        }}
                                        className="absolute top-3 right-4 text-2xl text-gray-600 group-hover:hidden"
                                    />
                                    <IoMdHeart
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleLike(item);
                                        }}
                                        className="absolute top-3 right-4 text-2xl text-red-500 cursor-pointer hidden group-hover:block"
                                    />
                                </div>
                            )}
                        </Link>
                        <p className='pt-2 text-[13px]'>{item.name}</p>
                        <p>${item.whitePrice.value}</p>
                    </div>
                ))}
            </Slider>
        </section>
    )
}

export default OthersBought