const { Usuario } = require("../models/usuario");
const { Carrito } = require("../models/carrito");
const { Notificacion } = require("../models/notificacion");
const { verificarYLimpiarStock } = require("./carritoController");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    if (usuario.activo === false) {
      return res.status(403).json({
        mensaje: "Esta cuenta ha sido desactivada. Comunicate con el administrador.",
      });
    }

    const passwordValida = await bcrypt.compare(password, usuario.password);
    if (!passwordValida) {
      return res.status(401).json({ mensaje: "Contraseña incorrecta" });
    }

    const token = jwt.sign(
      { id: usuario._id, rol: usuario.rol },
      process.env.JWT_SECRET,
      { expiresIn: "3h" }
    );

    // Al hacer login verificamos el carrito del usuario y creamos notificaciones:
    // 1) Carrito expirado → vaciar + notificación 'carrito_expirado'
    // 2) Items sin stock  → eliminarlos + notificación 'stock_eliminado'
    // 3) Carrito vigente con items → notificación 'carrito_pendiente' (si no existe ya una hoy)
    let itemsEliminados = [];
    let carritoExpirado = false;
    try {
      const carrito = await Carrito.findOne({ usuarioId: usuario._id }).populate('items.productoId');
      if (carrito) {
        if (carrito.expiraEn && carrito.expiraEn < new Date()) {
          carrito.items = [];
          carrito.total = 0;
          carrito.expiraEn = new Date(Date.now() + 15 * 60 * 1000);
          await carrito.save();
          carritoExpirado = true;

          await Notificacion.create({
            usuarioId: usuario._id,
            tipo: 'carrito_expirado',
            mensaje: 'Tu carrito expiró. Los productos que habías seleccionado fueron eliminados porque no confirmaste la compra a tiempo.'
          });

        } else if (carrito.items.length > 0) {
          itemsEliminados = await verificarYLimpiarStock(carrito);

          if (itemsEliminados.length > 0) {
            await Notificacion.create({
              usuarioId: usuario._id,
              tipo: 'stock_eliminado',
              mensaje: `Se eliminaron del carrito los siguientes productos por falta de stock: ${itemsEliminados.join(', ')}.`
            });
          }

          // Notificar carrito pendiente solo si no existe ya una del mismo día
          const hoy = new Date();
          hoy.setHours(0, 0, 0, 0);
          const yaNotificado = await Notificacion.findOne({
            usuarioId: usuario._id,
            tipo: 'carrito_pendiente',
            fechaCreacion: { $gte: hoy }
          });
          if (!yaNotificado) {
            await Notificacion.create({
              usuarioId: usuario._id,
              tipo: 'carrito_pendiente',
              mensaje: 'Tenés productos en tu carrito sin finalizar la compra.'
            });
          }
        }
      }
    } catch (e) {
      // No interrumpir el login si falla la verificación
    }

    res.status(200).json({
      mensaje: "¡Login exitoso!",
      token,
      itemsEliminados,
      carritoExpirado
    });
  } catch (error) {
    console.error("Error en el login:", error);
    res.status(500).json({ mensaje: "Error interno del servidor", detalle: error.message });
  }
};

module.exports = { login };
