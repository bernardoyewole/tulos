import { useNavigate } from "react-router-dom";
import { LiaHeart } from "react-icons/lia";
import { PiArrowLeftLight } from "react-icons/pi";
import { PiArrowRightLight } from "react-icons/pi";
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

function StyleWith({ styleWithList }) {
    console.log(styleWithList);
    const navigate = useNavigate();

    const handleNavigation = (code) => {
        navigate(`/product/${code}`);
    }

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

    return (
        <section className="my-container my-20">
            <h2 className="font-semibold text-lg pb-4">Style With</h2>
            <Slider {...settings}>
                {styleWithList.map((style) => (
                    <div key={style.code}>
                        <div className='relative cursor-pointer' onClick={() => handleNavigation(style.code)}>
                            <img src={style.articlesList.find(x => x.code === style.code).fabricSwatchThumbnails[0].baseUrl} alt={style.name} />
                            <LiaHeart className='absolute bottom-3 right-4 text-gray-600 text-2xl ' />
                        </div>
                        <p className='pt-2 text-[13px]'>{style.name}</p>
                        <p>${style.whitePrice.price}</p>
                    </div>
                ))}
            </Slider>
        </section>
    )
}

export default StyleWith