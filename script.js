(function () {
  'use strict';

  var MIN_PASSWORD_LENGTH = 8;
  var EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  var form = document.getElementById('registration-form');
  var status = document.getElementById('form-status');

  var fields = {
    name: document.getElementById('name'),
    email: document.getElementById('email'),
    password: document.getElementById('password')
  };

  function setFieldError(field, message) {
    var errorEl = document.getElementById(field.id + '-error');
    errorEl.textContent = message;
    field.classList.toggle('invalid', Boolean(message));
    field.setAttribute('aria-invalid', message ? 'true' : 'false');
  }

  function setStatus(message, type) {
    status.textContent = message;
    status.className = 'status' + (type ? ' ' + type : '');
  }

  function validateName(value) {
    return value.trim() === '' ? 'Enter your name.' : '';
  }

  function validateEmail(value) {
    var email = value.trim();
    if (email === '') return 'Enter your email address.';
    if (!EMAIL_PATTERN.test(email)) return 'Enter a valid email address, like name@example.com.';
    return '';
  }

  function validatePassword(value) {
    if (value === '') return 'Enter a password.';
    if (value.length < MIN_PASSWORD_LENGTH) {
      return 'Use at least ' + MIN_PASSWORD_LENGTH + ' characters.';
    }
    return '';
  }

  function validateForm() {
    var errors = {
      name: validateName(fields.name.value),
      email: validateEmail(fields.email.value),
      password: validatePassword(fields.password.value)
    };

    Object.keys(errors).forEach(function (key) {
      setFieldError(fields[key], errors[key]);
    });

    var firstInvalid = Object.keys(errors).find(function (key) {
      return errors[key] !== '';
    });

    return firstInvalid ? fields[firstInvalid] : null;
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    var firstInvalidField = validateForm();

    if (firstInvalidField) {
      setStatus('Fix the highlighted fields and try again.', 'error');
      firstInvalidField.focus();
      return;
    }

    setStatus('Registration successful. Welcome, ' + fields.name.value.trim() + '!', 'success');
    form.reset();
  });

  // Clear a field's error as soon as the person starts correcting it.
  Object.keys(fields).forEach(function (key) {
    fields[key].addEventListener('input', function () {
      setFieldError(fields[key], '');
    });
  });
})();
