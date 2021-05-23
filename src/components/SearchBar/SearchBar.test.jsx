import { cleanup ,fireEvent,render, screen} from '@testing-library/react';
import React from 'react';
import SearchBar from './SearchBar.jsx'

afterEach(cleanup);

const mockSearchFields = [{label:'title',value:'title'},{value:'desc',label:'description'}]

describe('testing out Search bar component',()=>{
    afterEach(cleanup);

    it('should test if on click search event is fired', ()=>{
        const fn =jest.fn();

        render(<SearchBar
            searchFields = {mockSearchFields}
            onSearch = {(fields,value)=>fn(fields,value)}
        ></SearchBar>)
        
        const searchButton = screen.getByRole('button',{name:'Search'});
        fireEvent.click(searchButton)
        expect(fn).toHaveBeenCalledTimes(1);
        expect(fn).toHaveBeenCalledWith(mockSearchFields,null);
    })

    it('should test if on click search event is fired when selection changes', ()=>{
        const fn =jest.fn();

        render(<SearchBar
            searchFields = {mockSearchFields}
            onSearch = {(fields,value)=>fn(fields,value)}
        ></SearchBar>)

        const inputField = screen.getByPlaceholderText('Search Text');
        fireEvent.change(inputField,{target:{value:'Test'}})
        
        const searchByButton = screen.getByRole('button',{name:'All'})
        fireEvent.click(searchByButton);
        const checkBoxesForDescription = screen.getByRole('checkbox',{name:'description'})
        fireEvent.click(checkBoxesForDescription);
        
        const searchButton = screen.getByRole('button',{name:'Search'});
        fireEvent.click(searchButton)
        expect(fn).toHaveBeenCalledTimes(1);
        expect(fn).toHaveBeenCalledWith([{label:'title',value:'title'}],'Test');
    }) 
})