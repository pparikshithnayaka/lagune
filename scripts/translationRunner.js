const manageTranslations = require('react-intl-translations-manager').default;

manageTranslations({
  messagesDirectory: '../dist/messages',
  translationsDirectory: '../src/locales/',
  detectDuplicateIds: false,
  singleMessagesFile: true,
  languages: ['en', 'ja'],
  jsonOptions: {
    trailingNewline: true,
  },
});
