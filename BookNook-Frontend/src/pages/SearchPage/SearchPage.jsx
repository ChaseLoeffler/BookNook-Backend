import React, { useEffect, useState } from "react";
import axios from "axios";
import ResultsList from "../../components/ResultsList/ResultsList";





const SearchPage = (props)=> {
    const [search, setSearch] = useState("")
    const [bookData, setData] = useState([])

    useEffect(() => {
    },[search])

    async function searchBooks(){
        try{
            let response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${search}&maxResults=40`)
            console.log(response.data.items)
            setData(response.data.items)
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
                <label style={{'marginLeft':'1rem'}}>Search Books: </label>
                <input type='text' value={search} onChange={(e)=> setSearch(e.target.value)} placeholder='Search Songs'/>
            </form>
            <div style={{'marginLeft':'1rem'}}>
                <ResultsList bookData={bookData}/>
            </div>
        </div>
    )
}

export default SearchPage;