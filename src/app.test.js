import request from 'supertest';
import app from './app';

describe('app', () => {
  it('responds 200 to a valid request', () => {
    return request(app).get('/v1/userX/repo-2000-02-03')
      .then((response) => {
        expect(response.statusCode).toBe(200);
      });
  });

  describe('response headers', () => {
    it('sets the content-type to svg', () => {
      return request(app).get('/v1/userX/repo-2000-02-03')
        .then((response) => {
          expect(response.headers['content-type']).toContain('image/svg+xml');
        });
    });

    it('sets the cache-control header to not cache', () => {
      return request(app).get('/v1/userX/repo-2000-02-03')
        .then((response) => {
          expect(response.headers['cache-control']).toBe('no-cache, no-store, must-revalidate');
        });
    });

    it('sets the pragma header to no-cache', () => {
      return request(app).get('/v1/userX/repo-2000-02-03')
        .then((response) => {
          expect(response.headers.pragma).toBe('no-cache');
        });
    });

    it('sets the expires header to -1', () => {
      return request(app).get('/v1/userX/repo-2000-02-03')
        .then((response) => {
          expect(response.headers.expires).toBe('-1');
        });
    });
  });

  it('responds with a svg graphic', () => {
    return request(app).get('/v1/userX/repo-2000-02-03')
      .then((response) => {
        const svg = response.body.toString();
        expect(svg.trim().match(/^<svg[\s\S]+<\/svg>$/)).not.toBeNull();
      });
  });

  it('it\'s response contains the date returned from userX/repo-2000-02-03', () => {
    return request(app).get('/v1/userX/repo-2000-02-03')
      .then((response) => {
        const svg = response.body.toString();
        expect(svg.match(/<text.*>2000-02-03<\/text>/)).not.toBeNull();
      });
  });

  it('it\'s response contains the date returned from userY/repo-2001-05-06', () => {
    return request(app).get('/v1/userY/repo-2001-05-06')
      .then((response) => {
        const svg = response.body.toString();
        expect(svg.match(/<text.*>2001-05-06<\/text>/)).not.toBeNull();
        expect(svg.match(/<text.*>2000-02-03<\/text>/)).toBeNull();
      });
  });

  it('responds 404 to a non existing repo', () => {
    return request(app).get('/v1/xxxx/repo-2000-02-03')
      .then((response) => {
        expect(response.status).toBe(404);
      });
  });

  it('responds 403 to an improper github username', () => {
    return request(app).get('/v1/a^b_c/repo')
      .then((response) => {
        expect(response.status).toBe(400);
      });
  });

  it('responds 403 to an improper github username', () => {
    return request(app).get('/v1/userX/a@bc')
      .then((response) => {
        expect(response.status).toBe(400);
      });
  });

  it('responds 404 when there is no repository in the url', () => {
    return request(app).get('/v1/userX')
      .then((response) => {
        expect(response.status).toBe(404);
      });
  });

  it('responds 404 when /v1/ does not precede the user and repo in the url', () => {
    return request(app).get('/userX/repoY')
      .then((response) => {
        expect(response.status).toBe(404);
      });
  });

  it('responds 404 when requesting the root document', () => {
    return request(app).get('/')
      .then((response) => {
        expect(response.status).toBe(404);
      });
  });

  // // The following test requires waiting for a timeout so is not usually run
  // it('Will timeout and reply with 500 if the promise from repo-activity does not settle', () => {
  //   jest.setTimeout(20000);
  //   return request(app).get('/v1/timeout/timeout')
  //     .then((response) => {
  //       expect(response.statusCode).toBe(500);
  //     });
  // });
});
