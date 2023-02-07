import { USER_INFO } from '../../js/constants.js';
import { redirect } from '../../js/forms.js';

function overviewGuard() {
  let data = localStorage.getItem(USER_INFO);
  !data && redirect('/pages/contact/index.html');
}

overviewGuard();

function getStoredInfo() {
  const storedInfo = localStorage.getItem(USER_INFO) || '';
  return JSON.parse(storedInfo);
}

function renderUserInfo() {
  const storedInfo = Object.entries(getStoredInfo());
  const spans = document.querySelectorAll('.overview span');

  [...spans].map((span, index) => {
    switch (storedInfo[index][1]) {
      case 'off':
        return (span.textContent = 'Ne želim se pretplatiti');
      case 'on':
        return (span.textContent = 'Želim se pretplatiti');
      default:
        return (span.textContent = storedInfo[index][1]);
    }
  });
}

renderUserInfo();

const changeBtn = document.getElementById('changeBtn');

changeBtn.addEventListener('click', () => {
  localStorage.removeItem(USER_INFO);
  redirect('/pages/contact/index.html');
});
