import React from 'react';
import { page, menu, content } from '../framework';

export default page({}, () => {
  menu({ priority: 0, label: 'Home' });

  content({}, () => {
    return <div>home</div>;
  });
});
