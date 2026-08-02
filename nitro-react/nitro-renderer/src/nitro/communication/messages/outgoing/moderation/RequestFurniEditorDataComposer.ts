import { IMessageComposer } from '../../../../../api';

export class RequestFurniEditorDataComposer implements IMessageComposer<ConstructorParameters<typeof RequestFurniEditorDataComposer>>
{
    private _data: ConstructorParameters<typeof RequestFurniEditorDataComposer>;

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
