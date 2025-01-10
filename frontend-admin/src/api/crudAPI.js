import axios from "axios";

const baseURL = "http://localhost:8080/admin-filmscope";
const token = localStorage.getItem("accessToken");
const header = {
  Authorization: `Bearer ${token}`,
};

export const fetchShowList = async (pageSize) => {
  try {
    console.log(token);
    const response = await axios.get(`${baseURL}/load?size=${pageSize}`, {
      headers: header,
    });
    if (response.status === 200) {
      return {
        showLists: response.data.content,
        totalItems: response.data.totalElements,
      };
    }
  } catch (error) {
    throw error;
  }
};

export const deleteShow = async (showTitle, theatre) => {
  try {
    await axios.delete(
      `${baseURL}/delete-show?showTitle=${showTitle}&theatre=${theatre}`,
      { headers: header }
    );
  } catch (error) {
    throw error;
  }
};

export const deleteShowById = async (id) => {
  try {
    await axios.delete(`${baseURL}/delete-show-id?id=${id}`, {
      headers: header,
    });
  } catch (error) {
    throw error;
  }
};

// get showDetailed Info

export const getDetailedShowInfo = async (showname, theatre) => {
  try {
    const response = await axios.get(
      `${baseURL}/detailed-showInfo?showTitle=${showname}&theatre=${theatre}`,
      { headers: header }
    );
    if (response.status === 200) {
      const data = response.data;
      return data;
    }
  } catch (error) {
    throw error;
  }
};

// update show info
export const updateShowAPI = async (id, showDto) => {
  const response = await axios.put(`${baseURL}/update-show/${id}`, showDto, {
    headers: header,
  });
};

// delete a film
export const deleteFilm = async (customId, theatre) => {
  try {
    await axios.delete(
      `${baseURL}/delete-film?customId=${customId}&theatre=${theatre}`,
      { headers: header }
    );
  } catch (error) {
    throw error;
  }
};

// fetch a film based on custom id
export const getFilm = async (customId) => {
  try {
    const response = await axios.get(
      `${baseURL}/get-film?customId=${customId}`,
      {
        headers: header,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// update film
export const updateFilm = async (customId, filmDto) => {
  try {
    await axios.put(`${baseURL}/update-film/${customId}`, filmDto, {
      headers: header,
    });
  } catch (error) {
    throw error;
  }
};

// searchTMDB
export const searchTMDB = async (filmTitle, year) => {
  try {
    const response = await axios.get(
      `${baseURL}/fetch-film-info?filmTitle=${filmTitle}&releaseYear=${year}`,
      { headers: header }
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

// add film
export const addNewFilm = async (filmDto) => {
  try {
    const response = await axios.post(`${baseURL}/add-film`, filmDto, {
      headers: header,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// fetch customId
export const fetchCustomId = async (filmTitle, year) => {
  try {
    const response = await axios.get(
      `${baseURL}/find-customId?filmTitle=${filmTitle}&year=${year}`,
      { headers: header }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// sync show with new film
export const syncShowWithNewFilm = async (showDto) => {
  try {
    const response = await axios.post(
      `${baseURL}/sync-show-with-new-film`,
      showDto,
      {
        headers: header,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// add a new show
export const addNewShow = async (showDto) => {
  try {
    const response = await axios.post(`${baseURL}/add-show`, showDto, {
      headers: header,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// delete expired show
export const deleteExpiredShows = async () => {
  try {
    await axios.delete(`${baseURL}/delete-expired-show`, {
      headers: header,
    });
  } catch (error) {
    throw error;
  }
};
