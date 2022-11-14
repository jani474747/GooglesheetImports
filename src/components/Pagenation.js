import React from 'react'

const Pagenation = (props) => {
    const { currentPage, maxPageLimit, minPageLimit} = props;
    const totalPages = props.response.totalPages-1;
    const data = props.response.data;

    const pages = [];
    for(let i=1 ; i<=totalPages; i++){
        pages.push(i);
    }

    const pageNumbers = pages.map(page => {
        if(page <= maxPageLimit  && page > minPageLimit) {
            return(
        <li key={page} id={page} onClick={handlePageClick} 
            className={currentPage===page ? 'active' : null}>
            {page}
        </li>
            );
        }else{
            return null;
        }
    }

 );

  return (
    <div>


    </div>
  )
}

export default Pagenation