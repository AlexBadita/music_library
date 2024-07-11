using Microsoft.AspNetCore.Mvc;
using MusicLibraryAPI.Models;
using MusicLibraryAPI.Services;

namespace MusicLibraryAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ArtistsController : ControllerBase
    {
        ILibraryCollectionService _libraryCollectionService;

        public ArtistsController(ILibraryCollectionService libraryCollectionService)
        {
            _libraryCollectionService = libraryCollectionService ?? throw new ArgumentNullException(nameof(libraryCollectionService));
        }

        [HttpGet]
        public async Task<IActionResult> GetArtists()
        {
            List<Artist> artists = await _libraryCollectionService.GetAll();
            return Ok(artists);
        }

        [HttpPost]
        public async Task<IActionResult> AddArtist([FromBody] Artist artist)
        {
            if (artist == null)
            {
                return BadRequest("Note cannot be null!");
            }

            if (await _libraryCollectionService.Create(artist))
            {
                return CreatedAtRoute("GetArtist", new { id = artist.Id.ToString() }, artist);
            }
            return NoContent();
        }

        [HttpGet("{id}", Name = "GetArtist")]
        public async Task<IActionResult> GetArtistById(string id)
        {
            if (id == null)
            {
                return BadRequest("Id cannot be null!");
            }

            Artist artist = await _libraryCollectionService.Get(id);
            if (artist == null)
            {
                return NoContent();
            }
            return Ok(artist);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateArtist(string id, [FromBody] Artist artist)
        {
            if (artist == null)
            {
                return BadRequest("Artist cannot be null!");
            }

            if (await _libraryCollectionService.Update(id, artist))
            {
                return Ok(_libraryCollectionService.Get(id));
            }

            return NotFound("Artist not found!");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteArtist(string id)
        {
            if (id == null)
            {
                return BadRequest("Id cannot be null!");
            }

            if (await _libraryCollectionService.Delete(id))
            {
                return NoContent();
            }

            return NotFound("Artist not found!");
        }
    }
}