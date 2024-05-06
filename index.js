  let selects = document.querySelectorAll("select");
  let fromDropdown = document.querySelector("#from");
  let toDropdown = document.querySelector("#to");
  let amount = document.querySelector("#amount");
  let msg = document.querySelector(".msg h3")


  //from country dropdown
  for (const country in countryList) {
    const option = document.createElement("option");
    option.value = country;
    option.text = country;
    fromDropdown.add(option);
  }

  //to country dropdown
  for (const country in countryList) {
    const option = document.createElement("option");
    option.value = country;
    option.text = country;
    toDropdown.add(option);
  }

  //All select value itrate
  for (const select of selects) {
    select.addEventListener("change",(e) =>{
      updateFlag(e.target);
    })
  }
  
  //seting default value
  fromDropdown.value = "USD";
  toDropdown.value = "BDT";
  amount.value = 1;

  //amount value handle if value is less equal 0
  const handleOnChange = () =>{
    if (amount.value <= 0) {
      amount.value = 1;
    }
  }
 
    //convert currency function
    const convertCurrency = async() =>{
      let fromCountry = fromDropdown.value;
      let toCountry = toDropdown.value;
      
      if (amount.value !=0 && amount.value > 0) {
        //currency converter url data fetching
        const url = `https://v6.exchangerate-api.com/v6/7f5b0ed3fc9b73b3e74272e9/latest/${fromCountry}`;
        const respons = await fetch(url);
        const data = await respons.json();

        let fromAmount = data.conversion_rates[fromCountry];
        let toAmount = data.conversion_rates[toCountry];
        
        let convertedAmount = (amount.value/fromAmount)*toAmount;

        msg.innerHTML = `${amount.value} <span class="fromC">${fromCountry}</span> = ${convertedAmount.toFixed(2)} <span class="toC"> ${toCountry}</span>`;
        
      }
      
    }


    //flag update function
  const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let flagSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = flagSrc;
  };
  
  //when click on the button then currency will be convert
  const convertButtonClick = () =>{
    convertCurrency();
  }
  
  //After loading the window currency convert section will be load and update
  window.addEventListener("load", () => {
    convertCurrency();
  });

  //swife function for left right value exchange
  const swife = () =>{
    let from = fromDropdown.value;
    let to = toDropdown.value;
    fromDropdown.value = to;
    toDropdown.value = from;
    updateFlag(fromDropdown)
    updateFlag(toDropdown)
    convertCurrency()
  }