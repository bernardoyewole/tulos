import { useEffect, useState } from "react"

function Gallery({ gallery }) {
    return (
        <div className='grid grid-cols-2 gap-1 w-[60%]'>
            {gallery && gallery.map((gallery, index) => (
                <div key={gallery.id}>
                    <img src={gallery.baseUrl} />
                </div>
            ))}
        </div>
    )
}

export default Gallery