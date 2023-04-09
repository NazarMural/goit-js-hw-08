import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');

// Функція для запису поточного стану форми в локальне сховище
const saveFormState = throttle(() => {
  const formData = {
    email: form.email.value,
    message: form.message.value,
  };
  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
}, 500);

// Функція для перевірки, чи заповнені всі поля форми
const validateForm = () => {
  const email = form.email.value.trim();
  const message = form.message.value.trim();

  if (!email || !message) {
    alert('Please fill out all fields');
    return false;
  }
  return true;
};

// Відстеження події input на формі
form.addEventListener('input', saveFormState);

// Заповнення форми з локального сховища при завантаженні сторінки
window.addEventListener('load', () => {
  const savedFormData = localStorage.getItem('feedback-form-state');
  if (savedFormData) {
    const { email, message } = JSON.parse(savedFormData);
    form.email.value = email;
    form.message.value = message;
  }
});

// Очищення форми та сховища при сабміті
form.addEventListener('submit', (event) => {
  event.preventDefault();

  if (!validateForm()) {
    return;
  }

  const formData = {
    email: form.email.value,
    message: form.message.value,
  };
  console.log(formData);

  localStorage.removeItem('feedback-form-state');
  form.reset();
});
