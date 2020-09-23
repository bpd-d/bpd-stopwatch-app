import { Round, StopwatchAction, Training } from "./models";
import { ERROR_CODES } from "./statics";
import { is } from '../../node_modules/bpd-toolkit/dist/esm/index';

export interface ValidationResult {
    status: boolean;
    errors?: string[];
}

export interface IValidator<T> {
    validate(t: T): ValidationResult
}

export abstract class ValidatorBase<T> implements IValidator<T> {
    validate(t: T): ValidationResult {
        const result: ValidationResult = { status: true }
        try {
            let errors = this.performValidation(t);
            if (errors && errors.length > 0) {
                result.status = false;
                result.errors = errors;
            }
        } catch (e) {
            let errorMsg = "An error occured during validation";
            console.error(errorMsg)
            console.error(e)
            result.status = false;
            result.errors = [errorMsg + ": " + e.message]
        }
        return result;
    }

    protected abstract performValidation(t: T): string[];
}

export class TrainingValidator extends ValidatorBase<Training> {
    constructor() {
        super();
    }

    protected performValidation(t: Training): string[] {
        if (!is(t)) {
            return ([ERROR_CODES.e0100]);
        }
        let errors = []
        if (!is(t.name)) {
            errors.push(ERROR_CODES.e0101)
        }
        if (!is(t.rounds)) {
            errors.push(ERROR_CODES.e0102)
        }
        return errors;
    }

}


export class RoundValidator extends ValidatorBase<Round> {
    constructor() {
        super();
    }

    protected performValidation(t: Round): string[] {
        if (!is(t)) {
            return ([ERROR_CODES.e0200]);
        }
        if (!is(t.actions))
            return [ERROR_CODES.e0201]
    }
}

export class ActionValidator extends ValidatorBase<StopwatchAction> {
    constructor() {
        super();
    }

    protected performValidation(t: StopwatchAction): string[] {
        if (!is(t)) {
            return ([ERROR_CODES.e0300]);
        }
        let errors = []
        if (!is(t.name)) {
            errors.push(ERROR_CODES.e0301)
        }
        if (!is(t.type)) {
            errors.push(ERROR_CODES.e0302)
        }
        if (t.duration < 0) {
            errors.push(ERROR_CODES.e0303)
        }
        return errors;
    }
}