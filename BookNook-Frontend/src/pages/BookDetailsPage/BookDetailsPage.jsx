import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Book from "../../components/Book/Book"
import ReviewList from '../../components/ReviewList/ReviewList';
import ReviewForm from "../../components/ReviewForm/ReviewForm"
import useAuth from '../../hooks/useAuth';
import axios from 'axios';

const BookDetailsPage = (props) => {

    const {bookId} = useParams();
    const [user,token] = useAuth();
    const [bookData,setBookData] = useState({});
    const [bookInfo,setInfo] = useState()

    useEffect(() => {
        bookDetails();
        getReviews();
    },[],[])

    async function bookDetails(){
        try{
            const controller = new AbortController();
            let response = await axios.get(`https://www.googleapis.com/books/v1/volumes/${bookId}`)
            console.log(response.data)
            setInfo(response.data)
            return () => controller.abort();
        } catch (err){
            console.log(err.message);
        }
    }

    async function getReviews(){
        try{
            let resp = await axios.get(`https://localhost:5001/api/BookDetails/${bookId}`, { headers: {
                        Authorization: "Bearer " + token || null,
                },
            });
                      console.log(resp.data)
                      setBookData(resp.data)
        }catch (err){
            console.log(err.message)
        }
    }

    return ( 
        <div className='display-container'>
            <div>
                <Book bookId={bookId} token={token} bookData={bookData} bookInfo={bookInfo}/>
            </div>
            <div className='container'>
                <ReviewList bookData={bookData} />
                <ReviewForm bookId={bookId} bookInfo={bookInfo} token={token}/>
            </div>
        </div>
    );
}
 
export default BookDetailsPage;