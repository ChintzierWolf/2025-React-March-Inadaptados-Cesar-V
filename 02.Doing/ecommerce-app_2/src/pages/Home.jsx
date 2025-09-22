import { useEffect } from "react";
import BannerCarousel from "../components/BannerCarousel";
import homeImages from "../data/homeImages.json";
import { fetchProducts } from "../services/productService";

export default function Home() {

  useEffect (() => {
    const loadProducts = async () => 
    {
      try 
      {
        const productData = await fetchProducts();
      } 
      
      catch (error) 
      {
        console.log(error);
      }  
    }

    loadProducts();
  }, []);

  return (<div>
    <BannerCarousel banners={homeImages} />
  </div>);
}