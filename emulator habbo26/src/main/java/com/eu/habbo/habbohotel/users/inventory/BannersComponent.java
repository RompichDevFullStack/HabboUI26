package com.eu.habbo.habbohotel.users.inventory;

import com.eu.habbo.Emulator;
import com.eu.habbo.habbohotel.users.Habbo;
import com.eu.habbo.habbohotel.users.HabboBanner;
import gnu.trove.set.hash.THashSet;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class BannersComponent {
    private static final Logger LOGGER = LoggerFactory.getLogger(BannersComponent.class);

    private final THashSet<HabboBanner> banners = new THashSet<>();

    public BannersComponent(Habbo habbo) {
        this.banners.addAll(loadBanners(habbo));
    }

    private static THashSet<HabboBanner> loadBanners(Habbo habbo) {
        THashSet<HabboBanner> bannersList = new THashSet<>();
        try (Connection connection = Emulator.getDatabase().getDataSource().getConnection(); PreparedStatement statement = connection.prepareStatement("SELECT * FROM users_banners WHERE user_id = ?")) {
            statement.setInt(1, habbo.getHabboInfo().getId());

            try (ResultSet set = statement.executeQuery()) {
                while (set.next()) {
                    bannersList.add(new HabboBanner(set, habbo));
                }
            }
        } catch (SQLException e) {
            LOGGER.error("Caught SQL exception", e);
        }

        return bannersList;
    }

    public static void resetSlot(Habbo habbo) {
        for (HabboBanner banner : habbo.getInventory().getBannersComponent().getBanners()) {
            if (banner.getSlot() == 0)
                continue;

            banner.setSlot(0);
            banner.needsUpdate(true);
            Emulator.getThreading().run(banner);
        }
    }

    public static HabboBanner getWearingBannerOfflineHabbo(int userId) {
        try (Connection connection = Emulator.getDatabase().getDataSource().getConnection(); PreparedStatement statement = connection.prepareStatement("SELECT * FROM users_banners WHERE slot_id > 0 AND user_id = ? LIMIT 1")) {
            statement.setInt(1, userId);
            try (ResultSet set = statement.executeQuery()) {
                if (set.next()) {
                    return new HabboBanner(set, null);
                }
            }
        } catch (SQLException e) {
            LOGGER.error("Caught SQL exception", e);
        }
        return null;
    }

    public static HabboBanner createBanner(String code, Habbo habbo) {
        HabboBanner banner = new HabboBanner(0, code, 0, habbo);
        banner.run();
        habbo.getInventory().getBannersComponent().addBanner(banner);
        return banner;
    }

    public HabboBanner getWearingBanner() {
        synchronized (this.banners) {
            for (HabboBanner banner : this.banners) {
                if (banner.getSlot() > 0)
                    return banner;
            }
            return null;
        }
    }

    public THashSet<HabboBanner> getBanners() {
        return this.banners;
    }

    public boolean hasBanner(String banner) {
        return this.getBanner(banner) != null;
    }

    public HabboBanner getBanner(String bannerCode) {
        synchronized (this.banners) {
            for (HabboBanner banner : this.banners) {
                if (banner.getCode().equalsIgnoreCase(bannerCode))
                    return banner;
            }
            return null;
        }
    }

    public void addBanner(HabboBanner banner) {
        synchronized (this.banners) {
            this.banners.add(banner);
        }
    }

    public void dispose() {
        synchronized (this.banners) {
            this.banners.clear();
        }
    }
}
