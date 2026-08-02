package com.eu.habbo.messages.outgoing.catalog;

import com.eu.habbo.messages.ServerMessage;
import com.eu.habbo.messages.outgoing.MessageComposer;
import com.eu.habbo.messages.outgoing.Outgoing;

public class CatalogItemNameComposer extends MessageComposer {
    private final int typeId;
    private final String name;

    public CatalogItemNameComposer(int typeId, String name) {
        this.typeId = typeId;
        this.name = name;
    }

    @Override
    protected ServerMessage composeInternal() {
        this.response.init(Outgoing.CatalogItemNameComposer);
        this.response.appendInt(this.typeId);
        this.response.appendString((this.name != null) ? this.name : "");
        return this.response;
    }
}
