const JwtCheck = () => {
  const cookeis = document.cookie;
  if (cookeis.includes("refresh_token")) {
    return true;
  } else false;
};

export default JwtCheck;
