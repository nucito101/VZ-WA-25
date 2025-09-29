-- Alle Datensätze und Spalten in der Tablle students abrufen 
SELECT
  *
FROM
  Students;

-- Nur die spalten Vorname und Nachname von Students ausgeben 
SELECT
  FirstName,
  LastName
FROM
  Students
  -- Alle Spalten von Students, bei denen in der Spalte house der Wert slytherin steht
SELECT
  *
FROM
  Students
WHERE
  House = "Slytherin";

SELECT
  *
FROM
  Students
WHERE
  House = "Hufflepuff"
  AND YearsOfStudy = 6;

SELECT
  *
FROM
  Students
WHERE
  House = "Slytherin"
  OR House = "Hufflepuff";

SELECT
  *
FROM
  Students
WHERE
  House = "Slytherin"
  OR House = "Hufflepuff"
  OR House = "Gryffindor";

-- Alternative Schreibweise mit "IN"
SELECT
  *
FROM
  Students
WHERE
  House IN ("Slytherin", "Hufflepuff", "Gryffindor");

-- Alle student absteigend nach geburtsdatum
--  DESC = descending = ABsteigend
-- Order BY ist für das Sortieren zuständig 
SELECT
  *
FROM
  Students
ORDER BY
  BirthDate DESC;

-- Alle students deren Vorname mit H beginnt 
-- Groß kleinschreibung wird nicht beachtet 
-- das Potenzeichen steht als platzhalter für belibige viele Buchstaben 
SELECT
  *
FROM
  Students
WHERE
  FirstName LIKE "H%";

-- Alle Students deren Vorname ein H enthält
SELECT
  *
FROM
  Students
WHERE
  FirstName LIKE "%H%";

-- Alle Students deren vorname mit H beginnt und dann genau 5 zeichen dann kommen
-- der Unterstrich steht als Platzhalter für einen buchstaben 
SELECT
  *
FROM
  Students
WHERE
  FirstName LIKE "h____";

-- Alle Students bei denen unicorn in der spalte Wandtype vorkommt
SELECT
  *
FROM
  Students
WHERE
  WandType LIKE "%unicorn%";

-- Alle Studens deren Geburtsdatum zwischen 01.01.1980 und dem 31.12.1980 liegen 
SELECT
  *
FROM
  Students
WHERE
  BirthDate BETWEEN "1980-01-01" AND "1980-12-31";

-- Alle Students mit studenId
SELECT
  *
FROM
  Students
WHERE
  StudentenID BETWEEN 11 AND 20;

-- Alle Students bei denen in der Spalte wandtype null steht
SELECT
  *
FROM
  Students
WHERE
  WandType IS NULL;

-- mit Counter kann ich die Anzahl der Students ermitteln
-- das nennt sich Aggregatfunktion
SELECT
  COUNT(*)
FROM
  Students;

SELECT
  COUNT(*)
FROM
  Students
WHERE
  House = "Slytherin";

-- Ich kann der Spalte auch eine eigene Überschrift geben mit AS
SELECT
  COUNT(*) AS NumberOfSlytherin
FROM
  Students
WHERE
  House = "Slytherin";

--  Mit max können wir den maximalen Wert einer spalter ausgeben 
SELECT
  MAX(BirthDate)
FROM
  Students;

SELECT
  MAX(YearsOfStudy)
FROM
  Students;

-- Mit MIN können wir den minimalen Wert einer Spalter ausgeben
SELECT
  MIN(BirthDate)
FROM
  Students;

-- Mit AVG für Average kann ich mir den Durchschnittswert für eine Spalte berechnen lassen
SELECT
  AVG(YearsOfStudy)
FROM
  Students;

-- Mit Sum kann ich die Summe aller Werte in der Spalte berechnen lassen 
SELECT
  SUN (YearsOfStudy)
FROM
  Students;

-- mit ROuND kann ich mir Ergebnisse runden lassen
SELECT
  ROUND(AVG(YearsOfStudy), 2)
FROM
  Students;

-- mit Group BY kann ich mir nach bestimmten Spalten gruppieren
-- und mir dann z.B die Anzahl der Students anzeigen lassen 
SELECT
  House,
  COUNT(*)
FROM
  Students
GROUP BY
  House;

-- nach house Gruppieren und dann nochmal filtern nach den Gruppen (=Häusern) die 10 und mehr students haben
SELECT
  House,
  COUNT(*)
FROM
  Students
GROUP BY
  House
HAVING
  COUNT(*) >= 10;

-- mit LIMIT kann man die ersten 5 Datensätze aus der Students abfragen
SELECT
  *
FROM
  Students
LIMIT
  5;

-- mit OFFSET kann man datensätze überspringen 10 Students abholen und 60 überspringen datesatz 61 bis 70 werden angezeigt
SELECT
  *
FROM
  Students
LIMIT
  10
OFFSET
  60;

-- extra 
SELECT
  *
FROM
  Students
ORDER BY
  StudentenID DESC
LIMIT
  10;

-- concat kann ich mehrere spalten zu einer zusammenführen
-- am besten mit AS einem neuen Spaltennamen vergeben 
SELECT
  CONCAT (FirstName, "", LastName) AS FullName
FROM
  Students;