import { useNavigate } from "react-router-dom";
import { LiaHeart } from "react-icons/lia";
import { PiArrowLeftLight } from "react-icons/pi";
import { PiArrowRightLight } from "react-icons/pi";
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

function OthersBought({ OthersBought }) {
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
            <h2 className="font-semibold text-lg pb-4">Others Also Bought</h2>
            <Slider {...settings}>
                {OthersBought.map((item) => (
                    <div key={item.code}>
                        <div className='relative cursor-pointer' onClick={() => handleNavigation(item.defaultArticle.code)}>
                            <img src={item.defaultArticle.images[0].baseUrl} alt={item.name} />
                            <LiaHeart className='absolute bottom-3 right-4 text-gray-600 text-2xl ' />
                        </div>
                        <p className='pt-2 text-[13px]'>{item.name}</p>
                        <p>${item.whitePrice.value}</p>
                    </div>
                ))}
            </Slider>
        </section>
    )
}

export default OthersBought