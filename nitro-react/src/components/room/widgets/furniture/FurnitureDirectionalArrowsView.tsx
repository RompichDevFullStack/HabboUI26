import { DirectionalArrowClickComposer, OpenDirectionalArrowsEvent } from '@nitrots/nitro-renderer';
import { FC, useEffect, useState } from 'react';
import { LocalizeText, SendMessageComposer } from '../../../../api';
import { Button, Flex, NitroCardContentView, NitroCardHeaderView, NitroCardView } from '../../../../common';
import { useMessageEvent } from '../../../../hooks';

const KEY_DIRECTIONS: { [key: string]: string } = {
    ArrowUp: 'UP',
    ArrowRight: 'RIGHT',
    ArrowDown: 'DOWN',
    ArrowLeft: 'LEFT'
};

export const FurnitureDirectionalArrowsView: FC<{}> = props =>
{
    const [ isVisible, setIsVisible ] = useState(false);
    const [ itemId, setItemId ] = useState(-1);

    useMessageEvent<OpenDirectionalArrowsEvent>(OpenDirectionalArrowsEvent, event =>
    {
        const parser = event.getParser();

        setItemId(parser.itemId);
        setIsVisible(true);
    });

    const onClose = () => setIsVisible(false);

    const sendDirection = (direction: string) =>
    {
        SendMessageComposer(new DirectionalArrowClickComposer(itemId, direction));
    }

    useEffect(() =>
    {
        if(!isVisible) return;

        const onKeyDown = (event: KeyboardEvent) =>
        {
            const direction = KEY_DIRECTIONS[event.key];

            if(!direction) return;

            event.preventDefault();
            event.stopPropagation();
            sendDirection(direction);
        };

        document.addEventListener('keydown', onKeyDown, true);

        return () => document.removeEventListener('keydown', onKeyDown, true);
    }, [ isVisible, itemId ]);

    if(!isVisible) return null;

    return (
        <NitroCardView className="nitro-directional-arrows">
            <NitroCardHeaderView headerText={ LocalizeText('widget.directionalarrows.title') } onCloseClick={ onClose } />
            <NitroCardContentView gap={ 1 }>
                <Flex justifyContent="center">
                    <Button onClick={ () => sendDirection('UP') }>&#9650;</Button>
                </Flex>
                <Flex justifyContent="center" gap={ 2 }>
                    <Button onClick={ () => sendDirection('LEFT') }>&#9664;</Button>
                    <Button onClick={ () => sendDirection('DOWN') }>&#9660;</Button>
                    <Button onClick={ () => sendDirection('RIGHT') }>&#9654;</Button>
                </Flex>
            </NitroCardContentView>
        </NitroCardView>
    );
}
