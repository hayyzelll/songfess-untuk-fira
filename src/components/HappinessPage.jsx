import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const lyricsData = [
  { time: 0.12, text: "I'll be the one" },
  { time: 3.24, text: "That stays 'till the end" },
  { time: 6.88, text: "And I'll be the one" },
  { time: 10.10, text: "That needs you again" },
  { time: 13.49, text: "And I'll be the one that proposes" },
  { time: 18.61, text: "In a garden of roses" },
  { time: 22.23, text: "And truly loves you long after our curtain closes" },
  { time: 28.84, text: "But will you still love me" },
  { time: 31.97, text: "When nobody wants me around?" },
  { time: 41.36, text: "When I turn 81 and forget things" },
  { time: 47.69, text: "Will you still be proud?" },
  { time: 54.53, text: "Cause I am the one" },
  { time: 57.56, text: "That waited this long" },
  { time: 61.27, text: "And I am the one" },
  { time: 64.34, text: "That might get it wrong" },
  { time: 68.06, text: "And I'll be the one" },
  { time: 70.65, text: "That will love you" },
  { time: 72.79, text: "The way I'm supposed to, girl" },
  { time: 82.56, text: "But will you still love me" },
  { time: 86.44, text: "When nobody wants me around, around?" },
  { time: 96.32, text: "When I turn 81 and forget things" },
  { time: 101.70, text: "Will you still be proud?" },
  { time: 109.82, text: "Proud of me, of my short list of accomplishments" },
  { time: 116.72, text: "Me and my lack of new news" },
  { time: 123.89, text: "Me and my selfishness" },
  { time: 127.28, text: "Or me and myself wish you nothing but a happy new version of you" },
  { time: 137.16, text: "Because I, I, I" },
  { time: 151.23, text: "I want you to tell me you find it hard to be yourself" },
  { time: 158.21, text: "So I can say it's gonna be alright" },
  { time: 164.52, text: "And I want you to love me the way you love your family" },
  { time: 171.39, text: "The way you love to show me what it's like to be happy" },
  { time: 185.04, text: "(instrumental/outro)" }
];

const HappinessPage = () => {
  const audioRef = useRef(null);
  const videoRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    audio.addEventListener('timeupdate', updateTime);
    return () => audio.removeEventListener('timeupdate', updateTime);
  }, []);

  useEffect(() => {
    const index = lyricsData.findLastIndex(lyric => lyric.time <= currentTime);
    setActiveIndex(index);
  }, [currentTime]);

  // 🔇 Auto-scroll ke lirik aktif dihapus (sesuai permintaan)

  const togglePlay = () => {
    if (audioRef.current.paused) {
      audioRef.current.play();
      videoRef.current?.play();
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      videoRef.current?.pause();
      setIsPlaying(false);
    }
  };

  const handleLyricClick = (time) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      if (audioRef.current.paused) {
        audioRef.current.play();
        videoRef.current?.play();
        setIsPlaying(true);
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="happiness-page"
    >
      <div className="happiness-container">
        {/* Video section */}
        <div className="video-section">
          <video
            ref={videoRef}
            loop
            muted
            playsInline
            className="video-player"
          >
            <source src="/background.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Judul Lirik */}
        <h2 className="lyrics-title">Happiness – Rex Orange County</h2>

        {/* Lirik lagu */}
        <div className="lyrics-container">
          {lyricsData.map((lyric, idx) => (
            <motion.div
              key={idx}
              className={`lyric-line ${idx === activeIndex ? 'active' : ''}`}
              animate={idx === activeIndex ? { scale: 1.05, color: '#b3406c' } : {}}
              transition={{ duration: 0.2 }}
              onClick={() => handleLyricClick(lyric.time)}
            >
              {lyric.text}
            </motion.div>
          ))}
        </div>

        {/* Pemutar audio (SEKARANG DI SINI) */}
        <div className="audio-controls">
          <audio ref={audioRef} src="/happiness.mp3" preload="auto" />
          <button onClick={togglePlay} className="play-button">
            {isPlaying ? '⏸️ Pause' : '▶️ Putar Lagu'}
          </button>
        </div>

        {/* ✨ MAKNA LAGU INI UNTUKMU ✨ (interpretasi umum) */}
        <div className="meaning-section">
          <h3 className="meaning-title">✨ makna lagu ini untukmu ✨</h3>
          <div className="meaning-content">
            <p>
              "Happiness" itu bukan lagu tentang kebahagiaan yang sempurna, tapi tentang 
              <strong> penerimaan</strong>. Tentang bagaimana kita bisa tetap dicintai 
              meskipun punya banyak kekurangan, meskipun kadang egois, meskipun gak selalu 
              punya kabar baik.
            </p>
            <p>
              <em>"Will you still love me when nobody wants me around?"</em> – itu pertanyaan 
              yang paling dalam. Dan aku harap kamu tahu, <strong>jawabannya selalu iya</strong>.
            </p>
            <p>
              Lagu ini mengingatkanku bahwa kebahagiaan itu sederhana: diterima apa adanya, 
              dan tetap dipilih meskipun banyak versi buruk dari diri kita.
            </p>
          </div>
        </div>

        {/* — KENAPA LAGU INI? — (cerita personal) */}
        <div className="meaning-section">
          <h3 className="meaning-title">— kenapa lagu ini —</h3>
          <div className="meaning-content">
            <p>
              Jujur, pertama kali denger lagu ini, nggak langsung kepikiran kamu. Awalnya ya karena nada nya yang enak aja di telinga, musiknya anget, santai. Lama-lama, pas liriknya kedengeran lebih jelas, aku mulai ngerasa ada beberapa bagian yang—yah, <em>relate</em> aja gitu sama apa yang lagi aku rasain.
            </p>
            <p>
              Mungkin karena dari obrolan kita yang lebih sering lewat chat, atau kadang (walau jarang) pas main game sambil telponan, mulai keluar hal-hal yang ternyata <strong>ada beberapa hal yang mirip</strong>. Ngga usah dicari, tapi kerasa dengan sendirinya. Dari situ, tanpa sadar aku jadi nyaman. Nyaman karena obrolannya mengalir, nggak perlu takut salah ngomong.
            </p>
            <p>
              Lagian hubungan kita juga belum terlalu lama, jadi ya wajar kalau masih banyak yang belum saling tau. Tapi justru dari sini, aku mulai ngeliat hal-hal kecil yang bikin kamu... kamu. Cara kamu nunjukin perhatian, suka baca buku, atau gimana kamu ngerespon sesuatu. Rasanya... hangat.
            </p>
            <p>
              Dan soal lagu ini, banyak orang bilang ini lagu tentang janji cinta. Tapi buat aku, justru bagian yang paling nyentrik adalah pertanyaan di tengah lagunya: <em>"Will you still love me when nobody wants me around?"</em>. Itu bukan janji, itu kerentanan. Tentang gimana kita tetap mau diterima, bahkan di versi terburuk kita. Dan aku rasa, kamu ngajarin aku itu—kalau nggak perlu jadi siapa-siapa buat bisa dihargai.
            </p>
            <p><strong>Dan soal harapan...</strong></p>
            <p>
              Aku harap kamu sembuh total (buat apa pun yang lagi kamu lawan). Aku harap kamu selalu dikelilingi orang-orang yang baik, yang jagain kamu, yang ngertiin kamu. Aku harap kamu nemu hal-hal yang bikin kamu tenang. Kalau pun suatu saat kamu nemu yang lebih baik dari aku, aku bakal lega—bukan karena aku nggak mau berjuang, tapi karena kamu pantas dapet yang terbaik, meskipun itu bukan aku.
            </p>
            <p>
              Dan kalau hidup ini keras, yang pasti emang keras, aku cuma harap kamu cukup kuat buat ngadepinnya. Karena kamu layak buat bahagia, di versi kamu sendiri.
            </p>
            <p className="meaning-signature">
              — dari seseorang yang cukup beruntung bisa kenal kamu.
            </p>
          </div>
        </div>

        {/* Pesan kecil (opsional, bisa dihapus jika terlalu penuh) */}
        <div className="personal-message">
          <p>Untuk Fira, semoga lagu ini menemani harimu. </p>
        </div>
      </div>
    </motion.div>
  );
};

export default HappinessPage;