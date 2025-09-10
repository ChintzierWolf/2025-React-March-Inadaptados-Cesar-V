import Button from "../atomos/Button";

export function Card ({title, description, imgUrl, onButtonClick}) 
{
    return(
        <div>
            <img src = {imgUrl}/>
            <h3>{title}</h3>
            <p>{description}</p>
            <Button label="Ver más" onClick={onButtonClick}></Button>
        </div>
    );    
}