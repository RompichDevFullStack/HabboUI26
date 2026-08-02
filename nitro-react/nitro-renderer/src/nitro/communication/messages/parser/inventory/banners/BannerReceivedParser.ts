import { IMessageDataWrapper, IMessageParser } from '../../../../../../api';

export class BannerReceivedParser implements IMessageParser
{
    private _bannerId: number;
    private _bannerCode: string;

    public flush(): boolean
    {
        this._bannerId = 0;
        this._bannerCode = null;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._bannerId = wrapper.readInt();
        this._bannerCode = wrapper.readString();

        return true;
    }

    public get bannerId(): number
    {
        return this._bannerId;
    }

    public get bannerCode(): string
    {
        return this._bannerCode;
    }
}
