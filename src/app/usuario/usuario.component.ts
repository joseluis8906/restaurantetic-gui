import { Component, OnInit } from "@angular/core";
import { FormControl, Validators, ValidationErrors, AbstractControl, ValidatorFn, FormGroup, FormBuilder} from '@angular/forms';
import { Usuario } from "./Usuario";

@Component({
  selector: "app-usuario",
  templateUrl: "./usuario.component.html",
  styleUrls: ["./usuario.component.scss"],
})
export class UsuarioComponent implements OnInit {

  formControl: FormGroup;

  roleList: string[] = ['admin', 'cajero', 'cocinero', 'mesero'];

  username: FormControl;
  password: FormControl;
  passwordRep: FormControl;
  roles: FormControl;
  nombre: FormControl;
  telefono: FormControl;
  email: FormControl;

  constructor(fb: FormBuilder) {
    this.username = new FormControl("", [Validators.required, this.userAlreadyExists]);
    this.password = new FormControl("", [Validators.required]);
    this.passwordRep = new FormControl("", [Validators.required, this.passwordsMatch(this.password)]);
    this.roles = new FormControl("", [Validators.required]);
    this.nombre = new FormControl("");
    this.telefono = new FormControl("");
    this.email = new FormControl("");
  }

  ngOnInit() {
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
    }
  }

  userAlreadyExists(control: AbstractControl): ValidationErrors {
    return control.value.length > 3 ? { "userAlreadyExists": "Usuario ya existe" } : null;
  }

  passwordsMatch(password: FormControl): ValidatorFn {
    return (control: AbstractControl): ValidationErrors => {
      return password.value !== control.value ? { "notPasswdMatch": "Las contraseñas no coinciden" } : null ; 
    }
  }

  onGuardar(): void {
    console.log(this.username.value, this.password.value, this.roles.value);
  }
}
