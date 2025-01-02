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
