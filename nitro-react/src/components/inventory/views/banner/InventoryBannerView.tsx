import { FC, useEffect, useState } from 'react';
import { GetSessionDataManager, LocalizeText } from '../../../../api';
import { AutoGrid, Button, Column, Grid, LayoutAvatarImageView, LayoutBannerImageView } from '../../../../common';
import { useInventoryBanners } from '../../../../hooks';
import { InventoryBannerItemView } from './InventoryBannerItemView';

export const InventoryBannerView: FC<{}> = props =>
{
    const [ isVisible, setIsVisible ] = useState(false);
    const { bannerCodes = [], selectedBannerCode = null, isWearingBanner = null, toggleBanner = null, activate = null, deactivate = null } = useInventoryBanners();

    useEffect(() =>
    {
        if(!isVisible) return;

        const id = activate();

        return () => deactivate(id);
    }, [ isVisible, activate, deactivate ]);

    useEffect(() =>
    {
        setIsVisible(true);

        return () => setIsVisible(false);
    }, []);

    return (
        <Grid>
            <Column size={ 7 } overflow="hidden">
                <AutoGrid columnCount={ 4 }>
                    { bannerCodes && (bannerCodes.length > 0) && bannerCodes.map((bannerCode, index) => <InventoryBannerItemView key={ index } bannerCode={ bannerCode } />) }
                </AutoGrid>
            </Column>
            <Column className="justify-content-between" size={ 5 } overflow="auto">
                { !!selectedBannerCode &&
                    <Column grow alignItems="center" justifyContent="end" gap={ 2 }>
                        <Column alignItems="center" className="banner-preview-image">
                            <LayoutBannerImageView bannerCode={ selectedBannerCode } className="banner-preview-image-background" />
                            <LayoutAvatarImageView figure={ GetSessionDataManager().figure } direction={ 4 } />
                        </Column>
                        <Button variant={ (isWearingBanner(selectedBannerCode) ? 'danger' : 'success') } onClick={ event => toggleBanner(selectedBannerCode) }>{ LocalizeText(isWearingBanner(selectedBannerCode) ? 'inventory.banners.clearbanner' : 'inventory.banners.wearbanner') }</Button>
                    </Column> }
            </Column>
        </Grid>
    );
}
