import { motion, AnimatePresence } from 'framer-motion';
import { FiMail } from 'react-icons/fi';

const CardLagu = ({ lagu, index, isOpened, onOpen }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className="card-container"
    >
      <AnimatePresence mode="wait">
        {!isOpened ? (
          <motion.div
            key="closed"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="card closed-card"
            onClick={onOpen}
            whileHover={{ scale: 1.02, boxShadow: "0 20px 30px -10px rgba(180, 60, 100, 0.3)" }}
          >
            <FiMail className="closed-icon" />
            <p className="closed-text">
              {index === 0 ? 'Surat Pertama' : index === 1 ? 'Surat Kedua' : 'Surat Ketiga'}
            </p>
            <small className="closed-hint">Klik untuk membuka</small>
          </motion.div>
        ) : (
          <motion.div
            key="opened"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="card opened-card"
          >
            <div className="card-header">
              {lagu.thumbnail ? (
                <img src={lagu.thumbnail} alt="cover" className="thumbnail" />
              ) : (
                <div className="thumbnail-placeholder">
                  <span>🎵</span>
                </div>
              )}
              <div className="title-artist">
                <h3>{lagu.title} – {lagu.artist}</h3>
                <p className="to">untuk {lagu.to}</p>
              </div>
              <FiMail className="mail-icon" />
            </div>
            <p className="message">{lagu.message}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default CardLagu;