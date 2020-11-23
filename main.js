const popup = document.querySelector('.popup');
const buttonEdit = document.querySelector('.profile__info__button');
const buttonClose = popup.querySelector('.popup__close');
const formElement = popup.querySelector('.popup__form');

let nameInput = formElement.querySelector('#first-name');
let jobInput = formElement.querySelector('#job-name');

function popupOpened() {
  popup.classList.add('popup_opened');
  nameInput.setAttribute('value', firstName.textContent);
  jobInput.setAttribute('value', jobName.textContent);
}

function popupClosed() {
  popup.classList.remove('popup_opened');
}

buttonEdit.addEventListener('click', popupOpened);
buttonClose.addEventListener('click', popupClosed);

// Находим форму в DOM

let firstName = document.querySelector('.profile__info__title');
let jobName = document.querySelector('.profile__info__subtitle');




// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                        // Так мы можем определить свою логику отправки.
                        // О том, как это делать, расскажем позже.

    firstName.textContent = nameInput.value;
    jobName.textContent = jobInput.value;
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»

formElement.addEventListener('submit', formSubmitHandler);
