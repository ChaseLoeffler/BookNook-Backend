using Microsoft.EntityFrameworkCore;

namespace FullStackAuth_WebAPI.DataTransferObjects
{
    public class BookDetailsDto
    {
        public virtual ICollection<ReviewWithUserDto> Reviews { get; set; }
        public double AverageRating { get; set; }
        public bool BookFavorited { get; set; }
    }
}
