useEffect(() =>
{
    async function fetchData() 
    {
        const response = await fetch ("https://api.com/datos");
        const data = await response.json();
        console.log(data);    
    }

}, []);