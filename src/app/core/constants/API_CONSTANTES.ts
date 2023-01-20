import {environment} from "../../../environments/environment";

export  abstract  class  API_CONSTANTES {

  private static BASE_URL = environment.apiUrl;

  //uris auth
  static readonly  URI_LOGIN = this.BASE_URL + 'login';
  static readonly URI_LOGOUT = this.BASE_URL +'logout';
  static readonly URI_REGISTER =  this.BASE_URL +'register';
  static readonly URI_USER = this.BASE_URL + 'user';

  //uris ressources
  static readonly URI_USERS = this.BASE_URL + 'users';
  static readonly URI_ROLES = this.BASE_URL + 'roles';
  static readonly URI_BECAME_CREATOR = this.BASE_URL + 'demands';
  static readonly URI_CREATORS = this.BASE_URL + 'creators';
  static readonly URI_CATEGORIES = this.BASE_URL + 'categories';
  static readonly URI_SUB_CATEGORIES = this.BASE_URL + 'sub_categories';
  static readonly URI_RETRAITS = this.BASE_URL + 'withdrawals';
  static readonly URI_DEMANDES_VIDEOS = this.BASE_URL + 'demand_videos';
  static readonly URI_OCCASIONS = this.BASE_URL + 'occasions';
  static readonly URI_TYPES_OCCASIONS = this.BASE_URL + 'occasion_types';
  static readonly URI_OPTIONS = this.BASE_URL + 'options';

  //storage key
  static  readonly  TOKEN_KEY = 'token';
  static  readonly  USER_KEY = 'user';


}
