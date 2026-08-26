// import { Component, signal } from '@angular/core';
// import { RouterOutlet } from '@angular/router';

// @Component({
//   selector: 'app-root',
//   imports: [RouterOutlet],
//   templateUrl: './app.html',
//   styleUrl: './app.scss'
// })
// export class App {
//   protected readonly title = signal('voice-dictionary');
// }



import { Component, inject, signal, effect } from '@angular/core'; 
import { DictionaryService } from './services/dictionary'; // <--- ДОДАЛИ РЯДОК 1
import { SpeechService } from './services/speech';

@Component({
  selector: 'app-root',         //"бейдж" компонента. За цим ім'ям Angular знає, як вивести його на екран
  // standalone: true,            незалежний компонент,
  // imports: [],                    імпорти для нього
  templateUrl: './app.html',     //посилання на HTML-файл, де лежить "скелет" нашого екрана
  styleUrl: './app.scss'         //посилання на файл зі стилями (дизайном).
})
// export class AppComponent {
//   dictionaryService = inject(DictionaryService); // <--- компонент підключає необхідний сервіс
//   speechService = inject(SpeechService); // <--- 




//   title1 = 'voice-dictionary1';   //  Якщо у нашому візуальному файлі (app.html) ми напишемо спеціальний код {{ title }}, то Angular прочитає цю змінну і автоматично виведе на екран текст "voice-dictionary".

//   protected readonly title2 = signal('voice-dictionary2');   //спеціальний інструмент Signals для реактивного керування станом
// // ДОДАЄМО: Нова порожня "розумна коробка" для виведення  результату на екран
//  result = signal<any>(null);
  
  
// constructor() {
//     // Цей "радар" постійно слідкує: як тільки мікрофон почує нове слово, він автоматично запустить findWord!
//     effect(() => {
//       const spokenWord = this.speechService.transcript();
//       if (spokenWord) {
//         this.findWord(spokenWord); 
//       }
//     });
//   }





// findWord(word: string) {    //приймає від користувача якесь слово у вигляді тексту.
// // 1. Очищаємо коробку перед новим пошуком, щоб сигнал точно відчув зміни
//     this.result.set(null);

// console.log(' о ми знайшли:', this.result()),
//     this.dictionaryService.searchWord(word).subscribe(  // searchWord — це навичка (функція), яку ми самі дали нашому сервісу DictionaryService. Це його вміння ходити в інтернет за перекладом.
// // Щоб реально отримати результат від сервера, нам потрібно було написати команду .subscribe(...) (підписатися на результат).

//       (data) =>
//          {console.log('Ось що ми знайшли:', data),      //Те, що написано всередині дужок перед стрілочкою — (result) => ... або (data) => ... — це просто тимчасова наліпка, яку ми самі придумуємо для тієї посилки, що прийде від сервера.

//       // Правило фігурних дужок { }
// // Коли ми використовуємо стрілочку =>, у програмування є суворе правило:

// // Якщо після стрілочки йде тільки одна команда, її можна писати просто так.

// // Але якщо після стрілочки ми хочемо виконати дві або більше команд (як у нас: 1 — вивести в консоль, 2 — покласти в set), ми обов'язково маємо обгорнути їх у фігурні дужки { }. І кожна команда має закінчуватися крапкою з комою ;, а не комою ,.


// // КЛАДЕМО ЇЖУ НА ПІДНОС (використовуємо команду set)
//       this.result.set(data); //set (з англійської перекладається як "встановити" або "покласти") — це спеціальна команда, яка створена саме для таких розумних коробок (сигналів) для реактивного керування їхнім станом.
// // Коли ти пишеш this.result.set(data), ти буквально даєш програмі таку інструкцію:

// // Відкрий коробку під назвою result.

// // Викинь звідти все, що там лежало раніше (якщо там було старе слово).

// // Поклади туди нові дані (data), які щойно прислав сервер.

// // Увімкни сигналізацію! (Оце найголовніше).


//     }
//     );
//   }

// }


export class AppComponent {

// 1. Наші "розумні коробки" для екрана
  protected readonly title1 = signal('voice-dictionary');
  result = signal<any>(null); // Коробка для англійського словника
  translation = signal<string>(''); // <--- ДОДАЛИ: Нова коробка для українського перекладу!

  dictionaryService = inject(DictionaryService);
  speechService = inject(SpeechService);

  constructor() {
    // Радар мікрофона (залишаємо як є)
    effect(() => {
      const spokenWord = this.speechService.transcript();
      if (spokenWord) {
        this.findWord(spokenWord);
      }
    });
  }

  // 2. Оновлюємо дію нашого офіціанта
  findWord(word: string) {
    // Спочатку очищаємо обидві коробки перед новим пошуком
    this.result.set(null);
    this.translation.set('');

    // Замовлення 1: Шукаємо англійське значення
    this.dictionaryService.searchWord(word).subscribe((data) => {
      this.result.set(data);
    });

    // Замовлення 2: ОДНОЧАСНО просимо перекласти це слово
    this.dictionaryService.translateWord(word).subscribe((data: any) => {
      // Сервер перекладу пакує відповідь трохи інакше, тому дістаємо саме текст:
      this.translation.set(data.responseData.translatedText);
    });
  } }