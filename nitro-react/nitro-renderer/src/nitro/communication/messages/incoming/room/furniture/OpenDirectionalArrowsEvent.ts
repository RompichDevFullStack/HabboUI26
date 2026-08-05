import { IMessageEvent } from '../../../../../../api';
import { MessageEvent } from '../../../../../../events';
import { OpenDirectionalArrowsParser } from '../../../parser';

export class OpenDirectionalArrowsEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, OpenDirectionalArrowsParser);
    }

    public getParser(): OpenDirectionalArrowsParser
    {
        return this.parser as OpenDirectionalArrowsParser;
    }
}
