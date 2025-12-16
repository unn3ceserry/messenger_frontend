class CONFIG_APP {
  NAME() {
    return "Fluent";
  }
  VERSION() {
    return "1.0.0";
  }
  BRANCH() {
    return "Beta";
  }
  TERMS_DATA() {
    return new Date('2025-01-01')
  }
}

export const configApp = new CONFIG_APP();
