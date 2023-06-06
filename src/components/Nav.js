import React from 'react';
import { Button } from 'antd';

function Nav() {
  // TODO: change to save the current test later
  function refreshPage() {
    window.location.reload(false);
  }

  return (
    <div className='nav'>
      <Button onClick={refreshPage}>New test</Button>
    </div>
  );
}

export default Nav;
