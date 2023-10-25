import React from 'react';


const ReviewList = ({bookData}) => {
    
    
   let list =  bookData?.reviews?.map((review,index) => (
        <div key={index}>
            <h5>{review.user.userName}:</h5>
            <p style={{"fontSize": ".8em"}}>{review.text}</p>
            <h6>{review.rating} stars</h6>
        </div>
));
    return ( 
        <div>
            <div>
                <h2>Average User Rating:{`${bookData.averageRating}`}</h2>
            </div>
            <div>
                <h3>User Reviews</h3>
                {list}
            </div>
        </div>
    );
}
 
export default ReviewList;