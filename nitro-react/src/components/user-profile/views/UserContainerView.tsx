import { FriendlyTime, RequestFriendComposer, UserProfileParser } from '@nitrots/nitro-renderer';
import { FC, useEffect, useState } from 'react';
import { FaChevronRight, FaUserPlus } from 'react-icons/fa';
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
                <LayoutAvatarImageView figure={ userProfile.figure } direction={ 2 } scale={ 2 } />
            </Column>
            <div className="user-info-columns">
                { canSendFriendRequest &&
                    <Flex center pointer className="user-add-friend-icon user-info-grid-icon" onClick={ addFriend }>
                        <FaUserPlus className="fa-icon" />
                    </Flex> }
                <Text italics className="user-stat-label user-info-grid-text">&ldquo;{ userProfile.motto }&rdquo;</Text>
                <Column gap={ 0 } className="user-stat-row user-info-grid-text">
                    <Text className="user-stat-label">
                        <b>{ LocalizeText('extendedprofile.last.login') }</b> { FriendlyTime.format(userProfile.secondsSinceLastVisit, '.ago', 2) }
                    </Text>
                    <Text className="user-stat-label">
                        <b>{ LocalizeText('extendedprofile.created') }</b> { userProfile.registration }
                    </Text>
                </Column>
                <Flex alignItems="center" justifyContent="between" className="user-stat-row user-info-grid-text">
                    <Column gap={ 0 } pointer={ isOwnProfile } onClick={ event => isOwnProfile && CreateLinkEvent('achievements/toggle') }>
                        <Text bold className="user-stat-label">{ LocalizeText('extendedprofile.achievementscore') }</Text>
                        <Text className="user-stat-value">{ userProfile.achievementPoints }</Text>
                    </Column>
                    { isOwnProfile && <FaChevronRight className="fa-icon user-stat-chevron" onClick={ event => CreateLinkEvent('achievements/toggle') } /> }
                </Flex>
                <Flex alignItems="center" justifyContent="between" className="user-stat-row user-info-grid-text">
                    <Column gap={ 0 } pointer={ isOwnProfile } onClick={ event => isOwnProfile && CreateLinkEvent('friends/toggle') }>
                        <Text bold className="user-stat-label">{ LocalizeText('extendedprofile.friends.count') }</Text>
                        <Text className="user-stat-value">{ userProfile.friendsCount }</Text>
                    </Column>
                    { isOwnProfile && <FaChevronRight className="fa-icon user-stat-chevron" onClick={ event => CreateLinkEvent('friends/toggle') } /> }
                </Flex>
                <Flex alignItems="center" gap={ 1 } className="user-stat-row user-info-grid-text">
                    { userProfile.isOnline &&
                        <i className="icon icon-pf-online" /> }
                    { !userProfile.isOnline &&
                        <i className="icon icon-pf-offline" /> }
                    <Text small>{ userProfile.isOnline ? 'Online' : 'Offline' }</Text>
                </Flex>
                { !canSendFriendRequest && !isOwnProfile &&
                    <Flex alignItems="center" gap={ 1 } className="user-info-grid-text">
                        <i className="icon icon-pf-tick" />
                        { userProfile.isMyFriend &&
                            <Text>{ LocalizeText('extendedprofile.friend') }</Text> }
                        { (requestSent || userProfile.requestSent) &&
                            <Text>{ LocalizeText('extendedprofile.friendrequestsent') }</Text> }
                    </Flex> }
            </div>
        </Flex>
    )
}
