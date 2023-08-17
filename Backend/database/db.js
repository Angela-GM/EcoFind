import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

const url = process.env.URI
//  || 'mongodb://localhost:27017/ecofind' 
mongoose.connect(url)

 const db = mongoose.connection
 db.on('open', ()=> {console.log('¡Conectado a MongoDB!')})
 db.on('error', ()=> {console.log('¡Error al conectar a MongoDB!')})
 
 export default db 
