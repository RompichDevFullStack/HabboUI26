import { IMessageDataWrapper, IMessageParser } from '../../../../../../api';

export class UserPermissionsParser implements IMessageParser
{
    private _clubLevel: number;
    private _securityLevel: number;
    private _isAmbassador: boolean;
    private _rankId: number;

    public flush(): boolean
    {
        this._clubLevel = 0;
        this._securityLevel = 0;
        this._isAmbassador = false;
        this._rankId = 0;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._clubLevel = wrapper.readInt();
        this._securityLevel = wrapper.readInt();
        this._isAmbassador = wrapper.readBoolean();
        this._rankId = wrapper.readInt();

        return true;
    }

    public get clubLevel(): number
    {
        return this._clubLevel;
    }

    public get securityLevel(): number
    {
        return this._securityLevel;
    }

    public get isAmbassador(): boolean
    {
        return this._isAmbassador;
    }

    public get rankId(): number
    {
        return this._rankId;
    }
}
