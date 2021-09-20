window.onload = () => {
  const display = document.querySelector('.display');
  const equals = document.querySelector('.equals');
  const operators = document.querySelectorAll('.operator');
  const clear = document.querySelector('.clear');
  const numbers = document.querySelectorAll('.number');

  function evalExpression(expr) {
    return math.evaluate(expr);
  }

  function clearDisplay() {
    display.innerHTML = '';
  }

  function appendToDisplay(text) {
    display.innerHTML += text;
  }

  function onButtonClick() {
    if (display.classList.contains('result')) {
      clearDisplay();
      display.classList.remove('result');
    } else if (display.innerHTML.trim() == '0') {
      clearDisplay();
    }
  }

  for (const number of numbers) {
    number.onclick = () => {
      onButtonClick();
      appendToDisplay(number.innerHTML);
    };
  }

  equals.onclick = () => {
    if (!display.classList.contains('result')) {
      const result = evalExpression(display.innerHTML);
      clearDisplay();
      appendToDisplay(result);
      display.classList.add('result');
    }
  };

  for (const op of operators) {
    op.onclick = () => {
      const val = op.innerHTML;
      onButtonClick();
      appendToDisplay(val === 'x' ? '*' : val);
    };
  }

  clear.onclick = () => {
    onButtonClick();
    clearDisplay();
    appendToDisplay('0');
  };
};
