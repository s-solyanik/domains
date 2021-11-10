import validator from 'card-validator';

import type { PaymentsCreditCardType, PaymentsMethodCardType } from 'domains/entities/payments.method.card/type';
import { CARDS_IDS, CREDIT_CARDS } from 'domains/entities/payments.method.card/cards';
import { ValueObject } from 'domains/core/entity/value-object';

type Verification = {
    isValid: boolean
    isPotentiallyValid: boolean
}

type CardNumber = Verification & { card: PaymentsMethodCardType|null };

class PaymentsMethodCardValueObject extends ValueObject<Partial<PaymentsCreditCardType>> {
    private static allowedCardTypes = [
        CREDIT_CARDS.visa,
        CREDIT_CARDS.mastercard,
        CREDIT_CARDS['american-express']
    ];

    private isAllowedCardType(card: PaymentsMethodCardType) {
        return PaymentsMethodCardValueObject.allowedCardTypes.some(type => {
            return type.type === card.type;
        });
    }

    public number(): Promise<CardNumber> {
        const validation = validator.number(`${this.get().card}`);

        let response = null;
        let error = null;

        if(this.get().strict) {
            if(validation.isValid) {
                response = {
                    isValid: validation.isValid,
                    isPotentiallyValid: validation.isPotentiallyValid,
                    card: validation.card
                };
            }
        } else if(validation.isPotentiallyValid) {
            response = {
                isValid: validation.isValid,
                isPotentiallyValid: validation.isPotentiallyValid,
                card: validation.card
            };
        }

        if(validation.card && !this.isAllowedCardType(validation.card)) {
            error = {
                status: 0,
                message: `Credit card ${validation.card.niceType} is not supported`
            };
        }

        if(!error && response) {
            return Promise.resolve(response);
        }

        return Promise.reject(error || {
            status: 0,
            message: 'Invalid card number.'
        });
    }

    public async cvv(): Promise<Verification> {
        const error = {
            status: 0,
            message: 'Invalid cvv.'
        };

        try {
            const { card } = await this.number();
            const validation = validator.cvv(this.get().cvv, card?.code.size);

            let response = null;

            if(this.get().strict) {
                if(validation.isValid) {
                    response = validation;
                }
            } else if(validation.isPotentiallyValid) {
                response = validation;
            }

            if(response) {
                return Promise.resolve(response);
            }

            return Promise.reject(error);
        } catch (e) {
            return Promise.reject(error);
        }
    }

    public date(): Promise<Verification> {
        const validation = validator.expirationDate(this.get().date);

        let response = null;

        if(this.get().strict) {
            if(validation.isValid) {
                response = validation;
            }
        } else if(validation.isPotentiallyValid) {
            response = validation;
        }

        if(response) {
            return Promise.resolve(response);
        }

        return Promise.reject({
            status: 0,
            message: 'Invalid expiration date.'
        });
    }

    public async name(): Promise<Verification> {
        const validation = validator.cardholderName(this.get().name);

        let response = null;

        if(this.get().strict) {
            if(validation.isValid) {
                response = validation;
            }
        } else if(validation.isPotentiallyValid) {
            response = validation;
        }

        if(response) {
            return Promise.resolve(response);
        }

        return Promise.reject({
            status: 0,
            message: 'Invalid card holder name.'
        });
    }

    public async validate() {
        try {
            await Promise.all([
                await this.number(),
                await this.cvv(),
                await this.name(),
                await this.date()
            ]);

            return Promise.resolve(this.get() as PaymentsCreditCardType);
        } catch (errors) {
            return Promise.reject({
                status: 400,
                message: Array.isArray(errors)
                    ? errors.map((error: any) => error.message).join('\n')
                    : errors.message
            });
        }
    }

    public get types() {
        return CREDIT_CARDS;
    }

    public get names() {
        return CARDS_IDS;
    }

    static factory(creditCard: Partial<PaymentsCreditCardType>): PaymentsMethodCardValueObject {
        return new PaymentsMethodCardValueObject(creditCard);
    }
}


export { PaymentsMethodCardValueObject };
