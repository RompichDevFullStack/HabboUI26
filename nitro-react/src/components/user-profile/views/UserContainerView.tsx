import { FriendlyTime, RequestFriendComposer, UserProfileParser } from '@nitrots/nitro-renderer';
import { FC, useEffect, useState } from 'react';
import { FaChevronRight } from 'react-icons/fa';
import { CreateLinkEvent, GetSessionDataManager, LocalizeText, SendMessageComposer } from '../../../api';
import { Column, Flex, LayoutAvatarImageView, Text } from '../../../common';

interface UserContainerViewProps
{
    userProfile: UserProfileParser;
}

export const UserContainerView: FC<UserContainerViewProps> = props =>
{
    const { userProfile = null } = props;
    const [ requestSent, setRequestSent ] = useState(userProfile.requestSent);
    const isOwnProfile = (userProfile.id === GetSessionDataManager().userId);
    const canSendFriendRequest = !requestSent && (!isOwnProfile && !userProfile.isMyFriend && !userProfile.requestSent);

    const addFriend = () =>
    {
        setRequestSent(true);

        SendMessageComposer(new RequestFriendComposer(userProfile.username));
    }

    useEffect(() =>
    {
        setRequestSent(userProfile.requestSent);
    }, [ userProfile ])

    return (
        <Flex gap={ 2 } className="user-container-info">
            <Column center className="avatar-container">
                <LayoutAvatarImageView figure={ userProfile.figure } direction={ 2 } />
            </Column>
            <Column grow gap={ 1 }>
                <Column gap={ 0 }>
                    <Text small>
                        <b>{ LocalizeText('extendedprofile.last.login') }</b> { FriendlyTime.format(userProfile.secondsSinceLastVisit, '.ago', 2) }
                    </Text>
                    <Text small>
                        <b>{ LocalizeText('extendedprofile.created') }</b> { userProfile.registration }
                    </Text>
                </Column>
                <Flex alignItems="center" justifyContent="between" pointer={ isOwnProfile } className="user-stat-row" onClick={ event => isOwnProfile && CreateLinkEvent('achievements/toggle') }>
                    <Text bold small>{ LocalizeText('extendedprofile.achievementscore') }</Text>
                    <Flex alignItems="center" gap={ 1 }>
                        <Text small>{ userProfile.achievementPoints }</Text>
                        { isOwnProfile && <FaChevronRight className="fa-icon user-stat-chevron" /> }
                    </Flex>
                </Flex>
                <Flex alignItems="center" justifyContent="between" pointer={ isOwnProfile } className="user-stat-row" onClick={ event => isOwnProfile && CreateLinkEvent('friends/toggle') }>
                    <Text bold small>{ LocalizeText('extendedprofile.friends.count') }</Text>
                    <Flex alignItems="center" gap={ 1 }>
                        <Text small>{ userProfile.friendsCount }</Text>
                        { isOwnProfile && <FaChevronRight className="fa-icon user-stat-chevron" /> }
                    </Flex>
                </Flex>
                <Flex alignItems="center" gap={ 1 } className="user-stat-row">
                    { userProfile.isOnline &&
                        <i className="icon icon-pf-online" /> }
                    { !userProfile.isOnline &&
                        <i className="icon icon-pf-offline" /> }
                    <Text small>{ userProfile.isOnline ? 'Online' : 'Offline' }</Text>
                </Flex>
                <Flex alignItems="center" gap={ 1 }>
                    { canSendFriendRequest &&
                        <Text small underline pointer onClick={ addFriend }>{ LocalizeText('extendedprofile.addasafriend') }</Text> }
                    { !canSendFriendRequest && !isOwnProfile &&
                        <>
                            <i className="icon icon-pf-tick" />
                            { userProfile.isMyFriend &&
                                <Text>{ LocalizeText('extendedprofile.friend') }</Text> }
                            { (requestSent || userProfile.requestSent) &&
                                <Text>{ LocalizeText('extendedprofile.friendrequestsent') }</Text> }
                        </> }
                </Flex>
            </Column>
        </Flex>
    )
}
