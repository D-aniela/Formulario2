import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CountryService } from '../../services/country.service';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { MensajeErrorService } from '../../services/errorMsj.service';

@Component({
  selector: 'app-tableform',
  templateUrl: './tableform.component.html',
  styleUrls: ['./tableform.component.css'],
})
export class TableformComponent implements OnInit {
  public CountriesName: Array<string> = [];
  public formulario: FormGroup;

  constructor(
    private countryService: CountryService,
    private errorService: MensajeErrorService
  ) {
    this.countryService
      .getCountries()
      .subscribe((country) => this.CountriesName.push(country));
  }

  ngOnInit(): void {
    this.createForm();
  }

  public createForm() {
    this.formulario = new FormGroup({
      nombreUsuario: new FormControl(null, [
        RxwebValidators.pattern({
          expression: { onlyAlpha: /^[a-zA-Z ]+$/ },
        }),
        RxwebValidators.required(),
        RxwebValidators.minLength({ value: 3 }),
      ]),
      email: new FormControl(null, [RxwebValidators.email()]),
      retype: new FormControl(null, [
        RxwebValidators.required(),
        RxwebValidators.minLength({ value: 3 }),
      ]),
      password: new FormControl('', [
        RxwebValidators.required(),
        RxwebValidators.minLength({ value: 3 }),
      ]),
      confirmPassword: new FormControl('', [
        RxwebValidators.compare({ fieldName: 'password' }),
      ]),
      Nombre: new FormControl(null, [
        RxwebValidators.pattern({
          expression: { onlyAlpha: /^[a-zA-Z ]+$/ },
        }),
        RxwebValidators.required(),
        RxwebValidators.minLength({ value: 3 }),
      ]),
      Telefono: new FormControl(null, [
        RxwebValidators.pattern({
          expression: { onlyAlpha: /^([0-9])*$/ },
        }),
        RxwebValidators.required(),
        RxwebValidators.minLength({ value: 3 }),
      ]),
    });
  }

  public mostrarFormulario() {
    console.clear();
    console.log(this.formulario);
  }

  public validarFormulario(control: string) {
    if (!this.formulario.controls[control].touched) return { error: undefined };

    return this.errorService.mensajeError(
      this.formulario.controls[control].errors
    );
  }
}
