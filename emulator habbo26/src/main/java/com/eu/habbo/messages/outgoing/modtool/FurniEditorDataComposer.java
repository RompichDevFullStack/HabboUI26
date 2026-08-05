package com.eu.habbo.messages.outgoing.modtool;

import com.eu.habbo.Emulator;
import com.eu.habbo.habbohotel.items.Item;
import com.eu.habbo.habbohotel.items.ItemInteraction;
import com.eu.habbo.messages.ServerMessage;
import com.eu.habbo.messages.outgoing.MessageComposer;
import com.eu.habbo.messages.outgoing.Outgoing;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class FurniEditorDataComposer extends MessageComposer {
    private final Item item;

    public FurniEditorDataComposer(Item item) {
        this.item = item;
    }

    @Override
    protected ServerMessage composeInternal() {
        this.response.init(Outgoing.FurniEditorDataComposer);
        this.response.appendInt(this.item.getId());
        this.response.appendString(this.item.getFullName());
        this.response.appendInt(this.item.getWidth());
        this.response.appendInt(this.item.getLength());
        this.response.appendString(String.valueOf(this.item.getHeight()));
        this.response.appendBoolean(this.item.allowStack());
        this.response.appendBoolean(this.item.allowWalk());
        this.response.appendBoolean(this.item.allowSit());
        this.response.appendBoolean(this.item.allowLay());
        this.response.appendBoolean(this.item.allowRecyle());
        this.response.appendBoolean(this.item.allowTrade());
        this.response.appendBoolean(this.item.allowMarketplace());
        this.response.appendBoolean(this.item.allowGift());
        this.response.appendBoolean(this.item.allowInventoryStack());
        this.response.appendInt(this.item.getStateCount());
        this.response.appendString(this.item.getCustomParams());

        this.response.appendString(this.item.getInteractionType().getName());

        List<String> interactionNames = new ArrayList<>();

        for (ItemInteraction interaction : Emulator.getGameEnvironment().getItemManager().getInteractionsList()) {
            interactionNames.add(interaction.getName());
        }

        Collections.sort(interactionNames);

        this.response.appendInt(interactionNames.size());

        for (String name : interactionNames) {
            this.response.appendString(name);
        }

        return this.response;
    }
}
