import express from 'express';
import repoActivity from 'repo-activity';

const TIME_OUT_DURATION = 8000;
const router = express.Router();

router.get('/:user/:repo', (req, res, next) => {
  const resultPromise = repoActivity(`${req.params.user}/${req.params.repo}`);

  const timeoutPromise = new Promise((resolve, reject) => {
    setTimeout(() => reject(new Error('Response from Github timed out')), TIME_OUT_DURATION);
  });

  Promise.race([resultPromise, timeoutPromise])
    .then((dateTime) => {
      const date = dateTime.slice(0, 10);
      const svgResult = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="154" height="20">
        <linearGradient id="b" x2="0" y2="100%">
          <stop offset="0" stop-color="#bbb" stop-opacity=".1"/>
          <stop offset="1" stop-opacity=".1"/>
        </linearGradient>
        <clipPath id="a">
        <rect width="154" height="20" rx="3" fill="#fff"/>
        </clipPath>
        <g clip-path="url(#a)">
          <path fill="#555" d="M0 0h79v20H0z"/>
          <path fill="#007ec6" d="M79 0h83v20H79z"/>
          <path fill="url(#b)" d="M0 0h162v20H0z"/>
        </g>
        <g fill="#fff" text-anchor="middle" font-family="DejaVu Sans,Verdana,Geneva,sans-serif" font-size="110">
          <text x="405" y="150" fill="#010101" fill-opacity=".3" transform="scale(.1)" textLength="690">Last Commit</text>
          <text x="405" y="140" transform="scale(.1)" textLength="690">Last Commit</text>
          <text x="1155" y="150" fill="#010101" fill-opacity=".3" transform="scale(.1)" textLength="650">${date}</text>
          <text x="1155" y="140" transform="scale(.1)" textLength="650">${date}</text>
        </g>
      </svg>`;
      res.type('svg').send(svgResult);
    })
    .catch((err) => {
      if (err.message === '404 Not Found') {
        return res.status(404).end();
      } else if (err.message.includes('Invalid Argument')) {
        return res.status(400).end();
      }
      return next(err);
    });
});

export default router;
