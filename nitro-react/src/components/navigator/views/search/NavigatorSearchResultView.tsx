import { NavigatorSearchComposer, NavigatorSearchResultList } from '@nitrots/nitro-renderer';
import { FC, useEffect, useState } from 'react';
import { FaMinus, FaPlus, FaWindowMaximize, FaWindowRestore } from 'react-icons/fa';
import { LocalizeText, SendMessageComposer } from '../../../../api';
import { AutoGridProps, Column, Flex, Text } from '../../../../common';
import { useNavigator } from '../../../../hooks';
import { NavigatorSearchResultItemView } from './NavigatorSearchResultItemView';

export interface NavigatorSearchResultViewProps extends AutoGridProps
{
    searchResult: NavigatorSearchResultList;
}

export const NavigatorSearchResultView: FC<NavigatorSearchResultViewProps> = props =>
{
    const { searchResult = null } = props;
    const [ isExtended, setIsExtended ] = useState(true);

    const { topLevelContext = null } = useNavigator();

    const getResultTitle = () =>
    {
        let name = searchResult.code;

        if(!name || !name.length || LocalizeText('navigator.searchcode.title.' + name) == ('navigator.searchcode.title.' + name)) return searchResult.data;

        if(name.startsWith('${')) return name.slice(2, (name.length - 1));

        return ('navigator.searchcode.title.' + name);
    }

    const showMore = () =>
    {
        if(searchResult.action == 1) SendMessageComposer(new NavigatorSearchComposer(searchResult.code, ''));
        else if(searchResult.action == 2 && topLevelContext) SendMessageComposer(new NavigatorSearchComposer(topLevelContext.code,''));
    }

    useEffect(() =>
    {
        if(!searchResult) return;

        setIsExtended(!searchResult.closed);
    }, [ searchResult ]);

    return (
        <Column className="navigator-result-group" gap={ 0 }>
            <Flex fullWidth alignItems="center" justifyContent="between" className="navigator-result-group-header">
                <Flex grow pointer alignItems="center" gap={ 1 } onClick={ event => setIsExtended(prevValue => !prevValue) }>
                    { isExtended && <FaMinus className="fa-icon" /> }
                    { !isExtended && <FaPlus className="fa-icon" /> }
                    <Text variant="white">{ LocalizeText(getResultTitle()) }</Text>
                </Flex>
                <Flex gap={ 2 }>
                    { (searchResult.action > 0) && (searchResult.action === 1) && <FaWindowMaximize className="fa-icon" onClick={ showMore } /> }
                    { (searchResult.action > 0) && (searchResult.action !== 1) && <FaWindowRestore className="fa-icon" onClick={ showMore } /> }
                </Flex>
            </Flex>
            { isExtended &&
                <Column gap={ 1 } className="navigator-result-rooms">
                    { searchResult.rooms.length > 0 && searchResult.rooms.map((room, index) => <NavigatorSearchResultItemView key={ index } roomData={ room } />) }
                </Column> }
        </Column>
    );
}
