import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const ProductCard =({image, title})=>{
  return(
    <div className='product-card'>
      <img src={image} alt={title} className='product-img'/>
      <span>{title}</span>
    </div>
  )
}

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
      <div className="app">
        <h1>Pagination</h1>
        <div className='pagination-container'>
          <button disabled={currentPage===0} className='arrow-ponter' onClick={gotoPreviousPage}>◀</button>
          {[...Array(totalPages).keys()].map((n)=>(<button onClick={()=>handleClick(n)} className={'page-number'+(currentPage===n?' active':'')} key={n}>{n}</button>))}
          <button disabled={currentPage===totalPages-1} className='arrow-ponter' onClick={gotoNextPage}>▶</button>
        </div>
        <div className='product-container'>
        {products.slice(start, end).map((p)=><ProductCard key={p.id} image={p.thumbnail} title={p.title} />)}
        </div>
        
      </div>
    </>
  )
}

export default App
