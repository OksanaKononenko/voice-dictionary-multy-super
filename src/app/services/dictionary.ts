import { Injectable, inject } from '@angular/core'; //"Візьми спеціальний інструмент під назвою Injectable з головної скриньки інструментів Angular (яка називається @angular/core)".
//inject   ще один допоміжний інструмент з коробки Angular, який дозволяє  підключати інші інструменти.
import { HttpClient } from '@angular/common/http'; //спеціальний інструмент для роботи з інтернетом,  HttpClient

@Injectable(
  {providedIn: 'root'}    //Зроби цей сервіс одним спільним для всієї нашої програми
)
 
 
export class DictionaryService {
  http = inject(HttpClient);//у змінну   http і "поклали"  інтернет-інструмент, коли ми захочемо звернутися до сервера, ми просто скажемо this.http...

  constructor() { }

searchWord(word: string) {
    return this.http.get('https://api.dictionaryapi.dev/api/v2/entries/en/' + word);//безкоштовного онлайн-словника.      базове посилання + word і   слово, яке шукаємо (наприклад, якщо ми шукаємо "cat", посилання автоматично стане .../en/cat
  }



  // ДОДАЄМО НОВУ ФУНКЦІЮ ДЛЯ ПЕРЕКЛАДУ:
  translateWord(word: string) {
    return this.http.get('https://api.mymemory.translated.net/get?q=' + word + '&langpair=en|uk');
  }
}