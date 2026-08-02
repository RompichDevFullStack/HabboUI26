import { IMessageComposer } from '../../../../../api';

export class RenameCatalogItemComposer implements IMessageComposer<ConstructorParameters<typeof RenameCatalogItemComposer>>
{
    private _data: ConstructorParameters<typeof RenameCatalogItemComposer>;

    constructor(pageId: number, offerId: number, name: string)
    {
        this._data = [ pageId, offerId, name ];
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
