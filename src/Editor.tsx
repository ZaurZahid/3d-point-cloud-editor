
import { IValues } from './App';
import React from 'react';

interface IProps {
    values: IValues;
    setNewValues: (e: any) => void;
    onSave: () => void
}

const Editor: React.FC<IProps> = ({ values, setNewValues, onSave }) => {
    const handleChange = (event: any) => {
        setNewValues((prev: IValues) => {
            return {
                ...prev,
                [event.target.name]: event.target.value
            }
        })
    }

    return (
        <div className='editor-wrapper'>
            <div className="input-box">
                <span>rotation:</span>
                <input type="number" value={values.rotation} name="rotation" onChange={handleChange} />
            </div>
            <hr />
            {/* scaling */}
            <div className="input-box">
                <span>scalingX:</span>
                <input type="number" value={values.scalingX} name="scalingX" onChange={handleChange} />
            </div>
            <div className="input-box">
                <span>scalingY:</span>
                <input type="number" value={values.scalingY} name="scalingY" onChange={handleChange} />
            </div>
            <div className="input-box">
                <span>scalingZ:</span>
                <input type="number" value={values.scalingZ} name="scalingZ" onChange={handleChange} />
            </div>
            <hr />

            {/*  translation   */}
            <div className="input-box">
                <span>translationX:</span>
                <input type="number" value={values.translationX} name="translationX" onChange={handleChange} />
            </div>
            <div className="input-box">
                <span>translationY:</span>
                <input type="number" value={values.translationY} name="translationY" onChange={handleChange} />
            </div>
            <div className="input-box">
                <span>translationZ:</span>
                <input type="number" value={values.translationZ} name="translationZ" onChange={handleChange} />
            </div>
            <hr />

            {/*  position   */}
            <div className="input-box">
                <span>x:</span>
                <input type="number" value={values.x} name="x" onChange={handleChange} />
            </div>
            <div className="input-box">
                <span>y:</span>
                <input type="number" value={values.y} name="y" onChange={handleChange} />
            </div>
            <div className="input-box">
                <span>z:</span>
                <input type="number" value={values.z} name="z" onChange={handleChange} />
            </div>

            <button onClick={onSave}>Save</button>
        </div>
    );
}

export default Editor;
