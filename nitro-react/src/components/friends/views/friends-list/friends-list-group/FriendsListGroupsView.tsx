import { HabboGroupEntryData, UserProfileEvent } from '@nitrots/nitro-renderer';
import { FC, useState } from 'react';
import { GetGroupInformation, GetSessionDataManager } from '../../../../../api';
import { Column, NitroCardAccordionItemView, Text } from '../../../../../common';
import { useMessageEvent } from '../../../../../hooks';

// There is no dedicated packet for fetching just the current user's groups, and
// requesting the full profile (GetUserProfile) would also pop open the Profile
// window. So this only populates once a UserProfileEvent for our own id has
// already come in from elsewhere (e.g. the user opened their own profile).
export const FriendsListGroupsView: FC<{}> = props =>
{
    const [ groups, setGroups ] = useState<HabboGroupEntryData[]>([]);

    useMessageEvent<UserProfileEvent>(UserProfileEvent, event =>
    {
        const parser = event.getParser();

        if(parser.id !== GetSessionDataManager().userId) return;

        setGroups(parser.groups);
    });

    if(!groups || !groups.length) return null;

    return (
        <Column gap={ 1 } className="friends-list-groups">
            { groups.map(group =>
            {
                return (
                    <NitroCardAccordionItemView key={ group.groupId } className="friends-list-item px-2 py-1" onClick={ event => GetGroupInformation(group.groupId) }>
                        <Column gap={ 0 }>
                            <Text bold variant="white">{ group.groupName }</Text>
                            <Text small className="friends-list-item-status">Membre du groupe</Text>
                        </Column>
                    </NitroCardAccordionItemView>
                );
            }) }
        </Column>
    );
}
