const jwt = require('jsonwebtoken');
const accessTokenSecret = "example";

module.exports = (req, res, next )=>{
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, accessTokenSecret, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }

            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};
//     try{
//         const authHeader = req.headers.authorization;
        
//         if( authHeader ){
            
//                 const jwtToken = authHeader.split(' ')[1];
//                 console.log(jwtToken);
//                 const user = jwt.verify(jwtToken, accessTokenSecret);
//                 console.log(user);
//                 next();
//             }
//         else{
//             // possible redirect
//             res.sendStatus(403);
//         }
//     }
//     catch(err){
//          res.sendStatus( 403 );
//     }
  
//     next();
// }

