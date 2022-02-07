import Axios from "axios";

const $axios = Axios.create({
  baseURL: "/api/",
  headers: { "Content-Type": "application/json" },
});

const url = "http://127.0.0.1:8000";

class FetchDataService {
  static get_table_data(listName) {
    return $axios
      .get(url + "/api/test/get_table_data", { params: { listName } })
      .then((response) => {
        return response;
      });
  }

  static get_lists() {
    return $axios.get(url + "/api/test/get_lists").then((response) => response);
  }
}

class PersistDataService {
  static persist_list_item(item) {
    return $axios
      .post(url + "/api/test/", item)
      .then((response) => response.data);
  }

  static persist_new_list(listName) {
    return $axios
      .get(url + "/api/test/persist_new_list", { params: { listName } })
      .then((response) => response.data);
  }
}

class DeleteDataService {
  static delete_list_item(entryTitle) {
    return $axios
      .delete(url + "/api/test/persist_list_item", { data: entryTitle })
      .then((response) => response.data);
  }
}

const apiService = { FetchDataService, PersistDataService, DeleteDataService };

export default apiService;
