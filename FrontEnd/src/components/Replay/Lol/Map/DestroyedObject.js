import React from 'react'
import { toScale } from '../../../../lib/canvas-math.js'
import {Container, Sprite, Graphics, Text} from '@inlet/react-pixi'
import {clamp} from "lodash";

import * as PIXI from "pixi.js"

const ObjectLabel = ({ visible, object, colorStr }) => {
    if (!visible) return null

    const width = object.name.length * 10;

    return (
       <Container position={[-20, 10]}>
           <Graphics
           draw={g => {
               g.clear();

               g.lineStyle(1, 0x0D0D0D, 0.8)
               g.beginFill(0x0D0D0D, 0.8);
               g.drawRect(0, 0, width, 15)
               g.endFill()
           }} />

           <Text text={`${object.name}`}
                 x={5}
                 y={0}
                 style={new PIXI.TextStyle({
                     fontSize: 7,
                     fontWeight: 200,
                     lineHeight: 13,
                     wordWrapWidth:  width,
                     fill: '#FFFFFF',
                 })} />
       </Container>
    )
}


const Objects = ({options, object, colorHex}) => {
    const objectImg = require(`../../../../assets/Lol/misc/${object.name}.png`);

    return (
        <Container>
            <Sprite
                x={-15}
                y={-15}
                width={30}
                height={30}
                image={objectImg}
            />
            <Graphics
                draw={g => {
                    g.clear();

                    g.lineStyle(3, colorHex, 0.7)
                    g.moveTo(-17, -17)
                    g.lineTo(17, 17)
                    g.moveTo(17, -17)
                    g.lineTo(-17, 17)
                }}
            />
        </Container>
    )
}


const DestroyedObject = ({ options, object, lolMapSize, mapSize, marks, showName }) => {
/*    const x=toScale(lolMapSize, mapSize, player.location.x)
    const y=toScale(lolMapSize, mapSize, player.location.y)*/
    const objectColor = (object.victimTeamId !== 0)?
        (object.victimTeamId === 100)? 0x2020FF : 0xFF2020 :
        (object.killerTeamId === 200)? 0x2020FF : 0xFF2020;

    const x=toScale(lolMapSize.x, mapSize, object.x)
    const y=mapSize-toScale(lolMapSize.y, mapSize, object.y)

    return (
        <Container
            position={[x, y]}
            zIndex={3}
            interactive={true}
            mouseover={() => {marks.setHoveredObject(object.msSinceEpoch)}}
            mouseout={() => {marks.setHoveredObject(null)}}
        >
            <Objects
                options={options}
                object={object}
                marks={marks}
                mapSize={mapSize}
                colorHex={objectColor}
            />

            <ObjectLabel
                object={object}
                visible={marks.isObjectHovered(object.msSinceEpoch)}
            />
        </Container>
    )
}





export default DestroyedObject;