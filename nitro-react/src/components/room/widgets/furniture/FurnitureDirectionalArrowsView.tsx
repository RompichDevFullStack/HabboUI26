import { OpenDirectionalArrowsEvent } from '@nitrots/nitro-renderer';
import { FC, useState } from 'react';
import { LocalizeText } from '../../../../api';
import { NitroCardContentView, NitroCardHeaderView, NitroCardView, Text } from '../../../../common';
import { useMessageEvent } from '../../../../hooks';

export const FurnitureDirectionalArrowsView: FC<{}> = props =>
{
    const [ isVisible, setIsVisible ] = useState(false);

    useMessageEvent<OpenDirectionalArrowsEvent>(OpenDirectionalArrowsEvent, event => setIsVisible(true));

    const onClose = () => setIsVisible(false);

    if(!isVisible) return null;

    return (
        <NitroCardView className="nitro-directional-arrows">
            <NitroCardHeaderView headerText={ LocalizeText('widget.directionalarrows.title') } onCloseClick={ onClose } />
            <NitroCardContentView gap={ 1 }>
                <Text center>{ LocalizeText('widget.directionalarrows.desc') }</Text>
            </NitroCardContentView>
        </NitroCardView>
    );
}
