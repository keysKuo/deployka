import { Response } from "express";

interface SuccessResponseOptions {
	success?: boolean;
	code: number;
	message: string;
	metadata?: any;
	options?: any;
}

interface SendOptions {
	response: Response;
	headers?: { [key: string]: string };
	callback?: (arg: any) => void;
}

class SuccessResponse {
	private success: boolean;
	private code: number;
	private message: string;
	private metadata: any;
	private options: any;

	constructor({
		success = true,
		code = 200,
		message = "✔️  Success!",
		metadata = null,
		options = null,
	}: SuccessResponseOptions) {
		this.success = success;
		this.code = code;
		this.message = message;
		this.metadata = metadata;
		this.options = options;
	}

	send = ({ response, headers = {}, callback = (arg: any) => {} }: SendOptions) => {
		Object.entries(headers).forEach(([key, value]) => {
			response.setHeader(key, value);
		});

		if (callback) callback(response);

		return response.status(this.code).json(this);
	};
}

export { SuccessResponse };
