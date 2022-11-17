<script>
	import { signInWithEmailAndPassword } from "firebase/auth";
	import {auth} from '$lib/firebase';
	import { goto } from '$app/navigation';
  import { user } from "$lib/store/user";

	
	let email='';
	let password='';
	let userData;
  let errorCode="",errorMessage=""


  import { FacebookAuthProvider, signInWithPopup, GoogleAuthProvider,TwitterAuthProvider } from "firebase/auth";

    function signupWithTwitter() {
        const provider = new TwitterAuthProvider();

        signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
            // You can use these server side with your app's credentials to access the Twitter API.
            const credential = TwitterAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const secret = credential.secret;

            // The signed-in user info.
            const user = result.user;
            goto("/",{replaceState:true})
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = TwitterAuthProvider.credentialFromError(error);
            // ...
        });
    }
    function signupWithGoogle() {

        // const auth = getAuth();
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const userData = result.user;
            goto("/",{replaceState:true})
            // ...
        }).catch((error) => {
            // Handle Errors here.
            errorCode = error.code;
            errorMessage = error.message;
            const email = error.customData.email;
            if (error.message=="Firebase: Error (auth/email-already-in-use).") {
                errorMessage=`The user with email:${email} used by this google account already exist`
            }
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        });
    }
    function signupWithFacebook(){
        const provider = new FacebookAuthProvider();
        signInWithPopup(auth, provider)
        .then((result) => {
            // The signed-in user info.
            const user = result.user;

            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            const credential = FacebookAuthProvider.credentialFromResult(result);
            const accessToken = credential.accessToken;

            goto(`/`, { replaceState:true }) 
        })
        .catch((error) => {
            // console.log(error)
            // Handle Errors here.
            errorCode = error.code;
            errorMessage = error.message;
            const email = error.customData.email;
            if (error.message=="Firebase: Error (auth/email-already-in-use).") {
                errorMessage=`The user with email:${email} used by this facebook account already exist`
            }
            if (error.message=="Firebase: Error (auth/account-exists-with-different-credential).") {
                errorMessage=`The user with email:${email} used by this facebook account already exist`
            }
            // The email of the user's account used.
            // The AuthCredential type that was used.
            const credential = FacebookAuthProvider.credentialFromError(error);

            // ...
        });
    }

	// const auth = getAuth();
	function signin(){
		signInWithEmailAndPassword(auth, email, password)
		.then((userCredential) => {
			// Signed in 
			userData = userCredential.user;
			goto(`/`, { replaceState:true }) 
			// ...
      user.set(userData)
		})
		.catch((error) => {
			const errorCode = error.code;
			const errorMessage = error.message;
		});
	}
</script>
  



<svelte:head>
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

</svelte:head>


<div class="flex flex-wrap">
  <div class="container">
    <form on:submit|preventDefault={signin}>
      <div class="row">
        <h2 style="text-align:center">Login with Social Media or (Password and email)</h2>
        <div class="vl">
          <span class="vl-innertext">or</span>
        </div>
  
        <div class="col">
          <a on:click={signupWithFacebook} class="fb btn">
            <i class="fa fa-facebook fa-fw"></i> Login with Facebook
           </a>
          <a on:click={signupWithTwitter} class="twitter btn">
            <i class="fa fa-twitter fa-fw"></i> Login with Twitter
          </a>
          <a on:click={signupWithGoogle} class="google btn"><i class="fa fa-google fa-fw">
            </i> Login with Google+
          </a>
        </div>
  
        <div class="col">
          <div class="hide-md-lg">
            <p>Or sign in manually:</p>
          </div>
  
          <input bind:value={email} type="email" id="email" placeholder="Enter email" name="email" required>
          <input bind:value={password} type="password" id="password" name="password" placeholder="Password" required>
          <input type="submit" value="Login">
        </div>
        
      </div>
    </form>
    <div color="red">{errorMessage}</div>
  </div>
</div>

<div class="bottom-container">
  <div class="row">
    <div class="col">
      <a href="/register" style="color:white" class="btn">Sign up</a>
    </div>
    <div class="col">
      <a href="/password-reset" style="color:white" class="btn">Forgot password?</a>
    </div>
  </div>
</div>






<style>
    .container {
      font-family: Arial, Helvetica, sans-serif;
    }
    
    * {
      box-sizing: border-box;
    }
    
    /* style the container */
    .container {
      position: relative;
      border-radius: 5px;
      /* background-color: #f2f2f2; */
      padding: 20px 0 30px 0;
    } 
    
    /* style inputs and link buttons */
    input,
    .btn {
      width: 100%;
      padding: 12px;
      border: none;
      border-radius: 4px;
      margin: 5px 0;
      opacity: 0.85;
      display: inline-block;
      font-size: 17px;
      line-height: 20px;
      text-decoration: none; /* remove underline from anchors */
    }
    
    input:hover,
    .btn:hover {
      opacity: 1;
    }
    input,p{
      color: rgb(31, 29, 29);
    }
    /* add appropriate colors to fb, twitter and google buttons */
    .fb {
      background-color: #3B5998;
      color: white;
    }
    
    .twitter {
      background-color: #55ACEE;
      color: white;
    }
    
    .google {
      background-color: #dd4b39;
      color: white;
    }
    
    /* style the submit button */
    input[type=submit] {
      background-color: #04AA6D;
      color: rgb(255, 255, 255);
      cursor: pointer;
    }
    
    input[type=submit]:hover {
      background-color: #45a049;
    }
    
    /* Two-column layout */
    .col {
      float: left;
      width: 50%;
      margin: auto;
      padding: 0 50px;
      margin-top: 6px;
    }
    
    /* Clear floats after the columns */
    .row:after {
      content: "";
      display: table;
      clear: both;
    }
    
    /* vertical line */
    .vl {
      position: absolute;
      left: 50%;
      transform: translate(-50%);
      border: 2px solid #ddd;
      height: 175px;
    }
    
    /* text inside the vertical line */
    .vl-innertext {
      position: absolute;
      top: 50%;
      transform: translate(-50%, -50%);
      background-color: #f1f1f1;
      border: 1px solid #ccc;
      border-radius: 50%;
      padding: 8px 10px;
    }
    
    /* hide some text on medium and large screens */
    .hide-md-lg {
      display: none;
    }
    
    /* bottom container */
    .bottom-container {
      text-align: center;
      background-color: #666;
      border-radius: 0px 0px 4px 4px;
    }
    
    /* Responsive layout - when the screen is less than 650px wide, make the two columns stack on top of each other instead of next to each other */
    @media screen and (max-width: 650px) {
      .col {
        width: 100%;
        margin-top: 0;
      }
      /* hide the vertical line */
      .vl {
        display: none;
      }
      /* show the hidden text on small screens */
      .hide-md-lg {
        display: block;
        text-align: center;
      }
    }
</style>
    