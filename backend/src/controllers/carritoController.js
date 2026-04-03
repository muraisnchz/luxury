const { Carrito } = require('../models/carrito');
const { Producto } = require ('../models/producto')

const obtenerCarrito = async (req, res) => {
  try {
    // Asumimos que el usuarioId viene en los params de la ruta (ej: /api/carrito/:usuarioId)
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

    const carrito = await Carrito.findOne({ usuarioId });
    const producto = await Producto.findById(productoId);

    if (!producto || !producto.activo) return res.status(404).json({ mensaje: 'Producto no disponible' });
    if (producto.stock < cantidad) return res.status(400).json({ mensaje: 'Stock insuficiente' });

    // Verificamos si el producto ya está en el carrito
    const itemIndex = carrito.items.findIndex(item => item.productoId.toString() === productoId);

    if (itemIndex > -1) {
      // Si existe, sumamos la cantidad
      carrito.items[itemIndex].cantidad += cantidad;
    } else {
      // Si no existe, lo pusheamos al arreglo
      carrito.items.push({ productoId, cantidad, precioUnitario: producto.precio });
    }

    // Recalcular total
    carrito.total = carrito.items.reduce((acc, item) => acc + (item.cantidad * item.precioUnitario), 0);
    
    await carrito.save();
    res.status(200).json({ mensaje: 'Producto agregado', carrito });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al agregar al carrito', error: error.message });
  }
};

const removerItemDelCarrito = async (req, res) => {
  try {
    const { usuarioId, productoId } = req.params;
    const carrito = await Carrito.findOne({ usuarioId });

    // Filtramos el arreglo para dejar afuera el producto a remover
    carrito.items = carrito.items.filter(item => item.productoId.toString() !== productoId);
    
    // Recalcular total
    carrito.total = carrito.items.reduce((acc, item) => acc + (item.cantidad * item.precioUnitario), 0);

    await carrito.save();
    res.status(200).json({ mensaje: 'Item removido', carrito });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al remover item', error: error.message });
  }
};

module.exports = { obtenerCarrito, agregarItemAlCarrito, removerItemDelCarrito };