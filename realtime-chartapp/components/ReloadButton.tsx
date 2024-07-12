'use client';

import { Button } from './ui/button';

const ReloadButton = () => {
  return (
    <Button onClick={(e) => { window.location.reload() }} variant="default">Reload</Button>
  )
}

export default ReloadButton