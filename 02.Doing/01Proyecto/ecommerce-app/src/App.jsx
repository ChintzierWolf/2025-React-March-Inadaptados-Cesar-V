// import logo from './logo.svg';
// import './App.css';

import BannerCarousel from "./components/BannerCarousel/BannerCarousel";
import Button from "./components/Common/Button";

/*
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
*/

function App() 
{
  const images = [
  {
    image: "https://www.memoflores.com/wp-content/uploads/camaras-2016-3.jpg",
    title: "Cámara",
    description:"Cámara Pro",
  },
  {
    image: "https://images-na.ssl-images-amazon.com/images/I/91b1trIE1jL._SL1500_.jpg",
    title: "Cámara menos pro",
    description:"Cámara Menos Pro",
  },
];

function click()
{
  alert("OK");
}

return (
  <div className="App">
    <BannerCarousel banners={images}/>
    <Button type="submit" disable = {false} onClick={click}>
      OK
    </Button>  
  </div>
  );
};

export default App;