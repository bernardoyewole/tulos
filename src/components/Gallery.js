import { useEffect, useState } from "react"

function Gallery({ articles }) {
    const [currentGallery, setCurrentGallery] = useState(null);

    useEffect(() => {
        let firstGallery = articles[0].galleryDetails;

        setCurrentGallery(firstGallery);
    }, []);
    return (
        <div className='grid grid-cols-2 gap-1 w-[60%]'>
            {currentGallery && currentGallery.map((gallery, index) => (
                <div key={gallery.id}>
                    <img src={gallery.baseUrl} />
                </div>
            ))}
        </div>
    )
}

export default Gallery