import { IMessageDataWrapper, IMessageParser } from '../../../../../../api';

export class UserCurrentBannerParser implements IMessageParser
{
    private _userId: number;
    private _bannerCode: string;

    public flush(): boolean
    {
        this._userId = null;
        this._bannerCode = null;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._userId = wrapper.readInt();
        this._bannerCode = wrapper.readString();

        return true;
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
