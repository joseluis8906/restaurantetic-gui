import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormControl, Validators, ValidationErrors, AbstractControl, ValidatorFn, FormGroup, FormBuilder, AsyncValidatorFn, FormGroupDirective} from '@angular/forms';
import { Usuario } from "./Usuario";
import { UsuarioService } from "./usuario.service";
import { map } from "rxjs/operators";
import { Observable, Subscription } from "rxjs";
import { NotificationService, MessageType } from "../notification/notification.service";

@Component({
  selector: "app-usuario",
  templateUrl: "./usuario.component.html",
  styleUrls: ["./usuario.component.scss"],
})
export class UsuarioComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription;
  formControl: FormGroup;

  usuarios: Array<Usuario>;
  roleList: string[] = ['admin', 'cajero', 'cocinero', 'mesero'];
  forUpdate: boolean;

  username: FormControl;
  password: FormControl;
  passwordRep: FormControl;
  roles: FormControl;
  nombre: FormControl;
  telefono: FormControl;
  email: FormControl;

  constructor(private usuarioService: UsuarioService, private fb: FormBuilder, private notificationService: NotificationService) {
    this.subscriptions = new Subscription();
    this.forUpdate = false;
    this.usuarios = [];
    this.getAll();
    this.username = new FormControl("", [Validators.required],[this.userAlreadyExists.bind(this)()]);
    this.password = new FormControl("", [Validators.required]);
    this.passwordRep = new FormControl("", [Validators.required, this.passwordsMatch.bind(this)]);
    this.roles = new FormControl("", [Validators.required]);
    this.nombre = new FormControl("");
    this.telefono = new FormControl("");
    this.email = new FormControl("", [Validators.email]);

    this.formControl = fb.group({
      username: this.username,
      password: this.password,
      passwordRep: this.passwordRep,
      roles: this.roles,
      nombre: this.nombre,
      telefono: this.telefono,
      email: this.email
    });
  }

  ngOnInit() {  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  getMessageError(field: string): string {
    switch(field) {
      case "username":
        return this.username.hasError("required") ? "El campo es requerido" :
          this.username.hasError("userAlreadyExists") ? "El usuario ya existe" : "";

      case "password":
        return this.password.hasError("required") ? "El campo es obligatorio" : "";

      case "passwordRep":
        return this.passwordRep.hasError("required") ? "El campo es obligatorio" :
          this.passwordRep.hasError("notPasswdMatch") ? "Las contraseñas no coinciden" : "";

      case "roles":
        return this.roles.hasError("required") ? "El campo es obligatorio" : "";

      case "email":
        return this.email.hasError("email") ? "El email es invalido" : "";
    }
  }

  userAlreadyExists(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors> => {
      return this.usuarioService.findOne(control.value).pipe<ValidationErrors>(map((usuario: Usuario) => {
        return usuario ? { "userAlreadyExists": "El usuario ya existe" } : null;
      }));
    }
  }

  passwordsMatch(control: AbstractControl): ValidationErrors {
      return this.password.value !== control.value ? { "notPasswdMatch": "Las contraseñas no coinciden" } : null ;
  }

  getAll(): void {
    this.subscriptions.add(this.usuarioService.getAll().subscribe((usuarios: Array<Usuario>) => {
      this.usuarios = usuarios;
    }));
  }

  onGuadarOActualizar(): void {
    if (this.forUpdate) {
      this.actualizar();
    } else {
      this.guardar();
    }
  }

  actualizar(): void {
    const usuario: Usuario = new Usuario();
    if (!this.password.value && !this.passwordRep.value) {
      this.password.disable();
      this.passwordRep.disable();
    }

    if (this.formControl.valid) {
      usuario.username = this.username.value;
      if (this.password.disabled) {
        usuario.password = null;
      } else {
        usuario.password = this.password.value;
      }
      usuario.roles = this.roles.value.join(",");
      usuario.nombre = this.nombre.value;
      usuario.telefono = this.telefono.value;
      usuario.email = this.email.value;
      this.subscriptions.add(this.usuarioService.update(usuario).subscribe((_) => {
        this.notificationService.showMessage(`Usuario ${usuario.username} actualizado exitosamente`, MessageType.Success);
        this.getAll();
        this.forUpdate = false;
        this.username.enable();
        this.password.enable();
        this.passwordRep.enable();
      }));
    }
  }

  guardar(): void {
    if (this.formControl.valid) {
      const usuario: Usuario = {
        username: this.username.value,
        password: this.password.value,
        roles: this.roles.value.join(","),
        nombre: this.nombre.value,
        telefono: this.telefono.value,
        email: this.email.value
      }

      this.subscriptions.add(this.usuarioService.create(usuario).subscribe((usuario: Usuario) => {
        this.notificationService.showMessage(`Usuario ${usuario.username} creado exitosamente`, MessageType.Success);
        this.getAll();
      }));

    } else {
      this.notificationService.showMessage("Hay errores en el formulario", MessageType.Error);
    }
  }

  onEdit(usuario: Usuario): void {
    this.forUpdate = true;
    this.username.setValue(usuario.username);
    this.username.disable();

    this.roles.setValue(usuario.roles.split(","));
    this.nombre.setValue(usuario.nombre);
    this.telefono.setValue(usuario.telefono);
    this.email.setValue(usuario.email);
  }

  onCancelar(): void {
    this.forUpdate = false;
    this.username.enable();
    this.formControl.reset();
  }

  onDelete(username: string): void {
    this.subscriptions.add(this.usuarioService.deleteOne(username).subscribe((_) => {
      this.notificationService.showMessage(`Usuario ${username} eliminado exitosamente`, MessageType.Success);
      this.getAll();
    }));
  }

  resetForm(fData: any, formDirective: FormGroupDirective): void {
    if (this.formControl.valid) {
      formDirective.resetForm();
      this.formControl.reset();
    }
  }
}
