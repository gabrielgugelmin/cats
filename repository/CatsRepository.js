const db = require("../database");

class CatsRepository {
  constructor() {
    this.conn = null;
  }

  init = async () => {
    this.conn = await db.connect();
  };

  getAll = async () => {
    const [rows] = await this.conn.query("SELECT * FROM cats;");
    return rows;
  };

  getByName = async name => {
    const [rows] = await this.conn.query(
      `SELECT * FROM cats WHERE name LIKE '%${name}%';`
    );
    return rows;
  };

  getCatsToAdopt = async () => {
    const [rows] = await this.conn.query(
      `select * from cats c left join people p ON c.id = p.fk_cat_id where p.id is null;`
    );
    return rows;
  };

  getTotalWeight = async () => {
    const [rows] = await this.conn.query(
      `SELECT SUM(cats.weight) as total FROM cats;`
    );
    return rows[0];
  };

  add = async cat => {
    const sql = "INSERT INTO cats(name, color, weight) VALUES (?, ?, ?);";
    const values = [cat.name, cat.color, cat.weight];
    const respose = await this.conn.query(sql, values);
    return respose.affectedRows;
  };

  remove = async ({ id }) => {
    const sql = "DELETE FROM cats where id=?;";
    const [response] = await this.conn.query(sql, [id]);
    return response.affectedRows;
  };

  edit = async ({ id, name, color, weight }) => {
    const sql = "UPDATE cats SET name=?, color=?, weight=? WHERE id=?";
    const values = [name, color, weight, id];
    const [response] = await this.conn.query(sql, values);
    return response.affectedRows;
  };
}

const Repository = new CatsRepository();
Repository.init();

module.exports = Repository;
