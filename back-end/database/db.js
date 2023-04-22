import {Sequelize} from 'sequelize';
const db = new Sequelize('prueba','admin','demierda123',{
    host:'database-tb-2023-p.cu94oq6oymht.us-east-1.rds.amazonaws.com',
    dialect:'mysql',
    port:'3306'
});
export default db;