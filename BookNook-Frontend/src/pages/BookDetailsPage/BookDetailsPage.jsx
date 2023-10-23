import React from 'react';
import { useParams } from 'react-router-dom';
import Book from "../../components/Book/Book"
import ReviewList from '../../components/ReviewList/ReviewList';
import ReviewForm from "../../components/ReviewForm/ReviewForm"
import useAuth from '../../hooks/useAuth';

const BookDetailsPage = (props) => {

    const {bookId} = useParams();
    const [user,token] = useAuth();



    return ( 
        <div>
            <div>
                <Book bookId={bookId} user={user} token={token}/>
            </div>
            <div>
                <ReviewList/>
            </div>
            <div>
                <ReviewForm/>
            </div>
            
        </div>
    );
}
 
export default BookDetailsPage;