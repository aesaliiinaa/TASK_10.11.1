// элементы в DOM можно получить при помощи функции querySelector
const fruitsList = document.querySelector('.fruits__list'); // список карточек
const shuffleButton = document.querySelector('.shuffle__btn'); // кнопка перемешивания
const filterButton = document.querySelector('.filter__btn'); // кнопка фильтрации
const sortKindLabel = document.querySelector('.sort__kind'); // поле с названием сортировки
const sortTimeLabel = document.querySelector('.sort__time'); // поле с временем сортировки
const sortChangeButton = document.querySelector('.sort__change__btn'); // кнопка смены сортировки
const sortActionButton = document.querySelector('.sort__action__btn'); // кнопка сортировки
const kindInput = document.querySelector('.kind__input'); // поле с названием вида
const colorInput = document.querySelector('.color__input'); // поле с названием цвета
const weightInput = document.querySelector('.weight__input'); // поле с весом
const addActionButton = document.querySelector('.add__action__btn'); // кнопка добавления

// список фруктов в JSON формате
let fruitsJSON = `[
  {"kind": "Мангустин", "color": "фиолетовый", "weight": 13},
  {"kind": "Дуриан", "color": "зеленый", "weight": 35},
  {"kind": "Личи", "color": "розово-красный", "weight": 17},
  {"kind": "Карамбола", "color": "желтый", "weight": 28},
  {"kind": "Тамаринд", "color": "светло-коричневый", "weight": 22}
]`;

// преобразование JSON в объект JavaScript
let fruits = JSON.parse(fruitsJSON);

/*** ОТОБРАЖЕНИЕ ***/

// отрисовка карточек
const display = () => {
  // TODO: очищаем fruitsList от вложенных элементов,
  // чтобы заполнить актуальными данными из fruits
  fruitsList.innerHTML = "";

  for (let i = 0; i < fruits.length; i++) {
    // TODO: формируем новый элемент <li> при помощи document.createElement,
    // и добавляем в конец списка fruitsList при помощи document.appendChild
    const fruit = fruits[i];
    const li = document.createElement("li");
    li.classList.add("fruit__item");

    switch (fruit.color.toLowerCase()) {
      case "фиолетовый":
        li.classList.add("fruit_violet");
        break;
      case "зеленый":
        li.classList.add("fruit_green");
        break;
      case "розово-красный":
        li.classList.add("fruit_carmazin");
        break;
      case "желтый":
        li.classList.add("fruit_yellow");
        break;
      case "светло-коричневый":
        li.classList.add("fruit_lightbrown");
        break;
      default:
        li.style.border = "8px solid black";
        li.style.borderRadius = "15px";
    }

    const infoDiv = document.createElement("div");
    infoDiv.classList.add("fruit__info");

    const indexDiv = document.createElement("div");
    indexDiv.textContent = `index: ${i}`;
    infoDiv.appendChild(indexDiv);

    const kindDiv = document.createElement("div");
    kindDiv.textContent = `kind: ${fruit.kind}`;
    infoDiv.appendChild(kindDiv);

    const colorDiv = document.createElement("div");
    colorDiv.textContent = `color: ${fruit.color}`;
    infoDiv.appendChild(colorDiv);

    const weightDiv = document.createElement("div");
    weightDiv.textContent = `weight: ${fruit.weight}`;
    infoDiv.appendChild(weightDiv);

    li.appendChild(infoDiv);
    fruitsList.appendChild(li)
  }
};

// первая отрисовка карточек
display();

/*** ПЕРЕМЕШИВАНИЕ ***/

// генерация случайного числа в заданном диапазоне
const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// перемешивание массива
const shuffleFruits = () => {
  let result = [];
  const oldFruitsList = [...fruits];

  // ATTENTION: сейчас при клике вы запустите бесконечный цикл и браузер зависнет
  while (fruits.length > 0) {
    // TODO: допишите функцию перемешивания массива
    //
    // Подсказка: находим случайный элемент из fruits, используя getRandomInt
    // вырезаем его из fruits и вставляем в result.
    // ex.: [1, 2, 3], [] => [1, 3], [2] => [3], [2, 1] => [], [2, 1, 3]
    // (массив fruits будет уменьшатся, а result заполняться)
    const randomIndex = getRandomInt(0, fruits.length - 1);

    const item = fruits.splice(randomIndex, 1)[0];
    result.push(item);
  }

  fruits = result;

  let isSame = true;
  for (let i = 0; i < fruits.length; i++) {
    if (fruits[i] !== oldFruitsList[i]) {
      isSame = false;
      break;
    }
  }

  if (isSame) {
    alert("Порядок не изменился, перемешайте ещё раз!");
  }
};

shuffleButton.addEventListener('click', () => {
  shuffleFruits();
  display();
});

/*** ФИЛЬТРАЦИЯ ***/

// фильтрация массива
const filterFruits = () => {
  const min = parseInt(document.querySelector('.minweight__input').value) || 0;
  const max = parseInt(document.querySelector('.maxweight__input').value) || 1000000;

  fruits = fruits.filter((item) => {
    // TODO: допишите функцию
    return item.weight >= min && item.weight <= max;
  });
};

filterButton.addEventListener('click', () => {
  filterFruits();
  display();
});

/*** СОРТИРОВКА ***/

let sortKind = 'bubbleSort'; // инициализация состояния вида сортировки
let sortTime = '-'; // инициализация состояния времени сортировки

const rainbowOrder = [
  "светло-коричневый",
  "розово-красный",
  "желтый",
  "зеленый",
  "фиолетовый"
];

const comparationColor = (a, b) => {
  // TODO: допишите функцию сравнения двух элементов по цвету
  const indexA = rainbowOrder.indexOf(a.color);
  const indexB = rainbowOrder.indexOf(b.color);

  const effectiveA = indexA === -1 ? Number.MAX_SAFE_INTEGER : indexA;
  const effectiveB = indexB === -1 ? Number.MAX_SAFE_INTEGER : indexB;

  return effectiveA - effectiveB;
};

const sortAPI = {
  bubbleSort(arr, comparation) {
    // TODO: допишите функцию сортировки пузырьком
    const n = arr.length;

    for (let i = 0; i < n-1; i++) {
      for (let j = 0; j < n-1-i; j++) {
        if (comparation(arr[j], arr[j+1]) > 0) {
          let temp = arr[j+1]; 
          arr[j+1] = arr[j]; 
          arr[j] = temp; 
        }
      }
    }
  },

  quickSort(arr, comparation) {
    // TODO: допишите функцию быстрой сортировки
    if (arr.length <= 1) return arr;
    const pivot = arr[arr.length - 1];
    const left = [];
    const right = [];

    for (let i = 0; i < arr.length - 1; i++) {
      if (comparation(arr[i], pivot) < 0) {
        left.push(arr[i]);
      } else {
        right.push(arr[i]);
      }
    }
    const sorted = [...sortAPI.quickSort(left, comparation), pivot, ...sortAPI.quickSort(right, comparation)];
    arr.splice(0, arr.length, ...sorted);
    return arr;
  },

  // выполняет сортировку и производит замер времени
  startSort(sort, arr, comparation) {
    const start = new Date().getTime();
    sort(arr, comparation);
    const end = new Date().getTime();
    sortTime = `${end - start} ms`;
  },
};

// инициализация полей
sortKindLabel.textContent = sortKind;
sortTimeLabel.textContent = sortTime;

sortChangeButton.addEventListener('click', () => {
  // TODO: переключать значение sortKind между 'bubbleSort' / 'quickSort'
  sortKind = sortKind === 'bubbleSort' ? 'quickSort' : 'bubbleSort';
  sortKindLabel.textContent = sortKind;
});

sortActionButton.addEventListener('click', () => {
  // TODO: вывести в sortTimeLabel значение 'sorting...'
  sortTimeLabel.textContent = 'sorting...';
  const sort = sortAPI[sortKind];
  sortAPI.startSort(sort, fruits, comparationColor);
  display();
  // TODO: вывести в sortTimeLabel значение sortTime
  sortTimeLabel.textContent = sortTime;
});

/*** ДОБАВИТЬ ФРУКТ ***/

addActionButton.addEventListener('click', () => {
  // TODO: создание и добавление нового фрукта в массив fruits
  // необходимые значения берем из kindInput, colorInput, weightInput
  const kind = kindInput.value.trim();
  const color = colorInput.value.trim();
  const weight = parseInt(weightInput.value);

  if (!kind || !color || isNaN(weight)) {
    alert("Проверьте, что все поля заполнены!");
    return;
  }
  
  const newFruit = { kind, color, weight };
  fruits.push(newFruit);

  display();

  kindInput.value = "";
  colorInput.value = "";
  weightInput.value = "";
});
