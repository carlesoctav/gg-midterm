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

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.name = "UnauthorizedError";
  }
}

const customError = {
  PopulateError,
  NotFoundError,
  MissingError,
  UnauthorizedError,
};

module.exports = customError;
