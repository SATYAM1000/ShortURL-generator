export const RESPONSE_MESSAGES = {
  SUCCESS: "Process completed successfully",
  ERROR: "Something went wrong",
  INVALID_REQUEST: "Invalid request",
  NOT_FOUND: (entity) => `${entity} not found`,
  TOO_MANY_REQUESTS: (entity) => `${entity} request limit exceeded`,
  SOMETHING_WENT_WRONG: "Something went wrong",
  UNAUTHORIZED: "Unauthorized request",
  URL_EXPIRED: "URL expired",
};
