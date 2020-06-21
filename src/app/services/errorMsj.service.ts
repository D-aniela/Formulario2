import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MensajeErrorService {
  constructor() {}

  public mensajeError(errorRecibido: Object) {
    let mensaje: string = '';
    if (errorRecibido == null) {
      return {
        error: false,
      };
    }

    switch (true) {
      case errorRecibido.hasOwnProperty('required'):
        mensaje = 'Es necesario este campo';
        break;
      case errorRecibido.hasOwnProperty('onlyAlpha'):
        mensaje = 'Contiene caracteres innecesarios';
        break;
      case errorRecibido.hasOwnProperty('minLength'):
        mensaje = 'Es necesario un mínimo de 3 caracteres';
        break;
      case errorRecibido.hasOwnProperty('email'):
        mensaje = 'Ingrese un correo válido';
      case errorRecibido.hasOwnProperty('password'):
        mensaje = 'Ingrese una contraseña válida';
        break;
      case errorRecibido.hasOwnProperty('compare'):
        mensaje = 'Las contraseñas no coinciden';
        break;
      default:
        return {
          error: false,
        };
    }
    return {
      mensaje,
      error: true,
    };
  }
}
