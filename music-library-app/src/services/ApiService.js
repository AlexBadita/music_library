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
    return response.json();
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
