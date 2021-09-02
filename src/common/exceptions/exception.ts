export abstract class Exception {
    constructor() {
        Error.apply(this, arguments);
    }
}