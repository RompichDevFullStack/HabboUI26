import { AdvancedMap, IAdvancedMap, IMessageDataWrapper, IMessageParser } from '../../../../../../api';

export class BannersParser implements IMessageParser
{
    private _allBannerCodes: string[];
    private _activeBannerCode: string;
    private _bannerIds: IAdvancedMap<string, number>;

    public flush(): boolean
    {
        this._allBannerCodes = [];
        this._activeBannerCode = null;
        this._bannerIds = null;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._allBannerCodes = [];
        this._bannerIds = new AdvancedMap();

        let count = wrapper.readInt();

        while(count > 0)
        {
            const bannerId = wrapper.readInt();
            const bannerCode = wrapper.readString();

            this._bannerIds.add(bannerCode, bannerId);

            this._allBannerCodes.push(bannerCode);

            count--;
        }

        this._activeBannerCode = wrapper.readString();

        return true;
    }

    public getBannerId(code: string): number
    {
        return this._bannerIds.getValue(code);
    }

    public getAllBannerCodes(): string[]
    {
        return this._allBannerCodes;
    }

    public get activeBannerCode(): string
    {
        return this._activeBannerCode;
    }
}
