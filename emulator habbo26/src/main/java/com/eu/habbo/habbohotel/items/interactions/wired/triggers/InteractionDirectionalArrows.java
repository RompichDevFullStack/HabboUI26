package com.eu.habbo.habbohotel.items.interactions.wired.triggers;

import com.eu.habbo.habbohotel.gameclients.GameClient;
import com.eu.habbo.habbohotel.items.Item;
import com.eu.habbo.habbohotel.items.interactions.InteractionWiredTrigger;
import com.eu.habbo.habbohotel.items.interactions.wired.WiredSettings;
import com.eu.habbo.habbohotel.rooms.Room;
import com.eu.habbo.habbohotel.rooms.RoomUnit;
import com.eu.habbo.habbohotel.wired.WiredHandler;
import com.eu.habbo.habbohotel.wired.WiredTriggerType;
import com.eu.habbo.messages.ServerMessage;
import com.eu.habbo.messages.outgoing.rooms.items.OpenDirectionalArrowsComposer;

import java.sql.ResultSet;
import java.sql.SQLException;

public class InteractionDirectionalArrows extends InteractionWiredTrigger {
    public static final WiredTriggerType type = WiredTriggerType.AVATAR_CLICKS_ARROW;

    private boolean up = true;
    private boolean right = true;
    private boolean down = true;
    private boolean left = true;
    private int executionOffset = 0;

    public InteractionDirectionalArrows(ResultSet set, Item baseItem) throws SQLException {
        super(set, baseItem);
    }

    public InteractionDirectionalArrows(int id, int userId, Item item, String extradata, int limitedStack, int limitedSells) {
        super(id, userId, item, extradata, limitedStack, limitedSells);
    }

    @Override
    public void onClick(GameClient client, Room room, Object[] objects) throws Exception {
        if (client == null)
            return;

        if (room.hasRights(client.getHabbo())) {
            super.onClick(client, room, objects);
            return;
        }

        client.sendResponse(new OpenDirectionalArrowsComposer(this));
    }

    public boolean isDirectionEnabled(String direction) {
        switch (direction) {
            case "UP":
                return this.up;
            case "RIGHT":
                return this.right;
            case "DOWN":
                return this.down;
            case "LEFT":
                return this.left;
            default:
                return false;
        }
    }

    public int getExecutionOffset() {
        return this.executionOffset;
    }

    @Override
    public boolean execute(RoomUnit roomUnit, Room room, Object[] stuff) {
        return stuff.length > 0 && stuff[0] instanceof String && this.isDirectionEnabled((String) stuff[0]);
    }

    @Override
    public String getWiredData() {
        return WiredHandler.getGsonBuilder().create().toJson(new JsonData(
            this.up, this.right, this.down, this.left, this.executionOffset
        ));
    }

    @Override
    public void loadWiredData(ResultSet set, Room room) throws SQLException {
        String wiredData = set.getString("wired_data");

        if (wiredData != null && wiredData.startsWith("{")) {
            JsonData data = WiredHandler.getGsonBuilder().create().fromJson(wiredData, JsonData.class);
            this.up = data.up;
            this.right = data.right;
            this.down = data.down;
            this.left = data.left;
            this.executionOffset = data.executionOffset;
        }
    }

    @Override
    public void onPickUp() {
        this.up = true;
        this.right = true;
        this.down = true;
        this.left = true;
        this.executionOffset = 0;
    }

    @Override
    public WiredTriggerType getType() {
        return type;
    }

    @Override
    public void serializeWiredData(ServerMessage message, Room room) {
        message.appendBoolean(false);
        message.appendInt(5);
        message.appendInt(0);
        message.appendInt(this.getBaseItem().getSpriteId());
        message.appendInt(this.getId());
        message.appendString("");
        message.appendInt(5);
        message.appendInt(this.up ? 1 : 0);
        message.appendInt(this.right ? 1 : 0);
        message.appendInt(this.down ? 1 : 0);
        message.appendInt(this.left ? 1 : 0);
        message.appendInt(this.executionOffset);
        message.appendInt(0);
        message.appendInt(this.getType().code);
        message.appendInt(0);
        message.appendInt(0);
    }

    @Override
    public boolean saveData(WiredSettings settings) {
        if (settings.getIntParams().length < 5) return false;

        int[] params = settings.getIntParams();

        this.up = (params[0] == 1);
        this.right = (params[1] == 1);
        this.down = (params[2] == 1);
        this.left = (params[3] == 1);
        this.executionOffset = Math.max(0, params[4]);

        return true;
    }

    @Override
    public boolean isTriggeredByRoomUnit() {
        return true;
    }

    static class JsonData {
        boolean up;
        boolean right;
        boolean down;
        boolean left;
        int executionOffset;

        public JsonData(boolean up, boolean right, boolean down, boolean left, int executionOffset) {
            this.up = up;
            this.right = right;
            this.down = down;
            this.left = left;
            this.executionOffset = executionOffset;
        }
    }
}
