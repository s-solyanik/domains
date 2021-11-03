import { Application } from "application/main";

import { ADS_TEMP } from "data/ads";
import { PromotionAdsAggregate } from "domains/aggregates/promotions/ads";

const ads = PromotionAdsAggregate.shared({
    page: 1,
    pagesize: 20,
})

ads.data().subscribe(it => {
    Application.shared().logger.debug('ID %s value %s', ads.id.toString(), JSON.stringify(it));
})

ads.create(ADS_TEMP).subscribe()

