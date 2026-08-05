import { FC, useEffect, useState } from 'react';
import { LocalizeText, WiredFurniType } from '../../../../api';
import { Button, Flex, Grid, Text } from '../../../../common';
import { useWired } from '../../../../hooks';
import { WiredTriggerBaseView } from './WiredTriggerBaseView';

export const WiredTriggerAvatarClicksArrowView: FC<{}> = props =>
{
    const [ up, setUp ] = useState(true);
    const [ right, setRight ] = useState(true);
    const [ down, setDown ] = useState(true);
    const [ left, setLeft ] = useState(true);
    const [ offset, setOffset ] = useState(0);
    const { trigger = null, setIntParams = null } = useWired();

    const save = () => setIntParams([ (up ? 1 : 0), (right ? 1 : 0), (down ? 1 : 0), (left ? 1 : 0), offset ]);

    useEffect(() =>
    {
        const data = trigger.intData;

        setUp((data.length > 0) ? (data[0] === 1) : true);
        setRight((data.length > 1) ? (data[1] === 1) : true);
        setDown((data.length > 2) ? (data[2] === 1) : true);
        setLeft((data.length > 3) ? (data[3] === 1) : true);
        setOffset((data.length > 4) ? data[4] : 0);
    }, [ trigger ]);

    return (
        <WiredTriggerBaseView requiresFurni={ WiredFurniType.STUFF_SELECTION_OPTION_NONE } hasSpecialInput={ true } save={ save }>
            <Text bold>{ LocalizeText('wiredfurni.params.arrows.actions') }</Text>
            <Grid columnCount={ 2 } gap={ 2 }>
                <Flex alignItems="center" justifyContent="between" gap={ 1 }>
                    <Flex alignItems="center" gap={ 1 }>
                        <Text>&#9650;</Text>
                        <Text>{ LocalizeText('wiredfurni.params.arrows.up') }</Text>
                    </Flex>
                    <input className="form-check-input" type="checkbox" checked={ up } onChange={ event => setUp(event.target.checked) } />
                </Flex>
                <Flex alignItems="center" justifyContent="between" gap={ 1 }>
                    <Flex alignItems="center" gap={ 1 }>
                        <Text>&#9654;</Text>
                        <Text>{ LocalizeText('wiredfurni.params.arrows.right') }</Text>
                    </Flex>
                    <input className="form-check-input" type="checkbox" checked={ right } onChange={ event => setRight(event.target.checked) } />
                </Flex>
                <Flex alignItems="center" justifyContent="between" gap={ 1 }>
                    <Flex alignItems="center" gap={ 1 }>
                        <Text>&#9660;</Text>
                        <Text>{ LocalizeText('wiredfurni.params.arrows.down') }</Text>
                    </Flex>
                    <input className="form-check-input" type="checkbox" checked={ down } onChange={ event => setDown(event.target.checked) } />
                </Flex>
                <Flex alignItems="center" justifyContent="between" gap={ 1 }>
                    <Flex alignItems="center" gap={ 1 }>
                        <Text>&#9664;</Text>
                        <Text>{ LocalizeText('wiredfurni.params.arrows.left') }</Text>
                    </Flex>
                    <input className="form-check-input" type="checkbox" checked={ left } onChange={ event => setLeft(event.target.checked) } />
                </Flex>
            </Grid>
            <Text bold>{ LocalizeText('wiredfurni.params.executionoffset') }</Text>
            <Flex alignItems="center" gap={ 1 }>
                <Button onClick={ () => setOffset(prev => Math.max(0, prev - 1)) }>-</Button>
                <Text>{ offset }</Text>
                <Button onClick={ () => setOffset(prev => (prev + 1)) }>+</Button>
            </Flex>
            <Text small>{ LocalizeText('wiredfurni.params.arrows.test') }</Text>
        </WiredTriggerBaseView>
    );
}
