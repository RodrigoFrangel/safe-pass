import crypto from 'crypto';

// Function to generate a random password
export function generatePassword(length, lower, upper, numbers, symbols) {
  let charset = '';
  if (lower) charset += 'abcdefghijklmnopqrstuvwxyz';
  if (upper) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  if (numbers) charset += '0123456789';
  if (symbols) charset += '!@#$%^&*()_+-={}[];\',./:"<>?`~';

  let password = '';
  try {
    for (let i = 0; i < length; i += 1) {
      password += charset[crypto.randomInt(0, charset.length)];
    }
  } catch (error) {
    if (error.code === 'ERR_OUT_OF_RANGE') {
      console.log('y');
    } else {
      console.log('Error: ' + error.message);
    }
  }

  return password;
}
