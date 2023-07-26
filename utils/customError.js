class PopulateError extends Error {
  constructor(message) {
    super(message);
    this.name = "PopulateError";
  }
}

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = "NotFoundError";
  }
}

class MissingError extends Error {
  constructor(message) {
    super(message);
    this.name = "MissingError";
  }
}

const customError = {
  PopulateError,
  NotFoundError,
  MissingError,
};

module.exports = customError;
