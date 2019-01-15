export class Producto {
    codigo: string;
    nombre: string;
    descripcion: string;
    ingredientes: string[];
    precio: number;
    imageTitle: string;
    imageBanner: string;
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

    withDescripcion(descripcion: string): ProductoBuilder {
        this.producto.descripcion = descripcion;
        return this;
    }

    withIngredientes(ingredientes: string[]): ProductoBuilder {
        this.producto.ingredientes = ingredientes;
        return this;
    }

    withPrecio(precio: number): ProductoBuilder {
        this.producto.precio = precio;
        return this;
    }

    withImageTitle(imageTitle: string): ProductoBuilder {
        this.producto.imageTitle = `url(${imageTitle})`;
        return this;
    }

    withImageBanner(imageBanner: string): ProductoBuilder {
        this.producto.imageBanner = `url(${imageBanner})`;
        return this;
    }

    build(): Producto {
        return this.producto;
    }
}
