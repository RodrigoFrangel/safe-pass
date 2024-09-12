import crypto from 'crypto';

// Gera uma senha aleatória com base nos parâmetros especificados pelo usuário.
// Generates a random password based on user-specified parameters.
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
      console.error('Erro: ' + error.message);
  }

  return password;
}
