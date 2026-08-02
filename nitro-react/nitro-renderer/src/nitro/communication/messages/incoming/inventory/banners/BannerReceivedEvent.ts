import { IMessageEvent } from '../../../../../../api';
import { MessageEvent } from '../../../../../../events';
import { BannerReceivedParser } from '../../../parser';

export class BannerReceivedEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, BannerReceivedParser);
    }

    public getParser(): BannerReceivedParser
    {
        return this.parser as BannerReceivedParser;
    }
}
