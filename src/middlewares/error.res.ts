enum StatusCode {
	BAD_REQUEST = 400,
	UNAUTHORIZED = 401,
	FORBIDDEN = 403,
	NOT_FOUND = 404,
	METHOD_NOT_ALLOWED = 405,
	REQUEST_TIMEOUT = 408,
	CONFLICT = 409,
	INTERNAL_SERVER = 500,
}

enum StatusMessage {
	BAD_REQUEST = `Bad request error`,
	UNAUTHORIZED = `Unauthorized error`,
	FORBIDDEN = `Forbidden error`,
	NOT_FOUND = `File not found error`,
	METHOD_NOT_ALLOWED = `Method not allowed error`,
	REQUEST_TIMEOUT = `Request timeout error`,
	CONFLICT = `Conflict error`,
	INTERNAL_SERVER = `Internal Server error`,
}

class ErrorResponse extends Error {
	private code: number;

	constructor(message: string, code: number) {
		super(message);
		this.code = code;
	}
}

class BadRequestError extends ErrorResponse {
	constructor(
		message: string = StatusMessage.BAD_REQUEST,
		code: number = StatusCode.BAD_REQUEST
	) {
		super(message, code);
	}
}

class AuthorizedError extends ErrorResponse {
	constructor(
		message: string = StatusMessage.UNAUTHORIZED,
		code: number = StatusCode.UNAUTHORIZED
	) {
		super(message, code);
	}
}

class ForbiddenError extends ErrorResponse {
	constructor(
		message: string = StatusMessage.FORBIDDEN,
		code: number = StatusCode.FORBIDDEN
	) {
		super(message, code);
	}
}

class FileNotFoundError extends ErrorResponse {
	constructor(
		message: string = StatusMessage.NOT_FOUND,
		code: number = StatusCode.NOT_FOUND
	) {
		super(message, code);
	}
}

class MethodNotAllowedError extends ErrorResponse {
	constructor(
		message: string = StatusMessage.METHOD_NOT_ALLOWED,
		code: number = StatusCode.METHOD_NOT_ALLOWED
	) {
		super(message, code);
	}
}

class RequestTimeoutError extends ErrorResponse {
	constructor(
		message: string = StatusMessage.REQUEST_TIMEOUT,
		code: number = StatusCode.REQUEST_TIMEOUT
	) {
		super(message, code);
	}
}

class ConflictError extends ErrorResponse {
	constructor(
		message: string = StatusMessage.CONFLICT,
		code: number = StatusCode.CONFLICT
	) {
		super(message, code);
	}
}

class InternalServerError extends ErrorResponse {
	constructor(
		message: string = StatusMessage.INTERNAL_SERVER,
		code: number = StatusCode.INTERNAL_SERVER
	) {
		super(message, code);
	}
}

export {
	ErrorResponse,
	InternalServerError,
	BadRequestError,
	AuthorizedError,
	ForbiddenError,
	FileNotFoundError,
	MethodNotAllowedError,
	RequestTimeoutError,
	ConflictError,
};
