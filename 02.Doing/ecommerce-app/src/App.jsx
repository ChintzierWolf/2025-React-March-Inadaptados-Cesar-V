import BannerCarousel from "./components/BannerCarousel/BannerCarousel";
import Button from "./components/common/Button";

function App() {
  const images = [
    {
      image:
        "https://help.rangeme.com/hc/article_attachments/360006928633/what_makes_a_good_product_image.jpg",
      title: "Cámara",
      description: "Camara Pro",
    },
    {
      image:
        "https://www.lezzat.co.uk/wp-content/uploads/2021/03/Amazon-Product-Photography-Agency-UK-1.jpg",
      title: "Cámara menos pro",
      description: "Camara menos Pro",
    },
  ];

  function click() {
    alert("OK");
  }

  return (
    <div className="App">
      <BannerCarousel banners={images} />
      <Button type="submit" disabled={false} onClick={click}>
        OK
      </Button>
    </div>
  );
}

export default App;
