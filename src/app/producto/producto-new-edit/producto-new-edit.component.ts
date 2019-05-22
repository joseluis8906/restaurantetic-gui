import { Component, Inject, OnInit, OnDestroy } from "@angular/core";
import { Producto } from "src/app/producto/producto";
import { ProductoService } from "src/app/producto/producto.service";
import { MediaService } from "src/app/utils/media.service";
import { Subscription, Observable } from "rxjs";
import { FormGroup, FormControl, Validators, FormBuilder, ValidationErrors, AsyncValidatorFn, AbstractControl } from "@angular/forms";
import { map } from "rxjs/operators";

@Component({
  selector: "app-producto-new-edit",
  templateUrl: "./producto-new-edit.component.html",
  styleUrls: ["./producto-new-edit.component.scss"],
})
export class ProductoNewEditComponent implements OnInit, OnDestroy {

  formGroup: FormGroup;
  nombre: FormControl;
  codigo: FormControl;
  imagen: FormControl;
  ingredientes: FormControl;
  descripcion: FormControl;
  precio: FormControl;

  private subscriptions: Subscription;
  producto: Producto;

  constructor(private formBuilder: FormBuilder, private mediaService: MediaService, private productoService: ProductoService) {
    this.subscriptions = new Subscription();
    this.producto = new Producto();

    this.nombre = new FormControl(null, [Validators.required]);
    this.codigo = new FormControl(null, [Validators.required], [this.validateCodigo.bind(this)()]);
    this.imagen = new FormControl(null, [Validators.required]);
    this.ingredientes = new FormControl(null, [Validators.required]);
    this.descripcion = new FormControl(null, [Validators.required]);
    this.precio = new FormControl(null, [Validators.required])

    this.formGroup = formBuilder.group({
      nombre: this.nombre,
      codigo: this.codigo,
      imagen: this.imagen,
      ingredientes: this.ingredientes,
      descripcion: this.descripcion,
      precio: this.precio
    });
  }

  ngOnInit() { }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  private validateCodigo(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors> => {
      return this.productoService.getProducto(control.value).pipe<ValidationErrors>(map((producto: Producto) => {
        return producto ? { "productoAlreadyExists": "El código no está disponible" } : null;
      }));
    }
  }

  public getErrorMessage(campo: string): string {
    switch(campo) {
      case "nombre":
        return this.nombre.hasError("required") ? "El campo es obligatorio" : "";

      case "codigo":
        return this.codigo.hasError("required") ? "El campo es obligatorio" : 
          this.codigo.hasError("productoAlreadyExitsts") ? "El código no está disponible" : "";

      case "imagen":
        return this.imagen.hasError("required") ? "El campo es obligatorio" : "";

      case "ingredientes":
        return this.ingredientes.hasError("required") ? "El campo es obligatorio" : "";

      case "descripcion":
        return this.descripcion.hasError("required") ? "El campo es obligatorio" : "";

      case "precio":
        return this.imagen.hasError("required") ? "El campo es obligatorio" : "";
    }
    return null;
  }

  onCancelar(): void { }

  onUploadPicture(file: File) {
    this.subscriptions.add(this.mediaService.upload(file).subscribe((imageName: string) => {
      this.producto.imagen = imageName;
      console.log(this.producto);
    }));
  }

  onConfirmar(evt) {
    this.subscriptions.add(this.productoService.addProducto(this.producto).subscribe((producto_: Producto) => {
      this.productoService.productosSubject.next(producto_);
    }));
  }
}
