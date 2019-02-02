import { shallow } from 'enzyme';
import React from 'react';
import CardList from '../components/UserSearchPage/CardList';

it('expect to render CardLIst component', () => {
  const mockRobots = [
    {
      id: 1,
      name: 'John Snow',
      username: 'JohnJonh',
      email: 'john@gmail.com',
    }
  ]
  expect(shallow(<CardList robots={mockRobots}/>)).toMatchSnapshot();
})
