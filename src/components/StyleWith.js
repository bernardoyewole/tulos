import { Link } from "react-router-dom";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { PiArrowLeftLight } from "react-icons/pi";
import { PiArrowRightLight } from "react-icons/pi";
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { AsyncImage } from 'loadable-image';
import { useAuth } from "../provider/AuthProvider";

function StyleWith({ styleWithList, addToFavorite, likedProducts, onOpenModal }) {
    const { email, isAuthenticated } = useAuth();
    console.log(likedProducts);
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        swipeToSlide: true,
        draggable: false,
        nextArrow: (
            <div>
                <div className="prev-slick-arrow"><PiArrowRightLight /></div>
            </div>
        ),
        prevArrow: (
            <div>
                <div className="prev-slick-arrow"><PiArrowLeftLight /></div>
            </div>
        ),
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    const handleLike = (style) => {
        if (!isAuthenticated) {
            onOpenModal();
            return;
        }

        const styleObj = {
            userEmail: email,
            hmProductId: style.code,
            name: style.name,
            imageUrl: style.articlesList.find(x => x.code === style.code).fabricSwatchThumbnails[0].baseUrl || style.articlesList.find(x => x.code === style.code).galleryDetails[0].baseUrl,
            price: style.whitePrice.price
        }

        addToFavorite(styleObj);
    }

    return (
        <section className="my-container my-20">
            <h2 className="font-semibold text-lg pb-4">Style With</h2>
            <Slider {...settings}>
                {styleWithList.map((style) => {
                    if (!style) return null;
                    return (
                        <div key={style.code} className="relative">
                            <Link to={`/product/${style.code}`} className='cursor-pointer'>
                                {style.articlesList && style.articlesList.length > 0 && style.articlesList[0].fabricSwatchThumbnails.length > 0 && (
                                    <AsyncImage
                                        src={style.articlesList.find(x => x.code === style.code).fabricSwatchThumbnails[0].baseUrl}
                                        style={{ width: '100%', height: "auto", aspectRatio: 11 / 16 }}
                                        loader={<div style={{ background: '#ededed' }} />}
                                        error={
                                            <AsyncImage
                                                src={style.articlesList.find(x => x.code === style.code).galleryDetails[0].baseUrl}
                                                style={{ width: '100%', height: "auto", aspectRatio: 11 / 16 }}
                                                loader={<div style={{ background: '#ededed' }} />}
                                            />
                                        }
                                    />
                                )}
                                {likedProducts.includes(style.code) ? (
                                    <IoMdHeart
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleLike(style);
                                        }}
                                        className="absolute top-3 right-4 text-2xl text-red-500 fill-current hover:text-red-600 cursor-pointer"
                                    />
                                ) : (
                                    <div className="group">
                                        <IoMdHeartEmpty
                                            onClick={(e) => {
                                                e.preventDefault();
                                                handleLike(style);
                                            }}
                                            className="absolute top-3 right-4 text-2xl text-gray-600 group-hover:hidden"
                                        />
                                        <IoMdHeart
                                            onClick={(e) => {
                                                e.preventDefault();
                                                handleLike(style);
                                            }}
                                            className="absolute top-3 right-4 text-2xl text-red-500 cursor-pointer hidden group-hover:block"
                                        />
                                    </div>
                                )}
                            </Link>
                            <p className='pt-2 text-[13px]'>{style.name}</p>
                            <p>${style.whitePrice?.price}</p>
                        </div>
                    );
                })}
            </Slider>
        </section>
    )
}

export default StyleWith