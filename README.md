Il progetto consiste nella realizzazione di un sistema informativo basato su un sito web chiamato GoGreen. <br>
Tale sistema è stato concepito per l'utente finale di un negozio che si occupa di vendita, riparazione e assistenza di monopattini e biciclette, e prevede la gestione del magazzino e degli ordini.
Per la realizzazione di GoGreen sono state impiegate diverse tecnologie, tra cui: <br>
  1. Keycloak versione 19.0.3, quest'ultimo suddivide i permessi in due tipologie: backend-user e backend-admin.<br> <br>
    1.1. Backend-user,consente l'autenticazione del cliente e l'accesso alla lista dei prodotti; (video 1.1) <br> <br>
    1.2. Backend-admin, consente l'autenticazione dell'amministratore, che ha accesso alle stesse funzionalità del backend-user ed in più ha il permesso di modificare la quantità degli ordini, nonché di inserire ed eliminare prodotti dal magazzino. (video 1.2) </br> <br>
  2. Angular, un framework utilizzato per la realizzazione della parte frontend del sistema informativo. <br> Angular viene utilizzato per la creazione di diversi componenti relativi sia alla parte informativa del sito (come ChiSiamo e DoveSiamo), sia per la gestione delle chiamate Rest verso il backend (tramite i componenti Products, Checkout, Cart, ecc.).
     La parte frontend del progetto si occupa inoltre di gestire la visualizzazione delle informazioni relative all'utente, come ad esempio lo storico degli ordini e il carrello. Inoltre, è prevista l'integrazione con Keycloak per la gestione dell'autenticazione e la visualizzazione dei relativi dati. <br> <br>
  3. Spring è il framework utilizzato per la gestione della parte backend del sistema informativo. Attraverso Spring, vengono implementate diverse funzionalità del sito, tra cui:<br> <br>
    3.1. La gestione del database, attraverso la libreria Spring Data, che consente l'interazione con il database tramite oggetti Java e le relative annotazioni. <br><br>
    3.2. L'implementazione dei servizi Rest per la comunicazione con il frontend, attraverso l'utilizzo di Spring MVC (Model-View-Controller). <br><br>
    3.3. La gestione degli ordini e del magazzino, con la possibilità di effettuare operazioni di inserimento, modifica ed eliminazione di prodotti nel database. <br><br>
    3.4. La gestione delle autenticazioni tramite l'integrazione con Keycloak, attraverso l'utilizzo della libreria Spring Security. <br><br>
    3.5. La gestione del carrello e dello storico di tutti gli ordini, permettendo di modificare il carrello e di tenere conto di tutto lo storico degli ordini sia del singolo utente che di tutti gli utenti. <br><br>
    3.6.  in Spring vengono utilizzati i seguenti componenti:
      3.6.1. Repository: interfaccia Java che consente l'interazione con il database, grazie all'utilizzo di Spring Data. <br> <br>
      3.6.2. Service: classe Java che implementa la logica di business del sistema, tra cui la gestione degli ordini e del magazzino. <br> <br>
      3.6.3. Controller: classe Java che si occupa di ricevere le richieste HTTP dal frontend e di restituire le risposte corrispondenti. <br> <br>
      3.6.4. Entity: classe Java che rappresenta una tabella del database, attraverso l'utilizzo di annotazioni come @Entity e @Column. <br> <br>
      3.6.5. Configuration: classe Java che permette di configurare l'autenticazione con Keycloak e la gestione del CORS. <br> <br>
      3.6.6. Support: classe Java che si occupa della gestione degli errori e delle eccezioni del sistema.



  Spring consente quindi la gestione dell'intera parte backend del sistema informativo, garantendo l'interazione con il database, la gestione degli ordini e del magazzino, la sicurezza e l'autenticazione degli utenti, nonché la validazione dei dati. <br><br>
  
  video 1.1. https://www.youtube.com/watch?v=wY_SMtQDVmw


  video 1.2. https://www.youtube.com/watch?v=QSrlAPI2_Sw



  video info https://www.youtube.com/watch?v=aeu46gAQkhA
