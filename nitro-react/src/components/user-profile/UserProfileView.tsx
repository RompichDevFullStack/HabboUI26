import { ExtendedProfileChangedMessageEvent, RoomEngineObjectEvent, RoomObjectCategory, RoomObjectType, UserCurrentBadgesComposer, UserCurrentBadgesEvent, UserProfileEvent, UserProfileParser } from '@nitrots/nitro-renderer';
import { FC, useState } from 'react';
import { FaChevronRight, FaExclamationTriangle } from 'react-icons/fa';
import { CreateLinkEvent, GetRoomSession, GetSessionDataManager, GetUserProfile, LocalizeText, OpenMessengerChat, SendMessageComposer } from '../../api';
import { DraggableWindowPosition, Flex, Grid, NitroCardContentView, NitroCardHeaderView, NitroCardView, Text } from '../../common';
import { useMessageEvent, useRoomEngineEvent } from '../../hooks';
import { BadgesContainerView } from './views/BadgesContainerView';
import { GroupsContainerView } from './views/GroupsContainerView';
import { UserContainerView } from './views/UserContainerView';
import { UserRoomsContainerView } from './views/UserRoomsContainerView';

export const UserProfileView: FC<{}> = props =>
{
    const [ userProfile, setUserProfile ] = useState<UserProfileParser>(null);
    const [ userBadges, setUserBadges ] = useState<string[]>([]);

    const onClose = () =>
    {
        setUserProfile(null);
        setUserBadges([]);
    }

    const onLeaveGroup = () =>
    {
        if(!userProfile || (userProfile.id !== GetSessionDataManager().userId)) return;

        GetUserProfile(userProfile.id);
    }

    useMessageEvent<UserCurrentBadgesEvent>(UserCurrentBadgesEvent, event =>
    {
        const parser = event.getParser();

        if(!userProfile || (parser.userId !== userProfile.id)) return;

        setUserBadges(parser.badges);
    });

    useMessageEvent<UserProfileEvent>(UserProfileEvent, event =>
    {
        const parser = event.getParser();

        let isSameProfile = false;

        setUserProfile(prevValue =>
        {
            if(prevValue && prevValue.id) isSameProfile = (prevValue.id === parser.id);

            return parser;
        });

        if(!isSameProfile) setUserBadges([]);

        SendMessageComposer(new UserCurrentBadgesComposer(parser.id));
    });

    useMessageEvent<ExtendedProfileChangedMessageEvent>(ExtendedProfileChangedMessageEvent, event =>
    {
        const parser = event.getParser();

        if(parser.userId != userProfile?.id) return;

        GetUserProfile(parser.userId);
    });

    useRoomEngineEvent<RoomEngineObjectEvent>(RoomEngineObjectEvent.SELECTED, event =>
    {
        if(!userProfile) return;

        if(event.category !== RoomObjectCategory.UNIT) return;

        const userData = GetRoomSession().userDataManager.getUserDataByIndex(event.objectId);

        if(userData.type !== RoomObjectType.USER) return;

        GetUserProfile(userData.webID);
    });

    if(!userProfile) return null;

    const isOwnProfile = (userProfile.id === GetSessionDataManager().userId);

    return (
        <NitroCardView uniqueKey="nitro-user-profile" theme="primary-slim" className="user-profile" windowPosition={ DraggableWindowPosition.NOTHING } disableDrag>
            <NitroCardHeaderView headerText={ userProfile.username } onCloseClick={ onClose }>
                <Flex alignItems="center" justifyContent="center" className="user-profile-header-icon user-profile-header-warning">
                    <FaExclamationTriangle className="fa-icon" />
                </Flex>
            </NitroCardHeaderView>
            <NitroCardContentView overflow="hidden" classNames={ [ 'theme-dark' ] }>
                <UserContainerView userProfile={ userProfile } />
                <Flex alignItems="center" justifyContent="between" className="user-profile-section-header">
                    <Text bold small className="text-white">Badges & Groups</Text>
                    <FaChevronRight className="fa-icon user-stat-chevron" />
                </Flex>
                <Grid columnCount={ 5 } fullHeight={ false } className="user-profile-badges-grid">
                    <BadgesContainerView fullWidth center badges={ userBadges } />
                </Grid>
                <GroupsContainerView fullWidth itsMe={ isOwnProfile } groups={ userProfile.groups } onLeaveGroup={ onLeaveGroup } />
                <Flex alignItems="center" justifyContent="between" className="user-profile-section-header" onClick={ event => CreateLinkEvent(`navigator/search/hotel_view/owner:${ userProfile.username }`) } pointer>
                    <Text bold small className="text-white">{ LocalizeText('extendedprofile.rooms') }</Text>
                    <FaChevronRight className="fa-icon user-stat-chevron" />
                </Flex>
                <UserRoomsContainerView username={ userProfile.username } />
                { !isOwnProfile &&
                    <Flex alignItems="center" justifyContent="center" gap={ 3 } className="user-profile-quick-actions">
                        <Flex center pointer className="user-profile-ghost-icon" onClick={ event => OpenMessengerChat(userProfile.id) }>
                            <i className="icon icon-message" />
                        </Flex>
                    </Flex> }
            </NitroCardContentView>
        </NitroCardView>
    )
}
