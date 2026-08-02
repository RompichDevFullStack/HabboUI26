package com.eu.habbo.messages.incoming.modtool;

import com.eu.habbo.Emulator;
import com.eu.habbo.habbohotel.items.Item;
import com.eu.habbo.habbohotel.rooms.RoomChatMessageBubbles;
import com.eu.habbo.messages.incoming.MessageHandler;
import com.eu.habbo.messages.outgoing.modtool.FurniEditorDataComposer;

public class RequestFurniEditorDataEvent extends MessageHandler {
    @Override
    public void handle() throws Exception {
        if (this.client.getHabbo().getHabboInfo().getRank().getId() < 7) {
            this.client.getHabbo().whisper(Emulator.getTexts().getValue("modtool.furnieditor.error.norights"), RoomChatMessageBubbles.ALERT);
            return;
        }

        int typeId = this.packet.readInt();

        Item item = Emulator.getGameEnvironment().getItemManager().getItem(typeId);

        if (item == null) {
            this.client.getHabbo().whisper(Emulator.getTexts().getValue("modtool.furnieditor.error.notfound"), RoomChatMessageBubbles.ALERT);
            return;
        }

        this.client.sendResponse(new FurniEditorDataComposer(item));
    }
}
