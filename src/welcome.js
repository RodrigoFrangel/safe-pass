import chalk from 'chalk';

// Exibe uma mensagem de boas-vindas estilizada e fornece instruções sobre como usar o gerador de senha.
// Displays a stylized welcome message and provides instructions on how to use the password generator.
export async function welcome() {
  console.log('Bem-vindo(a) ao ' + chalk.bold(chalk.red('Safe') + ('Pass')) + '!');

  console.log(`
    ${chalk.bgRed.bold(' COMO USAR ')}
    Sou um gerador de senha leve e intuitivo.
    Basta seguir as instruções e responder de acordo com sua preferência.
    Simples, não é mesmo? Agora vamos gerar sua nova senha?
  `);
}
