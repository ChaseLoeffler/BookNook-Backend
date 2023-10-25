using FullStackAuth_WebAPI.Data;
using FullStackAuth_WebAPI.DataTransferObjects;
using FullStackAuth_WebAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace FullStackAuth_WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookDetailsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public BookDetailsController(ApplicationDbContext context)
        {
            _context = context;
        }


        // GET api/<BookDetailsController>/5
        [HttpGet("{id}"),Authorize]
        public IActionResult Get(string id)
        {
            try
            {
                string userId = User.FindFirstValue("id");
                var favorites = _context.Favorites.Where(f => f.UserId.Equals(userId)).Where(f=>f.BookId.Equals(id));
                bool favorited;
                if (favorites.FirstOrDefault() != null)  {
                    favorited = true;
                }
                else
                {
                    favorited = false;
                }
                var book = new BookDetailsDto
                {
                    Reviews = _context.Reviews.Where(b => b.BookId.Equals(id)).Select(b => new ReviewWithUserDto
                    {
                        Id = b.Id,
                        BookId = b.BookId,
                        Text = b.Text,
                        Rating = b.Rating,
                        User = new UserForDisplayDto
                        {
                            Id = b.User.Id,
                            FirstName = b.User.FirstName,
                            LastName = b.User.LastName,
                            UserName = b.User.UserName
                        }
                    }).ToList(),
                    AverageRating = Math.Round(_context.Reviews.Select(b => b.Rating).ToArray().Average(), 1),
                    BookFavorited = favorited
                };
                return StatusCode(200, book);
            }
            catch (Exception ex) 
            {
                return StatusCode(500, ex.Message);
            }
        }

    }
}
