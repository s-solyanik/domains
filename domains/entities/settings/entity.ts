import type { IdentifierI } from 'utils/unique-id';

import { Entity } from 'domains/core/entity';

import type { Setting } from 'domains/entities/settings/type';
import { SettingsValueObject } from 'domains/entities/settings/value-object';

interface ApplicationSettingsProps {
    readonly id: IdentifierI
    readonly value: SettingsValueObject
}

class ApplicationSettings extends Entity<ApplicationSettingsProps> {
    public name(key: string) {
        const setting = this.props.value.setting(key);

        if(!setting) {
            throw new Error(`Setting key ${key} is undefined`);
        }

        return setting;
    }

    public set(key: string, value: Setting<any>) {
        this.props.value.set(key, value);
    }

    static id() {
        return ApplicationSettings.createId('app.settings');
    }

    static factory() {
        return new ApplicationSettings({
            id: ApplicationSettings.id(),
            value: SettingsValueObject.factory()
        });
    }
}

export { ApplicationSettings };
