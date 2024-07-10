using System.ComponentModel.DataAnnotations;
using MongoDB.Bson.Serialization.Attributes;

namespace MusicLibraryAPI.Models
{
    public class Album
    {
        [BsonElement("title")]
        public string Title { get; set; }

        [BsonElement("songs")]
        public List<Song> Songs { get; set; }

        [BsonElement("description")]
        public string Description { get; set; }
    }
}