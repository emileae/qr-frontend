
import React, {useState} from 'react';
import styles from '../styles/Create.module.css';
import Link from 'next/link'
import { SketchPicker } from 'react-color'
var QRCode = require('qrcode.react');

import { gql, useMutation } from '@apollo/client';

const ADD_QR = gql`
mutation CreateQr($input: createQrInput!) {
    createQr(input: $input) {
      qr {
        svg
      }
    }
}
`;


export default function Create() {
  const [text, setText] = useState('Type your data HERE');
  const [size, setSize] = useState(256);
  const [fgColor, setFgColor] = useState("#000");
  const [bgColor, setBgColor] = useState("#fff");
  const [options, setOptions] = useState(false);
  const [level, setLevel] = useState("L");
  const [confirmation, setConfirmation] = useState(false);
  const [saving, setSaving] = useState("");
  const [addQr, {data}] = useMutation(ADD_QR);

  let svg = React.createRef();

    const save = async () => {
        setSaving("saving...");
        try {
            let mutationData = await addQr(
                {
                    "variables": {
                      "input": {
                          "data": {
                            "svg": svg.current.innerHTML
                          }
                      }
                    }
                }
            );
            setSaving("");
            setConfirmation(true)
        }catch (e) {
            console.log("error: ", e);
        }
    }

    const getVisibility = () => {
        return options ? styles.shown : styles.hidden;
    }
  
  return (
    <div>
        <div className={styles.floatingQr}>
            <span>
                <input className={styles.textInput} type="text" placeholder="eg. https://mywebsite.com" value={text} onChange={(e) => setText(e.target.value)}></input>
            </span>
            <span style={{marginLeft: "2rem"}}>
                <button className={styles.button} onClick={save}>Save & order 10000 stickers ;)</button>
                <br/>
                {saving}
                <div className={confirmation ? styles.shown : styles.hidden}>
                    QR code saved... see the saved svg files <Link href="/qrs"><span style={{textDecoration: "underline", cursor: "pointer"}}>here</span></Link>.
                </div>
            </span>
            <div>
                <button className={styles.smallButton} onClick={() => setOptions(!options)}>More options</button>
            </div>


            <div className={getVisibility()}>
                <div>
                    <p>Image size ({size} pixels)</p>
                    <input type="range" min="128" max="512" value={size} onChange={(e) => setSize(e.target.value)}/>
                </div>
                <div>
                    <p>Error Correction</p>
                    <div>
                        <select value={level} onChange={(e) => {setLevel(e.target.value)}}>
                            <option value={"L"}>L (7%)</option>
                            <option value={"M"}>M (15%)</option>
                            <option value={"Q"}>Q (25%)</option>
                            <option value={"H"}>H (30%)</option>
                        </select>
                    </div>
                    <div className={styles.tooltip}> 
                        (What's this?)
                        <span className={styles.tooltiptext}>
                            A low error correction makes the QR code simpler to read, but less tolerant to dirt/damage.
                        </span>
                    </div>
                </div>
                <div className={styles.horizontal}>
                    <div className={styles.colorPicker}>
                        <div>Foreground color</div>
                        <SketchPicker
                            width={150}
                            presetColors={[]}
                            color={ fgColor }
                            onChangeComplete={ (color) => {setFgColor(color.hex)} }
                        />
                    </div>
                    <div className={styles.colorPicker}>
                        <div>Background color</div>
                        <SketchPicker
                            width={150}
                            presetColors={[]}
                            color={ bgColor }
                            onChangeComplete={ (color) => {setBgColor(color.hex)} }
                        />
                    </div>
                </div>
            </div>
            
        </div>

        <div ref={svg}>
            <QRCode includeMargin={true} size={parseInt(size)} value={text} renderAs="svg" fgColor={fgColor} bgColor={bgColor} level={level}/>
        </div>
        
    </div>
  )
}
