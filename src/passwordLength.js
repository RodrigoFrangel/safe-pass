import { retryPrompt } from './retryPrompt.js';

// Função auxiliar para determinar o comprimento da senha com base na força escolhida
// Helper function to determine the password length based on the selected strength
export function passwordLength(strength) {
  switch (strength) {
    case 'Fraco (6 caracteres)':
      return 6;
    case 'Médio (10 caracteres)':
      return 10;
    case 'Forte (16 caracteres)':
      return 16;
    default:
      console.log('Opção inválida');
      retryPrompt();
  }
}
