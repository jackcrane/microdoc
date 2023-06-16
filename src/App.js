import './App.css';
import React, {useState, useEffect} from 'react';

function App() {
  const [data, setData] = useState(null);
  useEffect(() => {
    (async () => {
      const response = await fetch('/microdoc.json');
      const data = await response.json();
      console.log(data.api);
      setData(data.api);
    })()
  }, [])

  const switchForColor = (method) => {
    switch (method) {
      case 'GET':
        return 'green';
      case 'POST':
        return 'blue';
      case 'PUT':
        return 'orange';
      case 'DELETE':
        return 'red';
      default:
        return 'black';
    }
  }

  return (
    data ? (
    <div className="App">
      <nav>
        <ul>
          {data.paths.map((item, index) => (
            <li key={index}>
              <a href={item.path}><div className={`pill ${switchForColor(item.method)}`}>{item.method}</div>{item.endpoint}</a>
            </li>
          ))}
        </ul>
      </nav>
      <div>
      <header className="App-header">
        <h2>
          {data.subtitle} · <div className='pill'>{data.version}</div> · <div className='pill'>{data.license.name}</div>
        </h2>
        <h1>{data.title}</h1>
        <p>{data.description}</p>
        <p>Contacts: 
          <ul>
        {data.contact?.map((item, index) => (
          <a key={index} href={`mailto:${item.email}` || item.url}>{item.name}</a>
        ))}
          </ul>
        </p>
      </header>
      <main>
        {data.paths.map((item, index) => (
          <div key={index} className="path">
            <div className='titlerow'>
              <h2 className='endpoint'><span className="base">{data.root}</span>{item.endpoint}</h2>
              <div className={`pill ${switchForColor(item.method)}`}>{item.method}</div>
            </div>
            <p>{item.description}</p>
            <h3>Parameters</h3>
            {/* {item.parameters?.query?.length > 0} */}
            {item.parameters?.query && item.parameters?.query?.length > 0 && (
              <div className="parameters">
                <details>
                  <summary>Query</summary>
                  <p>{JSON.stringify(item.parameters)}</p>
                </details>
              </div>
            )}
            {item.parameters?.route && item.parameters?.route?.length > 0 && (
              <div className="parameters">
                <details>
                  <summary>Route</summary>
                  <p>{JSON.stringify(item.parameters)}</p>
                </details>
              </div>
            )}
          </div>
        ))}
      </main>
    </div>
    </div>
    ) : (
      <p>Loading...</p>
    )
  );
}

export default App;
