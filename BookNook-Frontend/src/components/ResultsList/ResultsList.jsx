import React, { useState } from 'react';
import { Link } from 'react-router-dom';


const ResultsList = (props) => {

    const list = props.bookData.map(book =>(
        <ul>
            <li key={book.id}><Link to={`/BookDetails/${book.id}`}>{book.volumeInfo.title}</Link></li>
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