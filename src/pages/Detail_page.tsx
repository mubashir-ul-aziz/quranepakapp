

import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import suratAyats from '../../surah_muzzammil.json';
import Not_found_page from './Not_found_page.tsx'

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
interface Word {
  urdu: string;
  arabic: string;
}
interface Item {
  ayat_no: number;
  surah_name: string;
  arabic: string;
  translation_urdu: string;
  word_by_word_translation: Word[];
}
interface Ayat {
  ayat_no: number;
  arabic: string;
  translation_urdu: string;
  word_by_word_translation: Word[];
}

const DetailPage: React.FC = () => {
  const [ayatDetail, setAyatDetail] = useState<Surah | null>(null);
  const [ayatNO, setAyatNO] = useState<string>('all');
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

  function isItem(item: Item | Ayat): item is Item {
    return (item as Item).surah_name !== undefined;
  }
  
  const handleCopy = (item: Item | Ayat): void => {
    const formattedWordByWordTranslation = item.word_by_word_translation
      .map((word: Word) => `${word.urdu}(Urdu) : ${word.arabic}(Arabic),`)
      .join("\n");
  
    const formattedText = `
      "Ayat No": ${item.ayat_no},
      "Surah Name": "${isItem(item) ? item.surah_name : "N/A"}",
      "Arabic": "${item.arabic}",
      "Translation in Urdu": "${item.translation_urdu}",
      "Word by Word Translation": 
      ${formattedWordByWordTranslation}
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
      {ayatDetail ? (
        <div>
          <div className='title dsply_flex'>
          <h1>Detail Page for Surah: {ayatDetail.surah}</h1>
          <div className=' dsply_flex gap align_item_center '>
          <select value={ayatNO} onChange={handleSelectChange}>
            <option value="all">All</option>
            {ayatDetail.ayat.map((item) => (
              <option key={item.ayat_no} value={item.ayat_no}>
                {item.ayat_no}
              </option>
            ))}
          </select>
          <Link to={'/'} className='back-to-home'>
          <button className='btn-shrink'>Home page</button>
      </Link>
      </div>
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
      ):(
        <Not_found_page heading_name="Surat Not Found"/>
      )}
    </div>
  );
};

export default DetailPage;
