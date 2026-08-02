import { FurniEditorDataEvent, ILinkEventTracker, RequestFurniEditorDataComposer, SaveFurniEditorDataComposer } from '@nitrots/nitro-renderer';
import { FC, useEffect, useState } from 'react';
import { AddEventLinkTracker, LocalizeText, RemoveLinkEventTracker, SendMessageComposer } from '../../api';
import { Button, Column, Flex, NitroCardContentView, NitroCardHeaderView, NitroCardView, Text } from '../../common';
import { useMessageEvent } from '../../hooks';

export const FurniEditorView: FC<{}> = props =>
{
    const [ isVisible, setIsVisible ] = useState(false);
    const [ typeId, setTypeId ] = useState(0);
    const [ fullName, setFullName ] = useState('');
    const [ width, setWidth ] = useState(1);
    const [ length, setLength ] = useState(1);
    const [ height, setHeight ] = useState('0');
    const [ allowStack, setAllowStack ] = useState(false);
    const [ allowWalk, setAllowWalk ] = useState(false);
    const [ allowSit, setAllowSit ] = useState(false);
    const [ allowLay, setAllowLay ] = useState(false);
    const [ allowRecycle, setAllowRecycle ] = useState(false);
    const [ allowTrade, setAllowTrade ] = useState(false);
    const [ allowMarketplace, setAllowMarketplace ] = useState(false);
    const [ allowGift, setAllowGift ] = useState(false);
    const [ allowInventoryStack, setAllowInventoryStack ] = useState(false);
    const [ customParams, setCustomParams ] = useState('');

    const onClose = () => setIsVisible(false);

    const onSave = () =>
    {
        SendMessageComposer(new SaveFurniEditorDataComposer({
            typeId,
            fullName,
            width,
            length,
            height: parseFloat(height) || 0,
            allowStack,
            allowWalk,
            allowSit,
            allowLay,
            allowRecycle,
            allowTrade,
            allowMarketplace,
            allowGift,
            allowInventoryStack,
            customParams
        }));
    }

    useMessageEvent<FurniEditorDataEvent>(FurniEditorDataEvent, event =>
    {
        const parser = event.getParser();

        setTypeId(parser.typeId);
        setFullName(parser.fullName);
        setWidth(parser.width);
        setLength(parser.length);
        setHeight(parser.height.toString());
        setAllowStack(parser.allowStack);
        setAllowWalk(parser.allowWalk);
        setAllowSit(parser.allowSit);
        setAllowLay(parser.allowLay);
        setAllowRecycle(parser.allowRecycle);
        setAllowTrade(parser.allowTrade);
        setAllowMarketplace(parser.allowMarketplace);
        setAllowGift(parser.allowGift);
        setAllowInventoryStack(parser.allowInventoryStack);
        setCustomParams(parser.customParams);
    });

    useEffect(() =>
    {
        const linkTracker: ILinkEventTracker = {
            linkReceived: (url: string) =>
            {
                const parts = url.split('/');

                if(parts.length < 2) return;

                switch(parts[1])
                {
                    case 'open': {
                        if(parts.length < 3) return;

                        const id = parseInt(parts[2]);

                        if(isNaN(id)) return;

                        setTypeId(id);
                        setIsVisible(true);

                        SendMessageComposer(new RequestFurniEditorDataComposer(id));
                        return;
                    }
                }
            },
            eventUrlPrefix: 'furni-editor/'
        };

        AddEventLinkTracker(linkTracker);

        return () => RemoveLinkEventTracker(linkTracker);
    }, []);

    if(!isVisible) return null;

    return (
        <NitroCardView uniqueKey="furni-editor" className="nitro-furni-editor">
            <NitroCardHeaderView headerText={ LocalizeText('furni.editor.title') } onCloseClick={ onClose } />
            <NitroCardContentView overflow="auto" gap={ 2 }>
                <Text bold>ID: { typeId }</Text>
                <Column gap={ 1 }>
                    <Text>{ LocalizeText('furni.editor.public_name') }</Text>
                    <input type="text" className="form-control form-control-sm" value={ fullName } onChange={ event => setFullName(event.target.value) } />
                </Column>
                <Flex gap={ 2 }>
                    <Column gap={ 1 } grow>
                        <Text>{ LocalizeText('furni.editor.width') }</Text>
                        <input type="number" className="form-control form-control-sm" value={ width } onChange={ event => setWidth(parseInt(event.target.value) || 0) } />
                    </Column>
                    <Column gap={ 1 } grow>
                        <Text>{ LocalizeText('furni.editor.length') }</Text>
                        <input type="number" className="form-control form-control-sm" value={ length } onChange={ event => setLength(parseInt(event.target.value) || 0) } />
                    </Column>
                    <Column gap={ 1 } grow>
                        <Text>{ LocalizeText('furni.editor.stack_height') }</Text>
                        <input type="text" className="form-control form-control-sm" value={ height } onChange={ event => setHeight(event.target.value) } />
                    </Column>
                </Flex>
                <Column gap={ 1 }>
                    <Text>{ LocalizeText('furni.editor.custom_params') }</Text>
                    <input type="text" className="form-control form-control-sm" value={ customParams } onChange={ event => setCustomParams(event.target.value) } />
                </Column>
                <Column gap={ 1 }>
                    <Flex alignItems="center" gap={ 1 }>
                        <input className="form-check-input" type="checkbox" checked={ allowStack } onChange={ event => setAllowStack(prev => !prev) } />
                        <Text>{ LocalizeText('furni.editor.allow_stack') }</Text>
                    </Flex>
                    <Flex alignItems="center" gap={ 1 }>
                        <input className="form-check-input" type="checkbox" checked={ allowWalk } onChange={ event => setAllowWalk(prev => !prev) } />
                        <Text>{ LocalizeText('furni.editor.allow_walk') }</Text>
                    </Flex>
                    <Flex alignItems="center" gap={ 1 }>
                        <input className="form-check-input" type="checkbox" checked={ allowSit } onChange={ event => setAllowSit(prev => !prev) } />
                        <Text>{ LocalizeText('furni.editor.allow_sit') }</Text>
                    </Flex>
                    <Flex alignItems="center" gap={ 1 }>
                        <input className="form-check-input" type="checkbox" checked={ allowLay } onChange={ event => setAllowLay(prev => !prev) } />
                        <Text>{ LocalizeText('furni.editor.allow_lay') }</Text>
                    </Flex>
                    <Flex alignItems="center" gap={ 1 }>
                        <input className="form-check-input" type="checkbox" checked={ allowRecycle } onChange={ event => setAllowRecycle(prev => !prev) } />
                        <Text>{ LocalizeText('furni.editor.allow_recycle') }</Text>
                    </Flex>
                    <Flex alignItems="center" gap={ 1 }>
                        <input className="form-check-input" type="checkbox" checked={ allowTrade } onChange={ event => setAllowTrade(prev => !prev) } />
                        <Text>{ LocalizeText('furni.editor.allow_trade') }</Text>
                    </Flex>
                    <Flex alignItems="center" gap={ 1 }>
                        <input className="form-check-input" type="checkbox" checked={ allowMarketplace } onChange={ event => setAllowMarketplace(prev => !prev) } />
                        <Text>{ LocalizeText('furni.editor.allow_marketplace') }</Text>
                    </Flex>
                    <Flex alignItems="center" gap={ 1 }>
                        <input className="form-check-input" type="checkbox" checked={ allowGift } onChange={ event => setAllowGift(prev => !prev) } />
                        <Text>{ LocalizeText('furni.editor.allow_gift') }</Text>
                    </Flex>
                    <Flex alignItems="center" gap={ 1 }>
                        <input className="form-check-input" type="checkbox" checked={ allowInventoryStack } onChange={ event => setAllowInventoryStack(prev => !prev) } />
                        <Text>{ LocalizeText('furni.editor.allow_inventory_stack') }</Text>
                    </Flex>
                </Column>
                <Button variant="success" onClick={ onSave }>{ LocalizeText('furni.editor.save') }</Button>
            </NitroCardContentView>
        </NitroCardView>
    );
}
