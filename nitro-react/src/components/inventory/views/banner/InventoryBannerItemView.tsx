import { FC, PropsWithChildren } from 'react';
import { LayoutBannerImageView, LayoutGridItem } from '../../../../common';
import { useInventoryBanners } from '../../../../hooks';

export const InventoryBannerItemView: FC<PropsWithChildren<{ bannerCode: string }>> = props =>
{
    const { bannerCode = null, children = null, ...rest } = props;
    const { selectedBannerCode = null, setSelectedBannerCode = null, toggleBanner = null } = useInventoryBanners();

    return (
        <LayoutGridItem itemActive={ (selectedBannerCode === bannerCode) } onMouseDown={ event => setSelectedBannerCode(bannerCode) } onDoubleClick={ event => toggleBanner(selectedBannerCode) } { ...rest }>
            <LayoutBannerImageView bannerCode={ bannerCode } />
            { children }
        </LayoutGridItem>
    );
}
