import { ILinkEventTracker } from '@nitrots/nitro-renderer';
import { CSSProperties, FC, useEffect, useMemo, useRef, useState } from 'react';
import { Transition } from 'react-transition-group';
import { AddEventLinkTracker, ChatEntryType, LocalizeText, RemoveLinkEventTracker } from '../../api';
import { DraggableWindowPosition, Flex, InfiniteScroll, NitroCardContentView, NitroCardHeaderView, NitroCardView, Text } from '../../common';
import { useChatHistory } from '../../hooks';

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

export const ChatHistoryView: FC<{}> = props =>
{
    const [ isVisible, setIsVisible ] = useState(false);
    const [ searchText, setSearchText ] = useState<string>('');
    const { chatHistory = [] } = useChatHistory();
    const elementRef = useRef<HTMLDivElement>(null);

    const filteredChatHistory = useMemo(() => 
    {
        if (searchText.length === 0) return chatHistory;

        let text = searchText.toLowerCase();

        return chatHistory.filter(entry => ((entry.message && entry.message.toLowerCase().includes(text))) || (entry.name && entry.name.toLowerCase().includes(text)));
    }, [ chatHistory, searchText ]);

    useEffect(() =>
    {
        if(elementRef && elementRef.current && isVisible) elementRef.current.scrollTop = elementRef.current.scrollHeight;
    }, [ isVisible ]);

    useEffect(() =>
    {
        const linkTracker: ILinkEventTracker = {
            linkReceived: (url: string) =>
            {
                const parts = url.split('/');
        
                if(parts.length < 2) return;
        
                switch(parts[1])
                {
                    case 'show':
                        setIsVisible(true);
                        return;
                    case 'hide':
                        setIsVisible(false);
                        return;
                    case 'toggle':
                        setIsVisible(prevValue => !prevValue);
                        return;
                }
            },
            eventUrlPrefix: 'chat-history/'
        };

        AddEventLinkTracker(linkTracker);

        return () => RemoveLinkEventTracker(linkTracker);
    }, []);

    return (
        <Transition in={ isVisible } appear timeout={ SLIDE_TIMEOUT } unmountOnExit>
            { state => (
                <NitroCardView uniqueKey="chat-history" className="nitro-chat-history" theme="primary-slim" style={ { ...SLIDE_DEFAULT_STYLE, ...SLIDE_TRANSITION_STYLES[ state ] } } windowPosition={ DraggableWindowPosition.NOTHING } disableDrag>
                    <NitroCardHeaderView headerText={ LocalizeText('room.chathistory.button.text') } onCloseClick={ event => setIsVisible(false) }/>
                    <NitroCardContentView innerRef={ elementRef } overflow="hidden" gap={ 2 } classNames={ [ 'theme-dark' ] }>
                        <input type="text" className="form-control form-control-sm" placeholder={ LocalizeText('generic.search') } value={ searchText } onChange={ event => setSearchText(event.target.value) } />
                        <InfiniteScroll rows={ filteredChatHistory } scrollToBottom={ true } rowRender={ row =>
                        {
                            return (
                                <Flex alignItems="center" className="p-1" gap={ 2 }>
                                    <Text variant="muted">{ row.timestamp }</Text>
                                    { (row.type === ChatEntryType.TYPE_CHAT) &&
                                        <div className="bubble-container" style={ { position: 'relative' } }>
                                            { (row.style === 0) &&
                                            <div className="user-container-bg" style={ { backgroundColor: row.color } } /> }
                                            <div className={ `chat-bubble bubble-${ row.style } type-${ row.chatType }` } style={ { maxWidth: '100%' } }>
                                                <div className="user-container">
                                                    { row.imageUrl && (row.imageUrl.length > 0) &&
                                        <div className="user-image" style={ { backgroundImage: `url(${ row.imageUrl })` } } /> }
                                                </div>
                                                <div className="chat-content">
                                                    <b className="username mr-1" dangerouslySetInnerHTML={ { __html: `${ row.name }: ` } } />
                                                    <span className="message" dangerouslySetInnerHTML={ { __html: `${ row.message }` } } />
                                                </div>
                                            </div>
                                        </div> }
                                    { (row.type === ChatEntryType.TYPE_ROOM_INFO) &&
                                        <>
                                            <i className="icon icon-small-room" />
                                            <Text textBreak wrap grow>{ row.name }</Text>
                                        </> }
                                </Flex>
                            )
                        } } />
                    </NitroCardContentView>
                </NitroCardView>
            ) }
        </Transition>
    );
}
