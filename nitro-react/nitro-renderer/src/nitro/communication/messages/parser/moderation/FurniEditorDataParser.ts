import { IMessageDataWrapper, IMessageParser } from '../../../../../api';

export class FurniEditorDataParser implements IMessageParser
{
    private _typeId: number;
    private _fullName: string;
    private _width: number;
    private _length: number;
    private _height: number;
    private _allowStack: boolean;
    private _allowWalk: boolean;
    private _allowSit: boolean;
    private _allowLay: boolean;
    private _allowRecycle: boolean;
    private _allowTrade: boolean;
    private _allowMarketplace: boolean;
    private _allowGift: boolean;
    private _allowInventoryStack: boolean;
    private _interactionModesCount: number;
    private _customParams: string;

    public flush(): boolean
    {
        this._typeId = 0;
        this._fullName = null;
        this._width = 0;
        this._length = 0;
        this._height = 0;
        this._allowStack = false;
        this._allowWalk = false;
        this._allowSit = false;
        this._allowLay = false;
        this._allowRecycle = false;
        this._allowTrade = false;
        this._allowMarketplace = false;
        this._allowGift = false;
        this._allowInventoryStack = false;
        this._interactionModesCount = 0;
        this._customParams = null;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._typeId = wrapper.readInt();
        this._fullName = wrapper.readString();
        this._width = wrapper.readInt();
        this._length = wrapper.readInt();
        this._height = parseFloat(wrapper.readString());
        this._allowStack = wrapper.readBoolean();
        this._allowWalk = wrapper.readBoolean();
        this._allowSit = wrapper.readBoolean();
        this._allowLay = wrapper.readBoolean();
        this._allowRecycle = wrapper.readBoolean();
        this._allowTrade = wrapper.readBoolean();
        this._allowMarketplace = wrapper.readBoolean();
        this._allowGift = wrapper.readBoolean();
        this._allowInventoryStack = wrapper.readBoolean();
        this._interactionModesCount = wrapper.readInt();
        this._customParams = wrapper.readString();

        return true;
    }

    public get typeId(): number
    {
        return this._typeId;
    }

    public get fullName(): string
    {
        return this._fullName;
    }

    public get width(): number
    {
        return this._width;
    }

    public get length(): number
    {
        return this._length;
    }

    public get height(): number
    {
        return this._height;
    }

    public get allowStack(): boolean
    {
        return this._allowStack;
    }

    public get allowWalk(): boolean
    {
        return this._allowWalk;
    }

    public get allowSit(): boolean
    {
        return this._allowSit;
    }

    public get allowLay(): boolean
    {
        return this._allowLay;
    }

    public get allowRecycle(): boolean
    {
        return this._allowRecycle;
    }

    public get allowTrade(): boolean
    {
        return this._allowTrade;
    }

    public get allowMarketplace(): boolean
    {
        return this._allowMarketplace;
    }

    public get allowGift(): boolean
    {
        return this._allowGift;
    }

    public get allowInventoryStack(): boolean
    {
        return this._allowInventoryStack;
    }

    public get interactionModesCount(): number
    {
        return this._interactionModesCount;
    }

    public get customParams(): string
    {
        return this._customParams;
    }
}
