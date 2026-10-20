// Contenido de las lineas de tiempo. Produccion: textos reales del caso. Pedidos y Stock: ejemplos, no corren en un cliente.
export const produccion = {
  antes: [
    { h: 8, hora: '08:00', txt: 'Cada uno anota en su hoja.' },
    { a: 8, b: 17.5, txt: 'Sin saber cuánto se produjo.' },
    { h: 17.5, hora: '17:30', txt: 'Alguien junta las hojas.', der: true },
    { h: 20, hora: '20:00', txt: 'Recién ahí sabes el total.', der: true, t2: true },
  ],
  ahora: [
    { h: 8.233, hora: '08:14', txt: 'Juan manda “120 cajas” y la planilla se llena.' },
    { a: 8.233, b: 18, txt: 'Ya está en la planilla.', lleno: true },
    { h: 18, hora: '18:00', txt: 'Te llega el resumen del día.', der: true },
  ],
};
export const pedidos = {
  antes: [
    { h: 8, hora: '08:00', txt: 'Entra el pedido por WhatsApp.' },
    { a: 8, b: 17.5, txt: 'Sin saber en qué va.' },
    { h: 17.5, hora: '17:30', txt: 'Alguien revisa la lista.', der: true },
    { h: 20, hora: '20:00', txt: 'Recién ahí sabes qué falta despachar.', der: true, t2: true },
  ],
  ahora: [
    { h: 8.083, hora: '08:05', txt: 'El pedido queda en la planilla, con su estado.' },
    { a: 8.083, b: 16, txt: 'Ves en qué va cada uno.', lleno: true },
    { h: 16, hora: '16:00', txt: 'Despachado: el cliente recibe el aviso.', der: true },
  ],
};
export const stock = {
  antes: [
    { h: 8, hora: '08:00', txt: 'Se usa la harina del día.' },
    { a: 8, b: 17.5, txt: 'Nadie cuenta lo que queda.' },
    { h: 17.5, hora: '17:30', txt: 'Alguien cuenta los sacos.', der: true },
    { h: 20, hora: '20:00', txt: 'Recién ahí sabes que falta.', der: true, t2: true },
  ],
  ahora: [
    { h: 8.167, hora: '08:10', txt: 'Se descuentan 2 sacos en la planilla.' },
    { a: 8.167, b: 14, txt: 'El stock se actualiza solo.', lleno: true },
    { h: 14, hora: '14:00', txt: 'Quedan 3 sacos: te llega el aviso.', der: true },
  ],
};
