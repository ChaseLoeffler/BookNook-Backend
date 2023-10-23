import React, { useState } from 'react';
import { Link } from 'react-router-dom';


const ResultsList = (props) => {

    const list = props.bookData.map(book =>(
        <ul key={book.id}>
            <li><Link to={`/BookDetails/${book.id}`}>{book.volumeInfo.title}</Link></li>
        </ul>
    ))


    return ( 
        <div>
            <div>
                {list}
            </div>
        </div>
    );
}
 
export default ResultsList;