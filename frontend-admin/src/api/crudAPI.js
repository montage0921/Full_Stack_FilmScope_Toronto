import axios from "axios";

const baseURL = "http://localhost:8080/admin-filmscope";
const token = localStorage.getItem("accessToken");
const header = {
  Authorization: `Bearer ${token}`,
};

export const fetchShowList = async (pageSize) => {
  try {
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

// get showDetailed Info

export const getDetailedShowInfo = async (showname, theatre) => {
  try {
    const response = await axios.get(
      `${baseURL}/detailed-showInfo?showTitle=${showname}&theatre=${theatre}`,
      { headers: header }
    );
    if (response.status === 200) {
      const data = response.data;
      console.log(data);
    }
  } catch (error) {
    throw error;
  }
};
