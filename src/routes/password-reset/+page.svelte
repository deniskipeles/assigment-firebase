  
<script>
	let email=""
</script>

	

<form class="form-inline" on:submit|preventDefault={signin}>
    <label for="email">Email:</label>
    <input bind:value={email} type="email" id="email" placeholder="Enter email" name="email">
    <br/>
    <button type="submit">request password reset</button>
</form>
    <a href="/register">signup</a>


  





<style>
	form {font-family: Arial, Helvetica, sans-serif;}
	* {box-sizing: border-box;}
	
	.form-inline {  
	  display: flex;
	  flex-flow: row wrap;
	  align-items: center;
	}
	
	.form-inline label {
	  margin: 5px 10px 5px 0;
	}
	
	.form-inline input {
	  vertical-align: middle;
	  margin: 5px 10px 5px 0;
	  padding: 10px;
	  background-color: #fff;
	  border: 1px solid #ddd;
	}
	
	.form-inline button {
	  padding: 10px 20px;
	  background-color: dodgerblue;
	  border: 1px solid #ddd;
	  color: white;
	  cursor: pointer;
	}
	
	.form-inline button:hover {
	  background-color: royalblue;
	}
	
	@media (max-width: 800px) {
	  .form-inline input {
		margin: 10px 0;
	  }
	  
	  .form-inline {
		flex-direction: column;
		align-items: stretch;
	  }
	}
</style>
	