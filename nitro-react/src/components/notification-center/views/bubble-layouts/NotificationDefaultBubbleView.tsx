import { FC } from 'react';
import { FaTimes } from 'react-icons/fa';
import { NotificationBubbleItem, OpenUrl } from '../../../../api';
import { Column, Flex, LayoutNotificationBubbleView, LayoutNotificationBubbleViewProps, Text } from '../../../../common';

export interface NotificationDefaultBubbleViewProps extends LayoutNotificationBubbleViewProps
{
    item: NotificationBubbleItem;
}

export const NotificationDefaultBubbleView: FC<NotificationDefaultBubbleViewProps> = props =>
{
    const { item = null, onClose = null, ...rest } = props;

    const htmlText = item.message.replace(/\r\n|\r|\n/g, '<br />');

    return (
        <LayoutNotificationBubbleView onClose={ onClose } fadesOut={ false } gap={ 2 } alignItems="center" position="relative" onClick={ event => (item.linkUrl && item.linkUrl.length && OpenUrl(item.linkUrl)) } { ...rest }>
            <Flex center className="bubble-image-container">
                { (item.iconUrl && item.iconUrl.length) &&
                    <img className="no-select" src={ item.iconUrl } alt="" /> }
            </Flex>
            <Column gap={ 0 }>
                <Text bold small variant="white" className="notification-bubble-header">Notification</Text>
                <Text wrap variant="white" dangerouslySetInnerHTML={ { __html: htmlText } } />
            </Column>
            <FaTimes className="fa-icon notification-bubble-close" onClick={ event => { event.stopPropagation(); onClose(); } } />
        </LayoutNotificationBubbleView>
    );
}
