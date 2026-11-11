import assert from 'node:assert/strict'
import { test } from 'node:test'
import {
  validateLogin,
  validateRegistration,
} from './authValidation.js'

test('login validates required values without imposing undocumented format rules', () => {
  assert.deepEqual(validateLogin('   ', ''), {
    username: 'Enter your username.',
    password: 'Enter your password.',
  })
  assert.deepEqual(validateLogin('Ada Lovelace', ' '), {})
})

test('registration requires a username and password confirmation to match', () => {
  assert.deepEqual(validateRegistration('', 'password', 'different'), {
    username: 'Choose a username.',
    confirmPassword: 'The passwords do not match.',
  })
  assert.deepEqual(
    validateRegistration('ada', 'correct horse battery staple', 'correct horse battery staple'),
    {},
  )
})
