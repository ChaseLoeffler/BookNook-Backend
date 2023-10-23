import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Book = ({bookId,token}) => {
    const [bookData,setData] = useState()
    const [favorited,setFav] = useState()
    useEffect(() => {
        bookDetails();
        isFavorited();
        addToFavorites();
    },[],[favorited],[])

    async function bookDetails(){
        try{
            const controller = new AbortController();
            let response = await axios.get(`https://www.googleapis.com/books/v1/volumes/${bookId}`)
            console.log(response.data)
            setData(response.data)
            return () => controller.abort();
        } catch (err){
            console.log(err.message);
        }
    }

    async function isFavorited(){
        try{
            let resp = await axios.get(`https://localhost:5001/api/BookDetails/${bookId}`, { headers: {
                        Authorization: "Bearer " + token || null,
                        },
                      });
            console.log(resp.data);
            setFav(resp.data)
        }
        catch (err){
            console.log(err.message);
        }
    }

    async function addToFavorites(dataStructure){
        try{
            let respon = await axios.post(`https://localhost:5001/api/Favorites`, dataStructure,{ headers: {
                Authorization: "Bearer " + token || null,
                },
              });
              console.log(respon);
        } catch(err){
            console.log(err.message);
        }
    }

    function handleClick(e){
        e.preventDefault();
        let newEntry = {
            bookId: `${bookId}`,
            title: `${bookData?.volumeInfo?.title}`,
            thumbnail: `${bookData?.volumeInfo?.imageLinks?.thumbnail}`
        };
        console.log(newEntry);
        addToFavorites(newEntry)
        window.location.reload();
    }
    if(!favorited){
        return null;
    }

    if (!bookData) {
        return null;
    }

    
    function isFavOrUnfav(){
        if(favorited[0].bookFavorited === true){
            return (<button>Unfavorite Book</button>)
        }
        else{
           return (<button onClick={(e) => handleClick(e)}>Favorite Book</button>)
        }
    }

    return favorited &&(
        <div className='margin-left'>
            <div className='book-container'>
                <div className='book-pic'>
                <img src={bookData?.volumeInfo?.imageLinks?.thumbnail}/>
                <div>
                    {isFavOrUnfav()}
                </div>
                </div>
                <h3>{bookData?.volumeInfo?.title}</h3>
                <h4>{bookData?.volumeInfo?.authors}</h4>
                <p dangerouslySetInnerHTML={{__html:bookData?.volumeInfo?.description}}></p>
            </div>
        </div>
    );
}
 
export default Book;