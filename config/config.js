import mysql from "mysql";

const config = {
  // 数据库配置
  database: {
    DATABASE: "lzztest",
    USERNAME: "liazz",
    PASSWORD: "ACElzz2018",
    PORT: "8889",
    HOST: "0.0.0.0"
  }
};
let pool = mysql.createPool({
  host: config.database.HOST,
  user: config.database.USERNAME,
  password: config.database.PASSWORD,
  database: config.database.DATABASE,
  port: config.database.PORT
});
export default pool;
