const TypeWriter = function(textElement, words, waitDuration = 3000) {
  this.textElement = textElement;
  this.words = words;
  this.currentText = '';
  this.index = 0;
  this.waitDuration = parseInt(waitDuration, 10);
  this.type();
  this.isDeleting = false;
};

TypeWriter.prototype.type = function() {
  const currentWordIndex = this.index % this.words.length;
  const word = this.words[currentWordIndex];

  if (this.isDeleting) {
    this.currentText = word.substring(0, this.currentText.length - 1);
  } else {
    this.currentText = word.substring(0, this.currentText.length + 1);
  }

  this.textElement.innerHTML = `<span class="cursor">${
    this.currentText
  }</span>`;

  let typeSpeed = 300;

  if (this.isDeleting) {
    typeSpeed /= 2;
  }

  if (!this.isDeleting && this.currentText === word) {
    typeSpeed = this.waitDuration;
    this.isDeleting = true;
  } else if (this.isDeleting && this.currentText === '') {
    this.isDeleting = false;
    this.index++;
    typeSpeed = 500;
  }

  setTimeout(() => this.type(), typeSpeed);
};

document.addEventListener('DOMContentLoaded', init);

function init() {
  const textElement = document.querySelector('.text-type');
  const words = JSON.parse(textElement.getAttribute('data-text'));
  const waitDuration = textElement.getAttribute('data-wait');

  new TypeWriter(textElement, words, waitDuration);
}
