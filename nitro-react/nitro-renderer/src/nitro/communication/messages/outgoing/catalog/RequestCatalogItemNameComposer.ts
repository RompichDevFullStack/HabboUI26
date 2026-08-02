import { IMessageComposer } from '../../../../../api';

export class RequestCatalogItemNameComposer implements IMessageComposer<ConstructorParameters<typeof RequestCatalogItemNameComposer>>
{
    private _data: ConstructorParameters<typeof RequestCatalogItemNameComposer>;

    constructor(typeId: number)
    {
        this._data = [ typeId ];
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
