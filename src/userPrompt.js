import inquirer from 'inquirer';
import { showPassword } from './showPassword.js';
import { generatePassword } from './generatePassword.js';

// Function to prompt the user for password parameters using inquirer
export function promptUser() {
  inquirer.prompt([
      {
        name: 'mode',
        type: 'list',
        message: 'Escolha um modo de criação de senha:',
        choices: ['Automático', 'Personalizado', 'Sair'],
      },
      {
        name: 'strength',
        type: 'list',
        message: 'Escolha o nível de segurança da senha:',
        choices: [
          'Fraco (6 caracteres)',
          'Médio (10 caracteres)',
          'Forte (16 caracteres)',
        ],
        when: (answer) => answer.mode === 'Automático',
      },
      {
        name: 'length',
        type: 'input',
        message: 'Digite o tamanho da senha:',
        when: (answer) => answer.mode === 'Personalizado',
        validate: (value) => {
          const valid = !isNaN(parseInt(value)) && value > 0;
          return valid || 'Por favor, insira um número positivo';
        },
      },
      {
        type: 'confirm',
        name: 'lower',
        message: 'Incluir letras minúsculas?',
        when: (answer) => answer.mode === 'Personalizado',
      },
      {
        type: 'confirm',
        name: 'upper',
        message: 'Incluir letras maiúsculas?',
        when: (answer) => answer.mode === 'Personalizado',
      },
      {
        type: 'confirm',
        name: 'numbers',
        message: 'Incluir números?',
        when: (answer) => answer.mode === 'Personalizado',
      },
      {
        type: 'confirm',
        name: 'symbols',
        message: 'Incluir símbolos?',
        when: (answer) => answer.mode === 'Personalizado',
      },
    ])
    .then((answer) => {
      if (answer.mode === 'Automático') {
        let length;
        switch (answer.strength) {
          case 'Fraco (6 caracteres)':
            length = 6;
            break;
          case 'Médio (10 caracteres)':
            length = 10;
            break;
          case 'Forte (16 caracteres)':
            length = 16;
            break;
          default:
            console.log('Opção inválida');
            return;
        }
        let password = generatePassword(length, true, true, true, true);
        showPassword(password);
      } else if (answer.mode === 'Personalizado') {
        if (!answer.lower && !answer.upper && !answer.numbers && !answer.symbols) {
          console.log('Você deve incluir pelo menos um tipo de caractere em sua senha.\n');
          inquirer.prompt([
            {
              type: 'list',
              name: 'option',
              message: 'O que você gostaria de fazer?',
              choices: [
                'Tentar novamente',
                'Sair',
              ],
            },
          ])
            .then((innerAnswer) => {
              if (innerAnswer.option === 'Tentar novamente') {
                console.clear();
                promptUser();
              } else if (innerAnswer.option === 'Sair') {
                console.clear();
                console.log('Até mais! 🙂');
              }
            });
        } else {
          let password = generatePassword(
            answer.length,
            answer.lower,
            answer.upper,
            answer.numbers,
            answer.symbols
          );
          showPassword(password);
        }
      } else if (answer.mode === 'Sair') {
        console.clear();
        console.log('Até mais! 🙂');
      }
    })
    .catch((error) => {
      console.log(error);
    });
}
