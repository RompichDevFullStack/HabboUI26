import { NavigatorSearchComposer, NavigatorSearchEvent, RoomDataParser } from '@nitrots/nitro-renderer';
import { FC, useEffect, useState } from 'react';
import { CreateLinkEvent, SendMessageComposer } from '../../../api';
import { Flex, LayoutRoomThumbnailView } from '../../../common';
import { useMessageEvent } from '../../../hooks';

interface UserRoomsContainerViewProps
{
    username: string;
}

export const UserRoomsContainerView: FC<UserRoomsContainerViewProps> = props =>
{
    const { username = null } = props;
    const [ rooms, setRooms ] = useState<RoomDataParser[]>([]);

    useMessageEvent<NavigatorSearchEvent>(NavigatorSearchEvent, event =>
    {
        const parser = event.getParser();

        if(!parser.result || (parser.result.code !== 'hotel_view')) return;

        const foundRooms: RoomDataParser[] = [];

        for(const list of parser.result.results)
        {
            for(const room of list.rooms)
            {
                if(room.ownerName !== username) continue;

                foundRooms.push(room);
            }
        }

        setRooms(foundRooms);
    });

    useEffect(() =>
    {
        setRooms([]);

        if(!username) return;

        SendMessageComposer(new NavigatorSearchComposer('hotel_view', `owner:${ username }`));
    }, [ username ]);

    if(!rooms.length) return null;

    return (
        <Flex gap={ 1 } className="user-rooms-container flex-wrap">
            { rooms.map(room => (
                <LayoutRoomThumbnailView key={ room.roomId } roomId={ room.roomId } pointer onClick={ event => CreateLinkEvent(`navigator/goto/${ room.roomId }`) } />
            )) }
        </Flex>
    );
}
