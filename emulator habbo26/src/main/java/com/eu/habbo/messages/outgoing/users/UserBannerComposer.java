package com.eu.habbo.messages.outgoing.users;

import com.eu.habbo.habbohotel.users.HabboBanner;
import com.eu.habbo.messages.ServerMessage;
import com.eu.habbo.messages.outgoing.MessageComposer;
import com.eu.habbo.messages.outgoing.Outgoing;

public class UserBannerComposer extends MessageComposer {
    private final HabboBanner banner;
    private final int habbo;

    public UserBannerComposer(HabboBanner banner, int habbo) {
        this.banner = banner;
        this.habbo = habbo;
    }

    @Override
    protected ServerMessage composeInternal() {
        this.response.init(Outgoing.UserBannerComposer);
        this.response.appendInt(this.habbo);
        this.response.appendString((this.banner != null) ? this.banner.getCode() : "");
        return this.response;
    }
}
