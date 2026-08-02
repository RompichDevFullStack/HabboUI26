package com.eu.habbo.messages.incoming.catalog;

import com.eu.habbo.Emulator;
import com.eu.habbo.habbohotel.catalog.CatalogItem;
import com.eu.habbo.messages.incoming.MessageHandler;
import com.eu.habbo.messages.outgoing.catalog.CatalogItemNameComposer;

public class RequestCatalogItemNameEvent extends MessageHandler {
    @Override
    public void handle() throws Exception {
        int typeId = this.packet.readInt();

        CatalogItem item = Emulator.getGameEnvironment().getCatalogManager().getCatalogItemByBaseItemId(typeId);

        this.client.sendResponse(new CatalogItemNameComposer(typeId, (item != null) ? item.getName() : null));
    }
}
