import inquirer from 'inquirer';
import { byeBye } from './byeBye.js';
import { promptUser } from './userPrompt.js';

// Solicita ao usuário que tente novamente ou saia
// Prompts the user to try again or exit
export function retryPrompt() {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'option',
        message: 'O que você gostaria de fazer?',
        choices: ['Tentar novamente', 'Sair'],
      },
    ])
    .then((userAnswer) => {
      if (userAnswer.option === 'Tentar novamente') {
        console.clear();
        promptUser();
      } else {
        byeBye();
      }
    });
}