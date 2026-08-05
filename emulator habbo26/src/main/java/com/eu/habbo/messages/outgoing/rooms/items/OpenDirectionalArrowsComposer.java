package com.eu.habbo.messages.outgoing.rooms.items;

import com.eu.habbo.habbohotel.users.HabboItem;
import com.eu.habbo.messages.ServerMessage;
import com.eu.habbo.messages.outgoing.MessageComposer;
import com.eu.habbo.messages.outgoing.Outgoing;

public class OpenDirectionalArrowsComposer extends MessageComposer {
    private final HabboItem item;

    public OpenDirectionalArrowsComposer(HabboItem item) {
        this.item = item;
    }

    @Override
    protected ServerMessage composeInternal() {
        this.response.init(Outgoing.OpenDirectionalArrowsComposer);
        this.response.appendInt(this.item.getId());

        return this.response;
    }
}
