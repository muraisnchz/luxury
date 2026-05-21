const { Carrito } = require('../models/carrito');
const { Producto } = require('../models/producto');

const obtenerCarrito = async (req, res) => {
  try {
    const carrito = await Carrito.findOne({ usuarioId: req.params.usuarioId }).populate('items.productoId');
    if (!carrito) return res.status(404).json({ mensaje: 'Carrito no encontrado' });
    res.status(200).json(carrito);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener carrito', error: error.message });
  }
};

const agregarItemAlCarrito = async (req, res) => {
  try {
    const { usuarioId } = req.params;
    const { productoId, cantidad } = req.body;

    const producto = await Producto.findById(productoId);
    if (!producto || !producto.activo) return res.status(404).json({ mensaje: 'Producto no disponible' });
    if (producto.stock < cantidad) return res.status(400).json({ mensaje: 'Stock insuficiente' });

    let carrito = await Carrito.findOne({ usuarioId });

    if (!carrito) {
      carrito = new Carrito({ usuarioId, items: [], total: 0 });
    }

    const itemIndex = carrito.items.findIndex(item => item.productoId.toString() === productoId);

    if (itemIndex > -1) {
      const nuevaCantidad = carrito.items[itemIndex].cantidad + cantidad;
      if (producto.stock < nuevaCantidad) {
        return res.status(400).json({ mensaje: 'Stock insuficiente para la cantidad total solicitada' });
      }
      carrito.items[itemIndex].cantidad = nuevaCantidad;
    } else {
      carrito.items.push({ productoId, cantidad, precioUnitario: producto.precio });
    }

    carrito.total = carrito.items.reduce((acc, item) => acc + (item.cantidad * item.precioUnitario), 0);

    await carrito.save();
    res.status(200).json({ mensaje: 'Producto agregado', carrito });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al agregar al carrito', error: error.message });
  }
};

const actualizarCantidadItem = async (req, res) => {
  try {
    const { usuarioId, productoId } = req.params;
    const { cantidad } = req.body;

    if (cantidad < 1) return res.status(400).json({ mensaje: 'La cantidad debe ser al menos 1' });

    const producto = await Producto.findById(productoId);
    if (!producto) return res.status(404).json({ mensaje: 'Producto no encontrado' });
    if (producto.stock < cantidad) return res.status(400).json({ mensaje: 'Stock insuficiente' });

    const carrito = await Carrito.findOne({ usuarioId });
    if (!carrito) return res.status(404).json({ mensaje: 'Carrito no encontrado' });

    const item = carrito.items.find(item => item.productoId.toString() === productoId);
    if (!item) return res.status(404).json({ mensaje: 'Item no encontrado en el carrito' });

    item.cantidad = cantidad;
    carrito.total = carrito.items.reduce((acc, item) => acc + (item.cantidad * item.precioUnitario), 0);

    await carrito.save();
    res.status(200).json({ mensaje: 'Cantidad actualizada', carrito });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar cantidad', error: error.message });
  }
};

const removerItemDelCarrito = async (req, res) => {
  try {
    const { usuarioId, productoId } = req.params;
    const carrito = await Carrito.findOne({ usuarioId });
    if (!carrito) return res.status(404).json({ mensaje: 'Carrito no encontrado' });

    carrito.items = carrito.items.filter(item => item.productoId.toString() !== productoId);
    carrito.total = carrito.items.reduce((acc, item) => acc + (item.cantidad * item.precioUnitario), 0);

    await carrito.save();
    res.status(200).json({ mensaje: 'Item removido', carrito });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al remover item', error: error.message });
  }
};

const vaciarCarrito = async (req, res) => {
  try {
    const carrito = await Carrito.findOne({ usuarioId: req.params.usuarioId });
    if (!carrito) return res.status(404).json({ mensaje: 'Carrito no encontrado' });

    carrito.items = [];
    carrito.total = 0;
    await carrito.save();
    res.status(200).json({ mensaje: 'Carrito vaciado', carrito });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al vaciar el carrito', error: error.message });
  }
};

module.exports = { obtenerCarrito, agregarItemAlCarrito, actualizarCantidadItem, removerItemDelCarrito, vaciarCarrito };
