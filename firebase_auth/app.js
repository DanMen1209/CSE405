(function() {
	const firebaseConfig = {
    apiKey: "AIzaSyAE5dBYMeBu3yB61qvxG7rFHhP98vgknHQ",
    authDomain: "fir-auth-tutorial-d1078.firebaseapp.com",
    databaseURL: "https://fir-auth-tutorial-d1078.firebaseio.com",
    projectId: "fir-auth-tutorial-d1078",
    storageBucket: "fir-auth-tutorial-d1078.appspot.com",
    messagingSenderId: "625358488951",
    appId: "1:625358488951:web:c78fae570a6b57f2064d72",
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
	
	// Get Elements
	const txtEmail = document.getElementById('txtEmail');
	const txtPassword = document.getElementById('txtPassword');
	const btnLogin = document.getElementById('btnLogin');
	const btnSignUp = document.getElementById('btnSignUp');
	const btnLogout = document.getElementById('btnLogout');
	
	// Add login event
	btnLogin.addEventListener('click', e => {
		// Get email and pass
		const email= txtEmail.value;
		const pass = txtPassword.value;
		const auth = firebase.auth();
		// Sign in
		const promise = auth.signInWithEmailAndPassword(email,pass);
		promise.catch(e => console.log(e.message));
	})
	
	// Add signup event
	btnSignUp.addEventListener('click', e => {
		// Get email and pass
		//todo check for real email
		const email= txtEmail.value;
		const pass = txtPassword.value;
		const auth = firebase.auth();
		// Sign in
		const promise = auth.createUserWithEmailAndPassword(email,pass);
		promise.catch(e => console.log(e.message));
	})
		
	
	btnLogout.addEventListener('click', e => {
		firebase.auth().signOut();
	})
	
	//Add real time listener
	firebase.auth().onAuthStateChanged(firebaseUser => {
		if(firebaseUser) {
			console.log(firebaseUser);
			btnLogout.classList.remove('hide');
		} else
			console.log('not logged in');
			btnLogout.classList.add('hide');
	})
	
})