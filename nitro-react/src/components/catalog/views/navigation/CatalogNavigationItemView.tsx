import { RenameCatalogPageComposer } from '@nitrots/nitro-renderer';
import { FC, KeyboardEvent, useState } from 'react';
import { FaCaretDown, FaCaretUp } from 'react-icons/fa';
import { GetSessionDataManager, ICatalogNode, SendMessageComposer } from '../../../../api';
import { Base, LayoutGridItem, Text } from '../../../../common';
import { useCatalog } from '../../../../hooks';
import { CatalogIconView } from '../catalog-icon/CatalogIconView';
import { CatalogNavigationSetView } from './CatalogNavigationSetView';

export interface CatalogNavigationItemViewProps
{
    node: ICatalogNode;
    child?: boolean;
}

export const CatalogNavigationItemView: FC<CatalogNavigationItemViewProps> = props =>
{
    const { node = null, child = false } = props;
    const { activateNode = null } = useCatalog();
    const [ isEditing, setIsEditing ] = useState(false);
    const [ editValue, setEditValue ] = useState(node.localization);
    const [ displayName, setDisplayName ] = useState(node.localization);

    const canRename = (GetSessionDataManager().rankId >= 7);

    const startRename = () =>
    {
        if(!canRename) return;

        setEditValue(displayName);
        setIsEditing(true);
    }

    const saveRename = () =>
    {
        const trimmed = editValue.trim();

        if(trimmed.length && (trimmed !== displayName))
        {
            SendMessageComposer(new RenameCatalogPageComposer(node.pageId, trimmed));

            setDisplayName(trimmed);
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

    return (
        <Base className="nitro-catalog-navigation-section">
            <LayoutGridItem gap={ 1 } column={ false } itemActive={ node.isActive } onClick={ event => activateNode(node) } className={ child ? 'inset' : '' }>
                <CatalogIconView icon={ node.iconId } />
                { isEditing &&
                    <input
                        type="text"
                        className="form-control form-control-sm"
                        autoFocus
                        value={ editValue }
                        onClick={ event => event.stopPropagation() }
                        onChange={ event => setEditValue(event.target.value) }
                        onKeyDown={ onInputKeyDown }
                        onBlur={ () => setIsEditing(false) } /> }
                { !isEditing &&
                    <Text grow truncate onDoubleClick={ event => startRename() }>{ displayName }</Text> }
                { node.isBranch &&
                    <>
                        { node.isOpen && <FaCaretUp className="fa-icon" /> }
                        { !node.isOpen && <FaCaretDown className="fa-icon" /> }
                    </> }
            </LayoutGridItem>
            { node.isOpen && node.isBranch &&
                <CatalogNavigationSetView node={ node } child={ true } /> }
        </Base>
    );
}
