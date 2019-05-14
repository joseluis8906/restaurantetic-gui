export class Producto {
    codigo: string;
    nombre: string;
    imagen: string;
    ingredientes: string;
    descripcion: string;
    precio: number;
}

export class ProductoBuilder {
    private producto: Producto;

    constructor() {
        this.producto = new Producto();
    }

    withCodigo(codigo: string): ProductoBuilder {
        this.producto.codigo = codigo;
        return this;
    }

    withNombre(nombre: string): ProductoBuilder {
        this.producto.nombre = nombre;
        return this;
    }

    withImagen(imagen: string): ProductoBuilder {
        this.producto.imagen = `url(${imagen})`;
        return this;
    }

    withDescripcion(descripcion: string): ProductoBuilder {
        this.producto.descripcion = descripcion;
        return this;
    }

    withIngredientes(ingredientes: string): ProductoBuilder {
        this.producto.ingredientes = ingredientes;
        return this;
    }

    withPrecio(precio: number): ProductoBuilder {
        this.producto.precio = precio;
        return this;
    }

    build(): Producto {
        return this.producto;
    }
}
