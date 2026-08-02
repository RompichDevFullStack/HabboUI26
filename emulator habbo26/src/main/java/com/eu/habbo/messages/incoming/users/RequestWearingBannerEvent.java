package com.eu.habbo.messages.incoming.users;

import com.eu.habbo.Emulator;
import com.eu.habbo.habbohotel.users.Habbo;
import com.eu.habbo.habbohotel.users.inventory.BannersComponent;
import com.eu.habbo.messages.incoming.MessageHandler;
import com.eu.habbo.messages.outgoing.users.UserBannerComposer;

public class RequestWearingBannerEvent extends MessageHandler {
    @Override
    public void handle() throws Exception {
        int userId = this.packet.readInt();
        Habbo habbo = Emulator.getGameServer().getGameClientManager().getHabbo(userId);

        if (habbo == null || habbo.getHabboInfo() == null || habbo.getInventory() == null || habbo.getInventory().getBannersComponent() == null)
            this.client.sendResponse(new UserBannerComposer(BannersComponent.getWearingBannerOfflineHabbo(userId), userId));
        else
            this.client.sendResponse(new UserBannerComposer(habbo.getInventory().getBannersComponent().getWearingBanner(), habbo.getHabboInfo().getId()));
    }
}
