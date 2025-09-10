import './App.css'
import { Card } from './components/moleculas/Card'

function App() 
{
  return (
      <div>
        <Card
          title="Tarjeta del producto 1"
          description= "Esta es una tarjeta de componentes atómicos número1"
          imgUrl="https://via.playsholder.com/300x150"
          onButtonClick={()=>{
            alert('¡Hiciste click en el botón!');
          }}
        ></Card>
        <Card
          title="Tarjeta del producto 2"
          description= "Esta es una tarjeta de componentes atómicos número 2"
          imgUrl="https://via.playsholder.com/300x150"
          onButtonClick={()=>{
            alert('¡Hiciste click en el botón 2!');
          }}
        ></Card>
        <Card
          title="Tarjeta del producto 3"
          description= "Esta es una tarjeta de componentes atómicos número 3"
          imgUrl="https://via.playsholder.com/300x150"
          onButtonClick={()=>{
            alert('¡Hiciste click en el botón 2!');
          }}
        ></Card>
      </div>
  );
}

export default App;