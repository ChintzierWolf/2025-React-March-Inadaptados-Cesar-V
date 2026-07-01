import React from 'react';
import PhotoViewer from './PhotoViewer';

export default function Gallery( photos, onSelect ) {
    return (
        <div>
            <h1>Gallery</h1>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}></div>
            {photos && photos && photos.map(photo => (
                <img
                    key={photo.id}
                    src={photo.url}
                    alt={`Foto ${photo.id}`}
                    title={photo.title}
                    width={200}
                    height={200}
                    loading="lazy"
                    style={{ cursor: 'pointer' , borderRadius: '10px', border: '1px solid #ccc', objectFit: 'cover' }}
                    onClick={() => onSelect(photo)}
                />
            ))}
            <PhotoViewer photo={photo} />
        </div>
    );
}