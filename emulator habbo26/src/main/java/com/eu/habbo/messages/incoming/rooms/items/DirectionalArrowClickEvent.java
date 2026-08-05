package com.eu.habbo.messages.incoming.rooms.items;

import com.eu.habbo.Emulator;
import com.eu.habbo.habbohotel.items.interactions.wired.triggers.InteractionDirectionalArrows;
import com.eu.habbo.habbohotel.rooms.Room;
import com.eu.habbo.habbohotel.rooms.RoomUnit;
import com.eu.habbo.habbohotel.users.HabboItem;
import com.eu.habbo.habbohotel.wired.WiredHandler;
import com.eu.habbo.habbohotel.wired.WiredTriggerType;
import com.eu.habbo.messages.incoming.MessageHandler;

public class DirectionalArrowClickEvent extends MessageHandler {
    @Override
    public void handle() throws Exception {
        int itemId = this.packet.readInt();
        String direction = this.packet.readString();

        Room room = this.client.getHabbo().getHabboInfo().getCurrentRoom();

        if (room == null)
            return;

        HabboItem item = room.getHabboItem(itemId);

        if (!(item instanceof InteractionDirectionalArrows))
            return;

        InteractionDirectionalArrows arrows = (InteractionDirectionalArrows) item;
        RoomUnit roomUnit = this.client.getHabbo().getRoomUnit();

        Emulator.getThreading().run(() -> WiredHandler.handle(WiredTriggerType.AVATAR_CLICKS_ARROW, roomUnit, room, new Object[]{ direction }), arrows.getExecutionOffset() * 500);
    }
}
