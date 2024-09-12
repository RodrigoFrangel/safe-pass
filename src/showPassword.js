import { createSpinner } from 'nanospinner';
import chalk from 'chalk';

// Exibe uma mensagem de "Gerando senha..." e mostra a senha gerada.
// Displays a "Generating password..." message while and, displays the generated password.
export function showPassword(password) {
  const spinner = createSpinner('Gerando senha...').start();

  setTimeout(() => {
    spinner.success({ text: chalk.bold('Sua senha é: ') + `${password}\n`});
  }, 500);
}
