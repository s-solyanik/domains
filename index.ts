import {Application} from "application/main";

import {I18nAggregate} from "domains/aggregates/i18n";

const outgoing = I18nAggregate.shared(undefined);
const url = new URL('https://test.co/text');
url.hash = '#test'
outgoing.text(url).subscribe(it => {
    Application.shared().logger.debug('Out ID %s value %s', outgoing.id.toString(), JSON.stringify(it));
})
