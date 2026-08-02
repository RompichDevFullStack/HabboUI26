package com.eu.habbo.messages.incoming.users;

import com.eu.habbo.Emulator;
import com.eu.habbo.habbohotel.users.HabboBanner;
import com.eu.habbo.habbohotel.users.inventory.BannersComponent;
import com.eu.habbo.messages.incoming.MessageHandler;
import com.eu.habbo.messages.outgoing.users.UserBannerComposer;

public class UserWearBannerEvent extends MessageHandler {
    @Override
    public void handle() throws Exception {
        BannersComponent.resetSlot(this.client.getHabbo());

        String bannerCode = this.packet.readString();

        HabboBanner wornBanner = null;

        if (bannerCode.length() > 0) {
            HabboBanner banner = this.client.getHabbo().getInventory().getBannersComponent().getBanner(bannerCode);

            if (banner != null) {
                banner.setSlot(1);
                banner.needsUpdate(true);
                Emulator.getThreading().run(banner);
                wornBanner = banner;
            }
        }

        if (this.client.getHabbo().getHabboInfo().getCurrentRoom() != null) {
            this.client.getHabbo().getHabboInfo().getCurrentRoom().sendComposer(new UserBannerComposer(wornBanner, this.client.getHabbo().getHabboInfo().getId()).compose());
        } else {
            this.client.sendResponse(new UserBannerComposer(wornBanner, this.client.getHabbo().getHabboInfo().getId()));
        }
    }
}
