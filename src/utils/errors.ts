// src/utils/errors.ts

export interface HorizionError {
  error_code: string;
  system_message: string;
  user_message: string;
  explanation: string;
  solution: string;
  severity: 'info' | 'warning' | 'error' | 'critical';
}

export const AuthErrors: Record<string, HorizionError> = {
  INVALID_CPF: {
    error_code: 'HZ-AUTH_001',
    system_message: 'Mathematical validation failed for CPF string',
    user_message: 'CPF Inválido',
    explanation: 'O número digitado não corresponde a um documento válido.',
    solution: 'Verifique os números digitados e tente novamente.',
    severity: 'warning'
  },
  USER_NOT_FOUND: {
    error_code: 'HZ-AUTH_404',
    system_message: 'Institutional CPF not found in ecosystem profiles',
    user_message: 'Documento não localizado',
    explanation: 'Não encontramos um pré-cadastro institucional com este CPF.',
    solution: 'Verifique com o administrador do seu ecossistema.',
    severity: 'warning'
  },
  INVALID_CREDENTIALS: {
    error_code: 'HZ-AUTH_401',
    system_message: 'Supabase Auth returned invalid credentials',
    user_message: 'Acesso Negado',
    explanation: 'O e-mail ou a senha estão incorretos.',
    solution: 'Tente novamente ou recupere a sua senha.',
    severity: 'warning'
  },
  NETWORK_ERROR: {
    error_code: 'HZ-SYS_503',
    system_message: 'Network request failed',
    user_message: 'Sem conexão',
    explanation: 'Não foi possível conectar aos servidores Horizion.',
    solution: 'Verifique sua internet e tente em instantes.',
    severity: 'error'
  }
};