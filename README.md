# Prywatny_publiczny_komunikator_do_tego_szyfrowany_pisany_z_kolegami_kto_pl
ogulnie to będzie fajny komunikator który będzie szyfrowany ponadto będzie prosty i zrobiony przez nas to znaczy przeze mnie Bemulca i Kamila benc esss?

Plan działania:
1. Instalacja node.js (apt-get czy inny .zip na windzie)
2. git clone
3. utwórz baze we firebase i dodaj plik .json
4. node index.js
5. Przykłady działania/użycia:
   
   a)  Pobierz wszyystkie wiadomości z konwersacji o id: AeN23iJF3eHrypUiFtdG
    https://apisample.kjanku1.repl.co/messages?id=AeN23iJF3eHrypUiFtdG
    
   b) Pobierz wszystkie konwersacje użytkownika o id: h0BDH2qvLpzWSqVGFfhY
    https://apisample.kjanku1.repl.co/conversations?id=h0BDH2qvLpzWSqVGFfhY
    
   c)  Wyślij wiadomość w nowej konwersacji:
    tu później dodamy magiczne szfrowanie
    http://localhost:3000/newconv?&id=h0BDH2qvLpzWSqVGFfhY&members=GdTsBR9zyIRW9ShAhOZB, KnbKYwfYrGvOUOrt8B5Z&images=imageurl&text=first message in conv
    id: id konwersacji
    members: id uczestników konwersacji
    images: wiadomo obrazki, musi buć pełny url bo to tylko demo elo benc
    text: zawartość wiadomości w formie tekstowej, no bo obrazki juz były a audio nie ma
   
   d) d jak dupa bo coś nie śmiga czyli tak się debuguje
    https://apisample.kjanku1.repl.co/dupa?conv_id=AeN23iJF3eHrypUiFtdG&user_id=h0BDH2qvLpzWSqVGFfhY
   
   e) eee więcej to se sami zobaczycie bo widać w kodzie ponieważ jest czysty, przejrzysty i samokomentujacy
    
6. tu bedzie jakis frontend 