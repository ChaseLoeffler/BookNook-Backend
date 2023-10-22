namespace FullStackAuth_WebAPI.DataTransferObjects
{
    public class BookDetailsDto
    {
        public virtual ICollection<ReviewWithUserDto> Reviews { get; set; }
    }
}
