package com.eu.habbo.messages.incoming.inventory;

import com.eu.habbo.messages.incoming.MessageHandler;
import com.eu.habbo.messages.outgoing.inventory.InventoryBannersComposer;

public class RequestInventoryBannersEvent extends MessageHandler {
    @Override
    public void handle() throws Exception {
        this.client.sendResponse(new InventoryBannersComposer(this.client.getHabbo()));
    }
}
