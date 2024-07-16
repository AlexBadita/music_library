const API_URL = "http://localhost:5287/Artists";

export const getData = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("Network response was not ok" + response.statusText);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const getArtistAlbum = async (artistId, albumIndex) => {
  try {
    const response = await fetch(`${API_URL}/${artistId}/albums/${albumIndex}`);
    if (!response.ok) {
      throw new Error("Network response was not ok" + response.statusText);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const addArtist = async (artistData) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(artistData),
    });
    if (!response.ok) {
      console.error("HTTP error", response.status, await response.text());
      throw new Error("Network response was not ok: " + response.statusText);
    }
    return response.json();
  } catch (error) {
    console.error("Error posting data:", error);
    throw error;
  }
};

export const deleteArtist = async (artistId) => {
  try {
    const response = await fetch(`${API_URL}/${artistId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      const errorText = await response.text();
      console.error("HTTP error", response.status, errorText);
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }
    return response;
  } catch (error) {
    console.error("Error deleting data:", error);
    throw error;
  }
};

export const editArtist = async (artistId, artistData) => {
  try {
    const response = await fetch(`${API_URL}/${artistId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(artistData),
    });
    if (!response.ok) {
      const errorText = await response.text();
      console.error("HTTP error", response.status, errorText);
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }
    return response.json();
  } catch (error) {
    console.error("Error updating data:", error);
    throw error;
  }
};

export const addAlbum = async (artistId, albumData) => {
  try {
    const response = await fetch(`${API_URL}/${artistId}/albums`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(albumData),
    });
    if (!response.ok) {
      console.error("HTTP error", response.status, await response.text());
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }
    return response.json();
  } catch (error) {
    console.error("Error posting album data:", error);
    throw error;
  }
};

export const editAlbum = async (artistId, albumTitle, albumData) => {
  try {
    const response = await fetch(
      `${API_URL}/${artistId}/albums/${albumTitle}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(albumData),
      }
    );
    if (!response.ok) {
      console.error("HTTP error", response.status, await response.text());
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }
    return response.json();
  } catch (error) {
    console.error("Error updating album:", error);
    throw error;
  }
};

export const deleteAlbum = async (artistId, albumTitle) => {
  try {
    const response = await fetch(
      `${API_URL}/${artistId}/albums/${albumTitle}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error, status = ${response.status}`);
    }
    return response;
  } catch (error) {
    console.error("Error deleting album:", error);
    throw error;
  }
};

export const getSong = async (artistId, albumTitle, songTitle) => {
  try {
    const response = await fetch(
      `${API_URL}/${artistId}/albums/${albumTitle}/songs/${songTitle}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok" + response.statusText);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const addSong = async (artistId, albumTitle, songData) => {
  try {
    const response = await fetch(
      `${API_URL}/${artistId}/albums/${encodeURIComponent(albumTitle)}/songs`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(songData),
      }
    );

    if (!response.ok) {
      console.error("HTTP error", response.status, await response.text());
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error("Error posting data:", error);
    throw error;
  }
};

export const deleteSong = async (artistId, albumTitle, songTitle) => {
  console.log(artistId, albumTitle, songTitle);
  try {
    const response = await fetch(
      `${API_URL}/${artistId}/albums/${encodeURIComponent(
        albumTitle
      )}/songs/${encodeURIComponent(songTitle)}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      const errorText = await response.text();
      console.error("HTTP error", response.status, errorText);
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }
    return response;
  } catch (error) {
    console.error("Error deleting song:", error);
    throw error;
  }
};

export const editSong = async (
  artistId,
  albumTitle,
  songTitle,
  updatedSongData
) => {
  try {
    const response = await fetch(
      `${API_URL}/${artistId}/albums/${encodeURIComponent(
        albumTitle
      )}/songs/${encodeURIComponent(songTitle)}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedSongData),
      }
    );

    if (!response.ok) {
      console.error("HTTP error", response.status, await response.text());
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error("Error updating song:", error);
    throw error;
  }
};
