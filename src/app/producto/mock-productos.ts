import { Producto } from './producto';

export const PRODUCTOS: Producto[] = [
  {
    codigo: "HAM001",
    nombre: "Hamburguesa De Res",
    descripcion: "Hamburgesa de carne de res, asado al término deseado, con un conjunto de aderesos de la mejor calidad.",
    ingredientes: ["Carne", "Pan", "Tomate", "Cebolla"],
    precio: 8500,
    imageTitle: "http://fb.ru/misc/i/gallery/39987/2156796.jpg",
    imageBanner: "https://static.independent.co.uk/s3fs-public/thumbnails/image/2017/10/06/09/mcvegan.jpg?w968h681"
  },
  {
    codigo: "PE002",
    nombre: "Perro caliente",
    descripcion: "Perro caliente con salchicha ranchera gratinado",
    ingredientes: ["Salchicha", "Pan", "Ketchup"],
    precio: 7500,
    imageTitle: "https://img-global.cpcdn.com/002_recipes/33040c3334cb1321/751x532cq70/photo.jpg",
    imageBanner: "http://www.cocinayvino.com/wp-content/uploads/2017/06/perrofrances.jpg"
  },
  {
    codigo: "PEC003",
    nombre: "Pechuga Gratinada en salsa de champiñones",
    descripcion: "Pechuga con champiñones bañado en una deliciosa salsa de la casa, acompañado de papas a la francesa, ensalada de la casa.",
    ingredientes: ["Pollo", "Champiñones", "Adereso"],
    precio: 21000,
    imageTitle: "https://cdn.kiwilimon.com/recetaimagen/1140/th5-640x640-6999.jpg",
    imageBanner: "http://www.alcarbonasados.com/images/galerias/menu/pollo/pollo_en_champinones.jpg"
  },
  {
    codigo: "CHU004",
    nombre: "Churrasco",
    descripcion: "Corte argentino de churrasco acompañado de papas a la francesa y ensalada de la casa.",
    ingredientes: ["Churrasco", "Papas", "Ensalada"],
    precio: 20000,
    imageTitle: "https://i2.wp.com/www.vocesdeoccidente.com/wp-content/uploads/2016/09/churrasco-350gr.jpg?fit=872%2C463",
    imageBanner: "http://www.alcarbonasados.com/images/galerias/menu/res/churrasco.jpg"
  },
  {
    codigo: "PUT005",
    nombre: "Punta De Anca",
    descripcion: "Corte argentino de punta de anca acompañado de papa francesa y ensalada de la casa.",
    ingredientes: ["Carne", "Papas", "Ensalada"],
    precio: 22000,
    imageTitle: "https://media-cdn.tripadvisor.com/media/photo-s/0e/6e/61/63/punta-de-anca-don-pepe.jpg",
    imageBanner: "http://www.alcarbonasados.com/images/galerias/menu/res/punta_de_anca.jpg"
  },
  {
    codigo: "COM006",
    nombre: "Combo Hamburguesa",
    descripcion: "100% carne de res, con queso, tomate y lechuga,  cebolla, acompañada de papas a la francesa y Bebida pequeña.",
    ingredientes: ["Carne", "Tomate", "Cebolla", "Ketchup"],
    precio: 12500,
    imageTitle: "https://www.eluniversal.com.mx/sites/default/files/styles/f03-651x400/public/2018/04/04/hamburguesas_papas_refresco.jpg?itok=ZLYEDfJm&c=3392224bcb789844a53691e5e9686715",
    imageBanner: "http://www.alcarbonasados.com/images/galerias/menu/res/combo_hamburguesa.jpg"
  },
  {
    codigo: "ROB007",
    nombre: "Robalo Apanado",
    descripcion: "Filete de robalo apanado, acompañado de una porción papa a la francesa y ensalada de la casa.",
    ingredientes: ["Róbalo", "Papa", "Ensalada"],
    precio: 28000,
    imageTitle: "http://www.olimpica.com/wp-content/uploads/2017/04/Filete-de-robalo-apanado.png",
    imageBanner: "http://www.alcarbonasados.com/images/galerias/menu/pescado/robalo_apanado.jpg"
  },
  {
    codigo: "COS008",
    nombre: "Costillas Salsa BBQ",
    descripcion: "Costilla de cerdo bañada en salsa BBQ, acompañada de papa a la francesa y ensalada de la casa.",
    ingredientes: ["Cerdo", "Salsa", "Papa"],
    precio: 23000,
    imageTitle: "https://cilianosdelicias.com/wp-content/uploads/2016/11/COSTILLAS-DE-CERDO-A-LA-BBQ.jpg",
    imageBanner: "http://www.alcarbonasados.com/images/galerias/menu/entradas/papa_a_la_francesa.jpg"
  }
];