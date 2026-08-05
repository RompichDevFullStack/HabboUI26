package com.eu.habbo.messages.incoming.rooms.users;

import com.eu.habbo.Emulator;
import com.eu.habbo.habbohotel.rooms.Room;
import com.eu.habbo.habbohotel.users.DanceType;
import com.eu.habbo.habbohotel.users.Habbo;
import com.eu.habbo.messages.incoming.MessageHandler;
import com.eu.habbo.plugin.events.users.UserIdleEvent;

public class RoomUserDanceEvent extends MessageHandler {
    @Override
    public void handle() throws Exception {
        Room room = this.client.getHabbo().getHabboInfo().getCurrentRoom();

        if (room == null)
            return;

        int danceId = this.packet.readInt();
        if (danceId >= 0 && danceId <= 5) {
            if (this.client.getHabbo().getRoomUnit().isInRoom()) {

                Habbo habbo = this.client.getHabbo();

                if (this.client.getHabbo().getRoomUnit().getCacheable().get("control") != null) {
                    habbo = (Habbo) this.client.getHabbo().getRoomUnit().getCacheable().get("control");

                    if (habbo.getHabboInfo().getCurrentRoom() != room) {
                        habbo.getRoomUnit().getCacheable().remove("controller");
                        this.client.getHabbo().getRoomUnit().getCacheable().remove("control");
                        habbo = this.client.getHabbo();
                    }
                }

                UserIdleEvent event = new UserIdleEvent(this.client.getHabbo(), UserIdleEvent.IdleReason.DANCE, false);
                Emulator.getPluginManager().fireEvent(event);

                if (!event.isCancelled()) {
                    if (!event.idle) {
                        room.unIdle(habbo);
                    }
                }

                room.dance(habbo.getRoomUnit(), DanceType.values()[danceId]);
            }
        }
    }
}
