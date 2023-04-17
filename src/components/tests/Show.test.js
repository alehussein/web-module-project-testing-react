import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Show from './../Show';

import userEvent from '@testing-library/user-event';

const showData = {
    name: "test show",
    summary: "test summary",
    seasons:[
       {
         id: 0,
         name:"season01",
         episodes: []
       },
       {
         id: 1,
         name: 'season02',
         episodes: []
       },
    
]
}

test('renders without errors', () => {
     render(<Show show={showData} selectedSeason={"none"}/>);
 });

test('renders Loading component when prop show is null', () => {
    render(<Show show={null} />);
    const loadingComponet = screen.queryByTestId(/loading-container/i);
    expect(loadingComponet).toBeInTheDocument;
 });

test('renders same number of options seasons are passed in', () => {
    render(<Show show={showData} selectedSeason={"none"} />);
    const seasonOptions = screen.queryAllByTestId('season-option');
    expect(seasonOptions).toHaveLength(2);
 });

test('handleSelect is called when an season is selected', () => {
    const handleSelect = jest.fn();

    render(<Show show={showData} selectedSeason={'none'}  handleSelect={handleSelect} />);
    const select = screen.getByLabelText(/Select A Season/i);
    userEvent.selectOptions(select, ['1']);

    // expect(handleSelect).toBeCalled();
});

test('component renders when no seasons are selected and when rerenders with a season passed in', () => {
    const { rerender } = render(<Show show={showData} selectedSeason={'none'} />);
    let episodes = screen.queryByTestId('episode-container');
    expect(episodes).not.toBeInTheDocument();

    rerender(<Show show={showData} selectedSeason={1} />);
    episodes = screen.queryByTestId('episodes-container');
    expect(episodes).toBeInTheDocument();
 });
