export function getValues(form) {
  const formData = new FormData(form);
  return Object.fromEntries(formData);
}

export function validateEmail(email) {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
}

export function redirect(url) {
  window.location.href = `${window.location.origin}${url}`;
}

export default {
  getValues,
  validateEmail,
  redirect,
};
