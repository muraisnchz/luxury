const { Usuario } = require("../models/usuario");
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
      return res
        .status(403)
        .json({ mensaje: "Esta cuenta ha sido desactivada. Comunicate con el administrador.",
        });
    }
    
    const passwordValida = await bcrypt.compare(password, usuario.password);
    if (!passwordValida) {
      return res.status(401).json({ mensaje: "Contraseña incorrecta" });
    }

    const token = jwt.sign(
      { id: usuario._id, rol: usuario.rol },
      process.env.JWT_SECRET,
      { expiresIn: "3h" },
    );

    res.status(200).json({
      mensaje: "¡Login exitoso!",
      token: token,
    });
  } catch (error) {
    console.error("Error en el login:", error);
    res
      .status(500)
      .json({ mensaje: "Error interno del servidor", detalle: error.message });
  }
};

module.exports = { login };
