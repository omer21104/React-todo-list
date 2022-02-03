import Axios from "axios";

const $axios = Axios.create({
  baseURL: "/api/",
  headers: { "Content-Type": "application/json" },
});

const url = "http://127.0.0.1:8000";

class FetchDataService {
  static get_table_data() {
    return $axios.get(url + "/api/test/get_table_data").then((response) => {
      return response;
    });
  }
}

class PersistDataService {
  static persist_list_item(text) {
    return $axios
      .post(url + "/api/test/persist_list_item", text)
      .then((response) => response.data);
  }
}

const apiService = { FetchDataService, PersistDataService };

export default apiService;
