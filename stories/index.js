import React from 'react';

import { storiesOf } from '@storybook/react';

import ConfiguredEditor from './ConfiguredEditor';

storiesOf('Katex editor', module)
  .add('Without mathinput', () => (
    <div>
      <ConfiguredEditor />
    </div>
  ))
  .add('With mathinput', () => <ConfiguredEditor withMathInput />)
  .add('With asciimath', () => (
    <div>
      <ConfiguredEditor withAsciimath />
      <p>
        To learn more about asciimath see:{' '}
        <a href="http://asciimath.org/">http://asciimath.org/</a>
      </p>
      <p>
        A custom translator like asciimath in combination with MathInput is not
        supported.
      </p>
    </div>
  ));
