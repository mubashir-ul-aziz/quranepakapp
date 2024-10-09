import React from 'react'
import all_surah from '../../surah_all.json'
import Card_link from './Card_link.jsx';

function All_surah() {
  return (
    <div>
      <h1>All Surah of Quran e Pak</h1>
      <Card_link element={all_surah.surat} />
    </div>
  )
}

export default All_surah
