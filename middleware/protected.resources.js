const Anime = require ("../models/Anime.model")
//​const {getTokenFromHeaders} = require("./jwt/middleware")

function parseJwt (token) {
    return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
}

const isAdmin = async function(req, res, next) {
    try {
/*      const { animeId } = req.params;
      const anime = await Anime.findById(animeId);*/
      const jwt = getTokenFromHeaders(req)
      console.log(jwt)
      const data = parseJwt(jwt)
      console.log(data)
      const typeOfUser = data.typeOfUser
/*
      if (!anime) {
        return res.status(404).json({ message: "Anime not found" });
      }
      console.log('payload', req.payload);
      console.log('anime', anime);
      */
      
      if (typeOfUser !== "admin") {
        return res.status(403).json({ message: "Permission denied" });
      }
      next();
    } catch (error) {
      console.error("Error in isOwner middleware:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
  
  function getTokenFromHeaders(req) {
    // Check if the token is available on the request Headers
   console.log("I'm here", req.headers.authorization)
    if (
      req.headers.authorization &&
      req.headers.authorization.split(" ")[0] === "Bearer"
    ) {
      // Get the encoded token string and return it
      const token = req.headers.authorization.split(" ")[1];
      return token;
    }
  
    return null;
  }
  module.exports = isAdmin;