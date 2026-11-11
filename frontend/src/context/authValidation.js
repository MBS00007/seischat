export function validateLogin(username, password) {
  const errors = {}
  if (!username.trim()) {
    errors.username = 'Enter your username.'
  }
  if (!password) {
    errors.password = 'Enter your password.'
  }
  return errors
}

export function validateRegistration(username, password, confirmPassword) {
  const errors = {}
  if (!username.trim()) {
    errors.username = 'Choose a username.'
  }
  if (!password) {
    errors.password = 'Enter a password.'
  }
  if (!confirmPassword) {
    errors.confirmPassword = 'Confirm your password.'
  } else if (password !== confirmPassword) {
    errors.confirmPassword = 'The passwords do not match.'
  }
  return errors
}
