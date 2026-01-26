class APP_CONFIG {
  NAME() {
    return "Fluent";
  }
  VERSION() {
    return "1.0.0b";
  }
  BRANCH() {
    return "Beta";
  }
  TERMS_DATA() {
    return new Date('2025-01-01')
  }
  APP_LINK() {
    return 'https://play.google.com/store/apps'
  }
  TYPE_APP() {
    return 'Web'
  }
}

export const appConfig = new APP_CONFIG();
