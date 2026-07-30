import { ExtendedProfileChangedMessageEvent, RoomEngineObjectEvent, RoomObjectCategory, RoomObjectType, UserCurrentBadgesComposer, UserCurrentBadgesEvent, UserProfileEvent, UserProfileParser } from '@nitrots/nitro-renderer';
import { CSSProperties, FC, useEffect, useState } from 'react';
import { FaChevronRight, FaExclamationTriangle } from 'react-icons/fa';
import { Transition } from 'react-transition-group';
import { CreateLinkEvent, GetRoomSession, GetSessionDataManager, GetUserProfile, LocalizeText, SendMessageComposer } from '../../api';
import { DraggableWindowPosition, Flex, Grid, NitroCardContentView, NitroCardHeaderView, NitroCardView, Text } from '../../common';
import { useMessageEvent, useRoomEngineEvent } from '../../hooks';
import { BadgesContainerView } from './views/BadgesContainerView';
import { GroupsContainerView } from './views/GroupsContainerView';
import { UserContainerView } from './views/UserContainerView';
import { UserRoomsContainerView } from './views/UserRoomsContainerView';

const SLIDE_TIMEOUT = 300;

const SLIDE_DEFAULT_STYLE: CSSProperties = {
    transition: `transform ${ SLIDE_TIMEOUT }ms ease-out`,
    transform: 'translateX(-100%)'
};

const SLIDE_TRANSITION_STYLES: { [ state: string ]: CSSProperties } = {
    entering: { transform: 'translateX(0)' },
    entered: { transform: 'translateX(0)' },
    exiting: { transform: 'translateX(-100%)' },
    exited: { transform: 'translateX(-100%)' }
};

export const UserProfileView: FC<{}> = props =>
{
    const [ userProfile, setUserProfile ] = useState<UserProfileParser>(null);
    const [ lastProfile, setLastProfile ] = useState<UserProfileParser>(null);
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

    useEffect(() =>
    {
        if(userProfile) setLastProfile(userProfile);
    }, [ userProfile ]);

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

    if(!lastProfile) return null;

    const isOwnProfile = (lastProfile.id === GetSessionDataManager().userId);

    return (
        <Transition in={ !!userProfile } appear timeout={ SLIDE_TIMEOUT } unmountOnExit>
            { state => (
                <NitroCardView uniqueKey="nitro-user-profile" theme="primary-slim" className="user-profile" style={ { ...SLIDE_DEFAULT_STYLE, ...SLIDE_TRANSITION_STYLES[ state ] } } windowPosition={ DraggableWindowPosition.NOTHING } disableDrag>
                    <NitroCardHeaderView headerText={ lastProfile.username } onCloseClick={ onClose }>
                        <Flex alignItems="center" justifyContent="center" className="user-profile-header-icon user-profile-header-warning">
                            <FaExclamationTriangle className="fa-icon" />
                        </Flex>
                    </NitroCardHeaderView>
                    <NitroCardContentView overflow="hidden" classNames={ [ 'theme-dark' ] }>
                        <UserContainerView userProfile={ lastProfile } />
                        <Flex alignItems="center" justifyContent="between" className="user-profile-section-header">
                            <Text bold className="text-white user-profile-section-title">Badges & Groups</Text>
                            <FaChevronRight className="fa-icon user-stat-chevron" />
                        </Flex>
                        <Grid columnCount={ 5 } fullHeight={ false } className="user-profile-badges-grid">
                            <BadgesContainerView fullWidth center badges={ userBadges } />
                        </Grid>
                        <GroupsContainerView fullWidth itsMe={ isOwnProfile } groups={ lastProfile.groups } onLeaveGroup={ onLeaveGroup } />
                        <Flex alignItems="center" justifyContent="between" className="user-profile-section-header" onClick={ event => CreateLinkEvent(`navigator/search/hotel_view/owner:${ lastProfile.username }`) } pointer>
                            <Text bold className="text-white user-profile-section-title">{ LocalizeText('extendedprofile.rooms') }</Text>
                            <FaChevronRight className="fa-icon user-stat-chevron" />
                        </Flex>
                        <UserRoomsContainerView username={ lastProfile.username } />
                    </NitroCardContentView>
                </NitroCardView>
            ) }
        </Transition>
    )
}
