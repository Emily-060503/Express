const express = require('express');
const app = express();
const port = 3000;
app.use(express.json());

app.set('view engine', 'ejs');

//express
const admin = require('firebase-admin');
const cors = require('cors');
app.use(cors());
app.use(express.urlencoded({ extended: true }));

//credenciales
const serviceAccount = require('./firebase_key.json');
const e = require('express');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore(); // Rutas de la API de productos

/*app.get('/inicio', (req, res) => {

    const productos = [
        {
            nombre: 'Jale Real',
            descripcion: 'Crema hidratante para rostro, anti vejes',
            precio: 930,
            imagen: 'https://picsum.photos/200?1'
        },
        {
            nombre: 'Aceite de Almendras',
            descripcion: 'Aceite corporal nutritivo antiestrias',
            precio: 500,
            imagen: 'pictues/aceite.png'
        },
        {
            nombre: 'Labial Always',
            descripcion: 'Labial infalible de larga duración',
            precio: 250,
            imagen: 'pictures/labial.jpg'
        },
        {
            nombre: 'Perfume Double',
            descripcion: 'Diablitos de mujer con aromas frescos y juveniles',
            precio: 260,
            imagen: 'pictures/double.png'
        },
        {
            nombre: 'Perfume Navigo',
            descripcion: 'Perfume de hombre con fragancia fresca y duradera',
            precio: 550,
            imagen: 'pictures/navigo.png'
        },
        {
            nombre: 'Perfume para bebe',
            descripcion: 'Perfume suave y delicado para la piel sensible de los bebes',
            precio: 250,
            imagen: 'pictures/bebe.png'
        }
   ];
   // res.render('inicio', { productos: productos});
   //console.log(productos);
   res.render('inicio',{
    //titulo: 'Pagina de inico',
    //mensaje: 'Bienvenido a esta tienda en linea',
    productos: productos
   })
});*/

/*app.post('/productos', async(req, res) => {
  try {
      const items = await db.collection('productos').get();
      const productos = items.docs.map(doc => {
        const data = doc.data();
        return {
            id: doc.id,
            nombre: data.nombre,
            descripcion: data.descripcion,
            precio: data.precio,
            imagen: data.imagen
        };
      });
      res.render('inicio', { productos: productos });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
});*/

app.get('/producto/add', (req, res) => {
    res.render('form', { productos: null, nombre: 'Crear Producto' });
});

app.post('/productos', async(req, res) => {
  try {
      const { nombre, descripcion, precio, imagen } = req.body;
      const nuevo = {
        nombre: nombre || '',
        precio: precio || 0,
        descripcion,
        imagen: imagen || ''
      };
      await db.collection('productos').add(nuevo);
      res.redirect('/productos');
    }catch (err) {
        console.error(err);
        res.status(500).send({ error: err.message });
    }
});

app.listen(port, () => {
    console.log('Servidor inicializado en http://localhost:' + port);
});
