import React, { useState } from 'react';
import Editor from './Editor';
import './index.css';
import SceneWrapper from './SceneWrapper';

export interface IValues {
  rotation: number

  translationX: number
  translationY: number
  translationZ: number

  scalingX: number
  scalingY: number
  scalingZ: number

  x: number
  y: number
  z: number
}

function App() {
  const [opened, setOpened] = useState(false)
  const [newValues, setNewValues] = useState<IValues>({
    rotation: 4,

    translationX: 0,
    translationY: 0,
    translationZ: 0,

    scalingX: 1,
    scalingY: 1,
    scalingZ: 1,

    x: 0,
    y: 0,
    z: 3
  })

  return (
    <>
      <p className='camera-text'>Current camera: <strong>{!opened ? "Perspective" : "Orthographic"}</strong></p>
      <div className='content-wrapper'>
        <SceneWrapper values={newValues} onClick={() => setOpened(true)} opened={opened} />
        {opened ? <Editor values={newValues} setNewValues={setNewValues} onSave={() => setOpened(false)} /> : null}
      </div>
    </>
  );
}

export default App;
