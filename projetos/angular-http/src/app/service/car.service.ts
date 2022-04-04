import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, retry, tap } from 'rxjs';
import { Car } from '../models/car';
import { MensagensService } from './mensagens.service';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  private url = 'http://localhost:3000/cars'; // get all cars

  // injetando o httpClient
  constructor(
    private http: HttpClient,
    private mensagensService: MensagensService
  ) { }

  //headers
  private headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  // Obtem todos os carros
  getCars(): Observable<Car[]> {
    return this.http.get<Car[]>(this.url).
      pipe(
        retry(2),
        tap(cars => this.log('fetched cars')),
        catchError(this.handleError('getCars', []))
      )
  }

  // Obtem um carro pelo id
  getCar(id: number): Observable<Car> {
    const url = `${this.url}/${id}`;
    return this.http.get<Car>(url).pipe(
      retry(2),
      tap(_ => this.log(`fetched car id=${id}`)),
      catchError(this.handleError<Car>(`getCar id=${id}`))
    );
  }

  // salva um carro
  save(car: Car): Observable<Car> {
    return this.http.post<Car>(this.url, JSON.stringify(car), { headers: this.headers }).pipe(
      retry(2),
      tap(car => this.log(`added car w/ id=${car.id}`)),
      catchError(this.handleError<Car>('saveCar'))
    );
  }

  // atualiza um carro
  update(car: Car): Observable<Car> {
    const url = `${this.url}/${car.id}`;
    return this.http.put<Car>(url, JSON.stringify(car), { headers: this.headers }).pipe(
      retry(2),
      tap(_ => this.log(`updated car id=${car.id}`)),
      catchError(this.handleError<Car>('updateCar'))
    );
  }

  // deleta um carro
  delete(id: number): Observable<Car> {
    const url = `${this.url}/${id}`;
    return this.http.delete<Car>(url).pipe(
      retry(2),
      tap(_ => this.log(`deleted car id=${id}`)),
      catchError(this.handleError<Car>('deleteCar'))
    );
  }

  private log(message: String) {
    this.mensagensService.add(`CarService: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.mensagensService.add(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }


}
