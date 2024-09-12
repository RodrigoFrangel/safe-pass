import inquirer from 'inquirer';
import { byeBye } from './byeBye.js';
import { generatePassword } from './generatePassword.js';
import { passwordLength } from './passwordLength.js';
import { retryPrompt } from './retryPrompt.js';
import { savePassword} from './savePassword.js';
import { showPassword } from './showPassword.js';

// Solicitar os parâmetros da senha ao usuário usando inquirer
// Prompt the user for password parameters using inquirer
export function promptUser() {
  inquirer
    .prompt([
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
          return valid || 'Por favor, insira um número positivo.';
        },
      },
      {
        type: 'confirm',
        name: 'lower',
        message: 'Incluir letras minúsculas?',
        when: (answer) => answer.mode === 'Personalizado',
        default: true,
      },
      {
        type: 'confirm',
        name: 'upper',
        message: 'Incluir letras maiúsculas?',
        when: (answer) => answer.mode === 'Personalizado',
        default: true,
      },
      {
        type: 'confirm',
        name: 'numbers',
        message: 'Incluir números?',
        when: (answer) => answer.mode === 'Personalizado',
        default: true,
      },
      {
        type: 'confirm',
        name: 'symbols',
        message: 'Incluir símbolos?',
        when: (answer) => answer.mode === 'Personalizado',
        default: true,
      },
    ])
    .then((answer) => {
      if (answer.mode === 'Sair') {
        byeBye();
        // return;
      }
      // Declaração e inicialização de variáveis (algumas com valor padrão true para o modo 'Automático')
      let length, lower = true, upper = true, numbers = true, symbols = true;

      if (answer.mode === 'Automático') {
        length = passwordLength(answer.strength);
      } else if (answer.mode === 'Personalizado') {
        // Verifica se pelo menos um tipo de caractere foi selecionado
        if (!answer.lower && !answer.upper && !answer.numbers && !answer.symbols) {
          console.log('Você deve incluir pelo menos um tipo de caractere em sua senha.\n');
          retryPrompt();
        }
        length = answer.length;
        lower = answer.lower;
        upper = answer.upper;
        numbers = answer.numbers;
        symbols = answer.symbols;
      }

      const password = generatePassword(length, lower, upper, numbers, symbols);

      showPassword(password);
      savePassword(password);
    })
    .catch((error) => {
      console.error('Erro:', error.message);
    });
}
