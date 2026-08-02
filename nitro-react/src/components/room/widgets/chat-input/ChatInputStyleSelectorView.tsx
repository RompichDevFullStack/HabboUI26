import { FC, MouseEvent, useEffect, useState } from 'react';
import { Overlay, Popover } from 'react-bootstrap';
import { Base, Column, Flex, NitroCardContentView, Text } from '../../../../common';

interface ChatInputStyleSelectorViewProps
{
    chatStyleId: number;
    chatStyleIds: number[];
    selectChatStyleId: (styleId: number) => void;
}

export const ChatInputStyleSelectorView: FC<ChatInputStyleSelectorViewProps> = props =>
{
    const { chatStyleId = 0, chatStyleIds = null, selectChatStyleId = null } = props;
    const [ target, setTarget ] = useState<(EventTarget & HTMLElement)>(null);
    const [ selectorVisible, setSelectorVisible ] = useState(false);

    const selectStyle = (styleId: number) =>
    {
        selectChatStyleId(styleId);
        setSelectorVisible(false);
    }

    const toggleSelector = (event: MouseEvent<HTMLElement>) =>
    {
        let visible = false;

        setSelectorVisible(prevValue =>
        {
            visible = !prevValue;

            return visible;
        });

        if(visible) setTarget((event.target as (EventTarget & HTMLElement)));
    }

    useEffect(() =>
    {
        if(selectorVisible) return;

        setTarget(null);
    }, [ selectorVisible ]);

    return (
        <>
            <Flex alignItems="center" pointer className="chat-style-toggle" onClick={ toggleSelector }>
                <Base className="chat-style-arrow" />
                <Base className="icon chatstyles-icon" />
            </Flex>
            <Overlay show={ selectorVisible } target={ target } placement="top" popperConfig={ { modifiers: [ { name: 'offset', options: { offset: [ 0, 12 ] } } ] } }>
                <Popover className="nitro-chat-style-selector-container image-rendering-pixelated">
                    <Flex alignItems="center" className="chat-style-selector-header">
                        <Text bold small variant="white" className="chat-style-selector-title">Styles de chat</Text>
                    </Flex>
                    <NitroCardContentView overflow="auto" className="bg-transparent">
                        <Column gap={ 2 }>
                            { chatStyleIds && (chatStyleIds.length > 0) && chatStyleIds.map((styleId) =>
                            {
                                return (
                                    <Flex pointer key={ styleId } className={ `chat-style-row ${ (styleId === chatStyleId) ? 'selected' : '' }` } onClick={ () => selectStyle(styleId) }>
                                        <div className="bubble-container visible">
                                            { (styleId === 0) &&
                                                <div className="user-container-bg" /> }
                                            <div className={ `chat-bubble bubble-${ styleId } type-0` }>
                                                <div className="user-container" />
                                                <div className="chat-content">Bonjour, comment ça va aujourd'hui ?</div>
                                                <div className="pointer" />
                                            </div>
                                        </div>
                                    </Flex>
                                );
                            }) }
                        </Column>
                    </NitroCardContentView>
                </Popover>
            </Overlay>
        </>
    );
}
