import axios from 'axios';


export const upRank = (user) =>
  axios.put('/newRank',user)
  .then(function (res) {
    return res;
  })