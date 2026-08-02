import { IMessageComposer } from '../../../../../../api';

export class RequestBannersComposer implements IMessageComposer<ConstructorParameters<typeof RequestBannersComposer>>
{
    private _data: ConstructorParameters<typeof RequestBannersComposer>;

    constructor()
    {
        this._data = [];
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
