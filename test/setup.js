import React from 'react';
import { shallow, render, mount } from 'enzyme';

// Add commonly used methods and objects as globals
global.React = React;
global.shallow = shallow;
global.render = render;
global.mount = mount;