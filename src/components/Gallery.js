import { AsyncImage } from 'loadable-image'

function Gallery({ gallery }) {
    return (
        <div className='grid grid-cols-2'>
            {gallery && gallery.map(gallery => (
                <div key={gallery.id}>
                    <AsyncImage
                        src={gallery.baseUrl}
                        style={{ width: '100%', height: "auto", aspectRatio: 9 / 16 }}
                        loader={<div style={{ background: '#ededed' }} />}
                    />
                </div>
            ))}
        </div>
    )
}

export default Gallery