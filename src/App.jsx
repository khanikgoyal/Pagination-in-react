import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {ProductCard} from './components/ProductCard';
import { PageContainer } from './components/pageContainer';

const PAGE_SIZE=10;

function App() {
  const [products, setporducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0); 

  const fetchData = async()=>{
    const data = await fetch("https://dummyjson.com/products?limit=200");
    const json = await data.json();
    setporducts(json.products);
  }
  useEffect(() => {
    fetchData();
  },[])

  const totalProducts = products.length;
  const totalPages = Math.ceil(totalProducts/PAGE_SIZE);

  const start = currentPage*PAGE_SIZE;
  const end = start + PAGE_SIZE;

  const handleClick = (n)=>{
    setCurrentPage(n)
  }

  const gotoPreviousPage=()=>{
    setCurrentPage((prev)=>prev-1)
  }

  const gotoNextPage=()=>{
    setCurrentPage((prev)=>prev+1)
  }

  return !products.length? (<h1>No product founds</h1>) : (
    <>
      <PageContainer
        currentPage={currentPage}
        totalPages={totalPages}
        products={products}
        start={start}
        end={end}
        handleClick={handleClick}
        gotoPreviousPage={gotoPreviousPage}
        gotoNextPage={gotoNextPage}
      />
    </>
  )
}

export default App
