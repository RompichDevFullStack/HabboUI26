package com.eu.habbo.messages.incoming.modtool;

import com.eu.habbo.Emulator;
import com.eu.habbo.habbohotel.items.Item;
import com.eu.habbo.habbohotel.rooms.RoomChatMessageBubbles;
import com.eu.habbo.messages.incoming.MessageHandler;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

public class SaveFurniEditorDataEvent extends MessageHandler {
    private static final Logger LOGGER = LoggerFactory.getLogger(SaveFurniEditorDataEvent.class);

    @Override
    public void handle() throws Exception {
        if (this.client.getHabbo().getHabboInfo().getRank().getId() < 7) {
            this.client.getHabbo().whisper(Emulator.getTexts().getValue("modtool.furnieditor.error.norights"), RoomChatMessageBubbles.ALERT);
            return;
        }

        int typeId = this.packet.readInt();
        String fullName = this.packet.readString();
        int width = this.packet.readInt();
        int length = this.packet.readInt();
        double height = Double.parseDouble(this.packet.readString());
        boolean allowStack = this.packet.readBoolean();
        boolean allowWalk = this.packet.readBoolean();
        boolean allowSit = this.packet.readBoolean();
        boolean allowLay = this.packet.readBoolean();
        boolean allowRecyle = this.packet.readBoolean();
        boolean allowTrade = this.packet.readBoolean();
        boolean allowMarketplace = this.packet.readBoolean();
        boolean allowGift = this.packet.readBoolean();
        boolean allowInventoryStack = this.packet.readBoolean();
        int stateCount = this.packet.readInt();
        String customParams = this.packet.readString();

        Item item = Emulator.getGameEnvironment().getItemManager().getItem(typeId);

        if (item == null) {
            this.client.getHabbo().whisper(Emulator.getTexts().getValue("modtool.furnieditor.error.notfound"), RoomChatMessageBubbles.ALERT);
            return;
        }

        item.setFullName(fullName);
        item.setWidth(width);
        item.setLength(length);
        item.setHeight(height);
        item.setAllowStack(allowStack);
        item.setAllowWalk(allowWalk);
        item.setAllowSit(allowSit);
        item.setAllowLay(allowLay);
        item.setAllowRecyle(allowRecyle);
        item.setAllowTrade(allowTrade);
        item.setAllowMarketplace(allowMarketplace);
        item.setAllowGift(allowGift);
        item.setAllowInventoryStack(allowInventoryStack);
        item.setStateCount(stateCount);
        item.setCustomParams(customParams);

        try (Connection connection = Emulator.getDatabase().getDataSource().getConnection(); PreparedStatement statement = connection.prepareStatement(
                "UPDATE items_base SET public_name = ?, width = ?, length = ?, stack_height = ?, allow_stack = ?, allow_walk = ?, allow_sit = ?, allow_lay = ?, allow_recycle = ?, allow_trade = ?, allow_marketplace_sell = ?, allow_gift = ?, allow_inventory_stack = ?, interaction_modes_count = ?, customparams = ? WHERE id = ?")) {
            statement.setString(1, fullName);
            statement.setInt(2, width);
            statement.setInt(3, length);
            statement.setDouble(4, height);
            statement.setBoolean(5, allowStack);
            statement.setBoolean(6, allowWalk);
            statement.setBoolean(7, allowSit);
            statement.setBoolean(8, allowLay);
            statement.setBoolean(9, allowRecyle);
            statement.setBoolean(10, allowTrade);
            statement.setBoolean(11, allowMarketplace);
            statement.setBoolean(12, allowGift);
            statement.setBoolean(13, allowInventoryStack);
            statement.setInt(14, stateCount);
            statement.setString(15, customParams);
            statement.setInt(16, typeId);
            statement.execute();
        } catch (SQLException e) {
            LOGGER.error("Caught SQL exception", e);
            return;
        }

        this.client.getHabbo().whisper(Emulator.getTexts().getValue("modtool.furnieditor.success.saved"), RoomChatMessageBubbles.ALERT);
    }
}
