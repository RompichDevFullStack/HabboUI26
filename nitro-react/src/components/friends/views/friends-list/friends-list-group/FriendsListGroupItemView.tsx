import { FC, MouseEvent } from 'react';
import { FaEye } from 'react-icons/fa';
import { GetUserProfile, LocalizeText, MessengerFriend, OpenMessengerChat } from '../../../../../api';
import { Base, Column, Flex, LayoutAvatarImageView, NitroCardAccordionItemView, Text } from '../../../../../common';
import { useFriends } from '../../../../../hooks';

export const FriendsListGroupItemView: FC<{ friend: MessengerFriend, selected: boolean, selectFriend: (userId: number) => void }> = props =>
{
    const { friend = null, selected = false, selectFriend = null } = props;
    const { followFriend = null } = useFriends();

    const clickFollowFriend = (event: MouseEvent<HTMLDivElement>) =>
    {
        event.stopPropagation();

        followFriend(friend);
    }

    const openMessengerChat = (event: MouseEvent<HTMLDivElement>) =>
    {
        event.stopPropagation();

        OpenMessengerChat(friend.id);
    }

    if(!friend) return null;

    return (
        <NitroCardAccordionItemView justifyContent="between" className={ `friends-list-item px-2 py-1 ${ selected ? 'selected' : '' }` } onClick={ event => selectFriend(friend.id) }>
            <Flex alignItems="center" gap={ 2 }>
                <Base position="relative" className="friends-list-item-avatar" onClick={ event => event.stopPropagation() }>
                    <LayoutAvatarImageView figure={ friend.figure } headOnly={ true } direction={ 2 } />
                </Base>
                <Column gap={ 0 }>
                    <Text bold variant="white">{ friend.name }</Text>
                    <Text small className={ `friends-list-item-status ${ friend.online ? 'online' : 'offline' }` }>
                        { friend.online ? 'En ligne maintenant' : 'Hors ligne' }
                    </Text>
                </Column>
            </Flex>
            <Flex alignItems="center" gap={ 2 }>
                { friend.followingAllowed &&
                    <Base pointer onClick={ clickFollowFriend } className="nitro-friends-spritesheet icon-friendbar-visit friends-list-item-action" title={ LocalizeText('friendlist.tip.follow') } /> }
                <FaEye className="fa-icon friends-list-item-action cursor-pointer" onClick={ event => { event.stopPropagation(); GetUserProfile(friend.id); } } title={ LocalizeText('infostand.link.profile') } />
                { friend.online &&
                    <Base pointer className="nitro-friends-spritesheet icon-friendbar-chat friends-list-item-action" onClick={ openMessengerChat } title={ LocalizeText('friendlist.tip.im') } /> }
            </Flex>
        </NitroCardAccordionItemView>
    );
}
