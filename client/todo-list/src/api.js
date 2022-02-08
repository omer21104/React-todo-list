import Axios from "axios";

const $axios = Axios.create({
  baseURL: "/api/",
  headers: { "Content-Type": "application/json" },
});

const url = "http://127.0.0.1:8000/api/todolist";

class FetchDataService {
  static get_table_data(listName) {
    return $axios
      .get(url + "/get_table_data", { params: { listName } })
      .then((response) => {
        return response;
      });
  }

  static get_lists() {
    return $axios.get(url + "/get_lists").then((response) => response);
  }
}

class PersistDataService {
  static persist_list_item(item) {
    return $axios
      .post(url + "/persist_list_item", item)
      .then((response) => response.data);
  }

  static persist_new_list(listName) {
    return $axios
      .get(url + "/persist_new_list", { params: { listName } })
      .then((response) => response.data);
  }
}

class DeleteDataService {
  static delete_list_items(items) {
    return $axios
      .delete(url + "/delete_list_items", { data: items })
      .then((response) => response.data);
  }
}

class UpdateDataService {
  static update_checked_item(checkedItemID) {
    return $axios.get(url + "/update_checked_item", {
      params: { checkedItemID },
    });
  }
}

const apiService = {
  FetchDataService,
  PersistDataService,
  DeleteDataService,
  UpdateDataService,
};

export default apiService;
