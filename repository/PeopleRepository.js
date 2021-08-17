const db = require("../database");

class peopleRepository {
  constructor() {
    this.conn = null;
  }

  init = async () => {
    this.conn = await db.connect();
  };

  getAll = async () => {
    const [rows] = await this.conn.query("SELECT * FROM people;");
    return rows;
  };

  add = async ({ name, age }) => {
    const sql = "INSERT INTO people(name, age) VALUES (?, ?);";
    const values = [name, age];
    const [response] = await this.conn.query(sql, values);
    return response;
  };

  remove = async id => {
    const sql = "DELETE FROM people where id=?;";
    const [response] = await this.conn.query(sql, [id]);
    return response.affectedRows;
  };

  edit = async ({ id, name, age, catId }) => {
    const sql = `UPDATE people SET name=?, age=? ${
      catId ? ", fk_cat_id=?" : ""
    } WHERE id=?`;
    const values = catId ? [name, age, catId, id] : [name, age, id];
    const [response] = await this.conn.query(sql, values);
    return response.affectedRows;
  };

  adopt = async ({ id, catId }) => {
    const sql = "UPDATE people SET fk_cat_id=? WHERE id=?";
    const values = [catId, id];
    const [response] = await this.conn.query(sql, values);
    return response.affectedRows;
  };
}

const Repository = new peopleRepository();
Repository.init();

module.exports = Repository;
