import { IMessageEvent } from '../../../../../../api';
import { MessageEvent } from '../../../../../../events';
import { UserCurrentBannerParser } from '../../../parser';

export class UserCurrentBannerEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, UserCurrentBannerParser);
    }

    public getParser(): UserCurrentBannerParser
    {
        return this.parser as UserCurrentBannerParser;
    }
}
