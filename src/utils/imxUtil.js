import axios from 'axios';

const getPropFromDriveData = (data, prop) => {
  let retval;

  for (let i = 0; i < data.length; i++) {
    let [key, val] = data[i];

    if (key === prop) {
      retval = val;
      break;
    }
  }

  return retval;
};

const fetchDataFromSheet = async (url) => {
  const response = await axios.get(url);
  return response.data.values;
};

export { getPropFromDriveData, fetchDataFromSheet };
