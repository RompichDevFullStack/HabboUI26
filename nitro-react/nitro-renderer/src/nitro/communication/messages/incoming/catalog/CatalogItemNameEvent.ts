import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../events';
import { CatalogItemNameParser } from '../../parser';

export class CatalogItemNameEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, CatalogItemNameParser);
    }

    public getParser(): CatalogItemNameParser
    {
        return this.parser as CatalogItemNameParser;
    }
}
