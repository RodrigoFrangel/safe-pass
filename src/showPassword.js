import { createSpinner } from 'nanospinner';
import chalk from 'chalk';

export function showPassword(password) {
  const spinner = createSpinner('Gerando senha...').start();

  setTimeout(() => {
    spinner.success({ text: chalk.bold('Sua senha é: ') + `${password}\n`});
  }, 500);
}
