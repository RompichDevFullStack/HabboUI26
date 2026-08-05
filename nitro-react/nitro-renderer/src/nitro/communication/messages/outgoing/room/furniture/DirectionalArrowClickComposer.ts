import { IMessageComposer } from '../../../../../../api';

export class DirectionalArrowClickComposer implements IMessageComposer<ConstructorParameters<typeof DirectionalArrowClickComposer>>
{
    private _data: ConstructorParameters<typeof DirectionalArrowClickComposer>;

    constructor(itemId: number, direction: string)
    {
        this._data = [ itemId, direction ];
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
