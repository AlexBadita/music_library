using System.ComponentModel.DataAnnotations;
using MongoDB.Bson.Serialization.Attributes;

namespace MusicLibraryAPI.Models
{
    public class Song
    {
        [BsonElement("title")]
        public string Title { get; set; }

        [BsonElement("length")]
        public string Length { get; set; }
    }
}