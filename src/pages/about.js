import React from 'react';
import { page, menu, content } from '../framework';

export default page({}, () => {
  menu({ priority: 1, label: 'About' });

  content({}, () => {
    return <div>about</div>;
  });
});
