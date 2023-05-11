import {Sequelize} from 'sequelize';
const db = new Sequelize('Sas','admin','terrabellum23',{
    host:'prueba.cccsrfisiszh.sa-east-1.rds.amazonaws.com',
    dialect:'mysql',
    port:'3306'
});
export default db;