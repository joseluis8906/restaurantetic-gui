import { Component, Inject, OnInit, OnDestroy } from "@angular/core";
import { Producto } from "src/app/producto/producto";
import { ProductoService } from "src/app/producto/producto.service";
import { MediaService } from "src/app/utils/media.service";
import { Subscription, Observable } from "rxjs";
import { FormGroup, FormControl, Validators, FormBuilder, ValidationErrors, AsyncValidatorFn, AbstractControl, FormGroupDirective } from "@angular/forms";
import { map } from "rxjs/operators";
import { NotificationService, MessageType } from "src/app/notification/notification.service";

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
  editar: Boolean;

  constructor(private formBuilder: FormBuilder, private mediaService: MediaService, private productoService: ProductoService, private notificationService: NotificationService) {
    this.subscriptions = new Subscription();
    this.producto = new Producto();
    this.editar = false;

    this.nombre = new FormControl(null, [Validators.required]);
    this.codigo = new FormControl(null, [Validators.required], [this.validateCodigo.bind(this)()]);
    this.imagen = new FormControl(null);
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

    this.subscriptions.add(this.productoService.productos$.subscribe((producto: Producto) => {
      if (producto !== null) {
        this.producto = producto;
        this.editar = true;
        this.onEditar();
      }
    }));
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
          this.codigo.hasError("productoAlreadyExists") ? "El código no está disponible" : "";

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

  onCancelar(): void {
    this.editar = false;
    this.nombre.enable();
    this.codigo.enable();
    this.ingredientes.enable();
    this.formGroup.reset();
  }

  onUploadPicture(file: File) {
    this.subscriptions.add(this.mediaService.upload(file).subscribe((imageName: string) => {
      this.imagen.setValue(imageName);
      console.log(this.producto);
    }));
  }

  onGuardarOActualizar(): void {
    if (this.formGroup.valid) {
      this.producto = {
        nombre: this.nombre.value,
        codigo: this.codigo.value,
        imagen: this.imagen.value,
        ingredientes: this.ingredientes.value,
        descripcion: this.descripcion.value,
        precio: this.precio.value
      };

      if (!this.editar) {
        this.guardar()
      } else {
        this.actualizar();
      }
    }
  }

  guardar(): void {
    this.subscriptions.add(this.productoService.addProducto(this.producto).subscribe((producto_: Producto) => {
      this.productoService.productosSubject.next(producto_);
      this.notificationService.showMessage("Producto creado exitosamente.", MessageType.Success);
    }));
  }

  actualizar(): void {
    this.subscriptions.add(this.productoService.updateProducto(this.producto).subscribe((_) => {
      this.productoService.productosSubject.next(null);
      this.notificationService.showMessage("Producto actualizado exitosamente.", MessageType.Success);
      this.onCancelar();
    }));
  }

  onEditar(): void {
    this.nombre.setValue(this.producto.nombre);
    this.codigo.setValue(this.producto.codigo);
    this.imagen.setValue(this.producto.imagen);
    this.ingredientes.setValue(this.producto.ingredientes);
    this.descripcion.setValue(this.producto.descripcion);
    this.precio.setValue(this.producto.precio);

    this.nombre.disable();
    this.codigo.disable();
    this.ingredientes.disable();
  }

  resetForm(fData: any, formDirective: FormGroupDirective): void {
    if (this.formGroup.valid) {
      formDirective.resetForm();
      this.formGroup.reset();
    }
  }
}
