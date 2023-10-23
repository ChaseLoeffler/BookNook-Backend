import React, { useState } from 'react';

const Search = (props) => {
    const [search, setSearch] = useState('');

    function handleSumbit(e){
        e.preventDefault();
        let newSearch = {
            search: search
        };
        searchBook(newSearch);
    }

    return (
        <div>
            <form onSubmit={handleSumbit}>
                <input type='text' value={search} onChange={(e)=> setSearch(e.target.value)} placeholder='Search Songs'/>
            </form>
        </div>
    );
}
 
export default Search;