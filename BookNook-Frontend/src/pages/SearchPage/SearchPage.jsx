import React, { useEffect, useState } from "react";
import axios from "axios";
import SearchBar from "../../components/SearchBar/SearchBar.jsx"





const SearchPage = (props)=> {
    const [search, setSearch] = useState("")
    const [bookData, setData] = useState([])

    useEffect(() => {
        searchBooks();
    },[search])

    async function searchBooks(){
        try{
            let response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${search}&key=AIzaSyDvdBAmSV9lOhpX-TY6bjxAEZY29gHcy24`)
            console.log(response)
        } catch (err){
            console.log(err.message)
        }
    }


    return(
        <div>
            <SearchBar/>
        </div>
    )
}

export default SearchPage;