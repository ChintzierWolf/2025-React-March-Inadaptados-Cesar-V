import React from 'react';

export default function PhotoViewer({ photo, onClose }) {
    if (!photo) return null;
    
    return (
        <div style={{ 
            position: 'fixed', 
            top: 0, 
            left: 0, 
            width: '100%', 
            height: '100%', 
            backgroundColor: 'rgba(0, 0, 0, 0.8)', 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            flexDirection: 'column' 
        }}>
            <img src={photo.url} alt={photo.title} width={800} height={600} style={{ objectFit: 'contain' }}/>
            <button onClick={onClose} 
            style={{ 
                marginTop: '10px', 
                padding: '10px 20px', 
                backgroundColor: 'red', 
                color: 'white', 
                border: 'none', 
                borderRadius: '5px', 
                cursor: 'pointer' 
            }}>Close</button>
        </div>
    );
}