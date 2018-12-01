const firstInputCcal = document.getElementById('ccal-1');
const secondInputCcal = document.getElementById('ccal-2');
const addedList = document.getElementById('added-list');
const firstResultList = document.getElementById('result-list-1');
const secondResultList = document.getElementById('result-list-2');
const firstResult = document.getElementById('result-1');
const secondResult = document.getElementById('result-2');
const btnAdd = document.getElementById('btn-add');
const btnCalc = document.getElementById('btn-calc');
const compareRandom = (a, b) => { Math.random() - 0.5 };
const allDishes = [];

const addDish = () => {
  allDishes.push({
    value: +firstInputCcal.value + +secondInputCcal.value,
    count: allDishes.length + 1,
  })
  addItem();

  firstInputCcal.value = '';
  secondInputCcal.value = '';
}

const addItem = () => {
  const data = allDishes[allDishes.length - 1];
  if (data.value) {
    const item = document.createElement('li');
    item.textContent = `${data.value} - ${data.count}`;
    addedList.appendChild(item);
  }
}

const distributeDishes = (minCcal, maxCcal) => {
  const firstList = []
  const secondList = []
  let firstSum = 0
  let secondSum = 0

  if (allDishes.length === 7) {
    allDishes
    .sort(compareRandom)
    .forEach((dish, index) => {
      if (index < 3) {
        firstSum += dish.value;
        firstList.push(dish)
      } else {
        secondSum += dish.value;
        secondList.push(dish)
      }
    })
    if (firstSum > minCcal && firstSum < maxCcal) {
      showResult(firstList, secondList, firstSum, secondSum);
    } else {
      distributeDishes(minCcal, maxCcal);
    }
  }
}

const showResult = (firstList, secondList, firstSum, secondSum) => {
  firstResultList.innerHTML = '';
  secondResultList.innerHTML = '';

  [firstList, secondList].forEach((arr, index) => {
    arr.forEach(dish => {
      const item = document.createElement('li');
      item.textContent = `${dish.value} - ${dish.count}`;
      index === 0 ? firstResultList.appendChild(item) : secondResultList.appendChild(item);
    })
  })

  firstResult.textContent = firstSum;
  secondResult.textContent = secondSum;
}

btnAdd.addEventListener('click', addDish);
btnCalc.addEventListener('click', () => { distributeDishes(1700, 1800) });