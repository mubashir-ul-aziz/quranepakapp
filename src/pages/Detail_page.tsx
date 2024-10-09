

import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import suratAyats from '../../surah_muzzammil.json';

interface WordTranslation {
  arabic: string;
  urdu: string;
}

interface Ayat {
  ayat_no: number;
  arabic: string;
  translation_urdu: string;
  word_by_word_translation: WordTranslation[];
}

interface Surah {
  id: string;
  surah: string;
  ayat: Ayat[];
}

const DetailPage: React.FC = () => {
  const [ayatDetail, setAyatDetail] = useState<Surah | null>(null);
  const [ayatNO, setAyatNO] = useState<string>('all');
  const [copyayat, setCopyayat] = useState({})
  const { id } = useParams();  
  useEffect(() => {
    if (id) {
      const foundAyatDetail = suratAyats.ayats.find((ayat: Surah) => ayat.id === id);
      setAyatDetail(foundAyatDetail || null);
    }
  }, [id]);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setAyatNO(e.target.value);
  };

  const handleCopy = (item) => {
    const formattedWordByWordTranslation = item.word_by_word_translation
      .map(word => `${word.urdu} : ${word.arabic}`)
      .join("\n");
  
    const formattedText = `
    "ayat_no": ${item.ayat_no},
    "surah_name": "${item.surah_name}",
    "arabic": "${item.arabic}",
    "translation_urdu": "${item.translation_urdu}",
    "word_by_word_translation": ${formattedWordByWordTranslation}
  `;
  
    // Copy to clipboard
    navigator.clipboard.writeText(formattedText)
      .then(() => {
        console.log("Copied to clipboard!");
      })
      .catch(err => {
        console.error("Error copying to clipboard: ", err);
      });
  };
  
  

  return (
    <div className='surah-detail-page' >
      {ayatDetail && (
        <div>
          <div className='title dsply_flex'>
          <h1>Detail Page for Surah: {ayatDetail.surah}</h1>
          
          <select value={ayatNO} onChange={handleSelectChange}>
            <option value="all">All</option>
            {ayatDetail.ayat.map((item) => (
              <option key={item.ayat_no} value={item.ayat_no}>
                {item.ayat_no}
              </option>
            ))}
          </select>
          </div>
          <div className='card'>
            {(ayatNO === 'all' ? ayatDetail.ayat : ayatDetail.ayat.filter(item => item.ayat_no.toString() === ayatNO)).map((item) => (
              <div className='item' key={item.ayat_no}>
                <div className='dsply_flex copy-btn-div'>
                <div> Ayat Number: {item.ayat_no}</div>
                <button className='btn-shrink' onClick={() => handleCopy(item)}>Copy</button>
                </div><h3 className='text-center'>  {item.arabic}</h3>
                <p className=' text-center '>{item.translation_urdu}</p>
                <div className=' word-by-word-meaning card'>
                  {item.word_by_word_translation.map((word, index) => (
                    <div key={index} className=' border-four item text-center ' style={{  }}>
                      {word.arabic} : {word.urdu}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      <Link to={'/'} className='back-to-home'>
        Back to Home
      </Link>
    </div>
  );
};

export default DetailPage;
