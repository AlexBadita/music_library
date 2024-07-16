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
                return BadRequest("Artist cannot be null!");
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

        [HttpGet("{artistId}/albums/{albumIndex}")]
        public async Task<IActionResult> GetAlbum(string artistId, int albumIndex)
        {
            Artist artist = await _libraryCollectionService.Get(artistId);
            if (artist == null)
            {
                return NotFound("Artist not found");
            }

            if (albumIndex >= artist.Albums.Count || albumIndex < 0)
            {
                return NotFound("Artist not found");
            }

            Album album = artist.Albums[albumIndex];
            return Ok(album);
        }

        [HttpPost("{artistId}/albums")]
        public async Task<IActionResult> AddAlbum(string artistId, [FromBody] Album album)
        {
            if (album == null)
            {
                return BadRequest("Album cannot be null!");
            }

            var artist = await _libraryCollectionService.Get(artistId);
            if (artist == null)
            {
                return NotFound("Artist not found!");
            }

            artist.Albums.Add(album);
            var result = await _libraryCollectionService.Update(artistId, artist);

            if (result)
            {
                return CreatedAtAction("GetAlbum", new { artistId = artist.Id, albumIndex = artist.Albums.Count - 1 }, album);
            }
            return NoContent();
        }

        [HttpPut("{artistId}/albums/{albumTitle}")]
        public async Task<IActionResult> EditAlbum(string artistId, string albumTitle, [FromBody] Album updatedAlbum)
        {
            if (artistId == null || albumTitle == null || updatedAlbum == null)
            {
                return BadRequest("Invalid input parameters.");
            }

            var artist = await _libraryCollectionService.Get(artistId);
            if (artist == null)
            {
                return NotFound("Artist not found.");
            }

            var album = artist.Albums.FirstOrDefault(album => album.Title == albumTitle);
            if (album == null)
            {
                return NotFound("Album not found.");
            }

            album.Title = updatedAlbum.Title;
            album.Description = updatedAlbum.Description;
            album.Songs = updatedAlbum.Songs;

            var result = await _libraryCollectionService.Update(artistId, artist);
            if (result)
            {
                return Ok(album);
            }

            return StatusCode(500, "An error occurred while updating the album.");
        }


        [HttpDelete("{artistId}/albums/{albumTitle}")]
        public async Task<IActionResult> DeleteAlbum(string artistId, string albumTitle)
        {
            if (artistId == null || albumTitle == null)
            {
                return BadRequest("Artist ID and Album Title cannot be null.");
            }

            var artist = await _libraryCollectionService.Get(artistId);
            if (artist == null)
            {
                return NotFound("Artist not found!");
            }

            var album = artist.Albums.FirstOrDefault(a => a.Title.Equals(albumTitle, StringComparison.OrdinalIgnoreCase));
            if (album == null)
            {
                return NotFound("Album not found!");
            }

            artist.Albums.Remove(album);
            var result = await _libraryCollectionService.Update(artistId, artist);

            if (result)
            {
                return NoContent();
            }

            return StatusCode(500, "Error while deleting the album");
        }

        [HttpGet("{artistId}/albums/{albumTitle}/songs/{songTitle}", Name = "GetSong")]
        public async Task<IActionResult> GetSong(string artistId, string albumTitle, string songTitle)
        {
            var artist = await _libraryCollectionService.Get(artistId);
            if (artist == null)
            {
                return NotFound("Artist not found!");
            }

            var album = artist.Albums.FirstOrDefault(a => a.Title.Equals(albumTitle, StringComparison.OrdinalIgnoreCase));
            if (album == null)
            {
                return NotFound("Album not found!");
            }

            var song = album.Songs.FirstOrDefault(s => s.Title.Equals(songTitle, StringComparison.OrdinalIgnoreCase));
            if (song == null)
            {
                return NotFound("Song not found!");
            }

            return Ok(song);
        }

        [HttpPost("{artistId}/albums/{albumTitle}/songs")]
        public async Task<IActionResult> AddSong(string artistId, string albumTitle, [FromBody] Song song)
        {
            if (song == null)
            {
                return BadRequest("Song cannot be null!");
            }

            var artist = await _libraryCollectionService.Get(artistId);
            if (artist == null)
            {
                return NotFound("Artist not found!");
            }

            var album = artist.Albums.FirstOrDefault(a => a.Title == albumTitle);
            if (album == null)
            {
                return NotFound("Album not found!");
            }

            album.Songs.Add(song);
            var result = await _libraryCollectionService.Update(artistId, artist);

            if (result)
            {
                return CreatedAtRoute("GetSong", new { artistId = artistId, albumTitle = albumTitle, songTitle = song.Title }, song);
            }
            return NoContent();
        }

        [HttpDelete("{artistId}/albums/{albumTitle}/songs/{songTitle}")]
        public async Task<IActionResult> DeleteSong(string artistId, string albumTitle, string songTitle)
        {
            var artist = await _libraryCollectionService.Get(artistId);
            if (artist == null)
            {
                return NotFound("Artist not found!");
            }

            var album = artist.Albums.FirstOrDefault(a => a.Title.Equals(albumTitle, StringComparison.OrdinalIgnoreCase));
            if (album == null)
            {
                return NotFound("Album not found!");
            }

            var song = album.Songs.FirstOrDefault(s => s.Title.Equals(songTitle, StringComparison.OrdinalIgnoreCase));
            if (song == null)
            {
                return NotFound("Song not found!");
            }

            album.Songs.Remove(song);
            var result = await _libraryCollectionService.Update(artistId, artist);

            if (result)
            {
                return NoContent();
            }

            return NotFound("Song not found!");
        }

        [HttpPut("{artistId}/albums/{albumTitle}/songs/{songTitle}")]
        public async Task<IActionResult> EditSong(string artistId, string albumTitle, string songTitle, [FromBody] Song updatedSong)
        {
            if (updatedSong == null)
            {
                return BadRequest("Invalid song data!");
            }

            var artist = await _libraryCollectionService.Get(artistId);
            if (artist == null)
            {
                return NotFound("Artist not found!");
            }

            var album = artist.Albums.FirstOrDefault(a => a.Title.Equals(albumTitle, StringComparison.OrdinalIgnoreCase));
            if (album == null)
            {
                return NotFound("Album not found!");
            }

            var song = album.Songs.FirstOrDefault(s => s.Title.Equals(songTitle, StringComparison.OrdinalIgnoreCase));
            if (song == null)
            {
                return NotFound("Song not found!");
            }

            song.Title = updatedSong.Title;
            song.Length = updatedSong.Length;

            var result = await _libraryCollectionService.Update(artistId, artist);

            if (result)
            {
                return Ok(song);
            }

            return NoContent();
        }

    }
}