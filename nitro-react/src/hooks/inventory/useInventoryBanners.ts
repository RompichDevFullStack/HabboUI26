import { BannerReceivedEvent, BannersEvent, RequestBannersComposer, SetActivatedBannerComposer } from '@nitrots/nitro-renderer';
import { useEffect, useState } from 'react';
import { useBetween } from 'use-between';
import { SendMessageComposer } from '../../api';
import { useMessageEvent } from '../events';
import { useSharedVisibility } from '../useSharedVisibility';

const useInventoryBannersState = () =>
{
    const [ needsUpdate, setNeedsUpdate ] = useState(true);
    const [ bannerCodes, setBannerCodes ] = useState<string[]>([]);
    const [ bannerIds, setBannerIds ] = useState<Map<string, number>>(new Map<string, number>());
    const [ activeBannerCode, setActiveBannerCode ] = useState<string>(null);
    const [ selectedBannerCode, setSelectedBannerCode ] = useState<string>(null);
    const { isVisible = false, activate = null, deactivate = null } = useSharedVisibility();

    const isWearingBanner = (bannerCode: string) => (activeBannerCode === bannerCode);

    const toggleBanner = (bannerCode: string) =>
    {
        setActiveBannerCode(prevValue =>
        {
            const newValue = (prevValue === bannerCode) ? null : bannerCode;

            SendMessageComposer(new SetActivatedBannerComposer(newValue ?? ''));

            return newValue;
        });
    }

    const getBannerId = (bannerCode: string) =>
    {
        const index = bannerCodes.indexOf(bannerCode);

        if(index === -1) return 0;

        return (bannerIds.get(bannerCode) ?? 0);
    }

    useMessageEvent<BannersEvent>(BannersEvent, event =>
    {
        const parser = event.getParser();
        const bannersToAdd: string[] = [];

        setBannerIds(prevValue =>
        {
            const newValue = new Map(prevValue);

            parser.getAllBannerCodes().forEach(code =>
            {
                const exists = bannerCodes.indexOf(code) >= 0;
                const bannerId = parser.getBannerId(code);

                newValue.set(code, bannerId);

                if(exists) return;

                bannersToAdd.push(code);
            });

            return newValue;
        });

        setActiveBannerCode(parser.activeBannerCode || null);
        setBannerCodes(prev => [ ...prev, ...bannersToAdd ]);
    });

    useMessageEvent<BannerReceivedEvent>(BannerReceivedEvent, event =>
    {
        const parser = event.getParser();

        setBannerCodes(prevValue =>
        {
            if(prevValue.indexOf(parser.bannerCode) >= 0) return prevValue;

            return [ ...prevValue, parser.bannerCode ];
        });

        setBannerIds(prevValue =>
        {
            const newValue = new Map(prevValue);

            newValue.set(parser.bannerCode, parser.bannerId);

            return newValue;
        });
    });

    useEffect(() =>
    {
        if(!bannerCodes || !bannerCodes.length) return;

        setSelectedBannerCode(prevValue =>
        {
            let newValue = prevValue;

            if(newValue && (bannerCodes.indexOf(newValue) === -1)) newValue = null;

            if(!newValue) newValue = bannerCodes[0];

            return newValue;
        });
    }, [ bannerCodes ]);

    useEffect(() =>
    {
        if(!isVisible || !needsUpdate) return;

        SendMessageComposer(new RequestBannersComposer());

        setNeedsUpdate(false);
    }, [ isVisible, needsUpdate ]);

    return { bannerCodes, activeBannerCode, selectedBannerCode, setSelectedBannerCode, isWearingBanner, toggleBanner, getBannerId, activate, deactivate };
}

export const useInventoryBanners = () => useBetween(useInventoryBannersState);
