import React from 'react';
import useCustomForm from '../../hooks/useCustomForm';
import axios from 'axios';

const ReviewForm = ({bookId,bookInfo,token}) => {
    const initialValues = {
        "text": "",
        "rating": ""
    }
    const [formData, handleInputChange, handleSubmit, reset] = useCustomForm(postNewReview,initialValues);

    async function postNewReview(){
        try{
            let dataStructure = {
                bookid: `${bookId}`,
                title: `${bookInfo.volumeInfo.title}`,
                text: `${formData.text}`,
                rating: `${formData.rating}`
            };
            let respon = await axios.post(`https://localhost:5001/api/Reviews`, dataStructure,{ headers: {
                Authorization: "Bearer " + token || null,
                },
            });
            console.log(respon);
            window.location.reload();
        } catch(err){
            console.log(err.message);
        }
    }


    return ( 
        <div className='container'>
            <form className='form' onSubmit={handleSubmit}>
                <label>
                    Leave A Review:
                    <textarea 
                    className='text-box'
                    type="text"
                    name='text'
                    value={formData.text}
                    onChange={handleInputChange}
                    />
                </label>
                <label>
                    Rating: {"(1-5)"}
                    <input
                    type='text'
                    name='rating'
                    value={formData.rating}
                    onChange={handleInputChange}
                    style={{"display" : "inline-table",'width': '2em'}}
                    />
                </label>
                <button>Review</button>
            </form>
        </div>
    );
}
 
export default ReviewForm;