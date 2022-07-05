import React, { useState, useCallback } from 'react';
import { render } from 'react-dom';

import {AppProvider,Page,Layout,Card,FormLayout,RangeSlider,Checkbox,Button,Icon} from '@shopify/polaris';
import { DragHandleMinor, DeleteMajor, EditMajor } from "@shopify/polaris-icons";
import '@shopify/polaris//build/esm/styles.css';
import './index.css';

function App() {
  const [shadowColor, setShadowColor] = useState("#000000");
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  const [previewBoxColor, setPreviewBoxColor] = useState("#3d9df6");

  const [rangeHorizontal, setHorizontal] = useState(0);
  const handleHorizontalChange = useCallback(
    (value) => setHorizontal(value),
    []
  );

  const [rangeVertical, setVertical] = useState(0);
  const handleVerticalChange = useCallback(
    (value) => setVertical(value),
    []
  );

  const [rangeSpread, setSpread] = useState(3);
  const handleSpreadChange = useCallback(
    (value) => setSpread(value),
    []
  );

  const [rangeBlur, setBlur] = useState(5);
  const handleBlurChange = useCallback(
    (value) => setBlur(value),
    []
  );

  const [rangeOpacity, setOpacity] = useState(0.2);
  const handleOpacityChage = useCallback(
    (value) => setOpacity(value),
    []
  );

  const [checked, setChecked] = useState(false);
  const handleCheckBoxChange = useCallback((newChecked) => setChecked(newChecked), []);

  const getColor = (shadowColor, rangeOpacity) => {
    const rgb = hexToRgb(shadowColor);
    const rgbString = "rgba(" + rgb.r + "," + rgb.g + "," + rgb.b + "," + rangeOpacity + ")";
    return rgbString;
  }
  
  const hexToRgb = (shadowColor) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(shadowColor);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
  }

  let boxShadowValue = `${checked ? "inset" : ""} ${getColor(shadowColor, rangeOpacity)} ${rangeHorizontal}px ${rangeVertical}px ${rangeBlur}px ${rangeSpread}px`;
  const addShadow = (boxShadowValue) => {
    boxShadowValue += `,`; 
    boxShadowValue += boxShadowValue;
    if (boxShadowValue.substr(boxShadowValue.length - 1, boxShadowValue.length) == ",") {
      boxShadowValue = boxShadowValue.substr(0, boxShadowValue.length - 1);
    }
    return boxShadowValue;
  }

  return (
    <div>
      <AppProvider>
        <Page>
          <Layout>
            <Layout.Section oneHalf>
              <Card sectioned title="Box-Shadow CSS Generator">
                <FormLayout>
                  <RangeSlider
                    label="Shift right"
                    min={-50}
                    max={50}
                    value={rangeHorizontal}
                    onChange={handleHorizontalChange}
                    output
                  />
                  <RangeSlider
                    label="Shift down"
                    min={-50}
                    max={50}
                    value={rangeVertical}
                    onChange={handleVerticalChange}
                    output
                  />
                  <RangeSlider
                    label="Spread"
                    min={0}
                    max={100}
                    value={rangeSpread}
                    onChange={handleSpreadChange}
                    output
                  />
                  <RangeSlider
                    label="Blur"
                    min={0}
                    max={100}
                    value={rangeBlur}
                    onChange={handleBlurChange}
                    output
                  />
                  <RangeSlider
                    label="Opacity"
                    min={0}
                    max={1}
                    step={0.1}
                    value={rangeOpacity}
                    onChange={handleOpacityChage}
                    output
                  />
                  <Checkbox
                    label="Inset"
                    checked={checked}
                    onChange={handleCheckBoxChange}
                  />
                  <input
                    type="color" 
                    value={shadowColor}
                    onChange={(e) => {
                      setShadowColor(e.target.value);
                    }}
                  />
                </FormLayout>
              </Card>
              <Card sectioned>
                <Button onClick={addShadow(boxShadowValue)}>Add Layer</Button>
                <br/>
                <br/>
                <div className='layer_item'>
                  <span className='icon_drag'>
                      <Icon source={DragHandleMinor}/>
                  </span>
                  {boxShadowValue}
                  <span className='icon_edit'>
                    <Icon source={EditMajor}/>
                  </span>
                  <span className='icon_del'>
                    <Icon source={DeleteMajor}/>
                  </span>
                </div>
              </Card>
            </Layout.Section>
            <Layout.Section oneHalf>
              <Card sectioned title="Preview">
                <input
                  type="color" 
                  value={backgroundColor}
                  onChange={(e) => {
                    setBackgroundColor(e.target.value);
                  }}
                />

                <input
                  type="color"
                  value={previewBoxColor}
                  onChange={(e) => {
                    setPreviewBoxColor(e.target.value);
                  }}
                />

                <div className='preview-area' style={{
                      background: `${backgroundColor}`
                    }}>
                  <div className='preview-box' style={{
                    background: `${previewBoxColor}`,
                    boxShadow: `${boxShadowValue}`
                  }}>
                  </div>
                </div>
              </Card>
              <Card sectioned title="CSS code">
                <pre>
                  <code>
                    box-shadow: {addShadow(boxShadowValue)};
                  </code>
                </pre>
              </Card>
              <Card sectioned title="Template">
                <div className='template'>
                  <div className='template__global template__1'>
                  </div>
                  <div className='template__global template__2'>
                  </div>
                </div>
              </Card>
            </Layout.Section>
          </Layout>
        </Page>
      </AppProvider>
    </div>
  );
}

render(<App />, document.getElementById('root'));