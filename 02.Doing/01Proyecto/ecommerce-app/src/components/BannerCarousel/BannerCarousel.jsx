import React from "react";
import './BannerCarousel.css';

export default function BannerCarousel({banners})
{
  return(
    <div className="banner-carousel">
        {banners.map((banner, index) => {
          return(
            <div key={index} className="banner">
               <img src={banner.image} alt={banner.title}/>
               <h2>{banner.title}</h2>
               <p>{banner.description}</p>
            </div>
          );
        })}
    </div>
  );
}