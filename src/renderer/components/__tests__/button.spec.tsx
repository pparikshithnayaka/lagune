import { shallow } from 'enzyme';
import * as React from 'react';
import renderer from 'react-test-renderer';
import Button from '../Button';

describe('Button', () => {
  it('renders a button with text', () => {
    const tree = renderer.create(
      <Button text='this is a button' />,
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders a button with children', () => {
    const tree = renderer.create(
      <Button text='this is a button'>
        <p>this is child</p>
      </Button>,
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('handles click events using the given handler', () => {
    const handler = jest.fn();
    const button = shallow(
      <Button
        text='this is a button'
        onClick={handler}
      />,
    );
    button.find('button').simulate('click');

    expect(handler).toBeCalled();
  });

  it('does not handle click events if props.disabled given', () => {
    const handler = jest.fn();
    const button = shallow(
      <Button
        text='this is a button'
        disabled
        onClick={handler}
      />,
    );
    button.find('button').simulate('click');

    expect(handler).not.toBeCalled();
  });

});
