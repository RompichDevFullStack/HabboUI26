package com.eu.habbo.messages.incoming.rooms.items;

import com.eu.habbo.Emulator;
import com.eu.habbo.habbohotel.items.interactions.InteractionWiredTrigger;
import com.eu.habbo.habbohotel.items.interactions.wired.triggers.InteractionDirectionalArrows;
import com.eu.habbo.habbohotel.rooms.Room;
import com.eu.habbo.habbohotel.rooms.RoomUnit;
import com.eu.habbo.habbohotel.wired.WiredHandler;
import com.eu.habbo.habbohotel.wired.WiredTriggerType;
import com.eu.habbo.messages.incoming.MessageHandler;
import gnu.trove.set.hash.THashSet;

public class DirectionalArrowClickEvent extends MessageHandler {
    @Override
    public void handle() throws Exception {
        String direction = this.packet.readString();

        Room room = this.client.getHabbo().getHabboInfo().getCurrentRoom();

        if (room == null)
            return;

        THashSet<InteractionWiredTrigger> triggers = room.getRoomSpecialTypes().getTriggers(WiredTriggerType.AVATAR_CLICKS_ARROW);

        if (triggers == null || triggers.isEmpty())
            return;

        RoomUnit roomUnit = this.client.getHabbo().getRoomUnit();

        for (InteractionWiredTrigger trigger : triggers) {
            if (!(trigger instanceof InteractionDirectionalArrows))
                continue;

            InteractionDirectionalArrows arrows = (InteractionDirectionalArrows) trigger;

            if (!arrows.isDirectionEnabled(direction))
                continue;

            Emulator.getThreading().run(() -> WiredHandler.handle(arrows, roomUnit, room, new Object[]{ direction }), arrows.getExecutionOffset() * 500);
        }
    }
}
