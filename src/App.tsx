import { useState } from 'react';
import styles from './App.module.css';
import RightsTable from './components/RightsTable';
import SearchBar from './components/SearchBar';
import Heading from './components/Heading';
import Footer from './components/Footer';
import Header from './components/Header';

function App() {
  const [inputAddress, setInputAddress] = useState('');

  return (
    <div className={styles['App']}>
      <Header />
      <SearchBar inputAddress={inputAddress} setInputAddress={setInputAddress} />
      <RightsTable
        ownerAddress={inputAddress}
        contractAddress={'0xb74c9f1eccddefbef7c017b97bd3a2f24a0081f8'}
        blockchain={'ethereum'}
      />
      <Footer />
    </div>
  );
}

export default App;
