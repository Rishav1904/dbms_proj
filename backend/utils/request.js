const axios = require('axios');

// A utility function to handle GET requests
exports.getRequest = async (url, headers = {}) => {
  try {
    const response = await axios.get(url, { headers });
    return response.data;
  } catch (error) {
    console.error('GET Request Error:', error.response ? error.response.data : error.message);
    throw new Error(error.response ? error.response.data : 'An error occurred while fetching data.');
  }
};

// A utility function to handle POST requests
exports.postRequest = async (url, data, headers = {}) => {
  try {
    const response = await axios.post(url, data, { headers });
    return response.data;
  } catch (error) {
    console.error('POST Request Error:', error.response ? error.response.data : error.message);
    throw new Error(error.response ? error.response.data : 'An error occurred while posting data.');
  }
};

// A utility function to handle PUT requests
exports.putRequest = async (url, data, headers = {}) => {
  try {
    const response = await axios.put(url, data, { headers });
    return response.data;
  } catch (error) {
    console.error('PUT Request Error:', error.response ? error.response.data : error.message);
    throw new Error(error.response ? error.response.data : 'An error occurred while updating data.');
  }
};

// A utility function to handle DELETE requests
exports.deleteRequest = async (url, headers = {}) => {
  try {
    const response = await axios.delete(url, { headers });
    return response.data;
  } catch (error) {
    console.error('DELETE Request Error:', error.response ? error.response.data : error.message);
    throw new Error(error.response ? error.response.data : 'An error occurred while deleting data.');
  }
};
