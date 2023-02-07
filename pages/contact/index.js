import { USER_INFO } from '../../js/constants.js';
import { getValues, redirect, validateEmail } from '../../js/forms.js';

const contactForm = document.querySelector('#contact-form');
const formInputs = Array.from(contactForm.elements).filter(
  input => input.type === 'text' || input.type === 'textarea'
);

function submitHandler(e) {
  e.preventDefault();

  formInputs.map(
    input => (input.nextElementSibling.textContent = validate(input))
  );

  const errorElements = document.querySelectorAll('.error');
  const errorMsgs = [...errorElements].map(
    errorElement => errorElement.textContent
  );
  const hasErrors = errorMsgs.filter(Boolean).length > 0;

  if (!hasErrors) {
    let formData = getValues(e.target);
    // po defaultu dobije se "on" kada je checked, ali nista kada nije
    const checkbox = document.getElementById('checkbox');
    if (!checkbox.checked) {
      formData = { ...formData, newsletter: 'off' };
    }
    redirect('/pages/overview/index.html');
    localStorage.setItem(USER_INFO, JSON.stringify(formData));
  }
}

// za validaciju cu inace koristit nacin s vjezbi, al san tia postici istu
// stvar na neki drugi nacin, cisto da ne prepisen samo

function validate(input) {
  let error;
  const value = input.value.trim();

  if (input.dataset.required === 'true') {
    if (value === '') {
      error = 'Polje je obavezno';
    }
  }

  if (input.dataset.min) {
    if (value && value.length < +input.dataset.min) {
      error = `Minimalna duljina je ${input.dataset.min}`;
    }
  }

  if (input.dataset.max) {
    if (value && value.length > +input.dataset.max) {
      error = `Maksimalna duljina je ${input.dataset.max}`;
    }
  }

  if (input.dataset.email === 'validate') {
    if (
      value &&
      value.length >= +input.dataset.min &&
      value.length <= +input.dataset.max
    ) {
      !validateEmail(value) && (error = 'Unesi ispravnu email adresu');
    }
  }

  return error;
}

function contactGuard() {
  const data = localStorage.getItem(USER_INFO);
  data && redirect('/pages/overview/index.html');
}

contactGuard();

contactForm.addEventListener('submit', submitHandler);
