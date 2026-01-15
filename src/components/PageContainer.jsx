 import {ProductCard} from './ProductCard';
 export const PageContainer =({
    currentPage,
    totalPages,
    products,
    start,
    end,
    handleClick,
    gotoPreviousPage,
    gotoNextPage,
 })=>{
    return(
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
    )

 }