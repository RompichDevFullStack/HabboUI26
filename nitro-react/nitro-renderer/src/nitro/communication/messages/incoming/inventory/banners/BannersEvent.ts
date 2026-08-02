import { IMessageEvent } from '../../../../../../api';
import { MessageEvent } from '../../../../../../events';
import { BannersParser } from '../../../parser';

export class BannersEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, BannersParser);
    }

    public getParser(): BannersParser
    {
        return this.parser as BannersParser;
    }
}
