import { Observable } from 'rxjs';

const observable = new Observable<any>(teste => {
  const id = setInterval(() => {
    teste.next('hi');
  }, 1000);
});

const observer = {
  next: (x: string) => console.log('Observer got a next value: ' + x),
  error: (err: string) => console.error('Observer got an error: ' + err),
  complete: () => console.log('Observer got a complete notification'),
};


observable.subscribe(observer);
