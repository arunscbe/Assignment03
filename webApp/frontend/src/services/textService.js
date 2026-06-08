import api from './api';

export const textToText = async (prompt) => {
  return api.post('/api/text/chat', { prompt });
};

export default {
  textToText,
};
