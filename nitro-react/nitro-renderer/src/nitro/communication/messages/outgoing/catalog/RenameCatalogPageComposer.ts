import { IMessageComposer } from '../../../../../api';

export class RenameCatalogPageComposer implements IMessageComposer<ConstructorParameters<typeof RenameCatalogPageComposer>>
{
    private _data: ConstructorParameters<typeof RenameCatalogPageComposer>;

    constructor(pageId: number, caption: string)
    {
        this._data = [ pageId, caption ];
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
