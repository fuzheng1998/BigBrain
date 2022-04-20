import React from 'react';
import PropTypes from 'prop-types'

function MediaDisplay ({ mediaType, youtubeCode, image }) {
  if (mediaType === 'video') {
    return (
      <iframe
        style={{ flexGrow: 1, border: 'none', margin: 0, padding: 0, }}
        title='Youtube player'
        sandbox='allow-same-origin allow-forms allow-popups allow-scripts allow-presentation'
        src={`https://www.youtube.com/embed/${youtubeCode}`}
        allowFullScreen>

      </iframe>
    );
  } else {
    return <></>;
  }
}

MediaDisplay.propTypes = {
  mediaType: PropTypes.string,
  youtubeCode: PropTypes.string,
  image: PropTypes.string
}

export default MediaDisplay;
