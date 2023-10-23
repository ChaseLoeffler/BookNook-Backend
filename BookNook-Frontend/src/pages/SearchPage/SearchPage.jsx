import React, { useEffect, useState } from "react";
import axios from "axios";





const SearchPage = (props)=> {
    const [search, setSearch] = useState("")
    const [bookData, setData] = useState([])

    useEffect(() => {
    },[search])

    async function searchBooks(){
        try{
            let response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${search}&key=AIzaSyDvdBAmSV9lOhpX-TY6bjxAEZY29gHcy24`)
            console.log(response.data.items)
        } catch (err){
            console.log(err.message)
        }
    }
    function handleSumbit(e){
        e.preventDefault();
        searchBooks();
    }
    return(
        <div>
            <form onSubmit={handleSumbit}>
                <label>Search Books: </label>
                <input type='text' value={search} onChange={(e)=> setSearch(e.target.value)} placeholder='Search Songs'/>
            </form>
        </div>
    )
}

export default SearchPage;