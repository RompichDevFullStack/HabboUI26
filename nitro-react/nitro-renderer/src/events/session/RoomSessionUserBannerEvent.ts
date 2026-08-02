import { IRoomSession } from '../../api';
import { RoomSessionEvent } from './RoomSessionEvent';

export class RoomSessionUserBannerEvent extends RoomSessionEvent
{
    public static RSUBE_BANNER: string = 'RSUBE_BANNER';

    private _userId: number = 0;
    private _bannerCode: string;

    constructor(k: IRoomSession, _arg_2: number, _arg_3: string)
    {
        super(RoomSessionUserBannerEvent.RSUBE_BANNER, k);

        this._bannerCode = null;
        this._userId = _arg_2;
        this._bannerCode = _arg_3;
    }

    public get userId(): number
    {
        return this._userId;
    }

    public get bannerCode(): string
    {
        return this._bannerCode;
    }
}
