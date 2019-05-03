/**Puerto
 * 
 */

process.env.PORT = process.env.PORT || 3000;


/**Entorno 
 * 
 */
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


/**Vencimiento del Token
 * 
 */
// 60 segundos
// 60 minutos
// 24 horas
// 30 días
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;

/**SEED
 * Se hace de esta manera para cuando creemos una variable de entorno en desarrollo.
 */
process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo';

/**Base de datos 
 * 
 */
let urlDB;

// if (process.env.NODE_ENV === 'dev') {
//     urlDB = 'mongodb: //localhost:27017/cafe';
// } else {
// Es una variable de entorno de HEROKU  
urlDB = 'mongodb+srv://udemy-nodejs:4DlHBnaRpKisV1ke@cluster0-brep8.mongodb.net/cafe';
// urlDB = process.env.MONGO_URI;
// }

process.env.URLDB = urlDB;


/**Google Client ID
 * 
 */

process.env.CLIENT_ID = process.env.CLIENT_ID || '147064048182-d1nlv7ifncr9bnmrl64578m6tnp9lajl.apps.googleusercontent.com';