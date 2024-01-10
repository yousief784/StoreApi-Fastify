export class APP_ERROR extends Error {
    constructor(
        message: string,
        public statusCode: number,
    ) {
        super(message);
        Error.captureStackTrace(this, this.constructor);
    }
}

export class NOT_FOUND_ERROR extends APP_ERROR {
    constructor(message: string) {
        super(message, 404);
    }
}

export class BAD_REQUEST_ERROR extends APP_ERROR {
    constructor(message: string) {
        super(message, 400);
    }
}

export class INTERNAL_SERVER_ERROR extends APP_ERROR {
    constructor(message: string) {
        super(message, 500);
    }
}
