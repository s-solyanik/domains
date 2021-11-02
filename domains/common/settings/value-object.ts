import { ValueObject } from 'domains/core/entity/value-object';
import type { Setting } from 'domains/common/settings/type';

class SettingsValueObject extends ValueObject<Map<string, Setting<any>>> {
    public setting(key: string) {
        return this.props.get(key);
    }

    public set(key: string, value: Setting<any>) {
        this.props.set(key, value);
    }

    static factory(): SettingsValueObject {
        return new SettingsValueObject(new Map());
    }
}

export { SettingsValueObject };
