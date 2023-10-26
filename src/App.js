import React from 'react';
import Dropdown from "./compontrs/Dropdown";

function App() {

  return (
      <div>
          <div>
              <Dropdown url = "motherboards" name = "Motherboard"/>
          </div>
          <div>
              <Dropdown url = "processors" name = "Processor" />
          </div>
          <div>
              <Dropdown url = "rams" name = "RAM" />
          </div>
      </div>

  );
}

export default App;