import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

function MediaDisplay({ mediaType, youtubeCode, image }) {
  if (mediaType == "video") {
    return (
      <iframe
        style={{ 'flexGrow': 1, 'border': 'none', 'margin': 0, 'padding': 0, }}
        title='Youtube player'
        sandbox='allow-same-origin allow-forms allow-popups allow-scripts allow-presentation'
        src={`https://www.youtube.com/embed/${youtubeCode}`}
        allowFullScreen>

      </iframe>
    );
  }
  else {
    return <></>;
  }

}


export default MediaDisplay;