require('dotenv').config(); // <-- ESTO DEBE SER LA LÍNEA 1
const mongoose = require('mongoose');
const app = require('./app'); 

const PORT = process.env.PORT || 3000;

// Usamos la variable de entorno protegida
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('¡Conectado exitosamente al clúster de MongoDB Atlas! ☁️');
    
    app.listen(PORT, () => {
      console.log(`Servidor de la joyería corriendo en http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error conectando a MongoDB Atlas:', error);
  });