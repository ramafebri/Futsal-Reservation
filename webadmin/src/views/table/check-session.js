import {DOMAIN_URL} from '../../config/env'
export default function checkSession(){
    const admin_id = localStorage.getItem("admin_id");
    if(admin_id === null){
      window.location.href = DOMAIN_URL+'login';
    }
}

