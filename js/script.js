'use strict';

window.addEventListener('DOMContentLoaded', () =>{

// modal

const modalTrigger = document.querySelectorAll('[data-modal]'),
    modal = document.querySelector('.modal'),
    modalCloseBtn = document.querySelector('[data-close]');

function openModal() {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    // clearInterval(modalTimerId);
}

modalTrigger.forEach(btn => {
    btn.addEventListener('click', openModal);
});

function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = '';
}

modalCloseBtn.addEventListener('click', closeModal);

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.code === "Escape" && modal.style.display == 'block') {
        closeModal();
    }
});

// const modalTimerId = setTimeout(openModal, 5000);

function showModalByScroll() {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
        openModal();
        window.removeEventListener('scroll', showModalByScroll);
    }
}

window.addEventListener('scroll', showModalByScroll);

// Forms

        
const forms = document.querySelectorAll('form');

const message = {
  loading: 'Загрузка',
  success: 'Спасибо! Скоро мы с вами свяжемся',
  failure: 'Что-то пошло не так...'
};

forms.forEach(item => {
  postData(item);
});

function postData(form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const statusMassage = document.createElement('div');
    statusMassage.classList.add('status');
    statusMassage.textContent = message.loading;
    form.append(statusMassage);

    const request = new XMLHttpRequest();
    request.open('POST', 'telegram/send.php');

    request.setRequestHeader('Content-type', 'application/json');
    const formData = new FormData(form);

    const object = {};
    formData.forEach(function(value, key){
      object[key] = value;
    });

    const json = JSON.stringify(object);

    request.send(json);

    request.addEventListener('load', () => {
      if (request.status === 200){
        console.log(request.response);
        statusMassage.textContent = message.success;
        form.reset();
        setTimeout(() => {
          statusMassage.remove();
        }, 2000);
      } else {
        statusMassage.textContent = message.failure;
      }
    });
  });
}
});
