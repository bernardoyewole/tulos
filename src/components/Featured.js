import menBg from '../images/men-2.jpg';
import womenBg from '../images/women-2.jpg';
import kidsBg from '../images/kids-2.jpg';
import homeBg from '../images/home.jpg';

function Featured({ shop }) {
    return (
        <section className="pb-16 md:pb-20">
            <h2 className="text-center text-3xl md:text-4xl">FEATURED COLLECTION</h2>
            <p className="text-sm text-gray-600 text-center pt-2 pb-6 md:pb-10">
                Dare to mix and match! Check our collections to level up your fashion game
            </p>

            <div className="my-container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                {[
                    { bg: menBg, title: 'MEN', action: () => shop('Men') },
                    { bg: womenBg, title: 'WOMEN', action: () => shop('Women') },
                    { bg: kidsBg, title: 'KIDS', action: () => shop('Kids') },
                    { bg: homeBg, title: 'HOME', action: () => shop('Home') },
                ].map(({ bg, title, action }) => (
                    <button
                        key={title}
                        onClick={action}
                        className="relative group w-full h-[400px] overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-black/30"></div>
                        <img
                            src={bg}
                            alt={`${title} collection`}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute text-center left-1/2 transform -translate-x-1/2 bottom-4">
                            <h3 className="font-semibold text-2xl md:text-[26px] text-white pb-2 md:pb-4">{title}</h3>
                        </div>
                    </button>
                ))}
            </div>
        </section>
    );
}

export default Featured;
