import sequelize from 'sequelize';
import logger from './logger.js';

const { Sequelize, DataTypes, Op } = sequelize;

const {
  NODE_ENV = 'development',
  PGHOST,
  PGUSER,
  PGPASSWORD,
  PGDATABASE,
  PGPORT,
} = process.env;

const sequelizeOptions = {
  dialect: 'postgres',
  host: PGHOST,
  port: PGPORT,
  database: PGDATABASE,
  username: PGUSER,
  password: PGPASSWORD,
  native: false,
  typeValidation: true,
  pool: {
    min: 5,
    max: 10,
    acquire: 10000,
    idle: 10000,
    evict: 1000,
    maxUses: 50,
  },
  define: {
    charset: 'utf8',
    collate: 'utf8_general_ci',
    timestamps: true,
  },
};

if (NODE_ENV === 'development') {
  sequelizeOptions.logging = msg => {
    logger.info(msg);
  };
  sequelizeOptions.benchmark = true;
}

const sequelizeORM = new Sequelize(sequelizeOptions);

export default {
  sequelize: sequelizeORM,
  initialize() {
    logger.info('ORM Initialization...');
    return this.sequelize?.sync();
  },
  shutdown() {
    return this.sequelize?.close();
  },
  define(...args) {
    return this.sequelize.define(...args);
  },
};

export { Sequelize, DataTypes, Op };
