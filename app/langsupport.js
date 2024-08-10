// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "welcome": "Hi{{name}}! I am your TechPrepBot. How can I help you today?",
      "send": "Send",
      "signIn": "Sign In",
      "signOut": "Sign Out",
      "trainerGPT": "trainerGPT",
      "Message": "Message",
      "language": "Language"
    }
  },
  
 
  es: {
    translation: {
      "welcome": "¡Hola{{name}}! Soy tu entrenador de gimnasio AI. ¿Cómo puedo ayudarte hoy?",
      "send": "Enviar",
      "signIn": "Iniciar sesión",
      "signOut": "Cerrar sesión",
      "trainerGPT": "entrenadorGPT",
      "Message": "Mensaje",
      "language": "Idioma"
    }
  },
  fr: {
    translation: {
      "welcome": "Salut{{name}}! Je suis votre entraîneur de gym IA. Comment puis-je vous aider aujourd'hui?",
      "send": "Envoyer",
      "signIn": "Se connecter",
      "signOut": "Se déconnecter",
      "trainerGPT": "entraineurGPT",
      "Message": "Message",
      "language": "Langue"
    }
  },
  
  kr: {
    translation: {
      "welcome": "안녕하세요{{name}}! 저는 당신의 AI 체육관 트레이너입니다. 오늘 어떻게 도와드릴까요?",
      "send": "보내다",
      "signIn": "로그인",
      "signOut": "로그아웃",
      "trainerGPT": "트레이너GPT",
      "Message": "메시지",
      "language": "언어"
    }
  }

  
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en", // default language
    keySeparator: false,
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;