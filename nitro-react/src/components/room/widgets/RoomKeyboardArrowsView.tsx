import { DirectionalArrowClickComposer } from '@nitrots/nitro-renderer';
import { FC, useEffect } from 'react';
import { SendMessageComposer } from '../../../api';
import { useRoom } from '../../../hooks';

const KEY_DIRECTIONS: { [key: string]: string } = {
    ArrowUp: 'UP',
    ArrowRight: 'RIGHT',
    ArrowDown: 'DOWN',
    ArrowLeft: 'LEFT'
};

export const RoomKeyboardArrowsView: FC<{}> = props =>
{
    const { roomSession = null } = useRoom();

    useEffect(() =>
    {
        if(!roomSession) return;

        const onKeyDown = (event: KeyboardEvent) =>
        {
            const direction = KEY_DIRECTIONS[event.key];

            if(!direction) return;

            SendMessageComposer(new DirectionalArrowClickComposer(direction));
        };

        document.addEventListener('keydown', onKeyDown, true);

        return () => document.removeEventListener('keydown', onKeyDown, true);
    }, [ roomSession ]);

    return null;
}
