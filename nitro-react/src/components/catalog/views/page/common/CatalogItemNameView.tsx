import { RenameCatalogItemComposer } from '@nitrots/nitro-renderer';
import { FC, KeyboardEvent, useState } from 'react';
import { GetSessionDataManager, IPurchasableOffer, SendMessageComposer } from '../../../../../api';
import { Text } from '../../../../../common';
import { useCatalog } from '../../../../../hooks';

export interface CatalogItemNameViewProps
{
    offer: IPurchasableOffer;
    grow?: boolean;
}

export const CatalogItemNameView: FC<CatalogItemNameViewProps> = props =>
{
    const { offer = null, grow = false } = props;
    const { currentPage = null } = useCatalog();
    const [ isEditing, setIsEditing ] = useState(false);
    const [ editValue, setEditValue ] = useState('');
    const [ overrideOfferId, setOverrideOfferId ] = useState<number>(null);
    const [ overrideName, setOverrideName ] = useState<string>(null);

    if(!offer) return null;

    const canRename = (GetSessionDataManager().rankId >= 7);
    const displayName = ((overrideOfferId === offer.offerId) ? overrideName : offer.localizationName);

    const startRename = () =>
    {
        if(!canRename || !currentPage) return;

        setEditValue(displayName);
        setIsEditing(true);
    }

    const saveRename = () =>
    {
        const trimmed = editValue.trim();

        if(trimmed.length && (trimmed !== displayName))
        {
            SendMessageComposer(new RenameCatalogItemComposer(currentPage.pageId, offer.offerId, trimmed));

            setOverrideOfferId(offer.offerId);
            setOverrideName(trimmed);
        }

        setIsEditing(false);
    }

    const onInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) =>
    {
        event.stopPropagation();

        switch(event.key)
        {
            case 'Enter':
                saveRename();
                return;
            case 'Escape':
                setIsEditing(false);
                return;
        }
    }

    if(isEditing)
    {
        return (
            <input
                type="text"
                className="form-control form-control-sm"
                autoFocus
                value={ editValue }
                onChange={ event => setEditValue(event.target.value) }
                onKeyDown={ onInputKeyDown }
                onBlur={ () => setIsEditing(false) } />
        );
    }

    return <Text grow={ grow } truncate onDoubleClick={ event => startRename() }>{ displayName }</Text>;
}
