fetch("https://jsonplaceholder.typicode.com/users")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);

    //Přidání nadpisu ROBOTS
    const heading = document.createElement("h1");
    heading.textContent = "ROBOTS";
    heading.classList.add("heading");
    document.body.appendChild(heading);

    // Vytvoření seznamu
    const createUserList = (users) => {
      const userList = document.createElement("div");
      userList.setAttribute("id", "cards");
      userList.classList.add("cards");
      //Vytváření elementů seznamu a přidání třídy
      users.forEach((user) => {
        const ul = document.createElement("ul");
        ul.classList.add("card");

        const img = document.createElement("img");
        img.classList.add("user-img");
        const name = document.createElement("li");

        const username = document.createElement("li");

        const email = document.createElement("li");

        const link = document.createElement("a");
        link.classList.add("link");
        const phone = document.createElement("li");

        const company = document.createElement("li");
        const position = document.createElement("li");

        //Přidání obrázku
        img.src = `https://robohash.org/${user.username}.png`;
        //Vypsání dat a obsahu

        name.textContent = `NAME: ${user.name}`;
        username.textContent = `USERNAME: ${user.username}`;
        phone.textContent = `PHONE: ${user.phone}`;
        email.textContent = `EMAIL: ${user.email}`;
        company.textContent = `COMPANY: ${user.company.name}`;
        position.textContent = `POSITION: ${user.company.catchPhrase}`;
        //link.href = user.website;
        link.textContent = `WEBSITE: ${(link.href = user.website)}`;

        ul.appendChild(img);
        ul.appendChild(name);
        ul.appendChild(username);
        ul.appendChild(phone);
        ul.appendChild(email);
        ul.appendChild(company);
        ul.appendChild(position);
        ul.appendChild(link);

        userList.appendChild(ul); //přidání seznamu do divu
      });

      return userList;
    };

    // přidání inputu  do HTML stránky

    document.body.appendChild(createUserList(data)); //volám funkci s daty

    const searchInput = document.createElement("input"); //vytvořím input element
    searchInput.classList.add("input"); //vytvořím mu třídu
    searchInput.setAttribute("type", "text"); //typ inputu
    searchInput.setAttribute("placeholder", "Search ..."); //přednastavený text inputu
    //Událost při psaní do inputu
    searchInput.addEventListener("input", () => {
      const searchTerm = searchInput.value.toLowerCase(); //převedení hodnoty v inputu na malá písmena
      //Filtrujeme z dat uživatelské jméno, které je shodné s obsahem inputu(searchTerm)
      const filteredUsers = data.filter((user) =>
        user.name.toLowerCase().includes(searchTerm)
      );

      const userList = document.getElementById("cards");
      //Vymazání všech elementů,které byli v userList
      userList.innerHTML = "";
      //Vytvoření nových elementů a přidává do userList(výsledek vyhledávání)
      userList.appendChild(createUserList(filteredUsers));
    });
    //Vložení inputu po nadpisu H1
    document.body.insertBefore(searchInput, heading.nextSibling);
  });
