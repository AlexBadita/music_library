using MongoDB.Bson.Serialization.Attributes;

namespace MusicLibraryAPI.Models
{
    public class Artist
    {
        [BsonId]
        [BsonRepresentation(MongoDB.Bson.BsonType.ObjectId)]
        public string? Id { get; set; }

        [BsonElement("name")]
        public string Name { get; set; }

        [BsonElement("albums")]
        public List<Album> Albums { get; set; }
    }
}