package com.eu.habbo.messages.outgoing.inventory;

import com.eu.habbo.habbohotel.users.Habbo;
import com.eu.habbo.habbohotel.users.HabboBanner;
import com.eu.habbo.messages.ServerMessage;
import com.eu.habbo.messages.outgoing.MessageComposer;
import com.eu.habbo.messages.outgoing.Outgoing;

public class InventoryBannersComposer extends MessageComposer {
    private final Habbo habbo;

    public InventoryBannersComposer(Habbo habbo) {
        this.habbo = habbo;
    }

    @Override
    protected ServerMessage composeInternal() {
        if (this.habbo == null)
            return null;

        HabboBanner wearingBanner = this.habbo.getInventory().getBannersComponent().getWearingBanner();

        this.response.init(Outgoing.InventoryBannersComposer);

        this.response.appendInt(this.habbo.getInventory().getBannersComponent().getBanners().size());
        for (HabboBanner banner : this.habbo.getInventory().getBannersComponent().getBanners()) {
            this.response.appendInt(banner.getId());
            this.response.appendString(banner.getCode());
        }

        this.response.appendString((wearingBanner != null) ? wearingBanner.getCode() : "");

        return this.response;
    }
}
