import { FC, useEffect, useState } from 'react';
import { LocalizeText, WiredFurniType } from '../../../../api';
import { Column, Flex, Text } from '../../../../common';
import { useWired } from '../../../../hooks';
import { WiredTriggerBaseView } from './WiredTriggerBaseView';

export const WiredTriggerAvatarCollisionView: FC<{}> = props =>
{
    const [ triggerOnOrigin, setTriggerOnOrigin ] = useState(0);
    const { trigger = null, setIntParams = null } = useWired();

    const save = () => setIntParams([ triggerOnOrigin ]);

    useEffect(() =>
    {
        const data = trigger.intData;

        setTriggerOnOrigin((data.length > 0) ? data[0] : 0);
    }, [ trigger ]);

    return (
        <WiredTriggerBaseView requiresFurni={ WiredFurniType.STUFF_SELECTION_OPTION_NONE } hasSpecialInput={ true } save={ save }>
            <Column gap={ 1 }>
                <Text bold>{ LocalizeText('wiredfurni.params.collision.picktriggerer') }</Text>
                <Flex alignItems="center" gap={ 1 }>
                    <input className="form-check-input" type="radio" name="triggerOnOrigin" id="triggerOnOrigin0" checked={ (triggerOnOrigin === 0) } onChange={ event => setTriggerOnOrigin(0) } />
                    <Text>{ LocalizeText('wiredfurni.params.collision.target') }</Text>
                </Flex>
                <Flex alignItems="center" gap={ 1 }>
                    <input className="form-check-input" type="radio" name="triggerOnOrigin" id="triggerOnOrigin1" checked={ (triggerOnOrigin === 1) } onChange={ event => setTriggerOnOrigin(1) } />
                    <Text>{ LocalizeText('wiredfurni.params.collision.origin') }</Text>
                </Flex>
            </Column>
        </WiredTriggerBaseView>
    );
}
