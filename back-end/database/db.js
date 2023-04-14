import {Sequelize} from 'sequelize';
const db = new Sequelize('prueba','admin','terrabellum22',{
    host:'database-terrabellum-instance-1.cccsrfisiszh.sa-east-1.rds.amazonaws.com',
    dialect:'mysql',
    port:'3306'
});
export default db;