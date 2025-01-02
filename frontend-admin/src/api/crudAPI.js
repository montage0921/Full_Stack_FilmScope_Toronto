import axios from "axios";

const baseURL = "http://localhost:8080/admin-filmscope";
const token = localStorage.getItem("accessToken");
const header = {
  Authorization: `Bearer ${token}`,
};

export const fetchShowList = async (pageSize) => {
  try {
    const response = await axios.get(
      `${baseURL}/load?page=1&size=${pageSize}`,
      {
        headers: header,
      }
    );
    if (response.status === 200) {
      console.log(response.data.content);
      return response.data.content;
    }
  } catch (error) {
    throw error;
  }
};
