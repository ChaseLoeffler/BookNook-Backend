import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Book = ({bookId,token,bookInfo}) => {
    const [favorited,setFav] = useState()
    useEffect(() => {
        isFavorited();
    },[])

    

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
            title: `${bookInfo?.volumeInfo?.title}`,
            thumbnailUrl: `${bookInfo?.volumeInfo?.imageLinks?.thumbnail}`
        };
        console.log(newEntry);
        addToFavorites(newEntry)
        window.location.reload();
    }
    if(!favorited){
        return null;
    }

    if (!bookInfo) {
        return null;
    }

    
    function isFavOrUnfav(){
        if(favorited.bookFavorited === true){
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
                <img src={bookInfo?.volumeInfo?.imageLinks?.thumbnail}/>
                <div>
                    {isFavOrUnfav()}
                </div>
                </div>
                <h3>{bookInfo?.volumeInfo?.title}</h3>
                <h4>{bookInfo?.volumeInfo?.authors}</h4>
                <p dangerouslySetInnerHTML={{__html:bookInfo?.volumeInfo?.description}}></p>
            </div>
        </div>
    );
}
 
export default Book;