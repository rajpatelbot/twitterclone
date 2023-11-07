import { Sequelize, Dialect } from "sequelize";
import { development } from "../../config/config.json";

const db = development.database;
const username = development.username;
const password = development.password ?? "";
const host = development.host;
const dialect: Dialect = development.dialect as Dialect;
const port = development.port;

export const sequelize = new Sequelize(db, username, password, { host, dialect, port });
