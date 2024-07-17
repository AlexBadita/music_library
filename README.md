# music_library

This application is made using React, .NET Core and MongoDB.

Each document in the collection represents an artist and contains the following fields:
- `name`: The name of the artist (string).
- `albums`: An array of album objects. Each album object contains:
  - `title`: The title of the album (string).
  - `songs`: An array of song objects. Each song object contains:
    - `title`: The title of the song (string).
    - `length`: The length of the song (string).
  - `description`: A detailed description of the album (string).

## Installation

### Clone this repository

```bash
git clone https://github.com/AlexBadita/music_library.git
```

### Setting up the backend

Navigate to the MusicLibraryAPI directory.

Install dependencies:

```bash
dotnet restore
```

Configure appsettings.json:

```json
"MongoDBSettings": {
    "CollectionName": "<your_collection_name>",
    "ConnectionString": "<your_connection_string>",
    "DatabaseName": "<your_database_name>"
  }
```

### Setting up MongoDB

Make sure you have a running MongoDB and you have a music_library database.

Run the scripts from initial_db.js to create your initialize your data.

Inside a mongodb shell:

```shell
mongosh "<your_connection_string>/music_library" --file initial_db.js
```

### Setting up the Frontend

Navigate to the music-library-app directory.

Install dependencies:

```bash
npm install
```

Configure services/ApiService.js:
```js
const API_URL = "<your_api_url>";
```

## Running the application

### Running the backend

From the MusicLibraryAPI directory run:

```bash
dotnet run
```

### Running the frontend

From the music-library-app directory run:

```bash
npm start
```
