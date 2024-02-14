import { create } from 'zustand';
import { jwtDecode } from 'jwt-decode';

import { fetchAPI } from '../utils/index.js';

import { HOST } from '../utils/constants.js';

// 
// check all comments & responses
// 
const initialState = {
  newUser: null,
  userObj: null,
  newLocation: null,
  locationObj: null,
  loading: null,
  error: null,
  token: null,
  decodedToken: null,
  login: null,
  password: null,
  success: false,
  categoryArr: [],
  city: null,
  tourName: null,
  toursArr: []
};

const SECONDS_TO_RELOGIN = 30;

const useStore = create((set, get) => ({
  ...initialState,
  checkToken: () => {
    // if there's a user object, check if the token is still viable
    if (get().userObj) {
      if (get().decodedToken.exp - +new Date() / 1000 < SECONDS_TO_RELOGIN) {
        if (get().login && get().password) {
          return get().signin(get().login, get().password);
        }
        return get().logout();
      }
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      return;
    }

    const decodedToken = jwtDecode(token);
    set({ token, decodedToken });

    // api call to backend
    fetchAPI({ url: HOST + '/users/' + decodedToken.id })
      .then((response) => {
        
        set({ userObj: response.data });
      })
      .catch((error) => {
        set({ error });
      })
      .finally(() => {
        set({ loading: false });
      });
  },

  userlogin: (login, password) => {

    set({ loading: true, error: null, userObj: null });

    fetchAPI({ url: HOST + '/users/login', method: 'post', data: { login, password } })
      .then((response) => {
      
        if (response.status !== 200) {
          // selbst einen Fehler erzeugen
          throw new Error('Invalid status code');
        }

        // decode token, get ID
        // https://www.npmjs.com/package/jwt-decode
        const token = response.data;
        const decodedToken = jwtDecode(token);
        console.log(decodedToken);
        set({ token, decodedToken, login, password });

        // save token in local storage
        localStorage.setItem('token', token);

        // fetch user
        return fetchAPI({ url: HOST + '/users/' + decodedToken.id });
      })
      .then((response) => {
        // save response data as user object in store
        set({ userObj: response.data });
      })
      .catch((error) => {
        set({ error });
      })
      .finally(() => {  
        set({ loading: false });
      });
  },

  usersignup: (data) => {
    set({ loading: true, error: null, newUser: null });

    fetchAPI({ url: HOST + '/users/signup', method: 'post', data })
      .then((response) => {
        if (response.status === 200) {
          set({ newUser: response.data});
        } else {
          throw new Error('Vom Server kam was komisches');
        }
      })
      .catch((error) => {
        set({ error });
      })
      .finally(() => {
        set({ loading: false });
      });
  },

  logout: () => {
    localStorage.removeItem('token');
    set({ ...initialState });
  },

  editProfile: (data) => {
    set({ loading: true, error: null, success: false });

    // set ID in params
    fetchAPI({
      url: HOST + '/users/edit/' + get().userObj._id,
      method: 'patch',
      data,
      token: get().token,
    })
      .then((response) => {
        if (response.status === 200) {
          set({ userObj: response.data, success: true });
        } else {
          throw new Error('Vom Server kam was komisches');
        }
      })
      .catch((error) => {
        set({ error });
      })
      .finally(() => {
        set({ loading: false });
      });
  },

  changePassword: (oldPassword, newPassword) => {
  
    set({ loading: true, error: null, success: false });

    fetchAPI({
      url: HOST + '/users/change-password',
      method: 'patch',
      data: { oldPassword, newPassword },
      token: get().token,
    })
      .then((response) => {
       
        if (response.status === 200) {
          set({ success: true });
        } else {
          throw new Error('Vom Server kam was komisches');
        }
      })
      .catch((error) => {
        set({ error });
      })
      .finally(() => {
        set({ loading: false });
      });
  },

  deleteUser: () => {
    set({ loading: true, error: null, success: false });

    fetchAPI({
      url: HOST + '/users/' + get().userObj._id,
      method: 'delete',
      token: get().token,
    })
      .then((response) => {
        if (response.status === 200) {
          set({ success: true });
          get().logout();
        } else {
          throw new Error('Vom Server kam was komisches');
        }
      })
      .catch((error) => {
        set({ error });
      })
      .finally(() => {
        set({ loading: false });
      });
  },

  locationsignup: (data) => {
    set({ loading: true, error: null, newLocation: null });

    // sign up location only as logged in user
    fetchAPI({ url: HOST + '/locations/signup', method: 'post', data, token: get().token })
      .then((response) => {
     
        if (response.status === 200) {
          set({ newLocation: response.data});
        } else {
          throw new Error('Vom Server kam was komisches');
        }
      })
      .catch((error) => {
        set({ error });
      })
      .finally(() => {
        set({ loading: false });
      });
  },

  getlocation: (locationId) => {
    set({ loading: true, error: null, locationObj: null});

    fetchAPI({ url: HOST + '/locations/' + locationId})
    .then((response) => {
      if (response.status === 200) {
        set({ newLocation: response.data});
      } else {
        throw new Error('Vom Server kam was komisches');
      }
    })
    .catch((error) => {
      set({ error });
    })
    .finally(() => {
      set({ loading: false });
    })
  },


  generatetour: (data) => {
    set({ loading: true, error: null, success: false });

    fetchAPI({
      url: HOST + '/generate-tour',
      data
    })
      .then((response) => {
        if (response.status === 200) {
          set({ success: true, toursArr: response.data });
        } else {
          throw new Error('Vom Server kam was komisches');
        }
      })
      .catch((error) => {
        // console.log('ich bin in catch', error);
        set({ error });
      })
      .finally(() => {
        // Laden der Daten beendet
        set({ loading: false });
      });
  },

  setcategories: (categoryArr) => {
    set({ categoryArr });
  },

  clearerror: () => {
    set({ error: null });
  },

  remembertourname: (tourName) => {
    set({ tourName });
  },

  addFavLocation: (locationId) => {
    set({ loading: true, error: null, success: false });
    fetchAPI({
      url: HOST + '/favlocations/' + get().userObj._id + '/' + locationId,
      method: 'post',
      token: get().token,
    })
      .then((response) => {
        // reponse.data = der neue Member, Statuscode = 200
        if (response.status === 200) {
          set({ success: true, userObj: response.data });
        } else {
          throw new Error('Vom Server kam was komisches');
        }
      })
      .catch((error) => {
        set({ error });
      })
      .finally(() => {
        // Laden der Daten beendet
        set({ loading: false });
      });
  },

  removeFavLocation: (locationId) => {
    set({ loading: true, error: null, success: false });

    fetchAPI({
      url: HOST + '/favlocations/' + get().userObj._id + '/' + locationId,
      method: 'delete',
      token: get().token,
    })
      .then((response) => {
        
        if (response.status === 200) {
          set({ success: true, userObj: response.data });
        } else {
          throw new Error('Vom Server kam was komisches');
        }
      })
      .catch((error) => {
        
        set({ error });
      })
      .finally(() => {
      
        set({ loading: false });
      });
  },


}));

export default useStore;