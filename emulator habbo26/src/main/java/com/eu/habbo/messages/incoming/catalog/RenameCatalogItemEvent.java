package com.eu.habbo.messages.incoming.catalog;

import com.eu.habbo.Emulator;
import com.eu.habbo.habbohotel.catalog.CatalogItem;
import com.eu.habbo.habbohotel.catalog.CatalogPage;
import com.eu.habbo.habbohotel.rooms.RoomChatMessageBubbles;
import com.eu.habbo.messages.incoming.MessageHandler;
import com.eu.habbo.messages.outgoing.catalog.CatalogUpdatedComposer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

public class RenameCatalogItemEvent extends MessageHandler {
    private static final Logger LOGGER = LoggerFactory.getLogger(RenameCatalogItemEvent.class);

    @Override
    public void handle() throws Exception {
        if (this.client.getHabbo().getHabboInfo().getRank().getId() < 7) {
            this.client.getHabbo().whisper(Emulator.getTexts().getValue("modtool.catalogitem.error.norights"), RoomChatMessageBubbles.ALERT);
            return;
        }

        int pageId = this.packet.readInt();
        int itemId = this.packet.readInt();
        String name = this.packet.readString();

        CatalogPage page = Emulator.getGameEnvironment().getCatalogManager().getCatalogPage(pageId);

        if (page == null) {
            this.client.getHabbo().whisper(Emulator.getTexts().getValue("modtool.catalogitem.error.notfound"), RoomChatMessageBubbles.ALERT);
            return;
        }

        CatalogItem item = page.getCatalogItem(itemId);

        if (item == null) {
            this.client.getHabbo().whisper(Emulator.getTexts().getValue("modtool.catalogitem.error.notfound"), RoomChatMessageBubbles.ALERT);
            return;
        }

        item.setName(name);

        try (Connection connection = Emulator.getDatabase().getDataSource().getConnection(); PreparedStatement statement = connection.prepareStatement("UPDATE catalog_items SET catalog_name = ? WHERE id = ?")) {
            statement.setString(1, name);
            statement.setInt(2, itemId);
            statement.execute();
        } catch (SQLException e) {
            LOGGER.error("Caught SQL exception", e);
            return;
        }

        this.client.getHabbo().whisper(Emulator.getTexts().getValue("modtool.catalogitem.success.renamed"), RoomChatMessageBubbles.ALERT);

        Emulator.getGameServer().getGameClientManager().sendBroadcastResponse(new CatalogUpdatedComposer());
    }
}
