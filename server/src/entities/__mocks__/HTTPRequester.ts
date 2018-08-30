import { of } from 'rxjs';

const nestedPipeObject = {
  pipe: () => {
    return {
      pipe: () => {}
    };
  }
};

class HTTPRequester {
  get(requestURL: string) {
    return nestedPipeObject;
  }

  getAll(requestURLS: string[]) {
    return nestedPipeObject;
  }
}

export default HTTPRequester;
