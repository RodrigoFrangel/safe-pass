import fs from 'fs';
import inquirer from "inquirer";

// Pergunta se o usuário deseja salvar a senha em um arquivo .txt
// Asks the user if they want to save the password in a .txt file
export function savePassword(password) {
  inquirer
    .prompt([
      {
        type: 'confirm',
        name: 'save',
        message: 'Deseja salvar a senha em um arquivo?',
        default: false,
      },
    ])
    .then((answer) => {
      if (answer.save) {
        try {
          fs.appendFileSync('passwords.txt', password + '\n');
          console.log('Senha salva em passwords.txt');
        } catch (error) {
          console.error('Erro ao salvar a senha:', error.message);
        }
      }
    })
}
