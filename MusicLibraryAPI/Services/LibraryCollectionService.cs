using System.Globalization;
using MongoDB.Driver;
using MusicLibraryAPI.Models;
using MusicLibraryAPI.Settings;

namespace MusicLibraryAPI.Services
{
    public class LibraryCollectionService : ILibraryCollectionService
    {
        private readonly IMongoCollection<Artist> _artists;

        public LibraryCollectionService(IMongoDBSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);
            _artists = database.GetCollection<Artist>(settings.CollectionName);
        }

        public async Task<List<Artist>> GetAll()
        {
            var result = await _artists.FindAsync(artist => true);
            return result.ToList();
        }

        public async Task<bool> Create(Artist artist)
        {
            await _artists.InsertOneAsync(artist);
            return true;
        }

        public async Task<bool> Delete(string id)
        {
            var result = await _artists.DeleteOneAsync(artist => artist.Id == id);
            if (!result.IsAcknowledged && result.DeletedCount == 0)
            {
                return false;
            }
            return true;
        }

        public async Task<Artist> Get(string id)
        {
            return (await _artists.FindAsync(artist => artist.Id == id)).FirstOrDefault();
        }

        public async Task<bool> Update(string id, Artist artist)
        {
            artist.Id = id;
            var result = await _artists.ReplaceOneAsync(artist => artist.Id == id, artist);
            if (!result.IsAcknowledged && result.ModifiedCount == 0)
            {
                await _artists.InsertOneAsync(artist);
                return false;
            }
            return true;
        }
    }
}