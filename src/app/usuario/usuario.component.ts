import { Component, OnInit } from "@angular/core";
import { FormControl, Validators, ValidationErrors, AbstractControl} from '@angular/forms';

@Component({
  selector: "app-usuario",
  templateUrl: "./usuario.component.html",
  styleUrls: ["./usuario.component.scss"],
})
export class UsuarioComponent implements OnInit {

  usuario = new FormControl("", [Validators.required, this.userAvailableValidator]);
  password = new FormControl("", [Validators.required, this.passwordValidator]);

  constructor() { }

  ngOnInit() {
  }

  getErrorMessages() {
    return this.usuario.hasError("required") ? "You must enter a value" :
      this.usuario.hasError("email") ? "Not a valid email" :
      this.usuario.hasError("user-already-exists") ? "El usuario ya existe" : "";
  }

  userAvailableValidator(control: AbstractControl): ValidationErrors {
    return { "user-already-exists": "Usuario ya existe" };
  }

  passwordValidator(control: AbstractControl): ValidationErrors {
    return null;
  }

}
