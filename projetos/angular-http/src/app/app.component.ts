import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Car } from './models/car';
import { CarService } from './service/car.service';
import { MensagensService } from './service/mensagens.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  car!: Car;
  cars: Car[] = [];

  constructor(
    private carService: CarService,
    public mensagens: MensagensService
  ) { }


  ngOnInit(): void {
    this.getCars();
  }

  // define se um carro será criado ou atualizado
  saveCar(form: NgForm): void {
    if (this.car && this.car.id) {
      this.carService.update(this.car).subscribe(
        () => {
          this.cleanForm(form)
        },
        error => {
          console.log(error.message);
        }
      );
    } else {
      this.carService.save(this.car).subscribe(
        () => {
          this.cleanForm(form)
        },
        error => {
          console.log(error.message);
        }
      );
    }
  }

  // deleta um carro
  deleteCar(car: Car): void {
    this.carService.delete(car.id).subscribe(
      () => {
        this.getCars();
      },
      error => {
        console.log(error.message);
      }
    );
  }

  // copia o carro para ser editado
  editCar(car: Car): void {
    this.car = { ...car };
  }

  // limpa o formulário
  cleanForm(form: NgForm): void {
    this.getCars();
    form.resetForm();
    this.car = {} as Car;
  }

  // chama o serviço para obter todos os carros
  getCars(): void {
    this.carService.getCars()
      .subscribe((cars: Car[]) => this.cars = cars);
  }

}
