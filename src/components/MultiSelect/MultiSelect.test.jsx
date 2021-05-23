import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import MultiSelect from './MultiSelect';

afterEach(cleanup);

describe('Testing MultiSelect Component',()=>{
    afterEach(cleanup);

    it('should present all options selected by default',()=>{
        const options = [{value:1,label:'key'},{value:2,label:'title'}]
        
        render(<MultiSelect options={options}></MultiSelect>);
        
        const buttonEl = screen.getAllByRole('button');
        expect(buttonEl.length).toEqual(1)
        expect(buttonEl[0]).toHaveTextContent('All')
    })

    it('should emit event with updated value when selection changes',()=>{
        const options = [{value:1,label:'key'},{value:2,label:'title'}]
        
        const fn = jest.fn();
        
        render(<MultiSelect options={options} onChange={(val)=>fn(val)}></MultiSelect>);
        
        const buttonEl = screen.getAllByRole('button');
        fireEvent.click(buttonEl[0]);
        const checkBoxes = screen.getAllByRole('checkbox')
        expect(checkBoxes.length).toEqual(3)
        fireEvent.click(checkBoxes[1]);
        expect(buttonEl[0]).toHaveTextContent('title');
        expect(fn).toHaveBeenCalledTimes(1);
        expect(fn).toHaveBeenCalledWith([{value:2,label:'title'}])
    })

})