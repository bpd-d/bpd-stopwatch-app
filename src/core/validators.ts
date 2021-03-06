import { Round, StopwatchAction, Training } from "./models";
import { ERROR_CODES } from "./statics";
import { is } from '../../node_modules/bpd-toolkit/dist/esm/index';
import { Footer } from "src/ui/components/footer/Footer";

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
        let errors = []
        if (!is(t.name))
            errors.push(ERROR_CODES.e0202);
        if (!is(t.actions))
            errors.push(ERROR_CODES.e0201)
        return errors;
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
        if (!is(t.duration)) {
            errors.push(ERROR_CODES.e0303)
        }
        return errors;
    }
}

export class CompleteTrainingValidator extends ValidatorBase<Training> {
    #trainingValidator: TrainingValidator;
    #actionValidator: ActionValidator;
    #roundValidator: RoundValidator;
    constructor() {
        super();
        this.#trainingValidator = new TrainingValidator();
        this.#roundValidator = new RoundValidator();
        this.#actionValidator = new ActionValidator();
    }
    protected performValidation(t: Training): string[] {
        let err = this.#trainingValidator.validate(t);
        if (err.status) {
            try {
                err = this.validateRounds(t.rounds);
            } catch (e) {
                return [ERROR_CODES.e0001]
            }
        }
        return err.errors;
    }

    private validateRounds(rounds: Round[]): ValidationResult {
        let err: ValidationResult = null;
        let len = rounds.length;
        for (let i = 0; i < len; i++) {
            err = this.#roundValidator.validate(rounds[i]);
            if (err.status) {
                err = this.validateActions(rounds[i].actions)
                if (!err.status) {
                    break;
                }
            }
        }
        return err;
    }

    private validateActions(actions: StopwatchAction[]): ValidationResult {
        let err: ValidationResult = null;
        let len = actions.length;
        for (let i = 0; i < len; i++) {
            err = this.#actionValidator.validate(actions[i]);
            if (!err.status) {
                return;
            }
        }
        return err;
    }

}