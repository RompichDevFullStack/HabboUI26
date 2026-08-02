import { IMessageComposer } from '../../../../../../api';

export class SetActivatedBannerComposer implements IMessageComposer<ConstructorParameters<typeof SetActivatedBannerComposer>>
{
    private _data: ConstructorParameters<typeof SetActivatedBannerComposer>;

    constructor(bannerCode: string)
    {
        this._data = [ bannerCode ?? '' ];
    }

    public getMessageArray()
    {
        return this._data;
    }

    public dispose(): void
    {
        return;
    }
}
