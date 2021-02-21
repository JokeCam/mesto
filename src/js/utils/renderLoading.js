export function renderLoading(isLoading = false){
    const currentActiveButton = document.querySelector('.popup_opened .popup__button');
    if (isLoading) {
      currentActiveButton.textContent = 'Загрузка...';
      return;
    }
    currentActiveButton.textContent = 'Сохранить';
  };