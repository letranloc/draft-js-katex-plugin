import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import Welcome from './Welcome';

import ConfiguredEditor from './ConfiguredEditor';


storiesOf('Katex editor', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);

storiesOf('Katex editor', module)
  .add('Without mathinput', () => <ConfiguredEditor />)
  .add('With mathinput', () => <ConfiguredEditor withMathInput/>);
