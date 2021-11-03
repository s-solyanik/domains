import { Application } from "application/main";

import { ADS_TEMP } from "data/ads";
import { PromotionAdsAggregate } from "domains/aggregates/promotions/ads";

const codes = PromotionAdsAggregate.shared({
    page: 1,
    pagesize: 20,
});

codes.data().subscribe(it => {
    Application.shared().logger.debug('Id %s value %s', it.value.items.map(i => i.id));
})


codes.create(ADS_TEMP).subscribe();
codes.update(1, { adName: '21' }).subscribe();
codes.delete(0).subscribe();
