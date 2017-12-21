import React from 'react';
import { resources, menu, content } from '../framework';

export default resources('pet', () => {
  menu({ priority: 0, label: 'About' });

  content({}, () => {
    return <div>about</div>;
  });
});
