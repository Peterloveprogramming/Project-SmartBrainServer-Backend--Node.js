
const returnRequestOptions = (imgURL) =>{
 // Your PAT (Personal Access Token) can be found in the portal under Authentification
    const PAT = '584ebe1f61ee4693aec34917551f3af9';
    // Specify the correct user_id/app_id pairings
    // Since you're making inferences outside your app's scope
    const USER_ID = '6dn2dyc8uf0g';       
    const APP_ID = 'Testing123';
    // Change these to whatever model and image URL you want to use
    const MODEL_ID = 'face-detection'; 
    const IMAGE_URL = imgURL;

    ///////////////////////////////////////////////////////////////////////////////////
    // YOU DO NOT NEED TO CHANGE ANYTHING BELOW THIS LINE TO RUN THIS EXAMPLE
    ///////////////////////////////////////////////////////////////////////////////////

    const raw = JSON.stringify({
        "user_app_id": {
            "user_id": USER_ID,
            "app_id": APP_ID
        },
        "inputs": [
            {
                "data": {
                    "image": {
                        "url": IMAGE_URL
                    }
                }
            }
        ]
    });

    const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Key ' + PAT
        },
        body: raw
    };
    return requestOptions
}




const APIhandler = (req,res) =>{
        console.log(req.body)
        fetch("https://api.clarifai.com/v2/models/" + 'face-detection' + "/versions/" + 'fe995da8cb73490f8556416ecf25cea3' + "/outputs", returnRequestOptions(req.body.input))
        .then(response => response.json())
        .then(data =>{
            res.json(data)
        })
        .catch(err => res.status(400).json("unable to work with API"))

}


const imageHandler = (req,res,db)=>{
    const {id} = req.body
    db('users')
  .where('id', '=', id)
  .increment(
    'entries',1
  )
  .returning('entries')
  .then(entries=>{
    res.json(entries[0].entries);
  })
  .catch(err => res.status(400).json("Unable to get entries"))
}

module.exports = {
    imageHandler:imageHandler,
    APIhandler:APIhandler
}