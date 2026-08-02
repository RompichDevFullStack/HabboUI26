import { FC, useMemo } from 'react';
import { GetConfiguration } from '../../api';
import { Base, BaseProps } from '../Base';

export interface LayoutBannerImageViewProps extends BaseProps<HTMLDivElement>
{
    bannerCode: string;
}

export const LayoutBannerImageView: FC<LayoutBannerImageViewProps> = props =>
{
    const { bannerCode = null, classNames = [], style = {}, children = null, ...rest } = props;

    const getClassNames = useMemo(() =>
    {
        const newClassNames: string[] = [ 'banner-image' ];

        if(classNames.length) newClassNames.push(...classNames);

        return newClassNames;
    }, [ classNames ]);

    const getStyle = useMemo(() =>
    {
        let newStyle = style;

        if(bannerCode && bannerCode.length)
        {
            newStyle = { backgroundImage: `url(${ GetConfiguration<string>('banners.url') }${ bannerCode }.png)`, ...style };
        }

        return newStyle;
    }, [ bannerCode, style ]);

    if(!bannerCode || !bannerCode.length) return null;

    return (
        <Base classNames={ getClassNames } style={ getStyle } { ...rest }>
            { children }
        </Base>
    );
}
