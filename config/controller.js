import pool from "./config";

let query = (sql, values) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        reject(err);
      } else {
        connection.query(sql, values, (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
          connection.release();
        });
      }
    });
  });
};

export default {
  // 新建数据表
  createTable(data) {
    let keySql = [];
    for (let i = 0; i < data.fieldDescription.length; i++) {
      keySql.push(
        `${data.fieldDescription[i].name} ${data.fieldDescription[i].type} ${
          data.fieldDescription[i].isempty
        } COMMENT '${data.fieldDescription[i].comment}'`
      );
    }
    let sql = `create table if not exists ${data.tableName}(
     id INT NOT NULL AUTO_INCREMENT,
     ${keySql.join(",")},
     PRIMARY KEY ( id )
    );`;
    return query(sql);
  },
  // 增
  insertData(name, data) {
    let keySql = [];
    let keyData = [];
    Object.keys(data).forEach(function(key) {
      keySql.push(`${key}=?`);
      keyData.push(data[key]);
    });
    let sql = `insert into ${name} set ${keySql.join(",")};`;
    return query(sql, keyData);
  },
  // 删
  deleteData(name, data) {
    let keySql = [];
    Object.keys(data).forEach(function(key) {
      keySql.push(`${key}='${data[key]}'`);
    });
    let sql = `delete from ${name} where ${keySql.join(" and ")};`;
    return query(sql);
  },
  // 改
  updateDate(name, id, data) {
    let keySql = [];
    Object.keys(data).forEach(function(key) {
      keySql.push(`${key}='${data[key]}'`);
    });
    let sql = `update ${name} set ${keySql.join(",")} where id=${id};`;
    return query(sql);
  },
  // 查
  findData(name, data) {
    let keySql = [];
    Object.keys(data).forEach(function(key) {
      keySql.push(`${key}='${data[key]}'`);
    });
    let condition = keySql.length == 0 ? "" : ` where ${keySql.join(" and ")}`;
    let sql = `select * from ${name}${condition};`;
    // select * from user where age='18' and name like '刘%'
    return query(sql);
  },
  // 所有表列表
  findTable(name) {
    let sql = `select table_name from information_schema.tables where table_schema='${name}';`;
    return query(sql);
  },
  // 查找数据表的所有字段(列名)、字段类型、字段注释
  findTableColumn(name) {
    let sql = `select * from information_schema.COLUMNS where table_name = '${name}';`;
    return query(sql);
  },
  // 用户登录
  userLogin(data) {
    let values = [data.username];
    let sql = "select * from users where username=?;";
    return query(sql, values);
  },
  userInfo(data) {
    let values = [data.id];
    let sql = "select * from users where id=?;";
    return query(sql, values);
  },
  addUser(data) {
    let values = [data.username,data.password,data.phone,data.address];
    let sql = "insert into users set username=?,password=?,phone=?,address=?";
    return query(sql, values);
  }
};

// select COLUMN_NAME,DATA_TYPE,COLUMN_COMMENT from information_schema.COLUMNS where table_name = 'test1';
