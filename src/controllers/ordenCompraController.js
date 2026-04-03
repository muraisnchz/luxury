const { OrdenCompra} = require('../models/ordenCompra'); 
const {Carrito} = require('../models/carrito');
const { Producto } = require ('../models/producto');

const generarOrden = async (req, res) => {
  try {
    const { usuarioId } = req.params;
    
    // 1. Buscamos el carrito del usuario
    const carrito = await Carrito.findOne({ usuarioId });
    if (!carrito || carrito.items.length === 0) {
      return res.status(400).json({ mensaje: 'El carrito está vacío' });
    }

    // Arreglo temporal donde construiremos los documentos embebidos
    const itemsEmbebidosParaLaOrden = [];

    // 2. Control de Stock y construcción de los items embebidos
    for (let item of carrito.items) {
      const producto = await Producto.findById(item.productoId);
      
      // Validaciones extra de seguridad
      if (!producto || !producto.activo) {
         return res.status(404).json({ mensaje: 'Un producto del carrito ya no está disponible en la base de datos.' });
      }
      if (producto.stock < item.cantidad) {
        return res.status(400).json({ mensaje: `Stock insuficiente para la joya: ${producto.nombre}` });
      }

      
      itemsEmbebidosParaLaOrden.push({
        productoId: producto._id,
        nombre: producto.nombre,  
        cantidad: item.cantidad,
        precioUnitario: item.precioUnitario
      });
    }

    // 3. Creamos la Orden de Compra inyectando los items embebidos
    const nuevaOrden = new OrdenCompra({
      usuarioId: carrito.usuarioId,
      items: itemsEmbebidosParaLaOrden,
      total: carrito.total
    });
    
    await nuevaOrden.save();

    // 4. Descontamos el stock real de la colección de Productos
    for (let item of carrito.items) {
      await Producto.findByIdAndUpdate(item.productoId, {
        $inc: { stock: -item.cantidad } // Operador de MongoDB para restar
      });
    }

    // 5. Vaciamos el carrito (reseteamos el arreglo y el total, no borramos el documento)
    carrito.items = [];
    carrito.total = 0;
    await carrito.save();

    res.status(201).json({ 
      mensaje: 'Orden de compra generada con éxito', 
      orden: nuevaOrden 
    });

  } catch (error) {
    res.status(500).json({ mensaje: 'Error al generar la orden', error: error.message });
  }
};


const obtenerOrdenesPorUsuario = async (req, res) => {
  try {
    // Buscamos las órdenes del cliente. 
    const ordenes = await OrdenCompra.find({ usuarioId: req.params.usuarioId });
    
    res.status(200).json(ordenes);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener el historial de compras', error: error.message });
  }
};

// ==========================================
// 3. Consultar todas las ventas (Para Administradores)
// ==========================================
const obtenerTodasLasOrdenes = async (req, res) => {
  try {
    // Aquí sí poblamos el usuarioId para que el admin pueda ver el nombre o email de quien compró,
    // pero mantenemos los ítems sin poblar por su inmutabilidad.
    const ordenes = await OrdenCompra.find().populate('usuarioId', 'nombre email'); 
    
    res.status(200).json(ordenes);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al consultar las órdenes', error: error.message });
  }
};

// Export
module.exports = { generarOrden, obtenerOrdenesPorUsuario, obtenerTodasLasOrdenes};