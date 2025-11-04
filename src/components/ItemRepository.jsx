import BaseRepository from "./BaseRepository";

export default class ItemRepository extends BaseRepository {
  getAll() {
    return this.request("get", "/items");
  }

  create(item) {
    return this.request("post", "/items", item);
  }

  update(id, item) {
    return this.request("put", `/items/${id}`, item);
  }

  delete(id) {
    return this.request("delete", `/items/${id}`);
  }
}
