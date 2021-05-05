using System;
using System.Text.Json;
using System.Text.Json.Serialization;
using API.DTOs;
using API.Entities;

namespace API.Helpers
{
    public class MediaConverter : JsonConverter<MediaDTO>
    {
        enum TypeDiscriminator
        {
            Picture = 1,
            Model3D = 2,
            Music = 3
        }

        public override bool CanConvert(Type typeToConvert) => typeof(MediaDTO).IsAssignableFrom(typeToConvert);

        public override MediaDTO Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
        {
            if(reader.TokenType != JsonTokenType.StartObject) throw new JsonException(); // makes sure it's reading from the start

            reader.Read();

            if(reader.TokenType != JsonTokenType.PropertyName) throw new JsonException(); // makes sure it has begun with the property

            string propertyName = reader.GetString();

            if(propertyName != "TypeDiscriminator") throw new JsonException(); // makes sure it is a type discriminator

            TypeDiscriminator typeDiscriminator = (TypeDiscriminator)reader.GetInt32();

            MediaDTO mediaDTO = typeDiscriminator switch
            {
                TypeDiscriminator.Picture => new PictureDTO(),
                TypeDiscriminator.Model3D => new Model3DDTO(),
                TypeDiscriminator.Music => new MusicDTO(),
                _ => throw new JsonException()
            }; // the most beautiful syntax I've ever seen, good lord!

            while(reader.Read())
            {
                if(reader.TokenType == JsonTokenType.EndObject)
                {
                    return mediaDTO; // returns the newly created cast object
                }
            }

            throw new JsonException(); // if it fails for any other reason
        }

        public override void Write(Utf8JsonWriter writer, MediaDTO mediaDTO, JsonSerializerOptions options)
        {
            writer.WriteStartObject();

            if(mediaDTO is PictureDTO picture)
            {
                writer.WriteNumber("TypeDiscriminator", (int)TypeDiscriminator.Picture);
            }
            else if(mediaDTO is Model3DDTO model3D)
            {
                writer.WriteNumber("TypeDiscriminator", (int)TypeDiscriminator.Model3D);
            }
            else if(mediaDTO is MusicDTO music)
            {
                writer.WriteNumber("TypeDiscriminator", (int)TypeDiscriminator.Music);
            }

            writer.WriteString("Description", mediaDTO.Description);
            writer.WriteString("Url", mediaDTO.Url);
            writer.WriteNumber("BlogPostId", mediaDTO.BlogPostId);

            writer.WriteEndObject();

        }

    }
}