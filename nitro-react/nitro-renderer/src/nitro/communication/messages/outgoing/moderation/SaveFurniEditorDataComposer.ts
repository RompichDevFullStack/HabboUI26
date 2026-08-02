import { IMessageComposer } from '../../../../../api';

export interface ISaveFurniEditorData
{
    typeId: number;
    fullName: string;
    width: number;
    length: number;
    height: number;
    allowStack: boolean;
    allowWalk: boolean;
    allowSit: boolean;
    allowLay: boolean;
    allowRecycle: boolean;
    allowTrade: boolean;
    allowMarketplace: boolean;
    allowGift: boolean;
    allowInventoryStack: boolean;
    customParams: string;
}

export class SaveFurniEditorDataComposer implements IMessageComposer<any[]>
{
    private _data: any[];

    constructor(data: ISaveFurniEditorData)
    {
        this._data = [
            data.typeId,
            data.fullName,
            data.width,
            data.length,
            String(data.height),
            data.allowStack,
            data.allowWalk,
            data.allowSit,
            data.allowLay,
            data.allowRecycle,
            data.allowTrade,
            data.allowMarketplace,
            data.allowGift,
            data.allowInventoryStack,
            data.customParams
        ];
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
