import {Injectable, signal} from '@angular/core';

@Injectable(
    {
  providedIn: 'root'
}
)




export class SpeechService {
// 1. Лампочка-індикатор: чи працює мікрофон прямо зараз? (спочатку ні - false)
  isListening = signal(false);

  // 2. Блокнот для тексту: сюди помічник запише те, що почув (спочатку порожньо)
  transcript = signal('');

 
  currentLanguage = signal('en-US'); // <---  коробка для поточної мови



// 1. ДОДАЛИ: Створюємо місце для нашого мікрофона
  private recognition: any;//— ми створили змінну-коробочку, де сервіс буде зберігати підключений мікрофон. Слово private означає, що цей мікрофон може використовувати тільки цей сервіс на своїй "закритій кухні".


constructor() {// 2. ДОДАЛИ: Просимо браузер дати нам свій вбудований інструмент для мови
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;  //— це спеціальна команда, яка буквально каже: "Браузере (window), дай нам свій інструмент для розпізнавання голосу". Ми пишемо два варіанти через || (або), бо різні браузери (як-от Chrome чи Safari) наз
    
    // 3. ДОДАЛИ: Якщо браузер підтримує цю функцію, налаштовуємо її
    if (SpeechRecognition) {
      this.recognition = new SpeechRecognition();
      this.recognition.lang = 'en-US'; // Налаштовуємо на англійську мову для нашого словника.this.recognition.lang = 'en-US'; — ми одразу кажемо мікрофону, яку мову він має очікувати і розпізнавати (у нашому випадку англійську, бо ми шукаємо англійські слова).
    }

// const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
   

      // ДОДАЄМО ОСЬ ЦЕЙ БЛОК: Що робити, коли браузер почув слова
      this.recognition.onresult = (event: any) => {
        const text = event.results[0][0].transcript; // 1. Дістаємо текст
        this.transcript.set(text);                   // 2. Кладемо в "блокнот"

        alert('Телефон почув: ' + text);
        this.isListening.set(false);                 // 3. Вимикаємо лампочку
      };

// <--- ДОДАЄМО ОСЬ ЦІ ДВА БЛОКИ --->
      
      // Якщо браузер мовчки видав помилку:
      this.recognition.onerror = (event: any) => {
        console.log('Помилка мікрофона:', event.error);
        alert('Помилка: ' + event.error);
        this.isListening.set(false); // Вимикаємо лампочку
      };

      // Якщо браузер сам вимкнув мікрофон:
      this.recognition.onend = () => {
        console.log('Мікрофон зупинив роботу.');
        this.isListening.set(false); // Вимикаємо лампочку
      };


    }
 
// Команда 1: Почати слухати
// start() {
//     console.log('1. Кнопку натиснуто!');
//     console.log('2. Стан лампочки:', this.isListening());
    
//     if (this.isListening()) {
//       console.log('3. Програма думає, що запис уже йде, тому ігнорує клік.');
//       return; 
//     }

//     if (this.recognition) {
//       console.log('4. Даємо команду браузеру ввімкнути мікрофон...');
//       this.isListening.set(true); 
//       this.recognition.start();   
//     } else {
//       alert('Ой! Здається, цей браузер не підтримує голосовий ввід.');
//     }
//   }

// Почати слухати з вибраною мовою
start(language: string = '') {
    console.log('1. Кнопку натиснуто! Мова:', language);
    console.log('2. Чи зависла лампочка?', this.isListening());

    // Перевіряємо наш запобіжник
    if (this.isListening()) {
      console.log('3. Програма думає, що вже слухає, ігноруємо клік.');
      return;
    }

    if (this.recognition) {
        console.log('4. Даємо команду браузеру ввімкнути мікрофон...');
// ЗАПАМ'ЯТОВУЄМО МОВУ В КОРОБКУ
      this.currentLanguage.set(language);

    
      this.recognition.lang = language;
      this.isListening.set(true);
      this.recognition.start();
    }
  }

  // Команда 2: Зупинити слухати
  stop() {
    if (this.recognition) {
      this.isListening.set(false); // Вимикаємо лампочку
      this.recognition.stop();     // Даємо браузеру команду вимкнути мікрофон
    }

}
// Команда для озвучення (читання) тексту
  speakText(text: string) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US'; // Налаштовуємо нашого диктора на англійський акцент
    window.speechSynthesis.speak(utterance);
  }
}