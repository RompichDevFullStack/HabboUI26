import { IMessageDataWrapper, IMessageParser } from '../../../../../api';

export class CatalogItemNameParser implements IMessageParser
{
    private _typeId: number;
    private _name: string;

    public flush(): boolean
    {
        this._typeId = 0;
        this._name = null;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._typeId = wrapper.readInt();
        this._name = wrapper.readString();

        return true;
    }

    public get typeId(): number
    {
        return this._typeId;
    }

    public get name(): string
    {
        return this._name;
    }
}
