import { IMessageComposer } from '../../../../../../api';

export class DirectionalArrowClickComposer implements IMessageComposer<ConstructorParameters<typeof DirectionalArrowClickComposer>>
{
    private _data: ConstructorParameters<typeof DirectionalArrowClickComposer>;

    constructor(direction: string)
    {
        this._data = [ direction ];
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
