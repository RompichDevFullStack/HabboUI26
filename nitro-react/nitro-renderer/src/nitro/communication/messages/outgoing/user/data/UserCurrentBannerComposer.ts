import { IMessageComposer } from '../../../../../../api';

export class UserCurrentBannerComposer implements IMessageComposer<ConstructorParameters<typeof UserCurrentBannerComposer>>
{
    private _data: ConstructorParameters<typeof UserCurrentBannerComposer>;

    constructor(userId: number)
    {
        this._data = [ userId ];
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
