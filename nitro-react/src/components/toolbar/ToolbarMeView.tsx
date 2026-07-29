import { MouseEventType, RoomObjectCategory } from '@nitrots/nitro-renderer';
import { Dispatch, FC, PropsWithChildren, SetStateAction, useEffect, useRef } from 'react';
import { CreateLinkEvent, GetRoomEngine, GetRoomSession, GetSessionDataManager, GetUserProfile } from '../../api';
import { Base, Flex, LayoutAvatarImageView } from '../../common';

interface ToolbarMeViewProps
{
    useGuideTool: boolean;
    unseenAchievementCount: number;
    setMeExpanded: Dispatch<SetStateAction<boolean>>;
    userFigure: string;
}

export const ToolbarMeView: FC<PropsWithChildren<ToolbarMeViewProps>> = props =>
{
    const { useGuideTool = false, unseenAchievementCount = 0, setMeExpanded = null, userFigure = null, children = null, ...rest } = props;
    const elementRef = useRef<HTMLDivElement>();

    useEffect(() =>
    {
        const roomSession = GetRoomSession();

        if(!roomSession) return;

        GetRoomEngine().selectRoomObject(roomSession.roomId, roomSession.ownRoomIndex, RoomObjectCategory.UNIT);
    }, []);

    useEffect(() =>
    {
        const onClick = (event: MouseEvent) => setMeExpanded(false);

        document.addEventListener('click', onClick);

        return () => document.removeEventListener(MouseEventType.MOUSE_CLICK, onClick);
    }, [ setMeExpanded ]);

    return (
        <Flex innerRef={ elementRef } className="nitro-toolbar-me">
            <Flex center pointer className="navigation-item me-menu-button me-slot-top-left" onClick={ event => CreateLinkEvent('friends/toggle') }>
                <Base className="icon icon-friendall" />
            </Flex>
            <Flex center pointer className="navigation-item me-menu-button me-slot-top-center" onClick={ event => GetUserProfile(GetSessionDataManager().userId) }>
                <Base className="icon icon-me-profile" />
            </Flex>
            <Flex center pointer className="navigation-item me-menu-button me-slot-top-right" onClick={ event => CreateLinkEvent('avatar-editor/toggle') }>
                <Base className="icon icon-me-clothing" />
            </Flex>
            <Flex center pointer className="navigation-item me-menu-button me-slot-bottom-left" onClick={ event => CreateLinkEvent('navigator/search/myworld_view') }>
                <Base className="icon icon-me-rooms" />
            </Flex>
            <Flex center pointer className="navigation-item me-menu-button me-slot-bottom-center active" onClick={ event => setMeExpanded(false) }>
                <LayoutAvatarImageView figure={ userFigure } direction={ 2 } headOnly={ true } position="absolute" />
            </Flex>
            <Flex center pointer className="navigation-item me-menu-button me-slot-bottom-right" onClick={ event => CreateLinkEvent('camera/toggle') }>
                <Base className="icon icon-camera" />
            </Flex>
            { children }
        </Flex>
    );
}
