import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../events';
import { FurniEditorDataParser } from '../../parser';

export class FurniEditorDataEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, FurniEditorDataParser);
    }

    public getParser(): FurniEditorDataParser
    {
        return this.parser as FurniEditorDataParser;
    }
}
