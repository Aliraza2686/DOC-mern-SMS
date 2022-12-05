
import { useEffect } from 'react';
import HomeBody from './blocks/HomeBody';

const Home = () => {

  
  async function fetchst (){
    fetch('http://localhost:3001/get')
  .then(response => response.json())
  .then(json => console.log(json))
  }
  useEffect(() => {
    fetchst()
  }, [])

    return (
        <div>  
   
             <HomeBody />
       </div>
    )
}

export default Home;