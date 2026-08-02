package com.eu.habbo.messages.outgoing.users;

import com.eu.habbo.habbohotel.users.HabboBanner;
import com.eu.habbo.messages.ServerMessage;
import com.eu.habbo.messages.outgoing.MessageComposer;
import com.eu.habbo.messages.outgoing.Outgoing;

public class AddUserBannerComposer extends MessageComposer {
    private final HabboBanner banner;

    public AddUserBannerComposer(HabboBanner banner) {
        this.banner = banner;
    }

    @Override
    protected ServerMessage composeInternal() {
        this.response.init(Outgoing.AddUserBannerComposer);
        this.response.appendInt(this.banner.getId());
        this.response.appendString(this.banner.getCode());
        return this.response;
    }
}
