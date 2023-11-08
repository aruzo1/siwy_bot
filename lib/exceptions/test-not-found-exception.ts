export class TestNotFoundException extends Error {
  constructor() {
    super("Test not found");
  }
}
