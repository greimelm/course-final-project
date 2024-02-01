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
  loading: null,
  error: null,
  token: null,
  decodedToken: null,
  login: null,
  password: null,
  success: false
};

const SECONDS_TO_RELOGIN = 30;

const useStore = create((set, get) => ({
  ...initialState,
  checkToken: () => {
    // wenn user object vorhanden ist dann prüfen, ob der Token noch gültig ist
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

    // Stammdaten vom angemeldeten Benutzer holen
    fetchAPI({ url: HOST + '/users/' + decodedToken.id })
      .then((response) => {
        // Stammdaten als "user" speichern
        set({ userObj: response.data });
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

  userlogin: (login, password) => {
    // bekommt Daten aus einer Maske über Parameter
    set({ loading: true, error: null, user: null });

    // Login im Backend versuchen
    fetchAPI({ url: HOST + '/users/login', method: 'post', data: { login, password } })
      .then((response) => {
        // reponse.data = Token, Statuscode = 200
        console.log(response);
        

        if (response.status !== 200) {
          // selbst einen Fehler erzeugen
          throw new Error('Invalid status code');
        }

        // Token decoden, ID rauslesen
        // https://www.npmjs.com/package/jwt-decode
        const token = response.data;
        const decodedToken = jwtDecode(token);
        console.log(decodedToken);
        set({ token, decodedToken, login, password });

        // Token in localeStorage schreiben
        localStorage.setItem('token', token);

        // Stammdaten vom angemeldeten Benutzer holen
        return fetchAPI({ url: HOST + '/users/' + decodedToken.id });
      })
      .then((response) => {
        // Stammdaten als "user" speichern
        set({ userObj: response.data });
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

  signup: (data) => {
    // bekommt Daten aus einer Maske über Parameter
    set({ loading: true, error: null, newUser: null });

    // Neuregistrierung im Backend versuchen
    fetchAPI({ url: HOST + '/users/signup', method: 'post', data })
      .then((response) => {
        // reponse.data = der neue Member, Statuscode = 201
        if (response.status === 200) {
          set({ newUser: response.data });
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

  logout: () => {
    localStorage.removeItem('token');
    set({ ...initialState });
  },

  editProfile: (data) => {
    // bekommt Daten aus einer Maske über Parameter
    set({ loading: true, error: null, success: false });

    // Neuregistrierung im Backend versuchen
    fetchAPI({
      url: HOST + '/users/' + get().userObj._id,
      method: 'patch',
      data,
      token: get().token,
    })
      .then((response) => {
        // reponse.data = der neue User, Statuscode = 201
        if (response.status === 200) {
          set({ userObj: response.data, success: true });
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

  changePassword: (oldPassword, newPassword) => {
    // bekommt Daten aus einer Maske über Parameter
    set({ loading: true, error: null, success: false });

    // Passwort ändern im Backend versuchen
    fetchAPI({
      url: HOST + '/users/change-password',
      method: 'patch',
      data: { oldPassword, newPassword },
      token: get().token,
    })
      .then((response) => {
        // reponse.data = der neue Member, Statuscode = 200
        if (response.status === 200) {
          set({ success: true });
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
//   
// ab hier weiter ausbessern
// 

  // setVisit: (targetMember) => {
  //   // Reset
  //   set({ loading: true, error: null, success: false });

  //   // Schnittstelle mit Post aufrufen
  //   fetchAPI({
  //     url: HOST + '/visits',
  //     method: 'post',
  //     data: { targetMember, visitor: get().user._id },
  //     token: get().token,
  //   })
  //     .then((response) => {
  //       // reponse.data = der neue Member, Statuscode = 200
  //       if (response.status === 200) {
  //         set({ success: true });
  //       } else {
  //         throw new Error('Vom Server kam was komisches');
  //       }
  //     })
  //     .catch((error) => {
  //       // console.log('ich bin in catch', error);
  //       set({ error });
  //     })
  //     .finally(() => {
  //       // Laden der Daten beendet
  //       set({ loading: false });
  //     });
  // },

  // getOneUser: (id) => {
  //   // Reset
  //   set({ loading: true, error: null, success: false, selectedMember: null });

  //   // Schnittstelle mit Post aufrufen
  //   fetchAPI({
  //     url: HOST + '/users/' + id,
  //   })
  //     .then((response) => {
  //       // reponse.data = der neue Member, Statuscode = 200
  //       if (response.status === 200) {
  //         set({ success: true, selectedMember: response.data });
  //       } else {
  //         throw new Error('Vom Server kam was komisches');
  //       }
  //     })
  //     .catch((error) => {
  //       // console.log('ich bin in catch', error);
  //       set({ error });
  //     })
  //     .finally(() => {
  //       // Laden der Daten beendet
  //       set({ loading: false });
  //     });
  // },

  // addFavorite: (targetMember) => {
  //   // Reset
  //   set({ loading: true, error: null, success: false });

  //   // Schnittstelle mit Post aufrufen
  //   fetchAPI({
  //     url: HOST + '/favorites/' + get().user._id + '/' + targetMember,
  //     method: 'post',
  //     token: get().token,
  //   })
  //     .then((response) => {
  //       // reponse.data = der neue Member, Statuscode = 200
  //       if (response.status === 200) {
  //         set({ success: true, user: response.data });
  //       } else {
  //         throw new Error('Vom Server kam was komisches');
  //       }
  //     })
  //     .catch((error) => {
  //       // console.log('ich bin in catch', error);
  //       set({ error });
  //     })
  //     .finally(() => {
  //       // Laden der Daten beendet
  //       set({ loading: false });
  //     });
  // },

  // removeFavorite: (targetMember) => {
  //   // Reset
  //   set({ loading: true, error: null, success: false });

  //   // Schnittstelle mit Post aufrufen
  //   fetchAPI({
  //     url: HOST + '/favorites/' + get().user._id + '/' + targetMember,
  //     method: 'delete',
  //     token: get().token,
  //   })
  //     .then((response) => {
  //       // reponse.data = der neue Member, Statuscode = 200
  //       if (response.status === 200) {
  //         set({ success: true, user: response.data });
  //       } else {
  //         throw new Error('Vom Server kam was komisches');
  //       }
  //     })
  //     .catch((error) => {
  //       // console.log('ich bin in catch', error);
  //       set({ error });
  //     })
  //     .finally(() => {
  //       // Laden der Daten beendet
  //       set({ loading: false });
  //     });
  // },


  // deleteUser: () => {
  //   // Reset
  //   set({ loading: true, error: null, success: false });

  //   // Schnittstelle mit Post aufrufen
  //   fetchAPI({
  //     url: HOST + '/users/' + get().userObj._id,
  //     method: 'delete',
  //     token: get().token,
  //   })
  //     .then((response) => {
  //       // reponse.data = der neue Member, Statuscode = 200
  //       if (response.status === 200) {
  //         set({ success: true });
  //         get().logout();
  //       } else {
  //         throw new Error('Vom Server kam was komisches');
  //       }
  //     })
  //     .catch((error) => {
  //       // console.log('ich bin in catch', error);
  //       set({ error });
  //     })
  //     .finally(() => {
  //       // Laden der Daten beendet
  //       set({ loading: false });
  //     });
  // }


}));

export default useStore;