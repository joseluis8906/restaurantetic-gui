import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  OnDestroy,
  } from "@angular/core";
import { Producto } from "src/app/producto/producto";
import { ProductoService } from "src/app/producto/producto.service";
import { Subscription } from "rxjs";
import { NotificationService, MessageType } from "src/app/notification/notification.service";

@Component({
  selector: "app-producto-view",
  templateUrl: "./producto-view.component.html",
  styleUrls: ["./producto-view.component.scss"],
})
export class ProductoViewComponent implements OnInit, OnDestroy {

  @Input() producto: Producto;
  @Output() editEvent: EventEmitter<boolean> = new EventEmitter();

  private subscriptions: Subscription;

  constructor(private productoService: ProductoService, private notificationService: NotificationService) { 
    this.subscriptions = new Subscription();
  }

  ngOnInit() { }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  onEditar(producto: Producto) {
    this.productoService.productosSubject.next(producto);
  }

  onEliminar(codigo: string) {
    this.subscriptions.add(this.productoService.removeProducto(codigo).subscribe((_) => {
      this.productoService.productosSubject.next(null);
      this.notificationService.showMessage(`El producto ${codigo} se eliminó correctamente.`, MessageType.Success);
    }));
  }
}
