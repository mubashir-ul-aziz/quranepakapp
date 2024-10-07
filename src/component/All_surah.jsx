import React from 'react'
import all_surah from '../../surah_all.json'
import Card_link from './Card_link.jsx';

function All_surah() {
  return (
    <div>
      <h1>All Surah of Quran e Pak</h1>
      {console.log(all_surah)}
      {console.log(all_surah.surat)}
      <Card_link element={all_surah.surat} />
      {/* {all_surah.surat.map((element,index)=>{
        return (<div key={index+1}>
          <div className=''>
          {console.log(element.name)}
            <Card_link element={element} index={index}/>
          </div>
        </div>)
        
      })} */}
    </div>
  )
}

export default All_surah
