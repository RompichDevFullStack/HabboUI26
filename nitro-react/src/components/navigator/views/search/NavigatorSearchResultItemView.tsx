import { RoomDataParser } from '@nitrots/nitro-renderer';
import { FC, MouseEvent } from 'react';
import { FaUser } from 'react-icons/fa';
import { CreateRoomSession, DoorStateType, GetSessionDataManager, GetUserProfile, TryVisitRoom } from '../../../../api';
import { Column, Flex, LayoutGridItemProps, LayoutRoomThumbnailView, Text } from '../../../../common';
import { useNavigator } from '../../../../hooks';
import { NavigatorSearchResultItemInfoView } from './NavigatorSearchResultItemInfoView';

export interface NavigatorSearchResultItemViewProps extends LayoutGridItemProps
{
    roomData: RoomDataParser
}

export const NavigatorSearchResultItemView: FC<NavigatorSearchResultItemViewProps> = props =>
{
    const { roomData = null, children = null, ...rest } = props;
    const { setDoorData = null } = useNavigator();

    const getUserCounterColor = () =>
    {
        const num: number = (100 * (roomData.userCount / roomData.maxUserCount));

        let bg = 'bg-primary';

        if(num >= 92)
        {
            bg = 'bg-danger';
        }
        else if(num >= 50)
        {
            bg = 'bg-warning';
        }
        else if(num > 0)
        {
            bg = 'bg-success';
        }

        return bg;
    }

    const visitRoom = (event: MouseEvent) =>
    {
        if(roomData.ownerId !== GetSessionDataManager().userId)
        {
            if(roomData.habboGroupId !== 0)
            {
                TryVisitRoom(roomData.roomId);

                return;
            }

            switch(roomData.doorMode)
            {
                case RoomDataParser.DOORBELL_STATE:
                    setDoorData(prevValue =>
                    {
                        const newValue = { ...prevValue };

                        newValue.roomInfo = roomData;
                        newValue.state = DoorStateType.START_DOORBELL;

                        return newValue;
                    });
                    return;
                case RoomDataParser.PASSWORD_STATE:
                    setDoorData(prevValue =>
                    {
                        const newValue = { ...prevValue };

                        newValue.roomInfo = roomData;
                        newValue.state = DoorStateType.START_PASSWORD;

                        return newValue;
                    });
                    return;
            }
        }

        CreateRoomSession(roomData.roomId);
    }

    return (
        <Column gap={ 1 } className="navigator-item" { ...rest }>
            <Flex alignItems="center" gap={ 2 } className="navigator-item-top">
                <Flex pointer position="relative" onClick={ visitRoom } className="navigator-item-thumbnail-container">
                    <LayoutRoomThumbnailView roomId={ roomData.roomId } customUrl={ roomData.officialRoomPicRef } className="navigator-item-thumbnail" />
                    { (roomData.doorMode !== RoomDataParser.OPEN_STATE) &&
                        <i className={ ('position-absolute top-0 end-0 m-1 icon icon-navigator-room-' + ((roomData.doorMode === RoomDataParser.DOORBELL_STATE) ? 'locked' : (roomData.doorMode === RoomDataParser.PASSWORD_STATE) ? 'password' : (roomData.doorMode === RoomDataParser.INVISIBLE_STATE) ? 'invisible' : '')) } /> }
                </Flex>
                <Column gap={ 0 } grow className="navigator-item-info" pointer onClick={ visitRoom }>
                    <Text bold truncate variant="white" className="navigator-item-name">{ roomData.roomName }</Text>
                    <Text truncate underline pointer variant={ null } className="navigator-item-owner" onClick={ event => { event.stopPropagation(); GetUserProfile(roomData.ownerId); } }>{ roomData.ownerName }</Text>
                </Column>
                <NavigatorSearchResultItemInfoView roomData={ roomData } />
            </Flex>
            <Flex center gap={ 1 } className={ 'navigator-item-usercount ' + getUserCounterColor() }>
                <FaUser className="fa-icon" />
                { roomData.userCount }
            </Flex>
            { children }
        </Column>
    );
}
