import { useNavigate } from 'react-router-dom'
import Surats from '../../surah_all.json'

function Home_page() {
  const navigate= useNavigate()
  return <div className='all-surah-list'>
    <h1>All Sorah Name</h1>
    <div className='card'>   
    {Surats?.surat?.map((item)=>( <div onClick={()=>navigate(`/surat/${item.surah}`)}>
     
     <div className='item'> <span className='number'>{item.surah}</span> {item.english} <span className='urdu-name'> {item.name} </span> </div>
  </div>))}
  </div>
  </div> 
    
  
}

export default Home_page
